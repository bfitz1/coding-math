function Particle(position, velocity) {
    this.position = position;
    this.velocity = velocity;
}

Particle.fromParts = function(x, y, speed, direction) {
    return new Particle(new Vector(x, y), Vector.fromPolar(speed, direction));
}

Particle.prototype.update = function() {
    this.position.addTo(this.velocity);
}

