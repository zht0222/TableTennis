cc.Class({
    extends: cc.Component,

    properties: {
        power: {
            default: 80,
            type: cc.Float
        },
    },

    shoot(target) {
        let dir = cc.pSub(target, this.node.getPosition())
        let powerX = dir.x * this.power
        let powerY = dir.y * this.power
        let body = this.getComponent(cc.RigidBody)
        body.applyLinearImpulse(cc.p(powerX, powerY), this.node.convertToWorldSpaceAR(cc.p(0, 0)), true)
    },

    // onLoad () {},

    start() {

    },

    // update (dt) {},
    onBeginContact(contact, selfCollider, otherCollider) {
        if (otherCollider.node.groupIndex == 5) {
            this.node.active = false
        }
    }
});