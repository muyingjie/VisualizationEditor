$.extend({
    ins:function(){
        this.autoWindow();
        var obj=this;
        $(".components .nav a").bind('click',function(){
          obj.setPanel($(".components .nav a"),$(this),$(".components .area"))
        });
        $(".panel .nav a").bind('click',function(){
            obj.setPanel($(".panel .nav a"),$(this),$(".panel .area"))
        });
    },
    autoWindow:function() {
        var areaHeight = $(window).height();
        var areaWidth = $(window).width();
        $(".screens").css({'width': (areaWidth - 420) + 'px', 'height': (areaHeight - 38) + 'px'});
        $(".components").css({'height': (areaHeight - 38) + 'px'});
        $(".components .area").css({'height': (areaHeight - 158) + 'px'});
        $(".panel").css({'height': (areaHeight - 38) + 'px'});
        $(".panel .area").css({'height': (areaHeight - 118) + 'px'});
        $(".screens .workbench").css({'height': (areaHeight - 38) + 'px'});
        $(".screens .workbench .canvas_dow").css({'height': (areaHeight - 68) + 'px'});
    },
    setPanel:function(obj,my,area){
       var index=obj.index(my);
        area.hide();
        area.eq(index).show();
        obj.removeClass('active');
        my.addClass('active')
    }

});