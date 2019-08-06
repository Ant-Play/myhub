cc.Class({
    extends: cc.Component,

    properties: {
        beanDotPrefab: {
            default: null,
            type: cc.Prefab
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit
        ;
    },

    start () {
        cc.director.pause();
    },
    pauseGame:function(){
        cc.director.pause();
    },
    resumeGame:function(){
        cc.director.resume();
    },
    exitGame:function(){
        cc.game.end();
    },
    restartGame:function(){
       cc.director.resume();
       cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
        cc.director.resume();
    });
       cc.director.loadScene("Main");
    }
});
