/**
 * Created by yj on 2016/11/12.
 */
function StandardVEComponent(config) {
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    VEComponent.apply(this, args);

    //this.controlItems.css.backgroundColor.propVal = "#0f0";
    this.setControlItem({
        propLevel1: "css",
        propLevel2: "backgroundColor",
        propVal: "#0f0"
    });
}