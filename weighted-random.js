window.onload = function() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    var prizes = [
        { prize: 'nothing!', chance: 8 },
        { prize: 'a gold piece', chance: 5 },
        { prize: 'a treasure chest', chance: 2 },
        { prize: 'poison', chance: 1 },
        { prize: 'food', chance: 3 }
    ]

    document.body.addEventListener('click', function() {
        let prize = getPrize();
        console.log('You won: ' + prize);
    });

    function getPrize() {
        let total = 0;

        for (let i = 0; i < prizes.length; i += 1) {
            total += prizes[i].chance;
        }

        let rand = Math.random() * total
        for (let i = 0; i < prizes.length; i += 1) {
            let prize = prizes[i];
            if (rand < prize.chance) {
                return prize.prize;
            }
            rand -= prize.chance;
        }
    }
}