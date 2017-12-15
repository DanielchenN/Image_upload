# ajax上传需要注意
https://stackoverflow.com/questions/6974684/how-to-send-formdata-objects-with-ajax-requests-in-jquery

Setting processData to false lets you prevent jQuery from automatically transforming the data into a query string. See the docs for more info.

Setting the contentType to false is imperative, since otherwise jQuery will set it incorrectly.