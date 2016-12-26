/**
 * Created by yj on 2016/12/11.
 */
function BasicInputButtonVEComponent(config) {
    config = config ? config : {};
    $.extend(true, config, {
        containerDOM: $("<input>")
    });
    var args = [].slice.call(arguments, 0);
    BasicVEComponent.apply(this, args);

    //文本元件特有属性
    this.setControlItem({
        propLevel1: "css",
        propLevel2: "width",
        propVal: "50px"
    }, {
        propLevel1: "css",
        propLevel2: "height",
        propVal: "30px"
    }, {
        propLevel1: "attr",
        propLevel2: "type",
        propVal: "button"
    }, {
        propLevel1: "attr",
        propLevel2: "value",
        propVal: "按钮"
    }, {
        propLevel1: "css",
        propLevel2: "border-color",
        propVal: "#666"
    }, {
        propLevel1: "css",
        propLevel2: "background-color",
        propVal: "#eee"
    });
}