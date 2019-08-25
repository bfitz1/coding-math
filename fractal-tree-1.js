window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let p0 = {
        x: width / 2,
        y: height - 50
    };
    let p1 = {
        x: width / 2,
        y: 50
    };
    let branchAngleA = utils.randomRange(-Math.PI / 2, Math.PI / 2);
    let branchAngleB = utils.randomRange(-Math.PI / 2, Math.PI / 2);
    let trunkRatio = utils.randomRange(0.25, 0.75);

    tree(p0, p1, 8);

    function tree(p0, p1, limit) {
        let dx = p1.x - p0.x;
        let dy = p1.y - p0.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let angle = Math.atan2(dy, dx);
        let branchLength = dist * (1 - trunkRatio);
        let pA = {
            x: p0.x + dx * trunkRatio,
            y: p0.y + dy * trunkRatio
        };
        let pB = {
            x: pA.x + Math.cos(angle + branchAngleA) * branchLength,
            y: pA.y + Math.sin(angle + branchAngleA) * branchLength
        };
        let pC = {
            x: pA.x + Math.cos(angle - branchAngleB) * branchLength,
            y: pA.y + Math.sin(angle - branchAngleB) * branchLength
        };

        context.beginPath();
        context.moveTo(p0.x, p0.y);
        context.lineTo(pA.x, pA.y);
        context.stroke();

        if (limit > 0) {
            tree(pA, pB, limit - 1);
            tree(pA, pC, limit - 1);
        } else {
            context.beginPath();
            context.moveTo(pB.x, pB.y);
            context.lineTo(pA.x, pA.y);
            context.lineTo(pC.x, pC.y);
            context.stroke();
        }

        branchAngleA += utils.randomRange(-0.02, 0.02);
        branchAngleB += utils.randomRange(-0.02, 0.02);
        trunkRatio += utils.randomRange(-0.02, 0.02);
    }
}