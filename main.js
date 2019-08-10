let v1 = new Vector(10, 5);

console.log("Basic attributes and methods on a vector")
console.log(`x: ${v1.x}, y: ${v1.y}, angle: ${v1.getAngle()}, length: ${v1.getLength()}`);

console.log("Setting attributes on a vector")
console.log("angle -> Math.PI / 6");
v1.setAngle(Math.PI / 6);
console.log("length -> 100");
v1.setLength(100);
console.log(`x: ${v1.x}, y: ${v1.y}`);

console.log("Vector addition");
let w1 = new Vector(10, 5);
let w2 = new Vector(3, 4);
let w3 = w1.add(w2);
console.log(`x: ${w1.x}, y: ${w1.y}`);

console.log("Scalar vector multiplicatoin")
let u1 = new Vector(10, 5);
console.log(`length: ${u1.getLength()}`);
let u2 = u1.mul(2);
console.log(`length: ${u2.getLength()}`);