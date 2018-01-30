cc.Class({
    extends: cc.Component,

    properties: {
        cue: {
            default: null,
            type: cc.Node
        },
        minLength: {
            default: 20,
            type: cc.Float
        }
    },

    showCue(e) {
        let touchP = e.getLocation()
        let p = this.node.parent.convertToNodeSpaceAR(touchP)
        let ballP = this.node.getPosition()
        let dir = cc.pSub(p, ballP)
        let len = cc.pLength(dir)

        if (len < this.minLength) {
            this.cue.active = false
            return
        }

        this.cue.active = true
        this.cue.setPosition(p)
        let degree = Math.atan2(dir.x, dir.y) * 180 / Math.PI
        this.cue.rotation = degree + 90
    },

    swingCue(e) {
        if (!this.cue.active) {
            return
        }
        this.cue.getComponent("Cue").shoot(this.node.getPosition())
    },

    reset() {
        this.node.scale = 1
        this.node.x = this.nodeX
        this.node.y = this.nodeY
        this.body.angularVelocity = 0
        this.body.linearVelocity = cc.p(0)
    },

    onLoad() {
        this.nodeX = this.node.x
        this.nodeY = this.node.y
        this.body = this.getComponent(cc.RigidBody)
    },

    start() {
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.showCue, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.swingCue, this)
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.swingCue, this)
    },

    // update (dt) {},

    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.groupIndex == 2) {
            this.node.scale = 0
            this.schedule(this.reset, 1, 1)
        }
    }
});