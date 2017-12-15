
function uploadFiles(formData) {
    $.ajax({
        url:'/upload_photos',
        method:'post',
        data:formData,
        processData: false,
        contentType: false,
        xhr: function(){
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener('progress',function (oEvent) {
                var progressBar = $('.progress-bar')
                if(oEvent.lengthComputable){
                    var percent = (oEvent.loaded / oEvent.total) * 100;
                    progressBar.width(percent + '%');
                }
                if(percent===100){
                    progressBar.removeClass('active');
                }                
            })
            return xhr
        }
    }).done(handleSuccess).fail(function(xhr,status){
        alert(status)
    })
}


function handleSuccess(data){
    if(data.length > 0){
        var html='';
        for(let i=0; i<data.length; i++){
            var img = data[i]
            if (img.status) {
                html += '<div class="col-xs-6 col-md-4"><a href="#" class="thumbnail"><img src="' + img.publicPath + '" alt="' + img.filename  + '"></a></div>';
            } else {
                html += '<div class="col-xs-6 col-md-4"><a href="#" class="thumbnail">Invalid file type - ' + img.filename  + '</a></div>';
            }
        }
        //注意这里别脑抽写成append这样会一直往上加
        $('#album').html(html);
    }else{
        alert('nothing here!')
    }
}

$('#upload-photos').on('change',()=>{
    $('.progress-bar').width('0%');
})


$('#upload-photos').on('submit',function(){
    event.preventDefault();
    var formData=new FormData();
    var files=$('#photos-input').get(0).files;

    if(files.length===0){
        alert('select at least One photo');
        return false
    }
    if(files.length>3){
        alert('You can upload no more than three photos');
        return false
    }
    for(let i=0; i<files.length;i++){
        formData.append('photo[]',files[i],files[i].name);
    }

    uploadFiles(formData);
})