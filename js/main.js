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
    //当前编辑元素高亮窗口
    var $activeComponentFrame = $stage.find(".active-component-frame");

    getAllComponentCategories();
    function getAllComponentCategories(){
        var componentCategories = [{
            categoryId: "1",
            categoryName: "页面组件",
            components: [
                {
                    id: "1",
                    name: "图片",
                    constructorNamePrefix: "Img"
                },{
                    id: "4",
                    name: "文字",
                    constructorNamePrefix: "Txt"
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
                    name: "幻灯片"
                },{
                    id: "2",
                    name: "列表",
                    constructorNamePrefix: "List"
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
        }];
        renderAllCompontentCategories(componentCategories);
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

                var constructorName = $drag.attr("constructorName");
                var constructorFn = window[constructorName];
                //实例化的元件是动态的，通过附加在DOM上的属性来判断
                var oComponent = new constructorFn({
                    componentName: "元件名"
                });

                var props = oComponent.controlItems;
                console.log(props);
                //初始化元件坐标
                var e = obj.e;
                var l = e.pageX - $stage.offset().left;
                var t = e.pageY - $stage.offset().top;
                props.css.left.propVal = l + "px";
                props.css.top.propVal = t + "px";
                //渲染属性面板
                renderPropsPanel({
                    instanceObj: oComponent
                });
                //渲染设计面板
                renderDesignPanel({
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
        var disL;
        var disT;
        var stageL = $stage.offset().left;
        var stageT = $stage.offset().top;
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
                        absL = e.pageX - stageL - disL;
                        absT = e.pageY - stageT - disT;
                        break;
                }

                var modifiedProps = [{
                    name: "css",
                    val: {
                        left: absL,
                        top: absT,
                        width: absW,
                        height: absH
                    }
                }];

                $.each(modifiedProps, function (index, prop) {
                    $.each(prop.val, function (cssStyle, cssVal) {
                        if(cssVal){
                            $component[prop.name](cssStyle, cssVal);
                            oComponent.setControlItem({
                                propLevel1: prop.name,
                                propLevel2: cssStyle,
                                propVal: cssVal + "px"
                            });
                        }
                    });
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
                $component.css({"cursor": cursorDirection ? cursorDirection + "-resize" :"move"});
            }
        };
        var oComponentDrag = new MyjDrag(componentDragConfig);
    }

    function renderPropsPanel(config) {
        var instanceObj = config.instanceObj;
        //获取属性控制项
        var props = instanceObj.controlItems;
        $propList.html("");
        $.each(props, function (propCategoryName, propCategoryVal) {
            $.each(propCategoryVal, function (attrItemName, attrItem) {
                var $propItem = addOneProp({
                    item: attrItem
                });
            });
        });
    }

    function addOneProp(config){
        var item = config.item ? config.item : {};
        var propName = item.propName ? item.propName : "";
        var propVal = item.propVal ? item.propVal : "";

        var $propItem = $("<div>").addClass("item il-par").append(
            $("<span>").addClass("name ft12 il").html(propName)
        ).append(
            $("<input>").addClass("txt il").attr({"type":"text"}).val(propVal)
        );
        $propList.append(
            $propItem
        );

        return $propItem;
    }

    function renderDesignPanel(config){
        //向面板中添加元件
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
        $stage.append($componentContainer);
        return $componentContainer;
    }

    function updatePropsPanel(config){
        var oComponent = config.instanceObj;
        var $component = oComponent.containerDOM;
        $component.click(function(){
            //渲染属性面板
            renderPropsPanel(config);
            //当前选中项高亮显示
            //首先需要先让外框显示出来
            $activeComponentFrame.show();
            var l = parseInt($component.css("left")) - 1 + "px";
            var t = parseInt($component.css("top")) - 1 + "px";
            var w = $component.outerWidth();
            var h = $component.outerHeight();
            $activeComponentFrame.css({left:l, top:t, width: w,height: h});
        });
    }
});