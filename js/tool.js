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
        }
    });
    window.myj = myj;
})();
