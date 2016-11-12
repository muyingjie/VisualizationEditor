/**
 * Created by yj on 2016/11/12.
 */
function ListStandardVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    StandardVEComponent.apply(this, args);

    $.extend(true, this, {
        controlItems: {
            otherAttrs: {
                rowNum: {
                    propName: "行数",
                    propVal: 5
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
    var rowNum = this.controlItems.otherAttrs.rowNum.propVal;
    this.childComponents = [];

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
        oChildComponent = new TxtBasicVEComponent(txtComponentConfig);
        this.childComponents.push(oChildComponent);
    }
}