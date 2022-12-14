import { buildModuleUrl, TileMapServiceImageryProvider, Viewer } from "cesium";

export class xjCesium{
    public viewer: Viewer | undefined
    constructor(container: HTMLElement){
        this.init(container);
    }
    /**
     * 初始化cesium
     * @author: zwj
     * @param {HTMLElement} container
     * @return {*}
     */    
    public init(container: HTMLElement) {
        this.viewer = new Viewer(container, {
            infoBox: false, // 解决iframe无法执行js报错问题
            baseLayerPicker: true, // 去掉底图选择器
            sceneModePicker: false, // 去掉场景模式选择器 （3D，2D）
            homeButton: false, // 去掉起始点按钮
            geocoder: false, // 去掉地理代码搜索
            navigationHelpButton: false, // 去掉导航帮助按钮
            animation: false, // 取消动画按钮
            timeline: false, // 去掉时间线
            fullscreenButton: false, // 去掉全屏按钮
            selectionIndicator: false, // 去掉选择指示器
            imageryProvider: new TileMapServiceImageryProvider({ // 使用请求量少的图片瓦片地图提供者减少不必要的外网底图请求，避免网络无法科学上网时导致整个地球出不来
                url: buildModuleUrl("Assets/Textures/NaturalEarthII")
            })
        });
        (this.viewer.cesiumWidget.creditContainer as HTMLDivElement).style.display = 'none'; // 去掉cesium的左下角logo区域
    }
    /**
     * 释放当前场景的资源避免内存泄漏
     * @author: zwj
     * @return {*}
     */    
    public destroy(){
        this.viewer?.canvas.getContext('webgl')?.getExtension('WEBGL_lose_context')?.loseContext();
        this.viewer?.destroy();
        this.viewer = undefined;
    }
}