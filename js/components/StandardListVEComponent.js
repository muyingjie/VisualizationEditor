/**
 * Created by yj on 2016/11/12.
 */
function StandardListVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    StandardVEComponent.apply(this, args);

    var _this = this;
    _this.setControlItem({
        propLevel1: "otherAttrs",
        propLevel2: "rowNum",
        propName: "行数",
        propVal: 1,
        isShow: false
    }, {
        propLevel1: "otherAttrs",
        propLevel2: "add",
        propName: "添加",
        propVal: "添加一行",
        interactiveStyle: "input_button",
        relatedProp: "rowNum",
        isShow: true,
        onBtnClick: function () {
            var curRowNum = _this.getControlItem({
                propLevel1: "otherAttrs",
                propLevel2: "rowNum"
            }).propVal;
            curRowNum++;
            _this.setControlItem({
                propLevel1: "otherAttrs",
                propLevel2: "rowNum",
                propVal: curRowNum
            });
        },
        onPropValChangeAfter: function (config) {
            var $component = _this.containerDOM;
            var $componentChilds = $component.children();
            var oLastComponentChild = $componentChilds[$componentChilds.length - 1];
            console.log(oLastComponentChild);
            // for(var i=0;i<config.changeVal;i++){
                $component.append(
                    $(oLastComponentChild).clone(true)
                );
            // }
        }
    }, {
        propLevel1: "css",
        propLevel2: "width",
        propVal: "200px"
    }, {
        propLevel1: "css",
        propLevel2: "height",
        propVal: ""
    }, {
        propLevel1: "css",
        propLevel2: "paddingLeft",
        propVal: "10px"
    }, {
        propLevel1: "css",
        propLevel2: "paddingRight",
        propVal: "10px"
    }, {
        propLevel1: "css",
        propLevel2: "paddingTop",
        propVal: "10px"
    }, {
        propLevel1: "css",
        propLevel2: "paddingBottom",
        propVal: "10px"
    });

    addListItem();
    function addListItem(){
        var rowNum = _this.getControlItem({
            propLevel1: "otherAttrs",
            propLevel2: "rowNum"
        }).propVal;
        _this.childComponents = [];

        var ContainerPositionComponentConfig = {
            containerClassName: componentContainerClassName + " " + layoutContainerClassName + " " + childComponentClassName
        };
        var oChildComponent;
        for(var i=0;i<rowNum;i++){
            oChildComponent = new ContainerPositionVEComponent(ContainerPositionComponentConfig);
            oChildComponent.setControlItem({
                propLevel1: "css",
                propLevel2: "width",
                propVal: "100%"
            },{
                propLevel1: "css",
                propLevel2: "height",
                propVal: "40px"
            },{
                propLevel1: "css",
                propLevel2: "position",
                propVal: "relative"
            });
            _this.childComponents.push(oChildComponent);
        }
    }
}