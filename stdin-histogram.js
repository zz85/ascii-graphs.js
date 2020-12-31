const { histogram_format, clear_and_log, log, spark_line, clear_lines } = require('./');

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

    data.sort((a, b) => a - b);

    var percentiles = [];
    for (var i = 0; i <= 1; i += 0.10) {
        percentiles.push({
            label: 'p' + (i * 100).toFixed(0),
            value: data[(data.length - 1) * i | 0],
        });
    }

    console.log(percentiles);

    var formatted = histogram_format(percentiles);
    console.log('histogram percentiles');
    console.log(formatted.join('\n'));
});

stdin.on('error', console.error);

