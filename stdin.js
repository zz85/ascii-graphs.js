const  { histogram_format, clear_and_log, log, spark_line, clear_lines } = require('./');

const stdin = process.stdin;
let data = [];

stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
    var lines = chunk.split('\n');
    lines.forEach(line => {
        if (!line) return;
        data.push(line | 0);
    });

    // console.log('chunk', lines)
});

stdin.on('end', function () {
    console.log("Processed " + data.length + " lines");

    var formatted = histogram_format(data);
    console.log(formatted.join('\n'));
});

stdin.on('error', console.error);

