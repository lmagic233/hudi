/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.apache.spark.sql

import org.apache.hudi.{HoodieCDCFileIndex, SparkAdapterSupport, SparkHoodieTableFileIndex}
import org.apache.spark.sql.catalyst.TableIdentifier
import org.apache.spark.sql.catalyst.analysis.TableOutputResolver
import org.apache.spark.sql.catalyst.catalog.CatalogStorageFormat
import org.apache.spark.sql.catalyst.expressions.{Attribute, AttributeSet, Expression, ProjectionOverSchema}
import org.apache.spark.sql.catalyst.plans.JoinType
import org.apache.spark.sql.catalyst.plans.logical._
import org.apache.spark.sql.connector.catalog.{Identifier, Table, TableCatalog}
import org.apache.spark.sql.execution.command.{CreateTableLikeCommand, ExplainCommand}
import org.apache.spark.sql.execution.datasources.HadoopFsRelation
import org.apache.spark.sql.execution.datasources.parquet.{HoodieFormatTrait, ParquetFileFormat}
import org.apache.spark.sql.execution.{ExtendedMode, SimpleMode}
import org.apache.spark.sql.internal.SQLConf
import org.apache.spark.sql.types.StructType

trait HoodieSpark3CatalystPlanUtils extends HoodieCatalystPlansUtils {

  /**
   * Instantiates [[ProjectionOverSchema]] utility
   */
  def projectOverSchema(schema: StructType, output: AttributeSet): ProjectionOverSchema

  /**
   * Un-applies [[ResolvedTable]] that had its signature changed in Spark 3.2
   */
  def unapplyResolvedTable(plan: LogicalPlan): Option[(TableCatalog, Identifier, Table)]

  def resolveOutputColumns(tableName: String,
                           expected: Seq[Attribute],
                           query: LogicalPlan,
                           byName: Boolean,
                           conf: SQLConf): LogicalPlan =
    TableOutputResolver.resolveOutputColumns(tableName, expected, query, byName, conf)

  override def createExplainCommand(plan: LogicalPlan, extended: Boolean): LogicalPlan =
    ExplainCommand(plan, mode = if (extended) ExtendedMode else SimpleMode)

  override def createJoin(left: LogicalPlan, right: LogicalPlan, joinType: JoinType): Join = {
    Join(left, right, joinType, None, JoinHint.NONE)
  }

  override def unapplyInsertIntoStatement(plan: LogicalPlan): Option[(LogicalPlan, Map[String, Option[String]], LogicalPlan, Boolean, Boolean)] = {
    plan match {
      case insert: InsertIntoStatement =>
        Some((insert.table, insert.partitionSpec, insert.query, insert.overwrite, insert.ifPartitionNotExists))
      case _ =>
        None
    }
  }


  override def unapplyCreateTableLikeCommand(plan: LogicalPlan): Option[(TableIdentifier, TableIdentifier, CatalogStorageFormat, Option[String], Map[String, String], Boolean)] = {
    plan match {
      case CreateTableLikeCommand(targetTable, sourceTable, fileFormat, provider, properties, ifNotExists) =>
        Some(targetTable, sourceTable, fileFormat, provider, properties, ifNotExists)
      case _ => None
    }
  }

  def rebaseInsertIntoStatement(iis: LogicalPlan, targetTable: LogicalPlan, query: LogicalPlan): LogicalPlan =
    iis.asInstanceOf[InsertIntoStatement].copy(table = targetTable, query = query)

  override def createMITJoin(left: LogicalPlan, right: LogicalPlan, joinType: JoinType, condition: Option[Expression], hint: String): LogicalPlan = {
    Join(left, right, joinType, condition, JoinHint.NONE)
  }
}

object HoodieSpark3CatalystPlanUtils extends SparkAdapterSupport {

  def applyNewFileFormatChanges(scanOperation: LogicalPlan, logicalRelation: LogicalPlan, fs: HadoopFsRelation): LogicalPlan = {
    val ff = fs.fileFormat.asInstanceOf[ParquetFileFormat with HoodieFormatTrait]
    ff.isProjected = true
    val tableSchema = fs.location match {
      case index: HoodieCDCFileIndex => index.cdcRelation.schema
      case index: SparkHoodieTableFileIndex => index.schema
    }
    val resolvedSchema = logicalRelation.resolve(tableSchema, fs.sparkSession.sessionState.analyzer.resolver)
    if (!fs.partitionSchema.fields.isEmpty && scanOperation.sameOutput(logicalRelation)) {
      Project(resolvedSchema, scanOperation)
    } else {
      scanOperation
    }
  }

  /**
   * This is an extractor to accommodate for [[ResolvedTable]] signature change in Spark 3.2
   */
  object MatchResolvedTable {
    def unapply(plan: LogicalPlan): Option[(TableCatalog, Identifier, Table)] =
      sparkAdapter.getCatalystPlanUtils match {
        case spark3Utils: HoodieSpark3CatalystPlanUtils => spark3Utils.unapplyResolvedTable(plan)
        case _ => None
      }
  }
}
