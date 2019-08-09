cc.Class({
    extends: cc.Component,

    properties: {
        deathAudio: {//被吃掉音效
            default: null,
            type: cc.AudioClip
        },
        canvas: {//幕布
            default: null,
            type: cc.Node
        },
        pacMan: {
            default: null,
            type: cc.Node
        },
        speed: cc.v2(0, 0),//移动速度
        dir: cc.v2(0, 0),//方向
        location: cc.v2(0, 0),//上一帧的位置，用于判断是否停止移动
        moveSpeed: 1,//移动速率
        debuffSpeed: 0.5,//获得减益效果
        status: 0,//是否改变了方向
        cnt: 0,//计算帧数，两个帧数判断一次是否停止
    },



    onLoad: function () {
        this.Init();
        this.location.x = this.node.x;
        this.location.y = this.node.y;
        this.accUp = true;//初始方向
        this.status = 0;
        this.deathFlag = false;//死亡标记
        this.flagOfReset = 0;//归位标记
    },
    start() {

    },
    update: function (dt) {
        if (this.cnt == 2) {//如果停止则改变方向
            if (this.node.x == this.location.x && this.node.y == this.location.y) {
                this.Change_way();
            }
            this.cnt = 0;
            this.location.x = this.node.x;
            this.location.y = this.node.y;
        }

        if (this.deathFlag == true) {//被吃掉时触发的事件
            cc.audioEngine.play(this.deathAudio, false, 0.5);
            this.deathFlag = false;
            this.canvas.getComponent("Game").gainScore(100);
        }
        if (this.flagOfReset == 1) {//归位
            this.node.x = 0;
            this.node.y = 0;
            this.flagOfReset = 0;
        }
        this.Move();//移动

        this.cnt += 1;
        this.status = 0;
    },

    getDebuff: function () {//减益效果
        this.moveSpeed = this.debuffSpeed;//减速
        var action = cc.fadeTo(0, 100);//改透明度
        this.node.runAction(action);

        this.unschedule(this.debuffDuration);//如果再次获得减益效果，则重置持续时间
        this.scheduleOnce(this.debuffDuration = function () {//五秒后恢复正常
            this.recover();
        }.bind(this), 5)
    },

    recover: function () {//恢复，即移除减益效果
        this.moveSpeed = 1;
        var action1 = cc.fadeIn(0);
        this.node.runAction(action1);
    },

    Move() {//移动及变换方向
        var anim = this.node.getComponent(cc.Animation);
        if (this.accLeft) {
            this.dir.x = -1;
            this.dir.y = 0;
            if (this.status == 1) anim.play('blinkyLeft');
        } else if (this.accRight) {
            this.dir.x = 1;
            this.dir.y = 0;
            if (this.status == 1) anim.play('blinkyRight');
        } else if (this.accUp) {
            this.dir.x = 0;
            this.dir.y = 1;
            if (this.status == 1) anim.play('blinkyUp');
        } else if (this.accDown) {
            this.dir.x = 0;
            this.dir.y = -1;
            if (this.status == 1) anim.play('blinkyDown');
        }
        this.speed.x = this.dir.x * this.moveSpeed;
        this.speed.y = this.dir.y * this.moveSpeed;
        this.node.x += this.speed.x;
        this.node.y += this.speed.y;
    },
    Change_way() {//随机改变方向
        this.status = 1;
        this.num = parseInt(Math.random() * 100000 % 4);
        this.Init();
        if (this.num == 0) {
            this.accLeft = true;
        } else if (this.num == 1) {
            this.accRight = true;
        } else if (this.num == 2) {
            this.accDown = true;
        } else if (this.num == 3) {
            this.accUp = true;
        }

        // console.log(this.num);
    },
    Init() {
        this.accLeft = false;
        this.accRight = false;
        this.accDown = false;
        this.accUp = false;
    },
    onBeginContact: function (contact, selfCollider, otherCollider) {//与pacman碰撞时发生的事件
        if (otherCollider.node.group == "pacman") {
            this.reset();
            if (this.moveSpeed != this.debuffSpeed) {//如果不是DeBuff状态，致死
                var death = this.pacMan.getComponent("Player");
                death.decease();
            } else {//是DeBuff状态，自己死
                this.deathFlag = true;
            }
        }
    },
    reset: function () {//归位标记
        this.flagOfReset = 1;
    },
    onEndContact: function (contact, selfCollider, otherCollider) {
    },
    onPreSolve: function (contact, selfCollider, otherCollider) {
    },
});
