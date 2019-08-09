cc.Class({
    extends: cc.Component,

    properties: {
        eatBeanSm: {
            default: null,
            type: cc.AudioClip
        },
        pickRadius: 0,
    },

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
        // 得分加1
        this.game.gainScore(1);
        // 然后销毁当前豆点节点
        this.node.destroy();
        this.eatSm = cc.audioEngine.play(this.eatBeanSm, false, 1);
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
