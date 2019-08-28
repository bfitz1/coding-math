const Arm = {
    of(x = 0, y = 0, length = 100, angle = 0) {
        let base = Object.create(Arm.prototype)
        return Object.assign(base, { x, y, length, angle  });
    },

    prototype: {
        getEndX() {
            return this.x + Math.cos(this.angle) * this.length;
        },

        getEndY() {
            return this.y + Math.sin(this.angle) * this.length;
        },

        render(context) {
            context.strokeStyle = '#000';
            context.lineWidth = 5;
            context.beginPath();
            context.moveTo(this.x, this.y);
            context.lineTo(this.getEndX(), this.getEndY());
            context.stroke();
        },

        pointAt(x, y) {
            let dx = x - this.x;
            let dy = y - this.y;
            this.angle = Math.atan2(dy, dx);
        },

        drag(x, y) {
            this.pointAt(x, y);
            this.x = x - Math.cos(this.angle) * this.length;
            this.y = y - Math.sin(this.angle) * this.length;
            if (this.parent) {
                this.parent.drag(this.x, this.y);
            }
        }
    }
}