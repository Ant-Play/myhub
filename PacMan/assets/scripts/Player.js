

cc.Class({
    extends: cc.Component,

    properties: {
        speed: cc.v2(0, 0),
        moveSpeed: 0,
        dir: cc.v2(0, 0),
        size:cc.v2(7, 7),
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
        this.status = 0;
        // this.size.x=this.node.width*0.3;
        // this.size.y=this.node.height*0.3;
        this.detectionDistance=16;
 
    },
    onEnable: function () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        cc.director.getCollisionManager().enabledDebugDraw = false;
    },

    onDestroy() {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown(event) {
        //防止按住移动键卡死动画
        this.status += 1;
        // set a flag when key pressed
        let keyCode = event.keyCode;
        switch (keyCode) {
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

        // // 根据当前速度方向每帧设置速度
        // if (this.accLeft) {
        //     this.speed.y = 0;
        //     this.speed.x = - this.moveSpeed;
        //     // anim.stop()
        //     // anim.play('pacmanLeft');
        // } else if (this.accRight) {
        //     this.speed.y = 0;
        //     this.speed.x = + this.moveSpeed;
        // } else if (this.accUp) {
        //     this.speed.x = 0;
        //     this.speed.y = + this.moveSpeed;
        // } else if (this.accDown) {
        //     this.speed.x = 0;
        //     this.speed.y = - this.moveSpeed;
        // }

        //变换相应方向pacman的动画
        var anim = this.node.getComponent(cc.Animation);
        if (this.status == 1 && this.Valid()) {
            if (this.accLeft) {
                // animCtrl.play("linear");
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
        // unset a flag when key released
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



    Valid() {
        this.isWallTop = false;
        this.isWallButton = false;
        this.PW1 = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        //console.log("PW1:"+this.PW1);
        this.PwTemp = cc.v2(this.PW1);
        //console.log("PwTemp:"+this.PwTemp);
        this.PwTemp.x += this.dir.y * this.size.x ;
        this.PwTemp.y += this.dir.x * this.size.y ;
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
        this.PwTemp.x -= this.dir.y * this.size.x ;
        this.PwTemp.y -= this.dir.x * this.size.y ;
        //console.log("B:PwTemp:"+this.PwTemp);
        this.PW2 = cc.v2(0, 0);
        this.PW2.x = this.PwTemp.x + this.dir.x * this.moveSpeed * this.detectionDistance;
        this.PW2.y = this.PwTemp.y + this.dir.y * this.moveSpeed * this.detectionDistance;
        //console.log("PW2:---"+this.PW2);
        this.results = cc.director.getPhysicsManager().rayCast(this.PwTemp, this.PW2, cc.RayCastType.Closest);
        if (this.results.length >= 1) {
            this.results[0].collider.node.name == "Maze" ? this.isWallButton = true : this.isWallButton = false;
        }
        return (this.isWallTop == false)&&(this.isWallButton == false);

    },

    update: function (dt) {
        // 根据当前速度更新主角的位置
        this.node.x += this.speed.x;
        this.node.y += this.speed.y;

    },

    onCollisionEnter: function (other, self) {
        // if (this.speed.x < 0) {
        //     this.speed.x = 0;
        //     this.node.x += 4;
        // } else if (this.speed.x > 0) {
        //     this.speed.x = 0;
        //     this.node.x -= 4;
        // } else if (this.speed.y < 0) {
        //     this.speed.y = 0;
        //     this.node.y += 4;
        // } else if (this.speed.y > 0) {
        //     this.speed.y = 0;
        //     this.node.y -= 4;
        // }


    },

    onCollisionStay: function (other, self) {
    },
    onCollisionExit: function (other) {        
    },


});
