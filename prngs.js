// Middle-square method
// https://en.wikipedia.org/wiki/Middle-square_method

const ms = {
    create: function(digits, seed) {
        let obj = Object.create(ms.prototype);
        return Object.assign(obj, { digits, seed });
    },

    default: ms.create(10, 1234567890),

    prototype: {
        nextRand: function() {
            let str = `${this.seed * this.seed}`;
            str = str.padStart(this.digits * 2 - str.length, '0');

            let start = Math.floor(this.digits / 2);
            let end = start + this.digits;

            this.seed = parseInt(str.substring(start, end));
            return seed;
        },

        nextRandFloat: function() {
            return this.nextRand() / parseInt(''.padStart(this.digits, '9'));
        }
    }
}

// Linear congruential generator
// https://en.wikipedia.org/wiki/Linear_congruential_generator
const lcg = {
    create: function(multiplier, increment, modulus, seed) {
        let obj = Object.create(lcg.prototype);
        return Object.assign(obj, { multiplier, increment, modulus, seed });
    },

    default: lcg.create(1664525, 1013904223, Math.pow(2, 32), 12234),

    prototype: {
        nextRand: function() {
            this.seed = (this.multiplier * this.seed + this.increment) % this.modulus;
            return seed;
        },

        nextRandFloat: function() {
            return this.nextRand() / this.modulus;
        }
    }
}
