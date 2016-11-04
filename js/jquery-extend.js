/**
 * Created by yj on 2016/11/3.
 */
$.fn.extend({
    "mDrag": function (config) {
        var $this = $(this);
        var $doc = $(document);
        var onDown = config.onDown ? config.onDown : $.noop;
        var onMove = config.onMove ? config.onMove : $.noop;
        var onUp = config.onUp ? config.onUp : $.noop;

        $this.on("mousedown", function (e) {
            onDown(e);
            $doc.on("mousemove.ve", function (e) {
                onMove(e);
            });
            $doc.on("mouseup.ve", function (e) {
                var l = e.offsetX;
                var t = e.offsetY;

                onUp({
                    e: e,
                    l: l,
                    t: t
                });

                $doc.off("mousemove.ve");
                $doc.off("mouseup.ve");
            });
            return false;
        });

        return this;
    }
});