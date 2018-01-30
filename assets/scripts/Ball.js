cc.Class({
    extends: cc.Component,

    properties: {
        value: {
            default: 0,
            type: cc.Integer
        },
    },

    reset() {
        this.node.active = true
        this.node.x = this.nodeX
        this.node.y = this.nodeY
        this.body.angularVelocity = 0
        this.body.linearVelocity = cc.p(0)
    },

    // onLoad () {},

    start() {
        this.nodeX = this.node.x
        this.nodeY = this.node.y
        this.body = this.getComponent(cc.RigidBody)
    },

    // update (dt) {},

    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.groupIndex == 2) {
            this.node.active = false
        }
    }
});