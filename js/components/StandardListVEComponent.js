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
        propVal: 5,
        onPropValChangeAfter: function (config) {
            var e = config.e;
            var changeVal = parseInt(config.changeVal);

            addListItem();
        }
    }, {
        propLevel1: "css",
        propLevel2: "width",
        propVal: "200px"
    }, {
        propLevel1: "css",
        propLevel2: "height",
        propVal: ""
    });

    addListItem();
    function addListItem(){
        var rowNum = _this.getControlItem({
            propLevel1: "otherAttrs",
            propLevel2: "rowNum"
        }).propVal;
        _this.childComponents = [];

        var txtComponentConfig = {
            containerClassName: componentContainerClassName + " " + childComponentClassName
        };
        var oChildComponent;
        for(var i=0;i<rowNum;i++){
            oChildComponent = new BasicTxtVEComponent(txtComponentConfig);
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
                propVal: "static"
            });
            _this.childComponents.push(oChildComponent);
        }
    }
}