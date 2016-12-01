$.extend({
    ins:function(){
        this.autoWindow()
        var obj=this;
        $(".components .nav a").bind('click',function(){
          obj.setPanel($(".components .nav a"),$(this),$(".components .area"))
        });
        $(".panel .nav a").bind('click',function(){
            obj.setPanel($(".panel .nav a"),$(this),$(".panel .area"))
        });
        this.drawRuler();
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
    },
    setPanel:function(obj,my,area){
       var index=obj.index(my);
        area.hide();
        area.eq(index).show();
        obj.removeClass('active');
        my.addClass('active')
    },
    drawRuler:function(){
        var oRuler = document.getElementById("upRuler");
        var ctx = oRuler.getContext("2d");
        for(var i=0.5;i<1600;i+=5){
            ctx.beginPath();
            ctx.strokeStyle = "#c2c2c2";
            ctx.moveTo(i, 30);
            if(i % 50 == 0.5){
                ctx.fillText(i-0.5, i+4, 15);
                ctx.lineTo(i, 10);
            }else{
                ctx.lineTo(i, 20);
            }
            ctx.stroke();
            ctx.closePath();
        }

        var oRuler = document.getElementById("dowRuler");
        var ctx = oRuler.getContext("2d");
        for(var i=0.5;i<1600;i+=5){
            ctx.beginPath();
            ctx.strokeStyle = "#c2c2c2";
            ctx.moveTo(30,i);
            if(i % 50 == 0.5){
                ctx.fillText(i-0.5,3,i-2.5);
                ctx.lineTo(10,i);
            }else{
                ctx.lineTo(20,i);
            }

            ctx.stroke();
            ctx.closePath();
        }


    }

});