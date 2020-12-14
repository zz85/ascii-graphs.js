
/// Themes
var standard_chars = "█▉▊▋▌▍▎▏".split('');

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


var standard_theme = make_standard_theme(standard_chars);
// tribute to jim roskind - this is what you see when you visit chrome://histograms/
var jim_theme = make_basic_theme('-', 'o', { chart_width: 60, divider: '' });

var Themes = {
    standard: standard_theme,
    jim: jim_theme,
    equals: make_basic_theme('=', ']', { chart_width: 30 }),
    stars: make_basic_theme('*', ' '),
    pipes: make_standard_theme(['|'], { chart_width: 60 }),
    sparks: make_standard_theme("█▇▆▅▄▃▁".split(''), { chart_width: 1 }),
};

var times = (x) => new Array(x).fill(0);;
function fit(v, w) {
    w = w || 10;
    return Array(w - v.length + 1).join(' ') + v;
}

function histogram_format(data, theme, options) {
    if (theme && theme.length) {
        theme = Themes[theme];
    } else {
        options = theme;
        theme = null
    }

    options = Object.assign({}, theme || standard_theme, options)

    // data is of array [0, 1, ..., n]
    // or in future [{ value, label }]

    var values = data;
    // normalize min..max TODO make this customizable
    var min = Math.min(...values, 0);
    var max = Math.max(...values) - min;
    values = values.map(v => v - min);
    var sum = values.reduce((x, y) => x + y, 0);

    var {
        block_formatter,
        last_formatter,
        chart_width,
        divider,
    } = options;

    var lines = values.map((v, i) => {
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
    });

    return lines;
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

module.exports = {
    histogram_format,
    clear_and_log,
    log,
};