/**
 * Created by yj on 2016/11/3.
 */
function VEComponent(config){
    this.name = "";
    this.css = {
        width: config.width ? config.width : "100px",
        height: config.height ? config.height : "100px",
        left: config.left ? config.left : "100px",
        top: config.top ? config.top : "100px",
        border: config.border ? config.border : "2px solid #333"
    };
}
VEComponent.prototype.drag = function () {

};

function TxtVEComponent(config){
    var args = [].slice.call(arguments, 0);
    VEComponent.apply(this, args);

    this.attr = {
        text: config.text ? config.text : "文本"
    };
}

function ImgVEComponent(config){
    var args = [].slice.call(arguments, 0);
    VEComponent.apply(this, args);

    this.attr = {
        src: config.src ? config.src : ""
    };
}