+function ($) {
  'use strict';
  $('.scroll-button.prev-button').on('click', function(){
    var currentStart = $('.doctors').data('current-start');
    if(currentStart == 0){
      return;
    }
    else{
      currentStart--;
    }
    var pos = currentStart * (-170);
    $('.doctors').animate({'left': pos},'slow')
      .data('current-start', currentStart);
  });

  $('.scroll-button.next-button').on('click', function(){
    var currentStart = $('.doctors').data('current-start');
    var docNum = $('.doctors .doctor').length;
    if(currentStart + 3 >= docNum){
      return;
    }
    else{
      currentStart++;
    }
    var pos = currentStart * (-170);
    $('.doctors').animate({'left': pos}, 'slow')
      .data('current-start', currentStart);
  });
}(jQuery);
