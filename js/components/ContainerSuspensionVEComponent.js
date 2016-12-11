/**
 * Created by yj on 2016/12/11.
 */
/**
 * Created by yj on 2016/11/19.
 */
function ContainerSuspensionVEComponent(config){
    config = config ? config : {};
    $.extend(true, config, {
        containerClassName: componentContainerClassName + " " + layoutContainerClassName
    });
    var args = [].slice.call(arguments, 0);
    ContainerVEComponent.apply(this, args);


    this.setControlItem({
        propLevel1: "css",
        propLevel2: "width",
        propVal: "100%"
    },{
        propLevel1: "css",
        propLevel2: "height",
        propVal: "30px"
    },{
        propLevel1: "css",
        propLevel2: "background-color",
        propVal: "#ccc"
    },{
        propLevel1: "css",
        propLevel2: "border-width",
        propVal: "0"
    });
}