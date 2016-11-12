/**
 * Created by yj on 2016/11/3.
 */
var componentContainerClassName = "componentContainer";
//容器类，用于存放其他被拖过来的元件时加上该类，注意是被拖过来的元件，而不是元件本身自带的childComponents
var layoutContainerClassName = "layoutContainer";
VEComponent.curZIndex = 1;
function VEComponent(config){
    config = config ? config : {};
    var defaultConfig = {
        componentName: "组件名",
        containerClassName: componentContainerClassName,
        canDragToMove: true,
        canDragToScale: true,
        controlItems: {
            css: {
                width: {
                    propName: "CSS宽",
                    propVal: "100px",
                    interactiveStyle: "input_text"
                },
                height: {
                    propName: "CSS高",
                    propVal: "100px",
                    interactiveStyle: "input_text"
                },
                left: {
                    propName: "x坐标",
                    propVal: "0",
                    interactiveStyle: "input_text"
                },
                top: {
                    propName: "y坐标",
                    propVal: "0",
                    interactiveStyle: "input_text"
                },
                borderWidth: {
                    propName: "边框宽度",
                    propVal: "2px",
                    interactiveStyle: "input_text"
                },
                borderStyle: {
                    propName: "边框样式",
                    propVal: "solid",
                    interactiveStyle: "select",
                    interactiveVal: {
                        "select": [
                            {
                                showVal: "无",
                                propVal: "none"
                            },
                            {
                                showVal: "实线",
                                propVal: "solid"
                            },
                            {
                                showVal: "虚线",
                                propVal: "dashed"
                            },
                            {
                                showVal: "点线",
                                propVal: "dotted"
                            }
                        ]
                    }
                },
                borderColor: {
                    propName: "边框颜色",
                    propVal: "#333",
                    interactiveStyle: "input_text"
                },
                background: {
                    propName: "背景",
                    propVal: "#eeeeff",
                    interactiveStyle: "input_text"
                },
                position: {
                    propName: "定位",
                    propVal: "absolute",
                    interactiveStyle: "select",
                    interactiveVal: {
                        "select": [
                            {
                                showVal: "绝对定位",
                                propVal: "absolute"
                            },
                            {
                                showVal: "相对定位",
                                propVal: "relative"
                            },
                            {
                                showVal: "固定定位",
                                propVal: "fixed"
                            },
                            {
                                showVal: "无",
                                propVal: "static"
                            }
                        ]
                    }
                },
                padding: {
                    propName: "内边距",
                    propVal: "0"
                },
                zIndex: {
                    propName: "层级",
                    propVal: "1"
                }
            },
            attr: {},
            aloneExec: {},
            otherAttrs: {
                name : {
                    propName: "元件名称",
                    propVal: "111"
                }
            }
        },
        containerDOM: $("<div>")
    };
    $.extend(true, defaultConfig, config);
    $.extend(true, this, defaultConfig);
    this.init();
}
VEComponent.prototype.init = function () {
    this.containerDOM.addClass(this.containerClassName);
    //设置层级自增
    this.setControlItem({
        propLevel1: "css",
        propLevel2: "zIndex",
        propVal: VEComponent.curZIndex++
    });
};
VEComponent.prototype.setControlItem = function (config) {
    var propLevel1 = config.propLevel1;
    var propLevel2 = config.propLevel2;
    var propVal = config.propVal;
    if(!propLevel1 || !propLevel2){
        console.log("必须传入两级属性");
        return;
    }
    if(!this["controlItems"][propLevel1][propLevel2]){
        this["controlItems"][propLevel1][propLevel2] = {};
    }
    this["controlItems"][propLevel1][propLevel2]["propVal"] = propVal;
};
VEComponent.prototype.setPropConfig = function(){

};

function PageVEComponent(config) {
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    VEComponent.apply(this, args);

    this.controlItems.css.background.propVal = "#0ff";
}

function TxtVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    PageVEComponent.apply(this, args);

    //一定要在继承过来的对象上去扩展，切记不可覆盖继承来的对象
    var text = this.controlItems.aloneExec.text;
    if(!text){
        this.controlItems.aloneExec.text = {
            propName: "文本",
            propVal: "文本"
        };
    }
}

function ImgVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    PageVEComponent.apply(this, args);

    this.containerDOM = $("<img>");
    var src = this.controlItems.attr.src;
    if(!src){
        this.controlItems.attr.src = {
            propName: "源",
            propVal: "img/liancang.jpg"
        };
    }
}

function ListVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    VEComponent.apply(this, args);

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
        oChildComponent = new TxtVEComponent(txtComponentConfig);
        this.childComponents.push(oChildComponent);
    }
}

function TxtImgVerticalVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    VEComponent.apply(this, args);

    $.extend(true, this, {
        controlItems: {
            css: {
                height: {
                    propVal: ""
                }
            }
        }
    });

    var oImgComponent = new ImgVEComponent({
        controlItems: {
            css: {
                position: {
                    propVal: "static"
                }
            }
        }
    });
    var oTxtComponent = new TxtVEComponent({
        controlItems: {
            css: {
                position: {
                    propVal: "static"
                },
                height: {
                    propVal: "20px"
                }
            }
        }
    });
    this.childComponents = [oImgComponent, oTxtComponent];

}
function ContainerVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    VEComponent.apply(this, args);
}
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

//继承方法
inheritAllMethod();
function inheritAllMethod(){
    var constructors = [TxtVEComponent, ImgVEComponent, ListVEComponent, TxtImgVerticalVEComponent, VerticalContainerVEComponent];
    $.each(constructors, function (index, fnConstructor) {
        myj.inheritPrototype(fnConstructor, VEComponent);
    });
}