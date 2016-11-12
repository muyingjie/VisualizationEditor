/**
 * Created by yj on 2016/11/12.
 */
function VerticalContainerVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    ContainerVEComponent.apply(this, args);

    $.extend(true, this, {
        canDragToMove: false,
        canDragToScale: false,
        controlItems: {
            css: {
                width: {
                    propVal: "100%"
                },
                height: {
                    propVal: ""
                },
                position: {
                    propVal: ""
                }
            },
            otherAttrs: {
                colNum: {
                    propName: "列数",
                    propVal: 2
                }
            }
        }
    });
    var veColumnConfig = {
        containerClassName: componentContainerClassName + " " + layoutContainerClassName,
        controlItems: {
            css: {
                width: {
                    propVal: "50%"
                },
                height: {
                    propVal: "400px"
                },
                border: {
                    propVal: "1px solid #000"
                },
                boxSizing: {
                    propName: "盒模型类型",
                    propVal: "border-box"
                },
                display: {
                    propName: "元素类型",
                    propVal: "inline-block"
                },
                verticalAlign: {
                    propName: "垂直布局方式",
                    propVal: "top"
                },
                position: {
                    propVal: "relative"
                }
            }
        }
    };
    var colNum = this.controlItems.otherAttrs.colNum.propVal;
    var oVEComponent;
    this.childComponents = [];
    for(var i=0;i<colNum;i++){
        oVEComponent = new VEComponent(veColumnConfig);
        this.childComponents.push(oVEComponent);
    }
}