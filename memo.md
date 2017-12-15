# ajax上传需要注意
https://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery

Setting processData to false lets you prevent jQuery from automatically transforming the data into a query string. See the docs for more info.

Setting the contentType to false is imperative, since otherwise jQuery will set it incorrectly.

#关于processbar进度条
https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Monitoring_progress

#关于取后缀名
            
            //通过split也可以取到后缀名，这里随便用哪种方法
            //console.log('file',file.name);
            //var _filename=file.name;
            //var em=_filename.split('.')[1]
           // console.log('em:',em)
