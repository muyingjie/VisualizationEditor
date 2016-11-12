/**
 * Created by yj on 2016/11/12.
 */
function TxtImgVerticalStandardVEComponent(config){
    config = config ? config : {};
    var args = [].slice.call(arguments, 0);
    StandardVEComponent.apply(this, args);

    $.extend(true, this, {
        controlItems: {
            css: {
                height: {
                    propVal: ""
                }
            }
        }
    });

    var oImgComponent = new ImgBasicVEComponent({
        containerClassName: componentContainerClassName + " " + childComponentClassName,
        controlItems: {
            css: {
                position: {
                    propVal: "static"
                }
            }
        }
    });
    var oTxtComponent = new TxtBasicVEComponent({
        containerClassName: componentContainerClassName + " " + childComponentClassName,
        controlItems: {
            css: {
                position: {
                    propVal: "static"
                },
                height: {
                    propVal: "20px"
                }
            }
        }
    });
    this.childComponents = [oImgComponent, oTxtComponent];

}