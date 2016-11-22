/**
 * Created by yj on 2016/11/13.
 */
function BasicIconVEComponent(config){
    config = config ? config : {};
    $.extend(true, config, {
        containerDOM: $("<img>")
    });
    var args = [].slice.call(arguments, 0);
    BasicVEComponent.apply(this, args);

    var _this = this;
    this.canDragToScale = false;
    this.setControlItem({
        propLevel1: "otherAttrs",
        propLevel2: "selectIconCategory",
        propName: "标签类别",
        propVal: "img/warning.png",
        isShow: true,
        interactiveStyle: "select",
        interactiveVal: {
            "select": [
                {
                    showVal: "正确",
                    propVal: "img/ok.png"
                },
                {
                    showVal: "警告",
                    propVal: "img/warning.png"
                }
            ]
        },
        onPropValChangeAfter: function () {
            var val = _this.getControlItem({
                propLevel1: "otherAttrs",
                propLevel2: "selectIconCategory"
            }).propVal;
            _this.containerDOM.attr({"src": val});
        }
    });
}