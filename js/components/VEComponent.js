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
            css: [
                {
                    groupName: "尺寸位置",
                    typeName: "size",
                    isShow: true,
                    groupItems: {
                        width: {
                            propName: "宽",
                            propVal: "100px",
                            interactiveStyle: "input_text"
                        },
                        height: {
                            propName: "高",
                            propVal: "100px",
                            interactiveStyle: "input_text"
                        },
                        left: {
                            propName: "X轴",
                            propVal: "0",
                            interactiveStyle: "input_text"
                        },
                        top: {
                            propName: "Y轴",
                            propVal: "0",
                            interactiveStyle: "input_text"
                        }
                    }
                },
                {
                    groupName: "内边距",
                    typeName: "padding",
                    isShow: true,
                    groupItems: {
                        paddingTop: {
                            propName: "上",
                            propVal: "0",
                            interactiveStyle: "input_text"
                        },
                        paddingRight: {
                            propName: "右",
                            propVal: "0",
                            interactiveStyle: "input_text"
                        },
                        paddingBottom: {
                            propName: "下",
                            propVal: "0",
                            interactiveStyle: "input_text"
                        },
                        paddingLeft: {
                            propName: "左",
                            propVal: "0",
                            interactiveStyle: "input_text"
                        }
                    }
                },
                {
                    groupName: "外边距",
                    typeName: "margin",
                    isShow: true,
                    groupItems: {
                        marginTop: {
                            propName: "上",
                            propVal: "0",
                            interactiveStyle: "input_text"
                        },
                        marginRight: {
                            propName: "右",
                            propVal: "0",
                            interactiveStyle: "input_text"
                        },
                        marginBottom: {
                            propName: "下",
                            propVal: "0",
                            interactiveStyle: "input_text"
                        },
                        marginLeft: {
                            propName: "左",
                            propVal: "0",
                            interactiveStyle: "input_text"
                        }
                    }
                },
                {
                    groupName: "边框",
                    typeName: "border",
                    isShow: true,
                    groupItems: {
                        borderTop: {
                            propName: "上",
                            propVal: "0",
                            interactiveStyle: "input_text"
                        },
                        borderRight: {
                            propName: "右",
                            propVal: "0",
                            interactiveStyle: "input_text"
                        },
                        borderBottom: {
                            propName: "下",
                            propVal: "0",
                            interactiveStyle: "input_text"
                        },
                        borderLeft: {
                            propName: "左",
                            propVal: "0",
                            interactiveStyle: "input_text"
                        },
                        borderRadius: {
                            propName: "圆角",
                            propVal: "0",
                            interactiveStyle: ""
                        },
                        borderWidth: {
                            propName: "线粗",
                            propVal: "2px",
                            interactiveStyle: "input_text"
                        },
                        borderStyle: {
                            propName: "样式",
                            propVal: "none",
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
                            propName: "颜色",
                            propVal: "#333",
                            interactiveStyle: "input_text"
                        }
                    }
                },
                {
                    groupName: "背景",
                    typeName: "bg",
                    isShow: true,
                    groupItems: {
                        backgroundColor: {
                            propName: "颜色",
                            propVal: "#eeeeff",
                            interactiveStyle: "input_text"
                        },
                        backgroundImage: {
                            propName: "图片",
                            propVal: "",
                            interactiveStyle: "input_text"
                        },
                        backgroundRepeat: {
                            propName: "平铺",
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
                        backgroundPosition: {
                            propName: "坐标",
                            propVal: ""
                        }
                    }
                },
                {
                    groupName: "私有",
                    typeName: "private",
                    isShow: true,
                    groupItems: {
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
                        }
                    }
                },
                {
                    groupName: "层级",
                    typeName: "zIndex",
                    isShow: true,
                    groupItems: {
                        zIndex: {
                            propName: "层级",
                            propVal: "1"
                        }
                    }
                },
                {
                    groupName: "显示方式",
                    typeName: "display",
                    isShow: true,
                    groupItems: {
                        display: {
                            propName: "显示方式",
                            propVal: "block"
                        }
                    }
                },
                {
                    groupName: "其他",
                    typeName: "other",
                    isShow: true,
                    groupItems: {}
                }
            ],
            attr: [
                {
                    groupName: "其他",
                    typeName: "other",
                    isShow: true,
                    groupItems: {}
                }
            ],
            aloneExec: [
                {
                    groupName: "其他",
                    typeName: "other",
                    isShow: true,
                    groupItems: {}
                }
            ],
            otherAttrs: [
                {
                    groupName: "自定义",
                    typeName: "self",
                    isShow: true,
                    groupItems: {
                        name: {
                            propName: "元件名称",
                            propVal: "111"
                        }
                    }
                },
                {
                    groupName: "其他",
                    typeName: "other",
                    isShow: true,
                    groupItems: {}
                }
            ]
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
VEComponent.prototype.setControlItem = function () {
    var args = [].slice.call(arguments);
    var _this = this;
    $.each(args, function (i, config) {
        var propLevel1 = config.propLevel1;
        var propLevel2 = config.propLevel2;
        var propVal = config.propVal;
        var propName = config.propName;
        var isShow = config.isShow;
        var interactiveStyle = config.interactiveStyle;
        var interactiveVal = config.interactiveVal;
        var onPropValChangeAfter = config.onPropValChangeAfter;
        var props = _this.controlItems;
        var isHaveCorrespondingProp = false;
        var otherAttrs = props["otherAttrs"];
        if(!propLevel1 || !propLevel2){
            console.log("必须传入两级属性");
            return;
        }
        $.each(props, function (propCategoryName, propCategoryVal) {
            if(propCategoryName == propLevel1){
                $.each(propCategoryVal, function (propCategoryGroupIndex, propCategoryGroup) {
                    $.each(propCategoryGroup.groupItems, function (attrItemName, attrItem) {
                        var oLevel2 = attrItem;
                        if(attrItemName == propLevel2){
                            isHaveCorrespondingProp = true;
                            oLevel2["propVal"] = propVal;
                            propName && (oLevel2["propName"] = propName);
                            isShow && (oLevel2["isShow"] = isShow);
                            interactiveStyle && (oLevel2["interactiveStyle"] = interactiveStyle);
                            interactiveVal && (oLevel2["interactiveVal"] = interactiveVal);
                            onPropValChangeAfter && (oLevel2["onPropValChangeAfter"] = onPropValChangeAfter);
                        }
                    });
                });
            }
        });
        if(!isHaveCorrespondingProp){
            $.each(props[propLevel1], function (i, o) {
                //如果没有找到，就加到其他里面
                if(o.typeName == "other"){
                    o.groupItems[propLevel2] = {
                        propName: propName,
                        propVal: propVal
                    };
                }
            });
        }
    });
};
VEComponent.prototype.getControlItem = function (config) {
    var propLevel1 = config.propLevel1;
    var propLevel2 = config.propLevel2;
    var props = this.controlItems;
    var resVal;
    if(!propLevel1 || !propLevel2){
        console.log("必须传入两级属性");
        return;
    }
    $.each(props, function (propCategoryName, propCategoryVal) {
        if(propCategoryName == propLevel1){
            $.each(propCategoryVal, function (propCategoryGroupIndex, propCategoryGroup) {
                var groupItems = propCategoryGroup.groupItems;
                $.each(groupItems, function (attr, oProp) {
                    if(attr == propLevel2){
                        resVal = oProp;
                    }
                });
            });
        }
    });
    return resVal ? resVal : {};
};