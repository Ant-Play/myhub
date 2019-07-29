// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
       //这个属性引用了豆豆预制资源
       startPrefab: {
           default: null,
           type: cc.Prefab
       },
       player:{
           default:null,
           type: cc.Node
       }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function() {
        //生成一个新的星星
        this.spawnNewPac();
    },
    spawnNewPac: function(){
        //使用给定的模板在场景中生成一个新的节点
        var newPac = cc.instantiate(this.startPrefab);
        //将新的节点添加到Canvas节点下面
        this.node.addChild(newPac);
        //为豆豆设置一个随机位置
        newPac.setPosition(this.getNewPacPosition());
        //在豆豆组件上暂存Game对象的引用
        newPac.getComponent('Pac').game = this;
    },
    getNewPacPosition: function() {
        var x = 0;
        var y = 0;
        //返回豆豆坐标
        return cc.v2(x,y);
    },

    start () {

    },

    // update (dt) {},
});
