

cc.Class({
    extends: cc.Component,

    properties: {
        MoveSpeed: 0,
        accel: 1,
        status : 0,
    },

    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        // // 移动开关
        this.accLeft = false;
        this.accRight = false;
        this.accUp = false;
        this.accDown = false;
        // 主角速度
        this.xSpeed = 0;
        this.ySpeed = 0;

        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onDestroy() {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown(event) {
        // set a flag when key pressed
        this.status += 1;
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                
                break;
            case cc.macro.KEY.d:
                this.accRight = true;
                break;
            case cc.macro.KEY.w:
                this.accUp = true;
                break;
            case cc.macro.KEY.s:
                this.accDown = true;
                break;
        }
        var anim = this.node.getComponent(cc.Animation);
        if(this.status == 1){
            if(this.accLeft)
            {
                
                // animCtrl.play("linear");
                anim.play('pacmanLeft');
            }else if(this.accRight)
            {
                anim.play('pacmanRight');
            }
            else if(this.accDown)
            {
                anim.play('pacmanDown');
            }
            else if(this.accUp)
            {
                anim.play('pacmanUp');
            }
        }
    },

    onKeyUp(event) {
        // unset a flag when key released
        this.status = 0;
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
                
                break;
            case cc.macro.KEY.d:
                this.accRight = false;
                break;
            case cc.macro.KEY.w:
                this.accUp = false;
                break;
            case cc.macro.KEY.s:
                this.accDown = false;
                break;
        }
    },

    start() {

    },

    update: function (dt) {
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.ySpeed = 0;
            this.xSpeed = - this.accel;
            // anim.stop()
            // anim.play('pacmanLeft');
        } else if (this.accRight) {
            this.ySpeed = 0;
            this.xSpeed = + this.accel;
        } else if (this.accUp) {
            this.xSpeed = 0;
            this.ySpeed = + this.accel;
        } else if (this.accDown) {
            this.xSpeed = 0;
            this.ySpeed = - this.accel;
        }

        // 根据当前速度更新主角的位置
        this.node.x += this.xSpeed;
        this.node.y += this.ySpeed;
    },
    onCollisionEnter: function (other, self) {
        if (this.xSpeed < 0) {
            this.xSpeed = 0;
            this.node.x += 4;
        } else if (this.xSpeed > 0) {
            this.xSpeed = 0;
            this.node.x -= 4;
        } else if (this.ySpeed < 0) {
            this.ySpeed = 0;
            this.node.y += 4;
        } else if (this.ySpeed > 0) {
            this.ySpeed = 0;
            this.node.y -= 4;
        }

    },
    // onCollisionStay: function (other, self) {
    //     this.xSpeed=0;
    //     this.ySpeed=0;
    // },
    // onCollisionExit: function (other, self) {
    //     this.xSpeed=0;
    //     this.ySpeed=0;
    // }
});
