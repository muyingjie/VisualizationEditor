/**
 * Created by yj on 2016/11/12.
 */
//页面组件父类
function BasicVEComponent(config) {
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    VEComponent.apply(this, args);

    // this.setControlItem({
    //     propLevel1: "css",
    //     propLevel2: "backgroundColor",
    //     propVal: "#ddd"
    // });
}