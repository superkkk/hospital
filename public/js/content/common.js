$('.tab-items').on('click', 'a', function (e) {
  e.preventDefault();
  $(this).siblings().removeClass('active');
  $(this).addClass('active');
  var id = "box-" + $(this).attr('data-id');
  $('.tab-box>div').fadeOut('fast');
  $('#' + id).fadeIn('fast');
});

$('.doc-tab').on('click', '.tab-item', function () {
  $(this).siblings().removeClass('active');
  $(this).addClass('active');
  var id = 'doc-' + $(this).attr('data-id');
  $('.doc-item').hide();
  $('#' + id).fadeIn('fast');
});


$('.img-slider').find('.img-item-container').on('click', 'img', function () {
  $(this).siblings().removeClass('active');
  $(this).addClass('active');
  $(this).parents('.img-slider').find('.current>img').attr('src', $(this).attr('src')).attr('data-index', $(this).attr('data-index'));
  $(this).parents('.img-slider').find('.current>.title').text($(this).attr('data-title'));
});

$('.img-slider').find('.arrow').on('click', function() {
  console.log('sfd');
 if ($(this).hasClass('prev')) {
   var index = parseInt($(this).parents('.img-slider').find('.current>img').attr('data-index')) - 1;
   if (index == 0) {
     return;
   }
 } else {
   var index = parseInt($(this).parents('.img-slider').find('.current>img').attr('data-index')) + 1;
   if (index == 11) {
     return;
   }
 }
  $(this).parents('.img-slider').find('.img-item-container img[data-index='+ index+']').trigger('click');
});
