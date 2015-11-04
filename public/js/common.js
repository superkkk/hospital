+function ($) {
  'use strict';
  //expand
  //hide menu when click blank
  $(document).on('click', function(e){
    console.log(e);

    var $title;
    if( $(e.target).hasClass('expand-title') ){
      $title = $(e.target);
    } else if( $(e.target).parents('expand-title').length ){
      $title = $(e.target).parents('expand-title')
    } else if($(e.target).hasClass('expand-menu') || $(e.target).parents('expand-title').length){
      //to nothing.
    } else{
      $('.expand-menu').toggleClass('hide',true);
    }
    if($title){
      var target = $title.attr('expand-target');
      $('.expand-menu:not('+target+')').toggleClass('hide', true);
      $(target).toggleClass('hide');
    }
  });
}(jQuery);
