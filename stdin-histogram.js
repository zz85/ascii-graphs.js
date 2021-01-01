const { histogram_format, clear_and_log, log, spark_line, clear_lines } = require('./');

const sorter = (a, b) => a - b;
/*
 * Binning strategies
 */

const unique_multiple = (mul) => {
    return {
        keyer: (key) => key / mul | 0,
        labeller: (key) => {
            return `${key * mul} - ${mul * (key + 1) - 1}`
        },
    }
};


const unique = (key) => key;
const unique_ints = unique_multiple(1);
const unique_10s = unique_multiple(10);
const unique_50s = unique_multiple(50);
const unique_100s = unique_multiple(100);
const unique_1000s = unique_multiple(1000);

const power_two = {
    keyer: (value) => {
        var pow = 0;
        var next = 1;

        while (true) {
            if (value < next) {
                return pow;
            }

            pow = next;
            next = next * 2;
        }
    },
    labeller: (key) => {
        return `${key} - ${key * 2 - 1}`
    },

    generator: (map) => {
        var max = Math.max(...map.keys());

        var data = [];
        var current = 1;
        while (current < max) {
            data.push({
                label: `${current} - ${current * 2 - 1}`,
                value: map.get(current) || 0
            });
            current *= 2;
        }

        return data;
    }
}

const golden = {
    keyer: (value) => {
        var pow = 0;
        var next = 1;

        while (true) {
            if (value < next) {
                return pow | 0;
            }

            pow = next;
            next = next * 1.6;
        }
    },
    labeller: (key) => {
        return `${key | 0} - ${key * 1.6 | 0}`
    }
}



class GenericBins {
    constructor(binner) {
        this.map = new Map();
        this.binner = binner.keyer;
        this.labeller = binner.labeller || ((key) => `Bin ${key}`);
        this.generator = binner.generator;
    };

    add(value) {
        var key = this.binner(value);

        if (!this.map.has(key)) {
            this.map.set(key, 0);
        }

        this.map.set(key, this.map.get(key) + 1);
    }

    data() {
        if (this.generator) {
            return this.generator(this.map);
        }

        return [...this.map.keys()].sort(sorter).map(key => ({
            label: this.labeller(key),
            value: this.map.get(key) || 0
        }));
    }
}

// these new post processing from getting all data first
class AllBins {
    constructor() {
        this.dataset = [];
    }

    add(value) {
        this.dataset.push(value);
    }

    data() {
        console.log('implement me!');
    }
}

class TenBins extends AllBins {
    constructor() {
        super();
    }
    data() {
        var dataset = this.dataset;
        dataset.sort(sorter);

        var min = Math.min(...dataset);
        var max = Math.max(...dataset);

        var range = max - min;

        var i = 0;

        var output = [];
        for (var val = min; val <= max && i < dataset.length; val += range / 10) {
            var count = 0;
            while (dataset[i] < (val + range / 10)) {
                count++;
                i++;
            }

            output.push({
                label: `${val | 0} - ${(val + range / 10 - 1) | 0}`,
                value: count,
            });
        }

        return output;
    }
}


const stdin = process.stdin;
let data = [];

stdin.setEncoding('utf8');

var histogram = new GenericBins(unique_multiple(10000));  // golden // unique // power_two; // unique_ints // unique_100s // unique_1000s
var histogram = new TenBins();

stdin.on('data', function (chunk) {
    var lines = chunk.split('\n');
    lines.forEach(line => {
        if (!line) return;

        var value = line | 0;

        histogram.add(value);
    });

    // console.log('chunk', lines)
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


    console.log('histogram', histogram);
    var histo_data = histogram.data();


    console.log('data', histo_data);

    var formatted = histogram_format(histo_data);
    console.log('histo');
    console.log(formatted.join('\n'));
});

stdin.on('error', console.error);

