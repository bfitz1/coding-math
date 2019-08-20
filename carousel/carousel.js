window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let fl = 300;
    let cards = [];
    let numCards = 7;
    let centerZ = 1000;
    let radius = 1000;
    let baseAngle = 0;
    let rotationSpeed = 0.01;

    for (let i = 0; i < numCards; i += 1) {
        let card = {
            y: 0,
            angle: Math.PI * 2 / numCards * i,
            img: document.createElement('img')
        };
        card.img.src = `postcard${i}.jpg`;
        card.x = Math.cos(card.angle + baseAngle) * radius;
        card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
        cards.push(card);
    }

    context.translate(width / 2, height / 2);
    context.font = '200px Arial';

    document.body.addEventListener('mousemove', function(event) {
        rotationSpeed = (event.clientX - width / 2) * 0.00005;
    });

    update();

    function update() {
        baseAngle += rotationSpeed;
        cards.sort(zsort);
        context.clearRect(-width / 2, -height / 2, width, height);
        for (let i = 0; i < numCards; i += 1) {
            let card = cards[i];
            let perspective = fl / (fl + card.z);

            context.save();
            context.scale(perspective, perspective);
            context.translate(card.x, card.y);

            context.translate(-card.img.width / 2, -card.img.height / 2);
            context.drawImage(card.img, 0, 0);

            context.restore();

            card.x = Math.cos(card.angle + baseAngle) * radius;
            card.z = centerZ + Math.sin(card.angle + baseAngle) * radius;
        }
        requestAnimationFrame(update);
    }

    function zsort(cardA, cardB) {
        return cardB.z - cardA.z;
    }
}