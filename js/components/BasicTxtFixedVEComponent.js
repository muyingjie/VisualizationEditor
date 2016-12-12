/**
 * Created by yj on 2016/12/11.
 */
/**
 * Created by yj on 2016/11/24.
 */
function BasicTxtFixedVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    BasicTxtVEComponent.apply(this, args);

    //文本元件特有属性
    this.setControlItem({
        propLevel1: "css",
        propLevel2: "width",
        propVal: "100%"
    }, {
        propLevel1: "css",
        propLevel2: "height",
        propVal: "30px"
    }, {
        propLevel1: "css",
        propLevel2: "background-color",
        propVal: "#ccc"
    }, {
        propLevel1: "css",
        propLevel2: "border-width",
        propVal: "0"
    }, {
        propLevel1: "css",
        propLevel2: "position",
        propVal: "fixed"
    });
}