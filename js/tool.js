/**
 * Created by yj on 2016/11/3.
 */
(function () {
    var myj = window.myj ? window.myj : {};
    $.extend(myj, {
        assign: function(){},
        object: function (superTypePrototype) {
            function F(){}
            F.prototype = superTypePrototype;
            return new F();
        },
        inheritPrototype: function(subType, superType){
            var prototype = this.object(superType.prototype);
            prototype.constructor = subType;
            subType.prototype = prototype;
        },
        isInObj: function (e, $obj) {
            var ex = e.pageX;
            var ey = e.pageY;
            var ow = $obj.width();
            var oh = $obj.height();
            var ol = $obj.offset().left;
            var ot = $obj.offset().top;
            var or = ol + ow;
            var ob = ot + oh;

            return ex > ol && ex < or && ey > ot && ey < ob;
        }
    });
    window.myj = myj;
})();
