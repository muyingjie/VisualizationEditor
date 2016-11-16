/**
 * Created by yj on 2016/11/12.
 */
function ContainerVerticalVEComponent(config){
    config = config ? config : {};
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
        propLevel1: "otherAttrs",
        propLevel2: "colNum",
        propName: "列数",
        propVal: 2
    });
    var veColumnConfig = {
        containerClassName: componentContainerClassName + " " + layoutContainerClassName + " " + childComponentClassName,
    };
    var colNum = this.getControlItem({
        propLevel1: "otherAttrs",
        propLevel2: "colNum"
    }).propVal;
    var oVEComponent;
    this.childComponents = [];
    for(var i=0;i<colNum;i++){
        oVEComponent = new VEComponent(veColumnConfig);
        oVEComponent.setControlItem({
            propLevel1: "css",
            propLevel2: "width",
            propVal: 1 / colNum * 100 + "%"
        },{
            propLevel1: "css",
            propLevel2: "height",
            propVal: "400px"
        },{
            propLevel1: "css",
            propLevel2: "position",
            propVal: "relative"
        });
        this.childComponents.push(oVEComponent);
    }
}