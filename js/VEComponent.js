/**
 * Created by yj on 2016/11/3.
 */
function VEComponent(config){
    config = config ? config : {};
    var defaultConfig = {
        componentName: "组件名",
        containerClassName: "componentContainer",
        controlItems: {
            css: {
                width: {
                    propName: "CSS宽",
                    propVal: "100px"
                },
                height: {
                    propName: "CSS高",
                    propVal: "100px"
                },
                left: {
                    propName: "x坐标",
                    propVal: "100px"
                },
                top: {
                    propName: "y坐标",
                    propVal: "100px"
                },
                border: {
                    propName: "边框",
                    propVal: "none"
                },
                background: {
                    propName: "背景",
                    propVal: "#eeeeff"
                },
                position: {
                    propName: "定位",
                    propVal: "absolute"
                },
                padding: {
                    propName: "内边距",
                    propVal: "0"
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
};
VEComponent.prototype.setControlItem = function (config) {
    var propLevel1 = config.propLevel1;
    var propLevel2 = config.propLevel2;
    var propVal = config.propVal;
    if(!propLevel1 || !propLevel2){
        console.log("必须传入两级属性");
        return;
    }
    this["controlItems"][propLevel1][propLevel2]["propVal"] = propVal;
};

function TxtVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    VEComponent.apply(this, args);

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
    VEComponent.apply(this, args);

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

//继承方法
inheritAllMethod();
function inheritAllMethod(){
    var constructors = [TxtVEComponent, ImgVEComponent, ListVEComponent, TxtImgVerticalVEComponent];
    $.each(constructors, function (index, fnConstructor) {
        myj.inheritPrototype(fnConstructor, VEComponent);
    });
}