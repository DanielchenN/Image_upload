
function uploadFiles(formData) {
    $.ajax({
        url:'/upload_photos',
        method:'post',
        data:formData,
        processData: false,
        contentType: false,
    }).done(console.log('yes')).fail(function(xhr,status){
        alert(status)
    })
}


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