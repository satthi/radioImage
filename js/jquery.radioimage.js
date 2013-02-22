(function($) {
  $.fn.radioimage = function(settings) {
    settings=jQuery.extend({
          radioOnImage: './img/radio_on.png',
          radioOffImage: './img/radio_off.png',
          imageWidth: 20,
          imageHeight: 20,
          changeClass: null
        },settings);

    //画像とinputの大きさから、marginを設定する
    
    $('input:radio').each(function(){
        if (settings.changeClass == null || $(this).hasClass(settings.changeClass) == true){
            $(this).css('visibility','hidden');
            var offset = $(this).offset();
            var top = parseInt(offset.top,10);
            var left = parseInt(offset.left,10);
            var dom_width = parseInt($(this).width(),10);
            var dom_height = parseInt($(this).height(),10);

            if (dom_height < settings.imageHeight){
                var margin_top = (settings.imageHeight - dom_height) / 2;
                $(this).css({marginTop: margin_top + 'px',marginBottom:margin_top + 'px'});
            }

            var margin_width = (settings.imageWidth - dom_width) / 2;
            $(this).css({marginLeft: '-' + margin_width + 'px',marginRight: '-' + margin_width + 'px'});

            //画像を設定
            var offset = $(this).offset();
            var top = parseInt(offset.top,10);
            var left = parseInt(offset.left,10);
            var dom_width = parseInt($(this).width(),10);
            var dom_height = parseInt($(this).height(),10);
            var center_top = top + (dom_height / 2);
            var center_left = left + (dom_width / 2);
            var set_top = center_top - (settings.imageHeight / 2);
            var set_left = center_left - (settings.imageWidth / 2);
            var style = 'top:' + set_top + 'px;left:' + set_left + 'px;width:' + settings.imageWidth + 'px;height:' + settings.imageHeight + 'px;';

            $(this).next().css({marginLeft: settings.imageWidth + 'px'});

            if ($(this).is(':checked')){
                $(this).after('<img src="' + settings.radioOnImage + '" class="radioimageradio"></div>');
            }else{
                $(this).after('<img src="' + settings.radioOffImage + '" class="radioimageradio"></div>');
            }
        }
    });
    
    $('.radioimageradio').css({position: 'absolute',cursor:'pointer'});
    
    //画像をクリックした際の挙動
    $('.radioimageradio').click(function(){
        var click_dom = $(this).prev();
        var name = click_dom.attr('name');
        var value = click_dom.attr('value');
        
        //inputに値を挿入
        $('input:radio[name="' + name + '"]').val([value]);
        changeRadioImg(name,value);
        //クリックした要素のラジオボタンの画像切り替え
    });
    
    $('input:radio').change(function(){
        var name = $(this).attr('name');
        var value = $('input:radio[name="' + name + '"]:checked').val();
        changeRadioImg(name,value);
    });
    
    
    function changeRadioImg(name,value){
        $('input:radio[name="' + name + '"]').each(function(){
            var this_value = $(this).attr('value');
            var img_dom = $(this).next();
            if (this_value == value){
                img_dom.attr('src',settings.radioOnImage);
            }else{
                img_dom.attr('src',settings.radioOffImage);
            }
        });
    }

}
})(jQuery);