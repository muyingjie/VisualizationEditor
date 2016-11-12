/**
 * Created by yj on 2016/11/12.
 */
function StandardVEComponent(config) {
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    VEComponent.apply(this, args);

    this.controlItems.css.background.propVal = "#0f0";
}