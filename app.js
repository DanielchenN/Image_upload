const express=require('express');
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
const readChunk = require('read-chunk');
const fileType = require('file-type');

const app =  express()
app.set('port',(process.env.PORT || 3080));

app.use(express.static('public'));
app.use('/uploads',express.static('uploads'));


app.get('/',function(req,res){
    var filesPath = path.join(__dirname,'uploads/');
    //read all the files of the uploads
    fs.readdir(filesPath,function(err,files){
        if(err){
            console.log(err);
            return
        }
        console.log('files:',files);
        files.forEach((file)=>{
            fs.stat(filesPath+file,(err,stats)=>{
                if (err) {
                    console.log(err);
                    return;
                }
                var createAt = stats.ctime;
                var days = Math.round((Date.now()-createAt)/(1000*60*60*24));
                if (days > 1){
                    fs.unlink(filesPath+file,(err)=>{
                        console.log(err)
                    });
                }
            })
        })
    })
    
    res.sendFile(path.join(__dirname,'views/index.html'));
});


app.post('/upload_photos',function(req,res){
    var photos=[];
    var form = new formidable.IncomingForm();
    form.multiples = true;
    //临时目录
    form.uploadDir = path.join(__dirname,'tmp_uploads');
    form.parse(req)
        .on('file',function(name,file){
            if(photos.length === 3){
                fs.unlink(file.path, function(err){
                    if(err){console.log(err)}
                });
                return true
            }
           
            var type = null;
            var filename='';
            var buffer = readChunk.sync(file.path, 0, 262);
            type = fileType(buffer); //=> {ext: 'png', mime: 'image/png'}
            if (type!==null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')){
                //改名 避免重名
                filename = Date.now() + '-' + file.name;
                fs.rename(file.path, path.join(__dirname,'uploads/'+ filename),function(err){
                    if(err){console.log(err)}
                })            
                photos.push({
                    status:true,
                    filename:filename,
                    type:type.ext,
                    publicPath:'uploads/' + filename    
                })
            }else{
                photos.push({
                    status:false,
                    filename:file.name,
                    message: 'Invalid file type'  
                })
                fs.unlink(file.path, (err)=>{
                    if(err){console.log(err)}
                })
            }
            //console.log('photos is',photos)
        })
        .on('error', (err)=> {
            console.log('Error occurred during processing - ' + err);
        })
        .on('end',()=>{
            console.log('All the request fields have been processed.');
            res.status(200).json(photos);
        })
})



app.listen(app.get('port'),function(){
    console.log('Express started at port ' + app.get('port'));
})