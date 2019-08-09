cc.Class({
    extends: cc.Component,

    properties: {
        eatSpecialBeanSm: {//被吃的音效
            default: null,
            type: cc.AudioClip
        },
        pickRadius: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },
    getPlayerDistance: function () {
        // 根据 player 节点位置判断距离
        var playerPos = this.game.pacMan.getPosition();
        // 根据两点位置计算两点之间距离
        var dist = this.node.position.sub(playerPos).mag();
        return dist;
    },
    onPicked: function () {
        // 当特殊豆点被收集时，调用 Game 脚本中的接口，得分加1
        this.game.gainScore(1);
        // 所有幽灵获得DeBuff
        this.sc1 = this.game.blinky.getComponent("Blinky_Move");

        this.sc1.getDebuff();
        this.sc2 = this.game.pinky.getComponent("Pinky_Move");
        this.sc2.getDebuff();

        this.sc3 = this.game.clyde.getComponent("Clyde_Move");
        this.sc3.getDebuff();

        this.sc4 = this.game.Inky.getComponent("Inky_Move");
        this.sc4.getDebuff();

        this.node.destroy();
        this.eatSpecialSm = cc.audioEngine.play(this.eatSpecialBeanSm, false, 1);
    },

    update: function (dt) {
        // 每帧判断和主角之间的距离是否小于收集距离
        if (this.getPlayerDistance() < this.pickRadius) {
            // 调用收集行为
            this.onPicked();
            return;
        }
    },
});
