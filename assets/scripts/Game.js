cc.Class({
    extends: cc.Component,

    properties: {
        debug: {
            default: false,
            type: cc.Boolean
        },
        balls: {
            default: null,
            type: cc.Node
        },
        whiteBall: {
            default: null,
            type: cc.Node
        }
    },

    judgeGameState() {
        for (let i = 0; i < this.balls.children.length; i++) {
            if (this.balls.children[i].getComponent("Ball").value == 8 &&
                !this.balls.children[i].active) {
                this.reset()
                return
            }
        }

        for (let i = 0; i < this.balls.children.length; i++) {
            if (this.balls.children[i].active) {
                return
            }
        }

        this.reset()
    },

    reset() {
        this.gameState = false
        this.schedule(() => {
            this.gameState = true
            this.whiteBall.getComponent("WhiteBall").reset()
            this.balls.children.map((val, index) => {
                val.getComponent("Ball").reset()
            })
        }, 1, 1)
    },

    onLoad() {
        this.gameState = true

        cc.director.getPhysicsManager().enabled = true
        cc.director.getPhysicsManager().gravity = cc.v2()
        if (this.debug) {
            cc.director.getPhysicsManager().debugDrawFlags =
                cc.PhysicsManager.DrawBits.e_aabbBit |
                cc.PhysicsManager.DrawBits.e_pairBit |
                cc.PhysicsManager.DrawBits.e_centerOfMassBit |
                cc.PhysicsManager.DrawBits.e_jointBit |
                cc.PhysicsManager.DrawBits.e_shapeBit
        } else {
            cc.director.getPhysicsManager().debugDrawFlags = 0
        }
    },

    start() {},

    update(dt) {
        if (this.gameState) {
            this.judgeGameState()
        }
    },
});