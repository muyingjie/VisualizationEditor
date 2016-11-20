/**
 * Created by yj on 2016/11/12.
 */
function BasicTxtVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    BasicVEComponent.apply(this, args);

    //一定要在继承过来的对象上去扩展，切记不可覆盖继承来的对象
    var text = this.getControlItem({
        propLevel1: "aloneExec",
        propLevel2: "text"
    });
    if(!text.propVal){
        this.setControlItem({
            propLevel1: "aloneExec",
            propLevel2: "text",
            propName: "文本",
            propVal: "文本",
            isShow: true
        })
    }
    //文本元件特有属性
    this.setControlItem({
        propLevel1: "otherAttrs",
        propLevel2: "clickEvent",
        propName: "点击事件",
        classSize: "2"
    },{
        propLevel1: "otherAttrs",
        propLevel2: "componentAssignment",
        propName: "元件赋值",
        classSize: "2"
    });
}