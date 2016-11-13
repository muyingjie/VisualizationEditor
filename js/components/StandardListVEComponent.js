/**
 * Created by yj on 2016/11/12.
 */
function StandardListVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    StandardVEComponent.apply(this, args);

    var _this = this;
    $.extend(true, this, {
        controlItems: {
            otherAttrs: {
                rowNum: {
                    propName: "行数",
                    propVal: 5,
                    onPropValChangeAfter: function (config) {
                        var e = config.e;
                        var changeVal = parseInt(config.changeVal);

                        addListItem();
                    }
                }
            },
            css: {
                width: {
                    propVal :"200px"
                },
                height: {
                    propVal: ""
                }
            }
        }
    });

    addListItem();
    function addListItem(){
        var rowNum = _this.controlItems.otherAttrs.rowNum.propVal;
        _this.childComponents = [];

        var txtComponentConfig = {
            containerClassName: componentContainerClassName + " " + childComponentClassName,
            controlItems: {
                css: {
                    width: {
                        propVal: "100%"
                    },
                    height: {
                        propVal: "40px"
                    },
                    position: {
                        propVal: "static"
                    }
                }
            }
        };
        var oChildComponent;
        for(var i=0;i<rowNum;i++){
            oChildComponent = new BasicTxtVEComponent(txtComponentConfig);
            _this.childComponents.push(oChildComponent);
        }
    }
}