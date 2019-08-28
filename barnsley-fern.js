window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let rules = [
        {
            a:  0.85,
            b:  0.04,
            c: -0.04,
            d:  0.85,
            tx: 0,
            ty: 1.6,
            weight: 0.85,
            color: 'red'
        },
        {
            a: -0.15,
            b:  0.28,
            c:  0.26,
            d:  0.24,
            tx: 0,
            ty: 0.44,
            weight: 0.07,
            color: 'green'
        },
        {
            a:  0.2,
            b: -0.26,
            c:  0.23,
            d:  0.22,
            tx: 0,
            ty: 1.6,
            weight: 0.07,
            color: 'blue'
        },
        {
            a:  0,
            b:  0,
            c:  0,
            d:  0.16,
            tx: 0,
            ty: 0,
            weight: 0.01,
            color: 'yellow'
        }
    ];

    let x = Math.random();
    let y = Math.random();

    context.translate(width / 2, height);
    iterate();
    
    function iterate() {
        for (let i = 0; i < 100; i += 1) {
            let rule = getRule();
            let x1 = x * rule.a + y * rule.b + rule.tx;
            let y1 = x * rule.c + y * rule.d + rule.ty;

            x = x1;
            y = y1;
            plot(x, y, rule.color);
        }
        requestAnimationFrame(iterate);
    }

    function getRule() {
        let rand = Math.random();
        for (let i = 0; i < rules.length; i += 1) {
            let rule = rules[i];
            if (rand < rule.weight) {
                return rule;
            }
            rand -= rule.weight;
        }
    }

    function plot(x, y, color) {
        // context.fillStyle = color;
        context.fillRect(x * 50, -y * 50, 0.5, 0.5);
    }
}