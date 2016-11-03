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
    var componentDragConfig = {
        onDown: function(){},
        onUp: function (obj) {
            var oTxt = new TxtVEComponent();
        }
    };

    getAllComponents();
    function getAllComponents(){
        var components = [{
            categoryId: "1",
            categoryName: "页面组件",
            components: [
                {
                    id: "1",
                    name: "图片"
                },{
                    id: "1",
                    name: "文字"
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
                $listCateItem.find(".list").append(
                    $("<li>").addClass("item il").append(
                        $("<a>").attr({"href":"javascript:;"}).addClass("txt").html(comObj.name)
                    )
                );
            });
        });
    }


});