window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let fl = 300;
    let cards = [];
    let numCards = 21;

    for (let i = 0; i < numCards; i += 1) {
        let card = {
            x: utils.randomRange(-1000, 1000),
            y: utils.randomRange(-1000, 1000),
            z: utils.randomRange(0, 5000),
            img: document.createElement('img')
        };
        card.img.src = `postcard${i % 7}.jpg`;
        cards.push(card);
    }

    context.translate(width / 2, height / 2);
    context.font = '200px Arial';

    update();

    function update() {
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

            card.z -= 5;
            if (card.z < 0) {
                card.z = 5000;
            }
        }
        requestAnimationFrame(update);
    }

    function zsort(cardA, cardB) {
        return cardB.z - cardA.z;
    }
}