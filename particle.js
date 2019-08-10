function Particle(position, velocity, gravity, mass, radius, bounce) {
    this.position = position;
    this.velocity = velocity;
    this.gravity = gravity;
    this.mass = mass;
    this.radius = radius;
    this.bounce = bounce;
}

Particle.fromParts = function(x, y, speed, direction, gravity, mass, radius, bounce) {
    return new Particle(
        new Vector(x, y),
        Vector.fromPolar(speed, direction),
        new Vector(0, gravity || 0),
        mass || 1,
        radius || 0,
        bounce || -1,
    );
}

Particle.prototype.angleTo = function(p2) {
    return Math.atan2(
        p2.position.y - this.position.y,
        p2.position.x - this.position.x
    );
}

Particle.prototype.distanceTo = function(p2) {
    let dx = p2.position.x - this.position.x;
    let dy = p2.position.y - this.position.y;

    return Math.sqrt(dx * dx + dy * dy);
}

Particle.prototype.gravitateTo = function(p2) {
    let dist = this.distanceTo(p2)
    let grav = Vector.fromPolar(p2.mass / (dist * dist), this.angleTo(p2));

    this.velocity.addTo(grav);
}

Particle.prototype.update = function() {
    this.velocity.addTo(this.gravity);
    this.position.addTo(this.velocity);
}

Particle.prototype.accelerate = function(accel) {
    this.velocity.addTo(accel);
}

