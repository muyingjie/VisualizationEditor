/**
 * Created by lenovo on 2016/11/4.
 */
function mDrag(config){
    var $this = config.$obj ? config.$obj : null;
    var onDown = config.onDown ? config.onDown : $.noop;
    var onMove = config.onMove ? config.onMove : $.noop;
    var onUp = config.onUp ? config.onUp : $.noop;
    var isNeedMoveVirtualDomObj = config.isNeedMoveVirtualDomObj ? config.isNeedMoveVirtualDomObj : false;
    var fnOperateMoveVirtualDomObj = config.fnOperateMoveVirtualDomObj ? config.fnOperateMoveVirtualDomObj : $.noop;

    var $doc = $(document);
    var $downObj = null;
    var $moveVirtualObj = $("<div>");

    $this.on("mousedown", function (e) {
        $downObj = $(this);
        if(isNeedMoveVirtualDomObj){
            $moveVirtualObj.addClass("moveVirtualObj");
            fnOperateMoveVirtualDomObj($moveVirtualObj);
            $(document.body).append(
                $moveVirtualObj
            );
        }
        onDown(e);
        $doc.on("mousemove.ve", function (e) {
            $moveVirtualObj.css({"left": e.clientX, "top": e.clientY});
            onMove(e);
        });
        $doc.on("mouseup.ve", function (e) {
            $moveVirtualObj.remove();

            onUp({
                $obj: $this,
                $downObj: $downObj,
                e: e
            });

            $doc.off("mousemove.ve");
            $doc.off("mouseup.ve");
        });
        return false;
    });

    return {
        $moveVirtualObj: $moveVirtualObj
    };
}