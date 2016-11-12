/**
 * Created by yj on 2016/11/3.
 */
$(function () {
    var GLOBAL_ENUM = {
        COMPONENTS_CATEGORY: {
            PAGE: 1,
            STANDARD: 2,
            BUSINESS: 3
        }
    };
    //属性面板
    var $propList = $(".prop-list");
    //设计器主窗口
    var $stage = $(".stage");

    getAllComponentCategories();
    getAllContainerComponent();
    function getAllComponentCategories(){
        var componentCategories = [
            {
                categoryId: "1",
                categoryName: "页面组件",
                components: [
                    {
                        id: "1",
                        name: "图片",
                        constructorNamePrefix: "ImgBasic"
                    },{
                        id: "4",
                        name: "文字",
                        constructorNamePrefix: "TxtBasic"
                    },{
                        id: "2",
                        name: "视频"
                    },{
                        id: "3",
                        name: "音频"
                    }
                ]
            },{
                categoryId: "2",
                categoryName: "标准组件",
                components:[
                    {
                        id: "1",
                        name: "幻灯片",
                        constructorNamePrefix: "TxtImgVerticalStandard"
                    },{
                        id: "2",
                        name: "列表",
                        constructorNamePrefix: "ListStandard"
                    },{
                        id: "3",
                        name: "弹窗"
                    }
                ]
            },{
                categoryId: "3",
                categoryName: "业务组件",
                components:[
                    {
                        id: "1",
                        name: "购物车"
                    },{
                        id: "2",
                        name: "留言板"
                    }
                ]
            }
        ];
        renderAllCompontentCategories(componentCategories);
    }

    function getAllContainerComponent(){
        var containerComponents = [
            {
                containerId: "1",
                containerName: "两行"
            },{
                containerId: "2",
                containerName: "两列",
                constructorNamePrefix: "VerticalContainer"
            }
        ];
        renderAllContainerComponents(containerComponents);
    }

    function renderAllContainerComponents(containerComponents){
        var $wholeStyleList = $(".whole-style-list");
        $.each(containerComponents, function (containerIndex, containerObj) {
            var constrName = containerObj.constructorNamePrefix ? containerObj.constructorNamePrefix : "";
            var $containerChild = $("<a>").attr({"href":"javascript:;","constructorName": constrName + "VEComponent"}).html(containerObj.containerName);
            var $listContainerItem = $("<li>").addClass("item il").append(
                $containerChild
            );
            $wholeStyleList.append(
                $listContainerItem
            );
            //给每个类型的组件增加拖拽事件
            addDragEffectToComponentCategory({
                $componentCategoryObj: $containerChild
            });
        });
    }

    function renderAllCompontentCategories(componentCategories){
        var $widgetList = $(".widget-list");
        $.each(componentCategories, function (cateIndex, cateObj) {
            var $listCateItem = $("<div>").addClass("list-cate-item").append(
                $("<div>").addClass("name").html(cateObj.categoryName)
            ).append(
                $("<ul>").addClass("list il-par")
            );
            $widgetList.append(
                $listCateItem
            );
            $.each(cateObj.components, function (comIndex, comObj) {
                var constrName = comObj.constructorNamePrefix ? comObj.constructorNamePrefix : "";
                var $componentCategoryObj = $("<a>").attr({
                    "href": "javascript:;",
                    "constructorName": constrName + "VEComponent"
                }).addClass("txt").html(comObj.name);
                $listCateItem.find(".list").append(
                    $("<li>").addClass("item il").append(
                        $componentCategoryObj
                    )
                );
                //给每个类型的组件增加拖拽事件
                addDragEffectToComponentCategory({
                    $componentCategoryObj: $componentCategoryObj
                });
            });
        });
    }

    function addDragEffectToComponentCategory(config){
        var $componentCategoryObj = config.$componentCategoryObj ? config.$componentCategoryObj : null;
        if(!$componentCategoryObj){
            console.log("addDragEffectToComponentCategory:没有接受到拖动DOM对象");
            return;
        }
        //从down到move到up跟随鼠标出现的虚拟对象
        var $moveVirtualObj = null;
        //拖拽参数
        var componentCategoryDragConfig = {
            $obj: $componentCategoryObj,
            onDown: function(){
                $stage.on("mousemove.addComponent", function (e) {
                    $moveVirtualObj.show();
                });
            },
            onUp: function (obj) {
                //鼠标不在中间设计面板stage中的话，直接退出
                if(!myj.isInObj(obj.e, $stage)){
                    return;
                }
                var $drag = obj.$downObj;
                //构造函数名
                var constructorName = $drag.attr("constructorName");
                var constructorFn = window[constructorName];
                //实例化的元件是动态的，通过附加在DOM上的属性来判断
                var oComponent = new constructorFn({
                    componentName: "元件名"
                });

                //渲染设计面板
                renderDesignPanel({
                    instanceObj: oComponent,
                    e: obj.e,
                    $drag: $drag
                });

                var props = oComponent.controlItems;
                //渲染属性面板
                renderPropsPanel({
                    instanceObj: oComponent
                });

                $stage.off("mousemove.addComponent");
            },
            isNeedMoveVirtualDomObj: true,
            fnOperateMoveVirtualDomObj: function ($moveVirtualObj) {
                $moveVirtualObj.html("拖动至此处");
                $moveVirtualObj.hide();
            }
        };

        var oComponentCategoryDrag = new MyjDrag(componentCategoryDragConfig);
        $moveVirtualObj = oComponentCategoryDrag.$moveVirtualObj;
    }
    
    function addDragEffectToComponent(config){
        var oComponent = config.instanceObj;
        var $component = oComponent.containerDOM;
        var $parent = config.$parent;
        var disL;
        var disT;
        var stageL = $parent.offset().left;
        var stageT = $parent.offset().top;
        var stageW;
        var stageH;
        var magneticDistance = 10;
        var cursorDirection = "";
        var downX;
        var downY;
        var oldW;
        var oldH;
        var componentDragConfig = {
            $obj: $component,
            onDown: function (e) {
                var l = $component.offset().left;
                var t = $component.offset().top;
                disL = e.pageX - l;
                disT = e.pageY - t;

                //down的时候x和y的坐标拖拽改变大小时用
                downX = e.pageX;
                downY = e.pageY;

                oldW = $component.width();
                oldH = $component.height();

                stageW = $parent.width();
                stageH = $parent.height();
            },
            onMove: function (e) {
                var x = e.pageX;
                var y = e.pageY;
                var l = $component.offset().left;
                var t = $component.offset().top;
                var r = l + $component.width();
                var b = t + $component.height();
                var absL;
                var absT;
                var absW;
                var absH;
                switch (cursorDirection){
                    case "e":
                        absW = oldW + (x - downX);
                        break;
                    case "w":
                        absL = x - stageL - disL;
                        absW = oldW + (downX - x);
                        break;
                    case "s":
                        absH = oldH + (y - downY);
                        break;
                    case "n":
                        absT = y - stageT - disT;
                        absH = oldH + (downY - y);
                        break;
                    case "ne":
                        absT = y - stageT - disT;
                        absH = oldH + (downY - y);
                        absW = oldW + (x - downX);
                        break;
                    case "se":
                        absH = oldH + (y - downY);
                        absW = oldW + (x - downX);
                        break;
                    case "nw":
                        absT = y - stageT - disT;
                        absH = oldH + (downY - y);
                        absL = x - stageL - disL;
                        absW = oldW + (downX - x);
                        break;
                    case "sw":
                        absH = oldH + (y - downY);
                        absL = x - stageL - disL;
                        absW = oldW + (downX - x);
                        break;
                    default:
                        absL = x - stageL - disL;
                        absT = y - stageT - disT;
                        break;
                }

                //拖拽限制范围
                absW = (absW ? absW : oldW);
                absH = (absH ? absH : oldH);
                if(absL < 0){
                    absL = 0;
                }
                if(absT < 0){
                    absT = 0;
                }
                if(absL > stageW - absW){
                    absL = stageW - absW;
                }
                if(absT > stageH - absH){
                    absT = stageH - absH;
                }
                //通过判断对象身上有没有canDragToMove(是否允许拖动)和canDragToScale(是否允许拖拽改变大小)来有条件的改变被拖动的元素

                var canDragToMove = oComponent.canDragToMove;
                var canDragToScale = oComponent.canDragToScale;
                var needUpdateProps = {};
                if(canDragToMove){
                    $.extend(needUpdateProps, {
                        left: absL,
                        top: absT
                    });
                }
                if(canDragToScale){
                    $.extend(needUpdateProps, {
                        width: absW,
                        height: absH
                    });
                }
                var modifiedProps = [{
                    name: "css",
                    val: needUpdateProps
                }];

                componentBiDirectionalDataBinding({
                    modifiedProps: modifiedProps,
                    instanceObj: config.instanceObj
                });

                renderPropsPanel({
                    instanceObj: oComponent
                });
            },
            onComponentMove: function (e) {
                var x = e.pageX;
                var y = e.pageY;
                var l = $component.offset().left;
                var t = $component.offset().top;
                var r = l + $component.outerWidth();
                var b = t + $component.outerHeight();

                if(x - l > 0 && y - t > 0 && b - y > 0 && r - x > 0 && y - t > 0 && b - y > 0){
                    if(x - l < magneticDistance){
                        if(y - t < magneticDistance){
                            cursorDirection = "nw";
                        }else if(b - y < magneticDistance){
                            cursorDirection = "sw"
                        }else{
                            cursorDirection = "w";
                        }
                    }else if(r - x < magneticDistance){
                        if(y - t < magneticDistance){
                            cursorDirection = "ne";
                        }else if(b - y < magneticDistance){
                            cursorDirection = "se";
                        }else{
                            cursorDirection = "e";
                        }
                    }else if(y - t < magneticDistance){
                        cursorDirection = "n";
                    }else if(b - y < magneticDistance){
                        cursorDirection = "s";
                    }else{
                        cursorDirection = "";
                    }
                }
                $component.css({"cursor": cursorDirection ? cursorDirection + "-resize" :"move"});
            }
        };
        var oComponentDrag = new MyjDrag(componentDragConfig);
    }

    function componentBiDirectionalDataBinding(config){
        var modifiedProps = config.modifiedProps;
        var oComponent = config.instanceObj;
        var $component = oComponent.containerDOM;

        $.each(modifiedProps, function (index, prop) {
            var fnName = prop.name;
            $.each(prop.val, function (cssStyle, cssVal) {
                if(cssVal){
                    if(fnName == "aloneExec"){
                        $component[cssStyle](cssVal);
                    }else if(fnName == "css" || fnName == "attr"){
                        $component[fnName](cssStyle, cssVal);
                    }
                    oComponent.setControlItem({
                        propLevel1: prop.name,
                        propLevel2: cssStyle,
                        propVal: cssVal + "px"
                    });
                }
            });
        });
    }

    function renderPropsPanel(config) {
        var instanceObj = config.instanceObj;
        var childComponents = instanceObj.childComponents;
        //获取属性控制项
        var props = instanceObj.controlItems;
        var containerDOM = instanceObj.containerDOM;
        if(!containerDOM.hasClass("childComponent")){
            $propList.html("");
        }
        $propList.append(
            $("<h3>").html("元件")
        );
        $.each(props, function (propCategoryName, propCategoryVal) {
            $.each(propCategoryVal, function (attrItemName, attrItem) {
                var $propItem = addOneProp({
                    propFnName: propCategoryName,
                    propItemName: attrItemName,
                    item: attrItem,
                    containerDOM: containerDOM,
                    instanceObj: instanceObj
                });
            });
        });
        if(childComponents){
            $.each(childComponents, function (i, oChildComponent) {
                renderPropsPanel({
                    instanceObj: oChildComponent
                });
            });
        }
    }

    function addOneProp(config){
        var propFnName = config.propFnName;
        var propItemName = config.propItemName;
        var item = config.item ? config.item : {};
        var propName = item.propName ? item.propName : "";
        var propVal = item.propVal ? item.propVal : "";
        var interactiveStyle = item.interactiveStyle ? item.interactiveStyle : "input_text";
        var interactiveVal = item.interactiveVal ? item.interactiveVal : {};
        var onPropValChangeAfter = item.onPropValChangeAfter ? item.onPropValChangeAfter : $.noop;
        var $component = config.containerDOM;
        var oComponent = config.instanceObj;
        var $propItem;
        var $propValItem;

        switch (interactiveStyle){
            case "input_text":
                $propValItem = $("<input>").addClass("txt il").attr({"type":"text"}).val(propVal).on("input propertyChange", function(e){
                    execAfterChange({
                        e: e,
                        changeVal: $(this).val()
                    });
                });
                break;
            case "select":
                $propValItem = $("<select>");
                $.each(interactiveVal[interactiveStyle], function (i, o) {
                    $propValItem.append(
                        $("<option>").attr({"value": o.propVal}).html(o.showVal)
                    );
                });
                $propValItem.on("change", function (e) {
                    execAfterChange({
                        e: e,
                        changeVal: $(this).val()
                    });
                });
                if(propVal){
                    $propValItem.find("option[value=" + propVal + "]").prop({"selected": true});
                }
                break;
            default:
                throw new Error("未知的属性交互类型错误");
        }

        function execAfterChange(config){
            var needUpdateProps = {};
            needUpdateProps[propItemName] = config.changeVal;

            //修改实例化对象和DOM对象对应的属性或样式值
            componentBiDirectionalDataBinding({
                modifiedProps: [{
                    name: propFnName,
                    val: needUpdateProps
                }],
                instanceObj: oComponent
            });
            //执行外部传入的方法
            onPropValChangeAfter(config);
        }

        $propItem = $("<div>").addClass("item il-par").append(
            $("<span>").addClass("name ft12 il").html(propName)
        ).append(
            $propValItem
        );

        $propList.append(
            $propItem
        );

        return $propItem;
    }

    function renderDesignPanel(config){
        //刚刚被拖进来的DOM元素
        var $drag = config.$drag;
        var oComponent = config.instanceObj;
        var isLayoutComponent = ($drag.attr("constructorName").indexOf("Container") !== -1);
        var e = config.e;
        //向面板中添加元件，需要跟踪当前位置是在哪个加了layoutComponent的元素身上
        var $layoutComponent = $(".layoutContainer");
        //第一个元件拖上来的时候是没有带有layoutContainer类的元素的
        var $curContainer;
        //如果放手点处在所有容器元素中的一个，就存到$curContainer中
        $layoutComponent.each(function (i, layout) {
            var $layout = $(layout);
            if(myj.isInObj(e, $layout)){
                $curContainer = $layout;
            }
        });
        //首先判断拖进来的是容器组件还是其他组件
        if(isLayoutComponent){
            //容器组件的分支
            if(myj.isInObj(e, $stage)){
                //如果放手点在$stage里面
                $.extend(true, config, {
                    $parent: $stage
                });
            }
        }else{
            //页面组件、标准组件、业务组件的分支
            if($curContainer){
                //如果存在一个存放该类组件的容器组件（即类名中含有layoutContainer的组件）而且放手点也正好在这所有容器组件里面中的一个（其实就是$curContainer）
                $.extend(true, config, {
                    $parent: $curContainer
                });
                //初始化该组件的x和y坐标
                var l = e.pageX - $curContainer.offset().left;
                var t = e.pageY - $curContainer.offset().top;
                oComponent.setControlItem({
                    propLevel1: "css",
                    propLevel2: "left",
                    propVal: l
                });
                oComponent.setControlItem({
                    propLevel1: "css",
                    propLevel2: "top",
                    propVal: t
                });
            }else{
                return;
            }
        }

        addOneComponent(config);
        //给面板中的每个元件增加拖动事件
        addDragEffectToComponent(config);
        //给面板中的每个元件增加点击事件，点击时刷新右边属性列表
        updatePropsPanel(config);
    }

    function addOneComponent(config){
        var oComponent = config.instanceObj;
        if(!oComponent){
            console.error("addOneComponent:找不到实例化对象参数");
            return;
        }
        var props = oComponent.controlItems;
        if(!props){
            console.error("addOneComponent:找不到实例化对象下的props属性");
            return;
        }
        var $componentContainer = oComponent.containerDOM;

        renderComponentProps(config);

        //查看当前元件是否有子元件，如果有子元件，则给其增加属性
        var childDOMs = oComponent.childComponents;
        if(childDOMs){
            $.each(childDOMs, function (i, oChildComponent) {
                addOneComponent({
                    instanceObj: oChildComponent,
                    $parent: oComponent.containerDOM
                });
            });
        }
        var $parent = config.$parent;
        $parent.append($componentContainer);
        return $componentContainer;
    }

    function renderComponentProps(config){
        var oComponent = config.instanceObj;
        var props = oComponent.controlItems;
        var $componentContainer = oComponent.containerDOM;
        $.each(props, function (propCategoryName, propCategoryVal) {
            if(propCategoryName == "attr" || propCategoryName == "css"){
                $.each(propCategoryVal, function (attrItemName, attrItem) {
                    var attrArg = {};
                    attrArg[attrItemName] = attrItem.propVal;
                    $componentContainer[propCategoryName](attrArg);
                });
            }else if(propCategoryName == "aloneExec"){
                $.each(propCategoryVal, function (aloneExecName, aloneExecItem) {
                    $componentContainer[aloneExecName](aloneExecItem.propVal);
                });
            }else if(propCategoryName == "otherAttrs"){
                $.each(propCategoryVal, function (otherItemName, otherItem) {
                    switch (otherItemName){
                        case "name":
                            //对于元件名字的处理
                            break;
                    }
                });
            }else{
                console.error("未处理的控制属性类型");
            }
        });
    }

    function updatePropsPanel(config){
        var oComponent = config.instanceObj;
        var $component = oComponent.containerDOM;
        var $parent = config.$parent;
        $component.click(function(e){
            //将原来的元素移除
            $(".active-component-frame").remove();
            //活动元件的层级
            var curComponentZIndex = oComponent.controlItems.css.zIndex.propVal;
            var $activeComponentFrame = $("<div>").addClass("active-component-frame");
            $parent.append(
                $activeComponentFrame
            );
            //渲染属性面板
            renderPropsPanel(config);
            //当前选中项高亮显示
            //设置其层级为比当前活动元件低的一个等级
            $activeComponentFrame.css({"zIndex": --curComponentZIndex});

            var l = parseInt($component.css("left")) - 1 + "px";
            var t = parseInt($component.css("top")) - 1 + "px";
            var w = $component.outerWidth();
            var h = $component.outerHeight();
            var curObjPositionVal = oComponent.controlItems.css.position.propVal;
            $activeComponentFrame.css({left:l, top:t, width: w,height: h});
            e.stopPropagation();
        });
    }
});