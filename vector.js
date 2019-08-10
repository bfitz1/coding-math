function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.setAngle = function(angle) {
    let length = this.getLength();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
}

Vector.prototype.getAngle = function() {
    return Math.atan2(this.y, this.x);
}

Vector.prototype.setLength = function(length) {
    let angle = this.getAngle();
    this.x = Math.cos(angle) * length;
    this.y = Math.sin(angle) * length;
}

Vector.prototype.getLength = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}

Vector.prototype.add = function(v2) {
    return new Vector(this.x + v2.x, this.y + v2.y);
}

Vector.prototype.sub = function(v2) {
    return new Vector(this.x - v2.x, this.y - v2.y);
}

Vector.prototype.mul = function(s) {
    return new Vector(this.x * s, this.y * s);
}

Vector.prototype.div = function(s) {
    return new Vector(this.x / s, this.y / s);
}

Vector.prototype.addTo = function(v2) {
    this.x += v2.x;
    this.y += v2.y;
}

Vector.prototype.subFrom = function(v2) {
    this.x -= v2.x;
    this.y -= v2.y;
}

Vector.prototype.mulBy = function(s) {
    this.x *= s;
    this.y *= s;
}

Vector.prototype.divBy = function(s) {
    this.x /= s;
    this.y /= s;
}