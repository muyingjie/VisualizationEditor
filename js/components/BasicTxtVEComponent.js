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
    if(!text){
        this.setControlItem({
            propLevel1: "aloneExec",
            propLevel2: "text",
            propName: "文本",
            propVal: "文本"
        })
    }
}