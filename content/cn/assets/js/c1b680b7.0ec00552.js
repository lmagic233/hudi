"use strict";(self.webpackChunkhudi=self.webpackChunkhudi||[]).push([[1327],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return p}});var i=n(67294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,i,o=function(e,t){if(null==e)return{};var n,i,o={},r=Object.keys(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(i=0;i<r.length;i++)n=r[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=i.createContext({}),c=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=c(e.components);return i.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},f=i.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),f=c(n),p=o,m=f["".concat(l,".").concat(p)]||f[p]||d[p]||r;return n?i.createElement(m,a(a({ref:t},u),{},{components:n})):i.createElement(m,a({ref:t},u))}));function p(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,a=new Array(r);a[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var c=2;c<r;c++)a[c]=n[c];return i.createElement.apply(null,a)}return i.createElement.apply(null,n)}f.displayName="MDXCreateElement"},39014:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},toc:function(){return u},default:function(){return f}});var i=n(87462),o=n(63366),r=(n(67294),n(3905)),a=["components"],s={title:"File Sizing",toc:!0},l=void 0,c={unversionedId:"file_sizing",id:"file_sizing",isDocsHomePage:!1,title:"File Sizing",description:"This doc will show you how Apache Hudi overcomes the dreaded small files problem. A key design decision in Hudi was to",source:"@site/docs/file_sizing.md",sourceDirName:".",slug:"/file_sizing",permalink:"/cn/docs/next/file_sizing",editUrl:"https://github.com/apache/hudi/edit/asf-site/website/docs/docs/file_sizing.md",version:"current",frontMatter:{title:"File Sizing",toc:!0},sidebar:"docs",previous:{title:"Cleaning",permalink:"/cn/docs/next/hoodie_cleaner"},next:{title:"Exporter",permalink:"/cn/docs/next/snapshot_exporter"}},u=[{value:"Auto-Size During ingestion",id:"auto-size-during-ingestion",children:[{value:"For Copy-On-Write",id:"for-copy-on-write",children:[]},{value:"For Merge-On-Read",id:"for-merge-on-read",children:[]}]},{value:"Auto-Size With Clustering",id:"auto-size-with-clustering",children:[]}],d={toc:u};function f(e){var t=e.components,n=(0,o.Z)(e,a);return(0,r.kt)("wrapper",(0,i.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"This doc will show you how Apache Hudi overcomes the dreaded small files problem. A key design decision in Hudi was to\navoid creating small files in the first place and always write properly sized files.\nThere are 2 ways to manage small files in Hudi and below will describe the advantages and trade-offs of each."),(0,r.kt)("h2",{id:"auto-size-during-ingestion"},"Auto-Size During ingestion"),(0,r.kt)("p",null,"You can automatically manage size of files during ingestion. This solution adds a little latency during ingestion, but\nit ensures that read queries are always efficient as soon as a write is committed. If you don't\nmanage file sizing as you write and instead try to periodically run a file-sizing clean-up, your queries will be slow until that resize cleanup is periodically performed."),(0,r.kt)("p",null,"(Note: ",(0,r.kt)("a",{parentName:"p",href:"/docs/next/write_operations"},"bulk_insert")," write operation does not provide auto-sizing during ingestion)"),(0,r.kt)("h3",{id:"for-copy-on-write"},"For Copy-On-Write"),(0,r.kt)("p",null,"This is as simple as configuring the ",(0,r.kt)("a",{parentName:"p",href:"/docs/configurations#hoodieparquetmaxfilesize"},"maximum size for a base/parquet file"),"\nand the ",(0,r.kt)("a",{parentName:"p",href:"/docs/configurations#hoodieparquetsmallfilelimit"},"soft limit")," below which a file should\nbe considered a small file. For the initial bootstrap of a Hudi table, tuning record size estimate is also important to\nensure sufficient records are bin-packed in a parquet file. For subsequent writes, Hudi automatically uses average\nrecord size based on previous commit. Hudi will try to add enough records to a small file at write time to get it to the\nconfigured maximum limit. For e.g , with ",(0,r.kt)("inlineCode",{parentName:"p"},"compactionSmallFileSize=100MB")," and limitFileSize=120MB, Hudi will pick all\nfiles < 100MB and try to get them upto 120MB."),(0,r.kt)("h3",{id:"for-merge-on-read"},"For Merge-On-Read"),(0,r.kt)("p",null,"MergeOnRead works differently for different INDEX choices so there are few more configs to set:  "),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"Indexes with ",(0,r.kt)("strong",{parentName:"li"},"canIndexLogFiles = true")," : Inserts of new data go directly to log files. In this case, you can\nconfigure the ",(0,r.kt)("a",{parentName:"li",href:"/docs/configurations#hoodielogfilemaxsize"},"maximum log size")," and a\n",(0,r.kt)("a",{parentName:"li",href:"/docs/configurations#hoodielogfiletoparquetcompressionratio"},"factor")," that denotes reduction in\nsize when data moves from avro to parquet files."),(0,r.kt)("li",{parentName:"ul"},"Indexes with ",(0,r.kt)("strong",{parentName:"li"},"canIndexLogFiles = false")," : Inserts of new data go only to parquet files. In this case, the\nsame configurations as above for the COPY_ON_WRITE case applies.")),(0,r.kt)("p",null,"NOTE : In either case, small files will be auto sized only if there is no PENDING compaction or associated log file for\nthat particular file slice. For example, for case 1: If you had a log file and a compaction C1 was scheduled to convert\nthat log file to parquet, no more inserts can go into that log file. For case 2: If you had a parquet file and an update\nended up creating an associated delta log file, no more inserts can go into that parquet file. Only after the compaction\nhas been performed and there are NO log files associated with the base parquet file, can new inserts be sent to auto size that parquet file."),(0,r.kt)("h2",{id:"auto-size-with-clustering"},"Auto-Size With Clustering"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("a",{parentName:"strong",href:"/docs/next/clustering"},"Clustering"))," is a feature in Hudi to group\nsmall files into larger ones either synchronously or asynchronously. Since first solution of auto-sizing small files has\na tradeoff on ingestion speed (since the small files are sized during ingestion), if your use-case is very sensitive to\ningestion latency where you don't want to compromise on ingestion speed which may end up creating a lot of small files,\nclustering comes to the rescue. Clustering can be scheduled through the ingestion job and an asynchronus job can stitch\nsmall files together in the background to generate larger files. NOTE that during this, ingestion can continue to run concurrently."),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},"Please note that Hudi always creates immutable files on disk. To be able to do auto-sizing or clustering, Hudi will\nalways create a newer version of the smaller file, resulting in 2 versions of the same file.\nThe ",(0,r.kt)("a",{parentName:"em",href:"/docs/next/hoodie_cleaner"},"cleaner service")," will later kick in and delte the older version small file and keep the latest one.")))}f.isMDXComponent=!0}}]);