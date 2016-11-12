/**
 * Created by yj on 2016/11/12.
 */
function ImgBasicVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    BasicVEComponent.apply(this, args);

    this.containerDOM = $("<img>");
    var src = this.controlItems.attr.src;
    if(!src){
        this.controlItems.attr.src = {
            propName: "源",
            propVal: "img/liancang.jpg"
        };
    }
}