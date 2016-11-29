/**
 * Created by yj on 2016/11/19.
 */
function ContainerPositionVEComponent(config){
    config = config ? config : {};
    $.extend(true, config, {
        containerClassName: componentContainerClassName + " " + layoutContainerClassName
    });
    var args = [].slice.call(arguments, 0);
    ContainerVEComponent.apply(this, args);


    this.setControlItem({
        propLevel1: "css",
        propLevel2: "width",
        propVal: "200px"
    },{
        propLevel1: "css",
        propLevel2: "height",
        propVal: "200px"
    });
}