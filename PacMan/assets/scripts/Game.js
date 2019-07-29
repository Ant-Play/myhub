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
        beanDotPrefab: {
            default: null,
            type: cc.Prefab
        },
        pacMan: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        cc.PhysicsManager.DrawBits.e_pairBit |
        cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        cc.PhysicsManager.DrawBits.e_jointBit |
        cc.PhysicsManager.DrawBits.e_shapeBit
        ;

        this.spawnNewBeanDot();

    },

    start () {

    },

    // update (dt) {},
    spawnNewBeanDot: function() {
        // 使用给定的模板在场景中生成一个新节点
        var newBeanDot = cc.instantiate(this.beanDotPrefab);
        // 将新增的节点添加到 Canvas 节点下面
        this.node.addChild(newBeanDot);
        // 为星星设置一个随机位置
        newBeanDot.setPosition(this.getNewBeanDotPosition());
        // 在星星组件上暂存 Game 对象的引用
        newBeanDot.getComponent('BeanDot').game = this;
    },
    getNewBeanDotPosition: function () {
        var randX = 0;
        
        var randY = 0;
 
        return cc.v2(randX, randY);
    },
});
