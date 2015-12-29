+function ($) {
  'use strict';

  var $richeditor = $('#textarea1');
  var $NewsModal = $('#NewsModal');

  var editor;
  if($richeditor && $richeditor.length > 0) {
    var expressionArr = [];
    for(var i = 0; i < 100; i++) {
      expressionArr.push('/components/wangEditor/expressions/'+(i+1)+'.gif');
    }
    editor = $richeditor.wangEditor({
      uploadImgComponent: $('#uploadContainer'),
      expressions:expressionArr
    });
  }

  //region uploader
  //获取dom节点
  var $uploadContainer = $('#uploadContainer'),
    $fileList = $('#fileList'),
    $btnUpload = $('#btnUpload');

  //实例化一个上传对象
  var uploader = new plupload.Uploader({
    browse_button: 'btnBrowse',
    url: '/admin/uploadImage',
    flash_swf_url: 'plupload/Moxie.swf',
    sliverlight_xap_url: 'plupload/Moxie.xap',
    filters: {
      mime_types: [
        //只允许上传图片文件 （注意，extensions中，逗号后面不要加空格）
        { title: "图片文件", extensions: "jpg,gif,png,bmp" }
      ]
    }
  });

  //存储所有图片的url地址
  var urls = [];

  //初始化
  uploader.init();

  //绑定文件添加到队列的事件
  uploader.bind('FilesAdded', function (uploader, files) {
    //显示添加进来的文件名
    $.each(files, function(key, value){
      var fileName = value.name,
        html = '<li>' + fileName + '</li>';
      $fileList.append(html);
    });
  });

  //单个文件上传之后
  uploader.bind('FileUploaded', function (uploader, file, responseObject) {
    //注意，要从服务器返回图片的url地址，否则上传的图片无法显示在编辑器中
    var url = responseObject.response;
    //先将url地址存储来，待所有图片都上传完了，再统一处理
    urls.push(url);
  });

  //全部文件上传时候
  uploader.bind('UploadComplete', function (uploader, files) {
    //打印出所有图片的url地址
    $.each(urls, function (key, value) {
      //console.log(value);
      editor.command(event, 'insertHTML', '<img src="upload/' + value + '"/>');
    });

    //清空url数组
    urls = [];

    //清空显示列表
    $fileList.html('');
  });

  //上传事件
  $btnUpload.click(function(){
    uploader.start();
  });
  //endregion



  //submit news add & update
  $(document).on('click', '.btn-submit', function(){
    var title = $('input#title').val();
    var content = $richeditor.val();
    var id = $NewsModal.attr('data-id');
    $.post(
      '/admin/news/'+id,
      {title: title,  content: content},
      function(data){
        console.log(data);
        $('#news-manage-table').empty().append(data);
        $NewsModal.modal('hide');
      },
      'html'
    )
  });
  //init modal content
  $NewsModal.on('show.bs.modal', function (event) {
    var $button = $(event.relatedTarget);
    var modal = $(this);
    modal.attr('data-id', '')
         .find('input#title').val("");
    editor.html('');
    if($button.attr('data-op') == 'edit'){
      var id = $button.attr('data-id');
      $.get('/admin/news/'+id, function(data){
        //console.log(data);
        modal.attr('data-id', data.news._id)
             .find('input#title').val(data.news.title);
        editor.html(data.news.content);
      }, 'json')
    }
  });
  //delete news
  $(document).on('click','#news-manage-table .news .delete', function(){
    var id = $(this).attr('data-id');
    $.ajax({
      url: '/admin/news/'+id,
      type: 'delete',
      dataType: 'html',
      success: function(data){
        $('#news-manage-table').empty().append(data);
      }
    })
  });

}(jQuery);
