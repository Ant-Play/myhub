

cc.Class({
    extends: cc.Component,

    properties: {
        speed: cc.v2(0, 0),
        MoveSpeed: 4,
        status: 0,
    },

    onLoad: function () {
        //碰撞标记
        this.collisionX = 0;
        this.collisionY = 0;
        // // 移动开关
        this.accLeft = false;
        this.accRight = false;
        this.accUp = false;
        this.accDown = false;
        //碰撞标记
        this.collisionX = 0;
        this.collisionY = 0;

        this.prePosition = cc.v2();
        this.preStep = cc.v2();


        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
    onEnable: function () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;

        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
            cc.PhysicsManager.DrawBits.e_pairBit |
            cc.PhysicsManager.DrawBits.e_centerOfMassBit |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit
            ;
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
                break;
            case cc.macro.KEY.d:
            case cc.macro.KEY.right:
                this.accRight = true;
                break;
            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
                this.accUp = true;
                break;
            case cc.macro.KEY.s:
            case cc.macro.KEY.down:
                this.accDown = true;
                break;
        }
        //变换相应方向pacman的动画
        var anim = this.node.getComponent(cc.Animation);
        if (this.status == 1) {
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

    start() {
    },

    Valid() {
        // this.PW1 = rigidbody.getWorldPoint()
        // this.PW2 = cc.v2(0,0)
        // this.PW2.x=PW1.x+this.speed.x;
        // this.PW2.y=PW1.y+this.speed.y;
        // var result = this.phyManager.rayCast(pW1, pW2, cc.RayCastType.Closest);
        //console.log( result.collider===node.collider);
        this.PW1 = this.node.convertToWorldSpaceAR(cc.v2(0, 0));
        this.PW2 = cc.v2(this.PW1.x + this.speed.x*7, this.PW1.y + this.speed.y*7);
        this.results = cc.director.getPhysicsManager().rayCast(this.PW1, this.PW2, cc.RayCastType.Closest);
        //this.rayCollider = cc.director.getPhysicsManager().testPoint(this.PW2);
        if (this.results != null) {
            console.log(this.results);
        }
        //console.log(this.PW2);
        return true;
    },

    update: function (dt) {
        // 根据当前速度方向每帧设置速度
        if (this.accLeft) {
            this.speed.y = 0;
            this.speed.x = - this.MoveSpeed;
            // anim.stop()
            // anim.play('pacmanLeft');
        } else if (this.accRight) {
            this.speed.y = 0;
            this.speed.x = + this.MoveSpeed;
        } else if (this.accUp) {
            this.speed.x = 0;
            this.speed.y = + this.MoveSpeed;
        } else if (this.accDown) {
            this.speed.x = 0;
            this.speed.y = - this.MoveSpeed;
        }

        // 根据当前速度更新主角的位置
        if (this.Valid()) {
            this.node.x += this.speed.x;
            this.node.y += this.speed.y;
        }

    },

    onCollisionEnter: function (other, self) {
        if (this.speed.x < 0) {
            this.speed.x = 0;
            this.node.x += 4;
        } else if (this.speed.x > 0) {
            this.speed.x = 0;
            this.node.x -= 4;
        } else if (this.speed.y < 0) {
            this.speed.y = 0;
            this.node.y += 4;
        } else if (this.speed.y > 0) {
            this.speed.y = 0;
            this.node.y -= 4;
        }


    },

    onCollisionStay: function (other, self) {
        // if (this.collisionY === -1) {
        //     if (other.node.group === 'wall') {
        //         var motion = other.node.getComponent('PlatformMotion');
        //         if (motion) {
        //             this.node.x += motion._movedDiff;
        //         }
        //     }

        //     // this.node.y = other.world.aabb.yMax;

        //     // var offset = cc.v2(other.world.aabb.x - other.world.preAabb.x, 0);

        //     // var temp = cc.affineTransformClone(self.world.transform);
        //     // temp.tx = temp.ty = 0;

        //     // offset = cc.pointApplyAffineTransform(offset, temp);
        //     // this.node.x += offset.x;
        // }
    },
    onCollisionExit: function (other) {
        this.touchingNumber--;
        if (this.touchingNumber === 0) {
            this.node.color = cc.Color.WHITE;
        }

        if (other.touchingX) {
            this.collisionX = 0;
            other.touchingX = false;
        }
        else if (other.touchingY) {
            other.touchingY = false;
            this.collisionY = 0;
        }
    },


});
