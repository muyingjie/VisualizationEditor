/**
 * Created by yj on 2016/11/12.
 */

//继承方法
inheritAllMethod();
function inheritAllMethod(){
    var constructors = [BasicVEComponent, StandardVEComponent, ContainerVEComponent];
    goThroughInherit(constructors, VEComponent);

    var basicConstructors = [BasicTxtVEComponent, BasicImgVEComponent, BasicIconVEComponent];
    goThroughInherit(basicConstructors, BasicVEComponent);

    var standardConstructors = [StandardListVEComponent, StandardTxtImgVerticalVEComponent];
    goThroughInherit(standardConstructors, StandardVEComponent);

    var containerConstructors = [ContainerVerticalVEComponent, ContainerPositionVEComponent];
    goThroughInherit(containerConstructors, ContainerVEComponent);
}
function goThroughInherit(constructors, parentConstructor){
    $.each(constructors, function (index, fnConstructor) {
        myj.inheritPrototype(fnConstructor, parentConstructor);
    });
}