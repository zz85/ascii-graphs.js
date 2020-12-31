// test cpu usage

var os = require('os');

var {
    // charting apis
    histogram_format,
    spark_line,

    // CLI tools
    log,
    clear_lines,
    clear_and_log,
} = require('./');

var POLL = .3 * 1000; // poll every .3 seconds

var cpu_history;
var last;
var last_time = Date.now();
var MAX_BUFFER = 40;



setInterval(() => {
    var mem = histogram_format([os.totalmem() - os.freemem()], { max: os.totalmem(), chart_width: 30 });
    console.log('Memory usage');
    log(mem);

    console.log('CPU Usage')

    var current = os.cpus().map(info => {
        var { user, nice, sys, idle, irq, } = info.times;
        return { idle, total: user + nice + sys + idle + irq };
    });

    if (!last) {
        last = current;
        last_time = Date.now();
        cpu_history = last.map(_ => new Array(MAX_BUFFER).fill(0))
        Array(current.length * 2 + 2).fill().forEach(() => console.log())
        return;
    };

    var diff = (Date.now() - last_time);
    var values = current.map((current, i) => {
        var prev = last[i];
        return 1 - (current.idle - prev.idle) / (current.total - prev.total);
    });

    clear_lines(values.length * 2 + 4)

    // instantanous
    var lines = histogram_format(values, { max: 1, chart_width: 20 });
    log(lines);

    console.log('Trend lines')

    values.forEach((v, i) => {
        var trend = cpu_history[i];
        trend.unshift(v);

        if (trend.length > MAX_BUFFER) trend.pop();

        // 
        var spark = spark_line(trend); // relative version
        var spark = spark_line(trend, { max: 1 }); // absolute version
        console.log(spark);
    });


    last = current;
    last_time = Date.now();
}, POLL)

