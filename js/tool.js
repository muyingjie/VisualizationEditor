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
        },
        getFunctionName: function (fn){
            var tmp = fn.toString();
            var re = /function\s*(\w*)/i;
            var matches = re.exec(tmp);
            return matches[1];
        },
        getTopContainer: function (a$curContainer) {
            var $firstCurContainer = a$curContainer[0];
            var l = $firstCurContainer.offset().left;
            var t = $firstCurContainer.offset().top;
            var $finalCurContainer = $firstCurContainer;
            $.each(a$curContainer, function (i, $curContainer) {
                var curL = $curContainer.offset().left;
                var curT = $curContainer.offset().top;
                if(curL >= l && curT >= t){
                    $finalCurContainer = $curContainer;
                }
            });
            return $finalCurContainer;
        }
    });
    window.myj = myj;
})();
