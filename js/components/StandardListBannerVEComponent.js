/**
 * Created by yj on 2016/11/24.
 */
function StandardListBannerVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    StandardListVEComponent.apply(this, args);

    this.setControlItem({
        propLevel1: "css",
        propLevel2: "width",
        propVal: "100%"
    }, {
        propLevel1: "css",
        propLevel2: "boxSizing",
        propVal: "border-box"
    }, {
        propLevel1: "css",
        propLevel2: "position",
        propVal: "static"
    });
}