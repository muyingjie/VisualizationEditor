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
    var $propList = $(".prop-list");
    var $stage = $(".stage");
    var isInStage = false;
    var $moveVirtualObj = null;

    getAllComponents();
    function getAllComponents(){
        var components = [{
            categoryId: "1",
            categoryName: "页面组件",
            components: [
                {
                    id: "1",
                    name: "图片",
                    constructorNamePrefix: "Img",
                    containerTagName: "div"
                },{
                    id: "4",
                    name: "文字",
                    constructorNamePrefix: "Txt",
                    containerTagName: "div"
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
                    name: "列表"
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
        renderAllCompontents(components);
    }

    function renderAllCompontents(components){
        var $widgetList = $(".widget-list");
        $.each(components, function (cateIndex, cateObj) {
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
                var containerTagName = comObj.containerTagName ? comObj.containerTagName : "";
                var componentName = comObj.name;
                $listCateItem.find(".list").append(
                    $("<li>").addClass("item il").append(
                        $("<a>").attr({
                            "href": "javascript:;",
                            "constructorName": constrName + "VEComponent",
                            "containerTagName": containerTagName,
                            "componentName": componentName
                        }).addClass("txt").html(comObj.name)
                    )
                );
            });
            var componentDragConfig = {
                $obj: $listCateItem.find(".list .txt"),
                onDown: function(){
                    $stage.on("mousemove.addComponent", function (e) {
                        dragRes.$moveVirtualObj.show();
                    });
                },
                onUp: function (obj) {
                    //鼠标不在中间设计面板stage中的话，直接退出
                    var $drag = obj.$downObj;
                    var e = obj.e;
                    var l = e.clientX - $stage.offset().left;
                    var t = e.clientY - $stage.offset().top;
                    var constructorName = $drag.attr("constructorName");
                    var containerTagName = $drag.attr("containerTagName");
                    var componentName = $drag.attr("componentName");
                    var constructorFn = window[constructorName];
                    //实例化的元件是动态的，通过附加在DOM上的属性来判断
                    var oComponent = new constructorFn();
                    oComponent.setComponentTxt(componentName);
                    var props = oComponent.getProperty();
                    console.log(props);
                    props.css.left.propVal = l + "px";
                    props.css.top.propVal = t + "px";
                    //渲染属性面板
                    renderPropsPanel(props);
                    //渲染设计面板
                    var $component = renderDesignPanel({
                        props: props,
                        containerTagName: containerTagName
                    });

                    $stage.off("mousemove.addComponent");
                },
                isNeedMoveVirtualDomObj: true,
                fnOperateMoveVirtualDomObj: function ($moveVirtualObj) {
                    $moveVirtualObj.html("拖动至此处");
                    $moveVirtualObj.hide();
                }
            };

            var dragRes = mDrag(componentDragConfig);
            $moveVirtualObj = dragRes.$moveVirtualObj;
        });
    }

    function renderPropsPanel(props) {
        $propList.html("");
        $.each(props, function (propCategoryName, propCategoryVal) {
            //此处重复代码较多，根据后期需求确定，待优化
            switch (propCategoryName){
                case "attr":
                    $.each(propCategoryVal, function (attrItemName, attrItem) {
                        var $propItem = addOneProp({
                            item: attrItem
                        });
                    });
                    break;
                case "css":
                    $.each(propCategoryVal, function (cssItemName, cssItem) {
                        var $propItem = addOneProp({
                            item: cssItem
                        });
                    });
                    break;
                case "aloneExec":
                    $.each(propCategoryVal, function (aloneExecName, aloneExecItem) {
                        var $propItem = addOneProp({
                            item: aloneExecItem
                        });
                    });
                case "otherAttrs":
                    $.each(propCategoryVal, function (otherItemName, otherItem) {
                        switch (otherItemName){
                            case "name":
                                var $propItem = addOneProp({
                                    item: otherItem
                                });
                                break;
                        }
                    });
                    break;
                default:

            }
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
        var $component = addOneComponent(config);
        return $component;
    }

    function addOneComponent(config){
        var props = config.props ? config.props : {};
        var containerTagName = config.containerTagName ? config.containerTagName : "div";
        var $componentContainer = $("<" + containerTagName + ">");
        $.each(props, function (propCategoryName, propCategoryVal) {
            switch (propCategoryName){
                case "attr":
                    $.each(propCategoryVal, function (attrItemName, attrItem) {
                        var attrArg = {};
                        attrArg[attrItemName] = attrItem.propVal;
                        $componentContainer.attr(attrArg);
                    });
                    break;
                case "css":
                    $.each(propCategoryVal, function (cssItemName, cssItem) {
                        var cssArg = {};
                        cssArg[cssItemName] = cssItem.propVal;
                        $componentContainer.css(cssArg);
                    });
                    break;
                case "aloneExec":
                    $.each(propCategoryVal, function (aloneExecName, aloneExecItem) {
                        $componentContainer[aloneExecName](aloneExecItem.propVal);
                    });
                case "otherAttrs":
                    $.each(propCategoryVal, function (otherItemName, otherItem) {
                        switch (otherItemName){
                            case "name":

                                break;
                        }
                    });
                    break;
                default:

            }
        });
        $stage.append($componentContainer);
        return $componentContainer;
    }
});