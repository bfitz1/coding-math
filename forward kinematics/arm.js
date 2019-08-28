const Arm = {
    of(length = 100, centerAngle = 0, rotationRange = Math.PI / 4, phaseOffset = 0) {
        return Object.assign(Object.create(Arm.prototype), { 
            x: 0, y: 0,
            length,
            angle: 0,
            centerAngle,
            rotationRange,
            phaseOffset
        });
    },

    prototype: {
        setPhase(phase) {
            this.angle = this.centerAngle + Math.sin(phase + this.phaseOffset) * this.rotationRange;
        },

        getEndX() {
            let angle = this.angle;
            let parent = this.parent;
            while (parent) {
                angle += parent.angle;
                parent = parent.parent;
            }
            return this.x + Math.cos(angle) * this.length;
        },
        getEndY() {
            let angle = this.angle;
            let parent = this.parent;
            while (parent) {
                angle += parent.angle;
                parent = parent.parent;
            }
            return this.y + Math.sin(angle) * this.length;
        },
        render(context) {
            context.strokeStyle = '#000';
            context.lineWidth = 5;
            context.beginPath();
            context.moveTo(this.x, this.y);
            context.lineTo(this.getEndX(), this.getEndY());
            context.stroke();
        }
    }
}