/**
 * Created by yj on 2016/11/12.
 */
function BasicImgVEComponent(config){
    config = config ? config : {};
    $.extend(true, config, {
        containerDOM: $("<img>")
    });
    var args = [].slice.call(arguments, 0);
    BasicVEComponent.apply(this, args);

    //如果在这里赋值，就将父类中给dom元素覆盖了，同时把给它加的类名也覆盖了
    //this.containerDOM = $("<img>");
    var src = this.getControlItem({
        propLevel1: "attr",
        propLevel2: "src"
    }).propVal;
    if(!src){
        this.setControlItem({
            propLevel1: "attr",
            propLevel2: "src",
            propName: "源",
            propVal: "img/liancang.jpg"
        });
    }
}