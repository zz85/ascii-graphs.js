const { histogram_format, clear_and_log, log, spark_line, clear_lines } = require('./');

const sorter = (a, b) => a - b;
/*
 * Binning strategies
 */


const unique = (key) => key;
const unique_ints = (key) => key | 0;
const unique_100s = (key) => key / 100 | 0;

const power_two = (value) => {
    var pow = 0;
    var next = 1;

    while (true) {
        if (value < next) {
            return pow;
        }

        pow = next;
        next = next * 2;
    }
}

const golden = (value) => {
    var pow = 0;
    var next = 1;

    while (true) {
        if (value < next) {
            return pow | 0;
        }

        pow = next;
        next = next * 1.6;
    }
}

// these new post processing from getting all data first
const ten_bins = () => {
    // diff = max - min
    // bin = diff / 10
    // (value - min) / bins +
};

console.log(0, power_two(0));
console.log(1, power_two(1));
console.log(2, power_two(2));
console.log(3, power_two(3));
console.log(4, power_two(4));
console.log(7, power_two(7));
console.log(8, power_two(8));

class Bins {
    constructor(binner) {
        this.map = new Map();
        // this.binner = binner;
        this.binner = golden // unique // power_two; // unique_ints // unique_100s
    }

    add(value) {
        var key = this.binner(value);

        if (!this.map.has(key)) {
            this.map.set(key, 0);
        }

        this.map.set(key, this.map.get(key) + 1);
    }

    data() {
        return [...this.map.keys()].sort(sorter).map(key => ({
            label: `Bin: ${key}`,
            value: this.map.get(key) || 0
        }));

        // we could use a generic iterator over keys, plus custom label,
        // otherwise use a custom data gatherer
        var max = Math.max(...this.map.keys());

        var data = [];
        var current = 1;
        while (current < max) {
            data.push({
                label: `${current} - ${current * 2 - 1}`,
                value: this.map.get(current) || 0
            });
            current *= 2;
        }

        return data;
    }
}


const stdin = process.stdin;
let data = [];

stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
    var lines = chunk.split('\n');
    lines.forEach(line => {
        if (!line) return;
        data.push(line | 0);
    });

    console.log('chunk', lines)
});

stdin.on('end', function () {
    console.log("Processed " + data.length + " lines");

    // data.sort(sorter);

    // var percentiles = [];
    // for (var i = 0; i <= 1; i += 0.10) {
    //     percentiles.push({
    //         label: 'p' + (i * 100).toFixed(0),
    //         value: data[(data.length - 1) * i | 0],
    //     });
    // }

    // console.log(percentiles);

    // var formatted = histogram_format(percentiles);
    // console.log('histogram percentiles');
    // console.log(formatted.join('\n'));

    var count = new Bins();
    data.forEach(v => {
        count.add(v);
    });

    console.log('count', count);

    var histo = count.data();

    console.log(histo);

    var formatted = histogram_format(histo);
    console.log('histo');
    console.log(formatted.join('\n'));
});

stdin.on('error', console.error);

