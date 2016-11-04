/**
 * Created by yj on 2016/11/3.
 */
function VEComponent(config){
    config = config ? config : {};
    this.css = {
        width: {
            propName: "宽度",
            propVal: config.width ? config.width : "100px"
        },
        height: {
            propName: "高度",
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
            propVal: config.border ? config.border : "2px solid #333"
        },
        position: {
            propName: "定位",
            propVal: "absolute"
        }
    };
    this.otherAttrs = {
        name : {
            propName: "元件名称",
            propVal: "111"
        }
    };
    //临时测试用
    this.aloneExec = {
        text: {
            propName: "文本",
            propVal: config.text ? config.text : "文本"
        }
    };
}
VEComponent.prototype.getProperty = function () {
    var res = {};
    $.each(this, function (attr, val) {
        if(!$.isFunction(val)){
            res[attr] = val;
        }
    });
    return res;
};
VEComponent.prototype.setComponentTxt = function (txt) {
    this.aloneExec.text.propName = "文本";
    this.aloneExec.text.propVal = txt;
};
VEComponent.prototype.drag = function (config) {
    mDrag(config);
};

function TxtVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    VEComponent.apply(this, args);

    this.aloneExec = {
        text: {
            propName: "文本",
            propVal: config.text ? config.text : "文本"
        }
    };
}
myj.inheritPrototype(TxtVEComponent, VEComponent);

function ImgVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    VEComponent.apply(this, args);

    this.attr = {
        src: {
            propName: "源",
            propVal: config.src ? config.src : ""
        }
    };
}
myj.inheritPrototype(ImgVEComponent, VEComponent);
