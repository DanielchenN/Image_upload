
function uploadFiles(formData){
    $.ajax({
        url:'/upload_photos',
        method:'post',
        data:formData,
        processData: false,
        contentType: false,
    }).done(handleSuccess).fail(function(xhr,status){
        alert(status);
    });
}



$('#upload-photos').on('submit',function(){
    event.preventDefault();
    var files=$('#photos-input').get(0).files,
        formData = new FormData();

    if(files.length === 0){
        alert('Select atleast 1 file to upload.');
        return false;
    }
    
    if(files.length > 3){
        alert('You can only upload up to 3 files.');
        return false;
    }
    
    for(i=0; i < files.length; i++){
        var file=files[i];
        formData.append('photo[]', file, file.name);
    }

    uploadFiles(formData);
})
