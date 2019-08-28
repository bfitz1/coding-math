const FKSystem = {
    of(x = 0, y = 0) {
        return Object.assign(
            Object.create(FKSystem.prototype),
            { arms: [], x, y, phase: 0, speed: 0.05 }
        );
    },

    prototype: {
        addArm(length, centerAngle, rotationRange, phaseOffset) {
            let arm = Arm.of(length, centerAngle, rotationRange, phaseOffset)
            this.arms.push(arm);
            if (this.lastArm) {
                arm.parent = this.lastArm;
            }
            this.lastArm = arm;
            this.update();
        },

        update() {
            for (let i = 0; i < this.arms.length; i += 1) {
                let arm = this.arms[i];
                arm.setPhase(this.phase);
                if (arm.parent) {
                    arm.x = arm.parent.getEndX();
                    arm.y = arm.parent.getEndY();
                } else {
                    arm.x = this.x;
                    arm.y = this.y;
                }
            }
            this.phase += this.speed;
        },

        render(context) {
            for (let i = 0; i < this.arms.length; i += 1) {
                this.arms[i].render(context);
            }
        },

        rotateArm(index, angle) {
            this.arms[index].angle = angle
        }
    }
}