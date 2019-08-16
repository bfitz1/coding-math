window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    for (let i = 0; i < 100000; i += 1) {
        let x = utils.randomDist(0, width, 5);
        let y = utils.randomDist(0, height, 5);

        context.fillRect(x, y, 1, 1);
    }
}