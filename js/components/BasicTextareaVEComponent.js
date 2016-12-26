/**
 * Created by yj on 2016/12/11.
 */
function BasicTextareaVEComponent(config){
    config = config ? config : {};
    $.extend(true, config, {
        containerDOM: $("<textarea>")
    });
    var args = [].slice.call(arguments, 0);
    BasicVEComponent.apply(this, args);

    //文本元件特有属性
    this.setControlItem({
        propLevel1: "css",
        propLevel2: "width",
        propVal: "150px"
    }, {
        propLevel1: "css",
        propLevel2: "height",
        propVal: "60px"
    }, {
        propLevel1: "css",
        propLevel2: "text-align",
        propVal: "left"
    }, {
        propLevel1: "css",
        propLevel2: "border-color",
        propVal: "#666"
    });
}