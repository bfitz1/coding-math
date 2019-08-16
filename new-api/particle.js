function Particle(x, y, vx, vy, gravity, mass, radius, bounce, friction, springs, gravitations) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.gravity = gravity;
    this.mass = mass;
    this.radius = radius;
    this.bounce = bounce;
    this.friction = friction;
    this.springs = springs;
    this.gravitations = gravitations;
}

Particle.fromParts = function(x, y, speed, direction, gravity, mass, radius, bounce, friction, springs, gravitations) {
    return new Particle(
        x,
        y,
        Math.cos(direction) * speed,
        Math.sin(direction) * speed,
        gravity || 0,
        mass || 1,
        radius || 0,
        bounce || -1,
        friction || 1,
        springs || [],
        gravitations || []
    );
}

Particle.prototype.addGravitation = function(p) {
    this.removeGravitation(p);
    this.gravitations.push(p);
}

Particle.prototype.removeGravitation = function(p) {
    for (let i = 0; i < this.gravitations.length; i += 1) {
        if (p === this.gravitations[i]) {
            this.gravitations.splice(i, 1);
            return;
        }
    }
}

Particle.prototype.addSpring = function(point, k, length) {
    this.removeSpring(point);
    this.springs.push({
        point: point,
        k: k,
        length: length || 0
    });
}

Particle.prototype.removeSpring = function(point) {
    for (let i = 0; i < this.springs.length; i += 1) {
        if (point === this.springs[i].point) {
            this.springs.splice(i, 1);
            return;
        }
    }
}

Particle.prototype.getSpeed = function() {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
}

Particle.prototype.setSpeed = function(speed) {
    let heading = this.getHeading();
    this.vx = Math.cos(heading) * speed;
    this.vy = Math.sin(heading) * speed;
}

Particle.prototype.getHeading = function() {
    return Math.atan2(this.vy, this.vx);
}

Particle.prototype.setHeading = function(heading) {
    let speed = this.getSpeed();
    this.vx = Math.cos(heading) * speed;
    this.vy = Math.sin(heading) * speed;
}

Particle.prototype.update = function() {
    this.handleSprings();
    this.handleGravitations();
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

Particle.prototype.handleGravitations = function() {
    for (let i = 0; i < this.gravitations.length; i += 1) {
        this.gravitateTo(this.gravitations[i]);
    }
}

Particle.prototype.handleSprings = function() {
    for (let i = 0; i < this.springs.length; i += 1) {
        let spring = this.springs[i];
        this.springTo(spring.point, spring.k, spring.length);
    }
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

Particle.prototype.springTo = function(point, k, length) {
    let dx = point.x - this.x;
    let dy = point.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let springForce = (distance - length || 0) * k;
    this.vx += dx / distance * springForce;
    this.vy += dy / distance * springForce;
}