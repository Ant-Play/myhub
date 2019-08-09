cc.Class({//这里挂了BGM和按键音效
    extends: cc.Component,

    properties: {
        buttonSoundEffect: {
            type: cc.AudioClip,
            default: null
        },
    },

    playButtonSoundEffect: function () {
        this.current = cc.audioEngine.play(this.buttonSoundEffect, false, 1);
    },

    pauseButtonSoundEffect: function () {
        cc.audioEngine.stop(this.current);
    },
});
