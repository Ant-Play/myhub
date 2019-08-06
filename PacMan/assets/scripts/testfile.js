

cc.Class({
    extends: cc.Component,

    properties: {
        speed: cc.v2(0, 0),
        moveSpeed: 0,
        dir: cc.v2(0, 0),
        size:cc.v2(7, 7),
        status : 0,
        cnt : 0,
        xcode : 0,
        ycode : 0,
    },

    onLoad: function () {
        // 移动开关
        this.accLeft = false;
        this.accRight = true;
        this.accUp = false;
        this.accDown = false;

        this.xcode = this.node.x;
        this.ycode = this.node.y;
    },
    start() {
        // this.detectionDistance=16;
    },
    update: function (dt) {
        
        if(this.status == 1 && this.cnt > 40){
            this.num = Math.random()*100000 % 4;
            this.num = parseInt(this.num);
            // console.log(this.num);
            if(this.num == 0){ // 指定方向：0为右，1为下，2为左，3为上；
                this.accRight = true;
                this.accDown = false;
                this.accLeft = false;
                this.accUp = false;
            }
            else if(this.num == 1){
                this.accRight = false;
                this.accDown = true;
                this.accLeft = false;
                this.accUp = false;
            }
            else if(this.num == 2){
                this.accRight = false;
                this.accDown = false;
                this.accLeft = true;
                this.accUp = false;
            }
            else if(this.num == 3) {
                this.accRight = false;
                this.accDown = false;
                this.accLeft = false;
                this.accUp = true;
            }
            this.cnt = 0;
        }
        if(this.accLeft){
            this.dir.x = -1;
            this.dir.y = 0;
        }else if(this.accRight){
            this.dir.x = 1;
            this.dir.y = 0;
        }else if(this.accUp){
            this.dir.x = 0;
            this.dir.y = 1;
        }else if(this.accDown){
            this.dir.x = 0;
            this.dir.y = -1;
        }

        var anim = this.node.getComponent(cc.Animation);
        if (this.status == 1 && this.Valid()) {
            if (this.accLeft) {
                anim.play('blinkyLeft');
            } else if (this.accRight) {
                anim.play('blinkyRight');
            }
            else if (this.accDown) {
                anim.play('blinkyDown');
            }
            else if (this.accUp) {
                anim.play('blinkyUp');
            }
        }
        this.speed.x = this.dir.x //* this.moveSpeed;
        this.speed.y = this.dir.y //* this.moveSpeed;
        // console.log(this.speed.x + "and" + this.speed.y );

        this.node.x += this.speed.x;
        this.node.y += this.speed.y;
        this.status = 0;

        this.xcode = this.node.x;
        this.ycode = this.node.y;
    },
    onBeginContact: function (contact, selfCollider, otherCollider) {
        //console.log("begin!");
        this.status = 1;
    },
    onEndContact: function (contact, selfCollider, otherCollider) {
        //console.log("end!");
        this.status = 1;
    },
    onPreSolve: function (contact, selfCollider, otherCollider) {
        //  console.log("test!")
         this.status = 1;
         this.cnt += 1;
    },
    turnway() {
        if(this.node.x == this.xcode && this.node.y == this.ycode){
            return true;
        }else{
            return false;
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

});
