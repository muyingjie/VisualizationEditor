/**
 * Created by yj on 2016/11/12.
 */

//继承方法
inheritAllMethod();
function inheritAllMethod(){
    var constructors = [BasicVEComponent, StandardVEComponent, ContainerVEComponent];
    goThroughInherit(constructors, VEComponent);
    //基本组件
    var basicConstructors = [
        BasicTxtVEComponent,
        BasicImgVEComponent,
        BasicIconVEComponent,
        BasicInputTextVEComponent,
        BasicInputButtonVEComponent,
        BasicInputCheckboxVEComponent,
        BasicInputRadioVEComponent,
        BasicInputDateVEComponent,
        BasicInputTimeVEComponent,
        BasicTextareaVEComponent,
        BasicSelectVEComponent
    ];
    goThroughInherit(basicConstructors, BasicVEComponent);

    var basicTxtConstructors = [BasicTxtBannerVEComponent];
    goThroughInherit(basicTxtConstructors, BasicTxtVEComponent);

    //标准组件
    var standardConstructors = [StandardListVEComponent, StandardTxtImgVerticalVEComponent];
    goThroughInherit(standardConstructors, StandardVEComponent);

    var standardListConstructors = [StandardListBannerVEComponent];
    goThroughInherit(standardListConstructors, StandardListVEComponent);

    //容器组件
    var containerConstructors = [ContainerVerticalVEComponent, ContainerPositionVEComponent, ContainerSuspensionVEComponent];
    goThroughInherit(containerConstructors, ContainerVEComponent);
}
function goThroughInherit(constructors, parentConstructor){
    $.each(constructors, function (index, fnConstructor) {
        myj.inheritPrototype(fnConstructor, parentConstructor);
    });
}