/**
 * Created by yj on 2016/11/12.
 */
function ContainerVerticalVEComponent(config){
    config = config ? config : {};
    $.extend(true, config, {
        containerClassName: componentContainerClassName + " " + layoutContainerClassName
    });
    var args = [].slice.call(arguments, 0);
    ContainerVEComponent.apply(this, args);

    $.extend(true, this, {
        canDragToMove: false,
        canDragToScale: false
    });
    this.setControlItem({
        propLevel1: "css",
        propLevel2: "width",
        propVal: "100%"
    },{
        propLevel1: "css",
        propLevel2: "height",
        propVal: ""
    },{
        propLevel1: "css",
        propLevel2: "position",
        propVal: ""
    },{
        propLevel1: "css",
        propLevel2: "paddingTop",
        propVal: "10px"
    },{
        propLevel1: "css",
        propLevel2: "paddingRight",
        propVal: "10px"
    },{
        propLevel1: "css",
        propLevel2: "paddingBottom",
        propVal: "10px"
    },{
        propLevel1: "css",
        propLevel2: "paddingLeft",
        propVal: "10px"
    },{
        propLevel1: "css",
        propLevel2: "boxSizing",
        propVal: "border-box"
    },{
        propLevel1: "otherAttrs",
        propLevel2: "colNum",
        propName: "列数",
        propVal: 1
    });
    // var veColumnConfig = {
    //     containerClassName: componentContainerClassName + " " + layoutContainerClassName + " " + childComponentClassName,
    // };
    // var colNum = this.getControlItem({
    //     propLevel1: "otherAttrs",
    //     propLevel2: "colNum"
    // }).propVal;
    // var oVEComponent;
    // this.childComponents = [];
    // for(var i=0;i<colNum;i++){
    //     oVEComponent = new VEComponent(veColumnConfig);
    //     oVEComponent.setControlItem({
    //         propLevel1: "css",
    //         propLevel2: "width",
    //         propVal: 1 / colNum * 100 + "%"
    //     },{
    //         propLevel1: "css",
    //         propLevel2: "height",
    //         propVal: "400px"
    //     },{
    //         propLevel1: "css",
    //         propLevel2: "position",
    //         propVal: "relative"
    //     },{
    //         propLevel1: "css",
    //         propLevel2: "display",
    //         propVal: "inline-block"
    //     },{
    //         propLevel1: "css",
    //         propLevel2: "backgroundColor",
    //         propVal: "#eeeeff"
    //     },{
    //         propLevel1: "css",
    //         propLevel2: "boxSizing",
    //         propVal: "border-box"
    //     });
    //     this.childComponents.push(oVEComponent);
    // }
}