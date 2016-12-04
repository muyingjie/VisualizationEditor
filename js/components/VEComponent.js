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
    var _this = this;
    var defaultConfig = {
        componentName: "组件名",
        containerClassName: componentContainerClassName,
        canDragToMove: true,
        canDragToScale: true,
        canDragToScaleChangeWidth: true,
        controlItems: {
            css: [
                {
                    groupName: "尺寸位置",
                    typeName: "size",
                    isShow: true,
                    groupItems: {
                        width: {
                            propName: "宽",
                            propVal: "50px",
                            classSize: "4",
                            interactiveStyle: "input_text"
                        },
                        height: {
                            propName: "高",
                            propVal: "30px",
                            classSize: "4",
                            interactiveStyle: "input_text"
                        },
                        left: {
                            propName: "X",
                            propVal: "0",
                            classSize: "4",
                            interactiveStyle: "input_text"
                        },
                        top: {
                            propName: "Y",
                            propVal: "0",
                            classSize: "4",
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
                            classSize: "4",
                            interactiveStyle: "input_text"
                        },
                        paddingRight: {
                            propName: "右",
                            propVal: "0",
                            classSize: "4",
                            interactiveStyle: "input_text"
                        },
                        paddingBottom: {
                            propName: "下",
                            propVal: "0",
                            classSize: "4",
                            interactiveStyle: "input_text"
                        },
                        paddingLeft: {
                            propName: "左",
                            propVal: "0",
                            classSize: "4",
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
                            classSize: "4",
                            interactiveStyle: "input_text"
                        },
                        marginRight: {
                            propName: "右",
                            propVal: "0",
                            classSize: "4",
                            interactiveStyle: "input_text"
                        },
                        marginBottom: {
                            propName: "下",
                            propVal: "0",
                            classSize: "4",
                            interactiveStyle: "input_text"
                        },
                        marginLeft: {
                            propName: "左",
                            propVal: "0",
                            classSize: "4",
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
                            classSize: "4",
                            interactiveStyle: "input_text"
                        },
                        borderRight: {
                            propName: "右",
                            propVal: "0",
                            classSize: "4",
                            interactiveStyle: "input_text"
                        },
                        borderBottom: {
                            propName: "下",
                            propVal: "0",
                            classSize: "4",
                            interactiveStyle: "input_text"
                        },
                        borderLeft: {
                            propName: "左",
                            propVal: "0",
                            classSize: "4",
                            interactiveStyle: "input_text"
                        },
                        borderSetStyle: {
                            propName: "设置方式",
                            propVal: "1",
                            classSize: "1",
                            interactiveStyle: "select",
                            interactiveVal: {
                                "select": [
                                    {
                                        showVal: "单独",
                                        propVal: "0"
                                    },
                                    {
                                        showVal: "整体",
                                        propVal: "1"
                                    }
                                ]
                            }
                        },
                        borderRadius: {
                            propName: "圆角",
                            propVal: "0",
                            classSize: "2",
                            interactiveStyle: "input_text"
                        },
                        borderWidth: {
                            propName: "线粗",
                            propVal: "1px",
                            classSize: "2",
                            interactiveStyle: "input_text"
                        },
                        borderStyle: {
                            propName: "样式",
                            propVal: "solid",
                            classSize: "2",
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
                            classSize: "2",
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
                            propVal: "#fff",
                            classSize: "2",
                            interactiveStyle: "input_text"
                        },
                        backgroundImage: {
                            propName: "图片",
                            propVal: "",
                            classSize: "2",
                            interactiveStyle: "input_text"
                        },
                        backgroundRepeat: {
                            propName: "平铺",
                            propVal: "no-repeat",
                            classSize: "2",
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
                            propVal: "",
                            classSize: "2"
                        }
                    }
                },
                {
                    groupName: "文字",
                    typeName: "font",
                    isShow: true,
                    groupItems: {
                        fontFamily: {
                            propName: "字体",
                            propVal: "微软雅黑",
                            classSize: "2"
                        },
                        fontSize: {
                            propName: "字号",
                            propVal: "12px",
                            classSize: "2"
                        },
                        lineHeight: {
                            propName: "行高",
                            propVal: "14px",
                            classSize: "2"
                        },
                        color: {
                            propName: "颜色",
                            propVal: "#f00",
                            classSize: "2"
                        },
                        textAlign: {
                            propName: "居中方式",
                            propVal: "center",
                            classSize: "1",
                            interactiveStyle: "select",
                            interactiveVal: {
                                "select": [
                                    {
                                        showVal: "左",
                                        propVal: "left"
                                    },
                                    {
                                        showVal: "中",
                                        propVal: "center"
                                    },
                                    {
                                        showVal: "右",
                                        propVal: "right"
                                    }
                                ]
                            }
                        }
                    }
                },
                {
                    groupName: "私有",
                    typeName: "private",
                    isShow: false,
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
                    isShow: false,
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
                    isShow: false,
                    groupItems: {
                        display: {
                            propName: "显示方式",
                            propVal: "block"
                        }
                    }
                },
                {
                    groupName: "盒模型类型",
                    typeName: "boxSizing",
                    isShow: false,
                    groupItems: {
                        boxSizing: {
                            propName: "盒模型类型",
                            propVal: "content-box"
                        }
                    }
                },
                {
                    groupName: "其他",
                    typeName: "other",
                    isShow: false,
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
                            propVal: "111",
                            isShow: false
                        }
                    }
                },
                {
                    groupName: "元件",
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
    //设置isShow默认为true
    $.each(this.controlItems, function (categoryName, categoryList) {
        $.each(categoryList, function (groupIndex, group) {
            if(group.isShow == undefined){
                group.isShow = true;
            }
            $.each(group.groupItems, function (name, attr) {
                if(attr.isShow == undefined){
                    attr.isShow = true;
                }
            });
        });
    });
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
                            setProp(config, oLevel2);
                        }
                    });
                });
            }
        });
        if(!isHaveCorrespondingProp){
            $.each(props[propLevel1], function (i, o) {
                //如果没有找到，就加到其他里面
                if(o.typeName == "other"){
                    setProp(config, o.groupItems[propLevel2] = {});
                }
            });
        }
    });
    function setProp(config, oLevel2){
        var propVal = config.propVal;
        var propName = config.propName;
        var isShow = config.isShow;
        var interactiveStyle = config.interactiveStyle;
        var interactiveVal = config.interactiveVal;
        var onPropValChangeAfter = config.onPropValChangeAfter;
        var onPropValCreateAfter = config.onPropValCreateAfter;
        //关联属性，点击交互方式会有
        var relatedProp = config.relatedProp;
        var onBtnClick = config.onBtnClick;
        var buttonTxt = config.buttonTxt;
        var classSize = config.classSize;

        oLevel2["propVal"] = (propVal != undefined) ? propVal : "";
        propName && (oLevel2["propName"] = propName);
        // isShow && (oLevel2["isShow"] = isShow);
        (isShow != undefined) && (oLevel2["isShow"] = isShow);
        interactiveStyle && (oLevel2["interactiveStyle"] = interactiveStyle);
        interactiveVal && (oLevel2["interactiveVal"] = interactiveVal);
        onPropValChangeAfter && (oLevel2["onPropValChangeAfter"] = onPropValChangeAfter);
        relatedProp && (oLevel2["relatedProp"] = relatedProp);
        onBtnClick && (oLevel2["onBtnClick"] = onBtnClick);
        onPropValCreateAfter && (oLevel2["onPropValCreateAfter"] = onPropValCreateAfter);
        buttonTxt && (oLevel2["buttonTxt"] = buttonTxt);
        //classSize不能用三目
        classSize && (oLevel2["classSize"] = classSize);
    }
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