window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let tileWidth = 100;
    let tileHeight = 50;

    context.translate(width / 2, 200)

    let tileGrid = [
        ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'],
        ['blue', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'blue'],
        ['blue', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'blue'],
        ['blue', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'blue'],
        ['blue', 'red', 'red', 'red', 'yellow', 'yellow', 'red', 'red', 'red', 'blue'],
        ['blue', 'red', 'red', 'red', 'yellow', 'yellow', 'red', 'red', 'red', 'blue'],
        ['blue', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'blue'],
        ['blue', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'blue'],
        ['blue', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'red', 'blue'],
        ['blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'],
    ]

    let blockGrid = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 2, 2, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]

    for (let y = 0; y < blockGrid.length; y += 1) {
        let row = blockGrid[y];
        for (let x = 0; x < row.length; x += 1) {
            drawBlock(x, y, row[x]);
        }
    }
    
    function drawBlock(x, y, z) {
        let top = "#eeeeee";
        let right = "#cccccc";
        let left = "#999999";

        context.save();
        context.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);

        // draw top
        context.beginPath();
        context.moveTo(0, -z * tileHeight);
        context.lineTo(tileWidth / 2, tileHeight / 2 - z * tileHeight);
        context.lineTo(0, tileHeight - z * tileHeight);
        context.lineTo(-tileWidth / 2, tileHeight / 2 - z * tileHeight);
        context.closePath();
        context.fillStyle = top;
        context.fill();

        // draw left
        context.beginPath()
        context.moveTo(-tileWidth / 2, tileHeight / 2 - z * tileHeight);
        context.lineTo(0, tileHeight - z * tileHeight);
        context.lineTo(0, tileHeight);
        context.lineTo(-tileWidth / 2, tileHeight / 2);
        context.closePath();
        context.fillStyle = left;
        context.fill();

        // draw right
        context.beginPath()
        context.moveTo(tileWidth / 2, tileHeight / 2 - z * tileHeight);
        context.lineTo(0, tileHeight - z * tileHeight);
        context.lineTo(0, tileHeight);
        context.lineTo(tileWidth / 2, tileHeight / 2);
        context.closePath();
        context.fillStyle = right;
        context.fill();

        context.restore();
    }

    function randomColor() {
        let r = Math.floor(Math.random() * 255);
        let g = Math.floor(Math.random() * 255);
        let b = Math.floor(Math.random() * 255);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function drawTile(x, y, color) {
        context.save();
        context.translate((x - y) * tileWidth / 2, (x + y) * tileHeight / 2);

        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(tileWidth / 2, tileHeight / 2);
        context.lineTo(0, tileHeight);
        context.lineTo(-tileWidth / 2, tileHeight / 2);
        context.closePath();
        context.fillStyle = color;
        context.fill();

        context.restore();
    }
}