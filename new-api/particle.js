function Particle(x, y, vx, vy, gravity, mass, radius, bounce, friction) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.gravity = gravity;
    this.mass = mass;
    this.radius = radius;
    this.bounce = bounce;
    this.friction = friction;
}

Particle.fromParts = function(x, y, speed, direction, gravity, mass, radius, bounce, friction) {
    return new Particle(
        x,
        y,
        Math.cos(direction) * speed,
        Math.sin(direction) * speed,
        gravity || 0,
        mass || 1,
        radius || 0,
        bounce || -1,
        friction || 1
    );
}

Particle.prototype.angleTo = function(p2) {
    return Math.atan2(p2.y - this.y, p2.x - this.x);
}

Particle.prototype.distanceTo = function(p2) {
    let dx = p2.x - this.x;
    let dy = p2.y - this.y;

    return Math.sqrt(dx * dx + dy * dy);
}

Particle.prototype.gravitateTo = function(p2) {
    let dx = p2.x - this.x;
    let dy = p2.y - this.y;
    let distSQ = dx * dx + dy * dy;
    let dist = Math.sqrt(distSQ);
    let force = p2.mass / distSQ;
    let ax = dx / dist * force;
    let ay = dy / dist * force;

    this.vx += ax;
    this.vy += ay;
}

Particle.prototype.update = function() {
    this.vx *= this.friction;
    this.vy *= this.friction;
    this.vy += this.gravity;
    this.x += this.vx;
    this.y += this.vy;
}

Particle.prototype.accelerate = function(ax, ay) {
    this.vx += ax;
    this.vy += ay;
}