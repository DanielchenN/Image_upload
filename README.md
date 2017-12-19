## Nodejs Image Upload 

这个程序是一个基于Nodejs, jQuery, FormData的图片上传（至uploads文件夹下）并回显的应用。
运行效果如下：

<img src="https://wx4.sinaimg.cn/mw690/006ApWmtgy1fmhizwu589j311y0kgqkm.jpg">


## 目录

```
.
├── tem_uploads                                 // 临时文件的存储路径
├── uploads                                     // 上传图片存储的路径
├── public/assets                               //静态文件
│   ├──app.js                                    
├── views                                       // 静态HTML
    ├── index.html                              
├── app.js                                      // 入口文件
.
```

## 后记

加入了过期本地文件自动删除的功能，减少了磁盘的负担。
加入了 XHR 用于展示前端progress进度条
