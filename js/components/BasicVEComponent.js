/**
 * Created by yj on 2016/11/12.
 */
//页面组件父类
function BasicVEComponent(config) {
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    VEComponent.apply(this, args);

    this.controlItems.css.backgroundColor.propVal = "#0ff";
}