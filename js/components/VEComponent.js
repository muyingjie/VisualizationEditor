/**
 * Created by yj on 2016/11/3.
 */
var componentContainerClassName = "componentContainer";
//容器类，用于存放其他被拖过来的元件时加上该类，注意是被拖过来的元件，而不是元件本身自带的childComponents
var layoutContainerClassName = "layoutContainer";
//标识子元素
var childComponentClassName = "childComponent";
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
                paddingTop: {
                    propName: "内边距（上）",
                    propVal: "0",
                    interactiveStyle: "input_text"
                },
                paddingRight: {
                    propName: "内边距（右）",
                    propVal: "0",
                    interactiveStyle: "input_text"
                },
                paddingBottom: {
                    propName: "内边距（下）",
                    propVal: "0",
                    interactiveStyle: "input_text"
                },
                paddingLeft: {
                    propName: "内边距（左）",
                    propVal: "0",
                    interactiveStyle: "input_text"
                },
                borderTop: {
                    propName: "边框（上）",
                    propVal: "none",
                    interactiveStyle: "input_text"
                },
                borderRight: {
                    propName: "边框（右）",
                    propVal: "none",
                    interactiveStyle: "input_text"
                },
                borderBottom: {
                    propName: "边框（下）",
                    propVal: "none",
                    interactiveStyle: "input_text"
                },
                borderLeft: {
                    propName: "边框（左）",
                    propVal: "none",
                    interactiveStyle: "input_text"
                },
                borderRadius: {
                    propName: "边框圆角",
                    propVal: "0",
                    interactiveStyle: ""
                },
                marginTop: {
                    propName: "外边距（上）",
                    propVal: "0",
                    interactiveStyle: ""
                },
                marginRight: {
                    propName: "外边距（右）",
                    propVal: "0",
                    interactiveStyle: ""
                },
                marginBottom: {
                    propName: "外边距（下）",
                    propVal: "0",
                    interactiveStyle: ""
                },
                marginLeft: {
                    propName: "外边距（左）",
                    propVal: "0",
                    interactiveStyle: ""
                },
                // borderWidth: {
                //     propName: "边框宽度",
                //     propVal: "2px",
                //     interactiveStyle: "input_text"
                // },
                // borderStyle: {
                //     propName: "边框样式",
                //     propVal: "none",
                //     interactiveStyle: "select",
                //     interactiveVal: {
                //         "select": [
                //             {
                //                 showVal: "无",
                //                 propVal: "none"
                //             },
                //             {
                //                 showVal: "实线",
                //                 propVal: "solid"
                //             },
                //             {
                //                 showVal: "虚线",
                //                 propVal: "dashed"
                //             },
                //             {
                //                 showVal: "点线",
                //                 propVal: "dotted"
                //             }
                //         ]
                //     }
                // },
                // borderColor: {
                //     propName: "边框颜色",
                //     propVal: "#333",
                //     interactiveStyle: "input_text"
                // },
                backgroundColor: {
                    propName: "背景颜色",
                    propVal: "#eeeeff",
                    interactiveStyle: "input_text"
                },
                backgroundImage: {
                    propName: "背景图片",
                    propVal: "",
                    interactiveStyle: "input_text"
                },
                backgroundRepeat: {
                    propName: "背景平铺",
                    propVal: "no-repeat",
                    interactiveStyle: "select",
                    interactiveVal: {
                        "select": [
                            {
                                showVal: "不平铺",
                                propVal: "no-repeat"
                            },
                            {
                                showVal: "水平方向平铺",
                                propVal: "repeat-x"
                            },
                            {
                                showVal: "垂直方向平铺",
                                propVal: "repeat-y"
                            },
                            {
                                showVal: "平铺",
                                propVal: "repeat"
                            }
                        ]
                    }
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