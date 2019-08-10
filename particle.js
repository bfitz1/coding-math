function Particle(position, velocity, gravity) {
    this.position = position;
    this.velocity = velocity;
    this.gravity = gravity;
}

Particle.fromParts = function(x, y, speed, direction, gravity) {
    return new Particle(
        new Vector(x, y),
        Vector.fromPolar(speed, direction),
        new Vector(0, gravity || 0)
    );
}

Particle.prototype.update = function() {
    this.velocity.addTo(this.gravity);
    this.position.addTo(this.velocity);
}

Particle.prototype.accelerate = function(accel) {
    this.velocity.addTo(accel);
}

