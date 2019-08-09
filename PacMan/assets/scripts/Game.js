cc.Class({
    extends: cc.Component,

    properties: {
        firstKillSm: {//各种音效
            default: null,
            type: cc.AudioClip
        },
        doubleKillSm: {
            default: null,
            type: cc.AudioClip
        },
        killingSpreeSm: {
            default: null,
            type: cc.AudioClip
        },
        dominatingSm: {
            default: null,
            type: cc.AudioClip
        },
        megaKillSm: {
            default: null,
            type: cc.AudioClip
        },
        victorySm: {
            default: null,
            type: cc.AudioClip
        },
        beanDotPrefab: {//豆点预制体
            default: null,
            type: cc.Prefab
        },
        specificBeanDotPrefab: {//特殊豆点
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
        },
        blinky: {//幽灵
            default: null,
            type: cc.Node
        },
        Inky: {
            default: null,
            type: cc.Node
        },
        pinky: {
            default: null,
            type: cc.Node
        },
        clyde: {
            default: null,
            type: cc.Node
        },
        prefab: {//预制体节点，放置预制体以确保在幽灵前生成
            default: null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit


        //加载豆点预制体，坐标通过算法生成，条件由队友确定
        this.array = [[-280, -234],
        [-280, -223],
        [-280, -212],
        [-280, -201],
        [-269, -245],
        [-258, -245],
        [-247, -245],
        [-236, -245],
        [-225, -245],
        [-214, -245],
        [-203, -245],
        [-192, -245],
        [-181, -245],
        [-170, -245],
        [-159, -245],
        [-148, -245],
        [-137, -245],
        [-126, -245],
        [-115, -245],
        [-104, -245],
        //[-93, -245],
        //[-82, -245],
        //[-71, -245],
        [-60, -245],
        [-49, -245],
        [-38, -245],
        [-27, -245],
        [-16, -245],
        [-5, -245],
        [6, -245],
        [17, -245],
        [28, -245],
        [39, -245],
        [50, -245],
        [61, -245],
        [72, -245],
        [83, -245],
        [94, -245],
        [105, -245],
        [-269, -201],
        [-258, -201],
        [-247, -201],
        [-236, -201],
        [-225, -201],
        [-214, -201],
        [-203, -201],
        [-203, -234],
        [-203, -223],
        [-203, -212],
        [-104, -234],
        [-104, -223],
        [-104, -212],
        [-104, -201],
        [-148, -201],
        [-137, -201],
        [-126, -201],
        [-115, -201],
        [-60, -234],
        [-60, -223],
        [-60, -212],
        [-60, -201],
        [-49, -201],
        [-38, -201],
        [-27, -201],
        [-16, -201],
        [-5, -201],
        [39, -234],
        [39, -223],
        [39, -212],
        [39, -201],
        [39, -190],
        [39, -179],
        [39, -168],
        [39, -157],
        [39, -146],
        [39, -135],
        [39, -124],
        [39, -113],
        [39, -102],
        [39, -91],
        [39, -80],
        [39, -69],
        [39, -58],
        [39, -47],
        [39, -36],
        [39, -25],
        [39, -14],
        [39, -3],
        [39, 8],
        [39, 19],
        [39, 30],
        [39, 41],
        [39, 52],
        [39, 63],
        [39, 74],
        [39, 85],
        [39, 96],
        [39, 107],
        [39, 118],
        [39, 129],
        [39, 140],
        [39, 151],
        [39, 162],
        [39, 173],
        [39, 184],
        [39, 195],
        [39, 206],
        [116, -234],
        [116, -223],
        [116, -212],
        [116, -201],
        [50, -201],
        [61, -201],
        [72, -201],
        [83, -201],
        [94, -201],
        [105, -201],
        [-247, -190],
        [-247, -179],
        [-247, -168],
        [-247, -157],
        [-247, -146],
        [-280, -146],
        [-269, -146],
        [-258, -146],
        [-203, -190],
        [-203, -179],
        [-203, -168],
        [-203, -157],
        [-203, -146],
        [-203, -135],
        [-203, -124],
        [-203, -113],
        [-203, -102],
        [-203, -91],
        [-203, -80],
        [-203, -69],
        [-203, -58],
        [-203, -47],
        [-203, -36],
        [-203, -25],
        [-203, -14],
        [-203, -3],
        [-203, 8],
        [-203, 19],
        [-203, 30],
        [-203, 41],
        [-203, 52],
        [-203, 63],
        [-203, 74],
        [-203, 85],
        [-203, 96],
        [-203, 107],
        [-203, 118],
        [-203, 129],
        [-203, 140],
        [-203, 151],
        [-203, 162],
        [-203, 173],
        [-203, 184],
        [-203, 195],
        [-203, 206],
        [-192, -146],
        [-181, -146],
        [-170, -146],
        [-159, -146],
        [-148, -146],
        [-137, -146],
        [-126, -146],
        [-115, -146],
        [-104, -146],
        [-148, -190],
        [-148, -179],
        [-148, -168],
        [-148, -157],
        [-60, -146],
        [-49, -146],
        [-38, -146],
        [-27, -146],
        [-16, -146],
        [-5, -146],
        [6, -146],
        [17, -146],
        [28, -146],
        [-5, -190],
        [-5, -179],
        [-5, -168],
        [-5, -157],
        [83, -190],
        [83, -179],
        [83, -168],
        [83, -157],
        [83, -146],
        [94, -146],
        [105, -146],
        [-280, -135],
        [-280, -124],
        [-280, -113],
        [-280, -102],
        [-269, -102],
        [-258, -102],
        [-247, -102],
        [-236, -102],
        [-225, -102],
        [-214, -102],
        [-192, -102],
        [-181, -102],
        [-170, -102],
        [-159, -102],
        [-148, -102],
        [-137, -102],
        [-126, -102],
        [-115, -102],
        [-104, -102],
        [-93, -102],
        [-82, -102],
        [-71, -102],
        [-60, -102],
        [-49, -102],
        [-38, -102],
        [-27, -102],
        [-16, -102],
        [-5, -102],
        [6, -102],
        [17, -102],
        [28, -102],
        [50, -102],
        [61, -102],
        [72, -102],
        [83, -102],
        [94, -102],
        [105, -102],
        [116, -102],
        [-104, -135],
        [-104, -124],
        [-104, -113],
        [-60, -135],
        [-60, -124],
        [-60, -113],
        [116, -146],
        [116, -135],
        [116, -124],
        [116, -113],
        [-247, -91],
        [-247, -80],
        [-247, -69],
        [-247, -58],
        [-247, -47],
        [-280, -47],
        [-269, -47],
        [-258, -47],
        [-148, -91],
        [-148, -80],
        [-148, -69],
        [-148, -58],
        [-148, -47],
        [-148, -36],
        [-148, -25],
        [-148, -14],
        [-148, -3],
        [-148, 8],
        [-148, 19],
        [-148, 30],
        [-137, -47],
        [-126, -47],
        [-115, -47],
        [-104, -47],
        [-93, -47],
        [-82, -47],
        [-71, -47],
        [-60, -47],
        [-49, -47],
        [-38, -47],
        [-27, -47],
        [-16, -47],
        [-4, -91],
        [-4, -80],
        [-4, -69],
        [-4, -58],
        [-4, -47],
        [-4, -36],
        [-4, -25],
        [-4, -14],
        [-4, -3],
        [-4, 8],
        [-4, 19],
        [-4, 30],
        [83, -91],
        [83, -80],
        [83, -69],
        [83, -58],
        [83, -47],
        [94, -47],
        [105, -47],
        [116, -47],
        [-280, -36],
        [-280, -25],
        [-280, -14],
        [-280, -3],
        [-280, 8],
        [-280, 19],
        [-280, 30],
        [-280, 41],
        [-269, 41],
        [-258, 41],
        [-247, 41],
        [-192, 41],
        [-181, 41],
        [-170, 41],
        [-159, 41],
        [-148, 41],
        [-137, 41],
        [-126, 41],
        [-115, 41],
        [-104, 41],
        [-93, 41],
        [-82, 41],
        [-71, 41],
        [-60, 41],
        [-49, 41],
        [-38, 41],
        [-27, 41],
        [-16, 41],
        [-5, 41],
        [6, 41],
        [17, 41],
        [28, 41],
        [-269, -3],
        [-258, -3],
        [-247, -3],
        [-236, -3],
        [-225, -3],
        [-214, -3],
        [50, -3],
        [61, -3],
        [72, -3],
        [83, -3],
        [94, -3],
        [105, -3],
        [116, -36],
        [116, -25],
        [116, -14],
        [116, -3],
        [116, 8],
        [116, 19],
        [116, 30],
        [116, 41],
        [83, 41],
        [94, 41],
        [105, 41],
        [-247, 52],
        [-247, 63],
        [-247, 74],
        [-247, 85],
        [-247, 96],
        [-280, 96],
        [-269, 96],
        [-258, 96],
        [-236, 96],
        [-225, 96],
        [-214, 96],
        [-104, 52],
        [-104, 63],
        [-104, 74],
        [-104, 85],
        [-104, 96],
        [-148, 96],
        [-137, 96],
        [-126, 96],
        [-115, 96],
        [-60, 52],
        [-60, 63],
        [-60, 74],
        [-60, 85],
        [-60, 96],
        [-49, 96],
        [-38, 96],
        [-27, 96],
        [-16, 96],
        [-5, 96],
        [50, 96],
        [61, 96],
        [72, 96],
        [83, 96],
        [94, 96],
        [105, 96],
        [116, 96],
        [83, 52],
        [83, 63],
        [83, 74],
        [83, 85],
        [-280, 107],
        [-280, 118],
        [-280, 129],
        [-280, 151],
        [-280, 162],
        [-280, 173],
        [-280, 184],
        [-280, 195],
        [-280, 140],
        [-269, 140],
        [-258, 140],
        [-247, 140],
        [-236, 140],
        [-225, 140],
        [-214, 140],
        [-192, 140],
        [-181, 140],
        [-170, 140],
        [-159, 140],
        [-148, 140],
        [-137, 140],
        [-126, 140],
        [-115, 140],
        [-104, 140],
        [-148, 107],
        [-148, 118],
        [-148, 129],
        [-60, 140],
        [-49, 140],
        [-38, 140],
        [-27, 140],
        [-16, 140],
        [-5, 140],
        [6, 140],
        [17, 140],
        [28, 140],
        [-5, 107],
        [-5, 118],
        [-5, 129],
        [50, 140],
        [61, 140],
        [72, 140],
        [83, 140],
        [94, 140],
        [105, 140],
        [116, 140],
        [116, 107],
        [116, 118],
        [116, 129],
        [-269, 206],
        [-258, 206],
        [-247, 206],
        [-236, 206],
        [-225, 206],
        [-214, 206],
        [-192, 206],
        [-181, 206],
        [-170, 206],
        [-159, 206],
        [-148, 206],
        [-137, 206],
        [-126, 206],
        [-115, 206],
        [-104, 206],
        [-104, 151],
        [-104, 162],
        [-104, 173],
        [-104, 184],
        [-104, 195],
        [-60, 206],
        [-49, 206],
        [-38, 206],
        [-27, 206],
        [-16, 206],
        [-5, 206],
        [6, 206],
        [17, 206],
        [28, 206],
        [-60, 151],
        [-60, 162],
        [-60, 173],
        [-60, 184],
        [-60, 195],
        [-93, 173],
        [-82, 173],
        [-71, 173],
        [50, 206],
        [61, 206],
        [72, 206],
        [83, 206],
        [94, 206],
        [105, 206],
        [116, 206],
        [116, 151],
        [116, 162],
        [116, 173],
        [116, 184],
        [116, 195]
        ];

        for (var i = 0; i < this.array.length; i++) {
            this.spawnNewBeanDot(cc.v2(this.array[i][0], this.array[i][1]));
        }
        this.remainingBeanDot = this.array.length;//计算剩余豆点
        this.array1 = [[-280, -245],//特殊豆点
        [116, -245],
        [-280, 206],
        [116, 206]
        ];

        for (var j = 0; j < this.array1.length; j++) {
            this.spawnNewBeanDot1(cc.v2(this.array1[j][0], this.array1[j][1]));
        }
        this.remainingBeanDot += this.array1.length;//加上特殊豆点的数量

        this.score = 0;//分数
        //读取本地存储的最高分
        this.highestScore = JSON.parse(cc.sys.localStorage.getItem("highestScore"));
        if (!this.highestScore) {//没有记录，初始化为0
            this.highestScore = {
                highestScoreData: 0
            };
            cc.sys.localStorage.setItem("highestScore", JSON.stringify(this.highestScore));
        }
        this.highestScoreDisplay.string = "HighestScore：" + this.highestScore.highestScoreData;

        this.kills = 0;//记录吃掉幽灵的次数
    },

    start() {
        cc.director.pause();//没有做过渡场景，直接暂停
    },

    // update (dt) {},
    spawnNewBeanDot: function (beanDotPosition) {
        // 使用给定的模板在场景中生成一个新节点
        var newBeanDot = cc.instantiate(this.beanDotPrefab);
        // 将新增的节点添加到 prefab 节点下面
        this.prefab.addChild(newBeanDot);
        // 为豆点设置一个位置
        newBeanDot.setPosition(beanDotPosition);//this.getNewBeanDotPosition()
        // 在豆点组件上暂存 Game 对象的引用
        newBeanDot.getComponent('BeanDot').game = this;
    },
    spawnNewBeanDot1: function (specificbeanDotPosition) {
        // 使用给定的模板在场景中生成一个新节点
        var newBeanDot1 = cc.instantiate(this.specificBeanDotPrefab);
        // 将新增的节点添加到 prefab 节点下面
        this.prefab.addChild(newBeanDot1);
        // 为特殊豆点设置一个位置
        newBeanDot1.setPosition(specificbeanDotPosition);//this.getNewBeanDotPosition()
        // 在特殊豆点组件上暂存 Game 对象的引用
        newBeanDot1.getComponent('SpecificDot').game = this;
    },
    gainScore: function (value) {
        this.score += value;
        // 更新 scoreDisplay Label 的文字
        this.scoreDisplay.string = 'Score: ' + this.score;
        if (this.score > this.highestScore.highestScoreData) {//如果超过最高分，则一起更新
            this.highestScore.highestScoreData = this.score;
            this.highestScoreDisplay.string = "HighestScore：" + this.highestScore.highestScoreData;
            cc.sys.localStorage.setItem("highestScore", JSON.stringify(this.highestScore));
        }
        if (value == 1) {
            this.remainingBeanDot--;
            if (this.remainingBeanDot == 0) {//游戏胜利
                this.winSm = cc.audioEngine.play(this.victorySm, false, 0.5);
                cc.director.pause();
                setTimeout("cc.director.loadScene('Win');", 500);
            }
        } else {//吃掉幽灵
            this.kills++;
            switch (this.kills) {//播放杀敌音效
                case 1:
                    this.firstSm = cc.audioEngine.play(this.firstKillSm, false, 1);
                    break;
                case 2:
                    this.doubleSm = cc.audioEngine.play(this.doubleKillSm, false, 1);
                    break;
                case 3:
                    this.tribleSm = cc.audioEngine.play(this.killingSpreeSm, false, 1);
                    break;
                case 4:
                    this.quadrupleSm = cc.audioEngine.play(this.dominatingSm, false, 1);
                    break;
                default:
                    this.pentupleSm = cc.audioEngine.play(this.megaKillSm, false, 1);
                    this.kills--;
                    break;
            }
        }
    },
    pauseGame: function () {
        cc.director.pause();
    },
    resumeGame: function () {
        cc.director.resume();
    },
    exitGame: function () {
        cc.game.end();
    },
    restartGame: function () {
        cc.director.loadScene("Main");
    }
});
