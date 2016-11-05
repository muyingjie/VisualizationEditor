/**
 * Created by yj on 2016/11/3.
 */
function VEComponent(config){
    config = config ? config : {};
    this.componentName = "组件名";
    this.containerClassName = "componentContainer";
    //属性面板中可以控制的部分
    this.controlItems = {
        css: {
            width: {
                propName: "CSS宽",
                propVal: config.width ? config.width : "100px"
            },
            height: {
                propName: "CSS高",
                propVal: config.height ? config.height : "100px"
            },
            left: {
                propName: "x坐标",
                propVal: config.left ? config.left : "100px"
            },
            top: {
                propName: "y坐标",
                propVal: config.top ? config.top : "100px"
            },
            border: {
                propName: "边框",
                propVal: config.border ? config.border : "none"
            },
            background: {
                propName: "背景",
                propVal: config.background ? config.background : "#eeeeff"
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
        otherAttrs: {
            name : {
                propName: "元件名称",
                propVal: "111"
            }
        },
        aloneExec: {}
    };
    this.containerDOM = $("<div>");
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
    this.controlItems.aloneExec.text = {
        propName: "文本",
        propVal: config.text ? config.text : "文本"
    };
}

function ImgVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    VEComponent.apply(this, args);

    this.containerDOM = $("<img>");
    this.controlItems.attr.src = {
        propName: "源",
        propVal: config.src ? config.src : "img/liancang.jpg"
    };
}

function ListVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    VEComponent.apply(this, args);
}

//继承方法
inheritAllMethod();
function inheritAllMethod(){
    var constructors = [TxtVEComponent, ImgVEComponent, ListVEComponent];
    $.each(constructors, function (index, fnConstructor) {
        myj.inheritPrototype(fnConstructor, VEComponent);
    });
}