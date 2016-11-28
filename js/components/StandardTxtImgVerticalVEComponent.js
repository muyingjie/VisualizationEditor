/**
 * Created by yj on 2016/11/12.
 */
function StandardTxtImgVerticalVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    StandardVEComponent.apply(this, args);

    this.setControlItem({
        propLevel1: "css",
        propLevel2: "height",
        propVal: ""
    });

    var oImgComponent = new BasicImgVEComponent({
        containerClassName: componentContainerClassName + " " + childComponentClassName
    });
    oImgComponent.setControlItem({
        propLevel1: "css",
        propLevel2: "position",
        propVal: "static"
    });
    var oTxtComponent = new BasicTxtVEComponent({
        containerClassName: componentContainerClassName + " " + childComponentClassName
    });
    oTxtComponent.setControlItem({
        propLevel1: "css",
        propLevel2: "position",
        propVal: "static"
    },{
        propLevel1: "css",
        propLevel2: "height",
        propVal: "20px"
    });
    this.childComponents = [oImgComponent, oTxtComponent];

}