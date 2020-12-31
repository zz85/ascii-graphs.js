
/* Themes */

// generates a standard theme formatter
function make_standard_theme(chars, opts) {
    var block_formatter = _ => chars[0];

    var last_formatter = (fraction) => {
        if (fraction == 0) return '';
        var index = chars.length - (fraction * chars.length | 0) - 1;
        return chars[index];
    };

    var chart_width = 4;
    var divider = '|';

    return Object.assign({
        block_formatter,
        last_formatter,
        chart_width,
        divider,
    }, opts);
}

function make_basic_theme(head, tail, opts) {
    var block_formatter = _ => head;

    var last_formatter = (fraction) => {
        return tail;
    };

    var chart_width = 20;
    var divider = '|';

    return Object.assign({
        block_formatter,
        last_formatter,
        chart_width,
        divider,
    }, opts);
}

var standard_theme = make_standard_theme("█▉▊▋▌▍▎▏".split('')); // unicode 8 divisions per character block
// tribute to jim roskind - this is what you see when you visit chrome://histograms/
var jim_theme = make_basic_theme('-', 'o', { chart_width: 60, divider: '' });
var spark_line_chars = "█▇▆▅▄▃▁".split('');

var Themes = {
    standard: standard_theme,
    jim: jim_theme,
    equals: make_basic_theme('=', ']', { chart_width: 30 }),
    stars: make_basic_theme('*', ' '),
    pipes: make_standard_theme(['|'], { chart_width: 60 }),
    sparks: make_standard_theme(spark_line_chars, { chart_width: 1 }),
    bitly: make_basic_theme('∎', ' ', { chart_width: 60 }), /* bit.ly data_hacks like */

};

var times = (x) => new Array(x).fill(0);;
function fit(v, w) {
    w = w || 10;
    w = Math.max(w, v.length);
    return Array(w - v.length + 1).join(' ') + v;
}

/* Histogram */

// data is of array [0, 1, ..., n]
// or in future [{ value, label }]
function histogram_format(data, theme, options) {
    if (theme && theme.length) {
        theme = Themes[theme];
    } else {
        options = theme;
        theme = null
    }

    options = Object.assign({}, theme || standard_theme, options)

    var values = data;
    var min = options.min || Math.min(...values, 0);
    var max = options.max || Math.max(...values);
    // normalize min..max
    max -= min;
    values = values.map(v => v - min);
    var sum = values.reduce((x, y) => x + y, 0);

    var {
        block_formatter,
        last_formatter,
        chart_width,
        divider,
    } = options;

    var value_mapper = (v, i) => {
        var chars = v / max * chart_width;
        var blocks = times(chars | 0).map(block_formatter);
        var remainder = (chars % 1);
        var tail = last_formatter(remainder);
        var bar = blocks.join('') + tail;
        var remains = chart_width - bar.length + 1;

        var percentage = (v / sum * 100).toFixed(2) + '%';
        var value = fit(v.toFixed(0), 7)
        var label = fit(`Item ${i}` + '', 10) + divider;

        // ${label}
        var str = `${value} ${divider}${bar}${Array(remains + 1).join(' ')}${divider} ${percentage}`;

        return str;
    };

    return values.map(value_mapper);
}

/* sparkline */
function spark_line(data, options) {
    options = options || {};
    var values = data;
    var min = options.min || Math.min(...values);
    var max = options.max || Math.max(...values);
    max -= min;

    values = values.map(v => v - min);
    var sum = values.reduce((x, y) => x + y, 0);
    var avg = sum / values.length;

    var {
        block_formatter,
        last_formatter,
        chart_width,
        divider,
    } = options;

    var value_mapper = (v, i) => {
        // currently support 1 row sparkline
        var fraction = v / max;
        fraction = Math.max(Math.min(1, fraction), 0); // clamp 0..1

        // if (v === 0) return ' ';

        var index = spark_line_chars.length - (fraction * spark_line_chars.length | 0) - 1;

        return spark_line_chars[index];
    };

    var chart = values.map(value_mapper).join('');
    var stats = `Min: ${min.toFixed(2)} Avg: ${avg.toFixed(2)} Max: ${(max + min).toFixed(2)}`

    return `|${chart}| ${stats}`;
}

/* CLI helpers */

var last_lines = 0;

function clear_lines(lines) {
    var up = `\u001b[${lines}A`;
    var clear_screen = '\u001b[0J';

    process.stdout.write(up + clear_screen);
}

function clear_and_log(out) {
    if (last_lines) clear_lines(last_lines);

    last_lines = out.length;
    log(out);
}

function log(lines) {
    process.stdout.write(lines.join('\n') + '\n');
}

/* Lib Exports */

(function () {
    var exports = {
        // charting apis
        histogram_format,
        spark_line,

        // CLI tools
        log,
        clear_lines,
        clear_and_log,
    };

    if (typeof module === 'undefined') {
        // browser support
        Object.assign(window, { ascii_charts: exports });
    } else {
        // nodejs support
        module.exports = exports;
    }
})();
