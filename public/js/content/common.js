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
    console.log('sdf')
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    $(this).parents('.img-slider').find('.current>img').attr('src', $(this).attr('src'));
});