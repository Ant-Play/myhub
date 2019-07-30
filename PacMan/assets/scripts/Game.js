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
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        highestScoreDisplay: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit
        // ;

        this.spawnNewBeanDot();
        this.score = 0;
        this.highestScore=JSON.parse(cc.sys.localStorage.getItem("highestScore"));
        if(!this.highestScore){
            this.highestScore={
                highestScoreData:0
            };
            cc.sys.localStorage.setItem("highestScore",JSON.stringify(this.highestScore));
        }
        this.highestScoreDisplay.string="HighestScore："+this.highestScore.highestScoreData;
    },

    start () {
        cc.director.pause();
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

    gainScore: function () {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score;
        if(this.score>this.highestScore.highestScoreData){
            this.highestScore.highestScoreData=this.score;
            this.highestScoreDisplay.string="HighestScore："+this.highestScore.highestScoreData;
            cc.sys.localStorage.setItem("highestScore",JSON.stringify(this.highestScore));
        }
    },


    pauseGame:function(){
        cc.director.pause();
    },
    resumeGame:function(){
        cc.director.resume();
    },
    exitGame:function(){
        //cc.director.end();
        cc.game.end();
    },
    restartGame:function(){
        //cc.director.loadScene(Main);
        //var cur=cc.director.getScene();
       cc.director.loadScene("Main");
       cc.director.resume();
    }
});
