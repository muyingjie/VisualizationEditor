/**
 * Created by yj on 2016/11/12.
 */

//继承方法
inheritAllMethod();
function inheritAllMethod(){
    var constructors = [BasicVEComponent, StandardVEComponent, ContainerVEComponent];
    goThroughInherit(constructors, VEComponent);

    var basicConstructors = [TxtBasicVEComponent, ImgBasicVEComponent];
    goThroughInherit(basicConstructors, BasicVEComponent);

    var standardConstructors = [ListStandardVEComponent, TxtImgVerticalStandardVEComponent];
    goThroughInherit(standardConstructors, StandardVEComponent);

    var containerConstructors = [VerticalContainerVEComponent];
    goThroughInherit(containerConstructors, ContainerVEComponent);
}
function goThroughInherit(constructors, parentConstructor){
    $.each(constructors, function (index, fnConstructor) {
        myj.inheritPrototype(fnConstructor, parentConstructor);
    });
}