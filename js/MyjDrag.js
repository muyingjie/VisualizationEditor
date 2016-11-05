/**
 * Created by lenovo on 2016/11/4.
 */
function MyjDrag(config){
    var _this = this;

    _this.$obj = config.$obj ? config.$obj : null;
    _this.onDown = config.onDown ? config.onDown : $.noop;
    _this.onMove = config.onMove ? config.onMove : $.noop;
    _this.onUp = config.onUp ? config.onUp : $.noop;
    _this.onComponentMove = config.onComponentMove ? config.onComponentMove : $.noop;
    _this.isNeedMoveVirtualDomObj = config.isNeedMoveVirtualDomObj ? config.isNeedMoveVirtualDomObj : false;
    _this.fnOperateMoveVirtualDomObj = config.fnOperateMoveVirtualDomObj ? config.fnOperateMoveVirtualDomObj : $.noop;

    _this.$downObj = null;
    _this.$moveVirtualObj = $("<div>");

    var $doc = $(document);

    _this.$obj.on("mousedown", function (e) {
        _this.$downObj = $(this);
        if(_this.isNeedMoveVirtualDomObj){
            _this.$moveVirtualObj.addClass("moveVirtualObj");
            _this.fnOperateMoveVirtualDomObj(_this.$moveVirtualObj);
            $(document.body).append(
                _this.$moveVirtualObj
            );
        }
        _this.onDown(e);
        $doc.on("mousemove.ve", function (e) {
            _this.$moveVirtualObj.css({"left": e.pageX, "top": e.pageY});
            _this.onMove(e);
        });
        $doc.on("mouseup.ve", function (e) {
            _this.$moveVirtualObj.remove();

            _this.onUp({
                $obj: _this.$obj,
                $downObj: _this.$downObj,
                e: e
            });

            $doc.off("mousemove.ve");
            $doc.off("mouseup.ve");
        });
        return false;
    });

    _this.$obj.on("mousemove", function (e) {
        _this.onComponentMove(e);
    });
}