

cc.Class({
    extends: cc.Component,

    properties: {
        speed: cc.v2(0, 0),//移动速度
        moveSpeed: 0,//移动速率
        dir: cc.v2(0, 0),//移动方向
        size: cc.v2(7, 7),//射线检测偏移的大小，与刚体半径一致
        lives: 1,//生命
        gameOverSm: {//游戏结束BGM
            default: null,
            type: cc.AudioClip
        },
        pinky: {//幽灵
            default: null,
            type: cc.Node
        },
        inky: {//幽灵
            default: null,
            type: cc.Node
        },
        blinky: {//幽灵
            default: null,
            type: cc.Node
        },
        clyde: {//幽灵
            default: null,
            type: cc.Node
        },
        livesDisplay: {//生命次数展示
            default: null,
            type: cc.Label
        },
        deathSoundEffect: {//死亡音效
            type: cc.AudioClip,
            default: null
        },
        getLivesSoundEffect: {//触发彩蛋获得生命时的音效
            type: cc.AudioClip,
            default: null
        },
        SoundEffect: {//挂着BGM的节点
            default: null,
            type: cc.Node
        },
    },

    onLoad: function () {
        // // 移动开关
        this.accLeft = false;
        this.accRight = false;
        this.accUp = false;
        this.accDown = false;

        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    start() {
        this.status = 0;//防止按住移动键卡死的辅助变量
        this.egg_count = 0;//计算停留帧数以判断能否触发菜单的辅助变量
        this.detectionDistance = 16;//射线检测的距离
        this.flagOfAddlives = 1;//允许添加生命的flag
        this.flagOfReset = 0;//是否归位的标记
        this.livesDisplay.string = 'Lives: ' + this.lives;//展示生命次数
    },
    onEnable: function () {
    },

    onDisable: function () {
    },

    onDestroy() {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown(event) {
        //防止按住移动键卡死动画
        this.status += 1;
        let keyCode = event.keyCode;
        switch (keyCode) {//设置相应的移动方向
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.accLeft = true;
                this.dir.x = -1;
                this.dir.y = 0;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.accRight = true;
                this.dir.x = 1;
                this.dir.y = 0;
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.accUp = true;
                this.dir.x = 0;
                this.dir.y = 1;
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.accDown = true;
                this.dir.x = 0;
                this.dir.y = -1;
                break;
        }


        //变换相应方向pacman的动画
        var anim = this.node.getComponent(cc.Animation);
        if (this.status == 1 && this.Valid()) {
            if (this.accLeft) {
                anim.play('pacmanLeft');
            } else if (this.accRight) {
                anim.play('pacmanRight');
            }
            else if (this.accDown) {
                anim.play('pacmanDown');
            }
            else if (this.accUp) {
                anim.play('pacmanUp');
            }
            this.speed.x = this.dir.x * this.moveSpeed;
            this.speed.y = this.dir.y * this.moveSpeed;
        }
    },

    onKeyUp(event) {
        //松开时防动画卡死标记置0
        this.status = 0;
        let keyCode = event.keyCode;
        switch (keyCode) {
            case cc.macro.KEY.a:
            case cc.macro.KEY.left:
                this.accLeft = false;
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.accRight = false;
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.accUp = false;
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.accDown = false;
                break;
        }
    },



    Valid() {//射线检测，判断按下方向键是否有效
        this.isWallTop = false;
        this.isWallButton = false;
        this.PW1 = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        //console.log("PW1:"+this.PW1);
        this.PwTemp = cc.v2(this.PW1);
        //console.log("PwTemp:"+this.PwTemp);
        this.PwTemp.x += this.dir.y * this.size.x;
        this.PwTemp.y += this.dir.x * this.size.y;
        //console.log("PwTemp:"+this.PwTemp);
        this.PW2 = cc.v2(0, 0);
        this.PW2.x = this.PwTemp.x + this.dir.x * this.moveSpeed * this.detectionDistance;
        this.PW2.y = this.PwTemp.y + this.dir.y * this.moveSpeed * this.detectionDistance;
        // console.log("PW2:"+this.PW2);
        this.results = cc.director.getPhysicsManager().rayCast(this.PwTemp, this.PW2, cc.RayCastType.Closest);
        //this.rayCollider = cc.director.getPhysicsManager().testPoint(this.PW2);
        if (this.results.length >= 1) {
            //console.log(this.results[0].collider.node.name);
            //console.log(this.results)
            this.results[0].collider.node.name == "Maze" ? this.isWallTop = true : this.isWallTop = false;
        }
        this.PwTemp = cc.v2(this.PW1);
        this.PwTemp.x -= this.dir.y * this.size.x;
        this.PwTemp.y -= this.dir.x * this.size.y;
        //console.log("B:PwTemp:"+this.PwTemp);
        this.PW2 = cc.v2(0, 0);
        this.PW2.x = this.PwTemp.x + this.dir.x * this.moveSpeed * this.detectionDistance;
        this.PW2.y = this.PwTemp.y + this.dir.y * this.moveSpeed * this.detectionDistance;
        //console.log("PW2:---"+this.PW2);
        this.results = cc.director.getPhysicsManager().rayCast(this.PwTemp, this.PW2, cc.RayCastType.Closest);
        if (this.results.length >= 1) {
            this.results[0].collider.node.name == "Maze" ? this.isWallButton = true : this.isWallButton = false;
        }
        return (this.isWallTop == false) && (this.isWallButton == false);

    },

    update: function (dt) {
        // 根据当前速度更新主角的位置
        this.node.x += this.speed.x;
        this.node.y += this.speed.y;

        if (this.flagOfAddlives == 1) {//是否已触发过彩蛋/已获得过生命
            this.check_location();
            if (this.egg_count >= 180) {//判断位置，获得彩蛋
                //触发彩蛋
                //console.log("true !!! ");
                cc.audioEngine.play(this.getLivesSoundEffect, false, 1);
                this.lives = 3;
                this.livesDisplay.string = 'Lives: ' + this.lives;
                this.flagOfAddlives = 0;
            }
        }

        if (this.flagOfReset == 1) {//归位，不提倡这种坐标的写法，应设置变量，一开始保存初始坐标
            this.node.x = -81;
            this.node.y = -245;
            this.speed.x = 0;
            this.speed.y = 0;
            this.flagOfReset = 0;
        }

    },
    decease: function () {//失去生命，死亡
        //幽灵归位
        cc.director.pause();
        var pinkyReset = this.pinky.getComponent("Pinky_Move");
        var inkyReset = this.inky.getComponent("Inky_Move");
        var clydeReset = this.clyde.getComponent("Clyde_Move");
        var blinkyReset = this.blinky.getComponent("Blinky_Move");
        pinkyReset.reset();
        inkyReset.reset();
        clydeReset.reset();
        blinkyReset.reset();
        var stopBgm = this.SoundEffect.getComponent(cc.AudioSource);
        stopBgm.pause();

        //生命次数为0,游戏结束
        if (this.lives <= 1) {
            setTimeout("cc.director.loadScene('Gameover');", 1000);
            this.overSm = cc.audioEngine.play(this.gameOverSm, false, 1);
        } else {//生命次数减一，归位
            cc.audioEngine.play(this.deathSoundEffect, false, 1);
            this.lives--;
            this.livesDisplay.string = 'Lives: ' + this.lives;
            this.flagOfReset = 1;
        }
    },
    check_location() {//判断是否在幽灵出生点
        if (this.node.x >= -125 && this.node.x <= -34 && this.node.y >= -22 && this.node.y <= 16) {
            this.egg_count += 1;
        }
        else {
            this.egg_count = 0;
        }
    },
    onCollisionEnter: function (other, self) {
    },
    onCollisionStay: function (other, self) {
    },
    onCollisionExit: function (other) {
    },


});
