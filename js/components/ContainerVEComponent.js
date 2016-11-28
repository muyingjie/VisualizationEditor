/**
 * Created by yj on 2016/11/12.
 */
//容器组件父类
function ContainerVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    VEComponent.apply(this, args);
}