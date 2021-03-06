$(function(){
  var sticky_html = '<div class="sticky">'+
    '<nav class="top_nav">'+
      '<a href="#" class="add"><i class="fa fa-plus"></i></a>'+
      '<a href="#" class="save"><i class="fa fa-floppy-o"></i></a>'+
      '<div class="right">'+
        '<a href="#" class="get"><i class="fa fa-list"></i></a>'+
        '<a href="#" class="del"><i class="fa fa-times"></i></a>'+
      '</div>'+
    '</nav>'+
    '<textarea name="txt" class="txt"></textarea>'+
    '<nav class="side_nav"><ol></ol></nav>'+
   '</div>';

   var Sticky = {

    //메모 추가 메서드
    add : function(){
      var win_width = $('#sticky_wrap').width()-250,
        win_height = $('#sticky_wrap').height()-300,
        x = Math.random() * win_width,
        y = Math.random() * win_height;

      $('#sticky_wrap').append(sticky_html);
      var $new_sticky = $('.sticky').last();

      $new_sticky.css({
        left : parseInt(x) + 'px',
        top : y
      });
      $('.sticky').css('zIndex', '0');
      $new_sticky.css('zIndex', '99');
    },

    //메모 저장 메서드
    save : function(current_memo){
      var idx = localStorage.length;
      var txt = current_memo.val();

      if(txt !== ''){
        var key = prompt('저장할 파일명 : ', '');
        localStorage.setItem(key,txt);
      }
    },

    //목록 메서드
    get : function list_storage(current_memo){
      var key;
      var l = localStorage.length;
      var del_icon = '<i class = "fa fa-trash"></i>';

      current_memo.find('ol').empty();
      current_memo.toggleClass('active');

      for(var i=0; i < l; i++){
        key = localStorage.key(i);
        current_memo.find('ol').append('<li>'+key+del_icon+'</li>');
      }

      current_memo.find('li').click(function(){
        var getData = $(this).text();
        var txt = localStorage.getItem(getData);
        current_memo.toggleClass('active');
        current_memo.prev('.txt').val(txt);
      });

      current_memo.find('li > i').click(function(){
        var key = $(this).parent().text();
        var ok = confirm('해당 메모를 삭제할까요?');
        if(ok){
          localStorage.removeItem(key);
        }
      });
    }
  };

  /*---------------------------------------------------------*/
  //추가 버튼
  $('#sticky_wrap').on('click', '.add',function(){
    Sticky.add();
  });
  //저장 버튼
  $('#sticky_wrap').on('click','.save',function(){
    var current_memo = $(this).parent().siblings('.txt');
    Sticky.save(current_memo);
  });
  //읽기 버튼
  $('#sticky_wrap').on('click','.get',function(){
    var current_memo = $(this).parents('.top_nav').siblings('.side_nav');
    Sticky.get(current_memo);
  });
  //창 닫기 버튼
  $('#sticky_wrap').on('click', '.del', function(){
    var current_memo = $(this).parents('.sticky').remove();
  });
  //드래그 이동
  $('#sticky_wrap').on('mouseover', '.top_nav', function(){
    $(this).parent().draggable();
  });
  //터치 입력
  $('#sticky_wrap').on('touchstart mousedown', '.sticky',function(){
    $('.sticky').css('zIndex','0');
    $(this).css('zIndex','99');
  });
  $('#sticky_wrap').on('touchmove','.top_nav',function(e){
    var $sticky = $(this).parent();
    var event = e.originalEvent;
    var touchobj = event.changedTouches[0];
    var x = parseInt(touchobj.clientX),
      y = parseInt(touchobj.clientY),
      ex = x-125;
      ey = y-16;
      $sticky.css('left', ex+'px');
      $sticky.css('top', ey+'px');
  });
  //메모장 초기화
  $('#sticky_wrap').append(sticky_html);
});
