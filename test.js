var lib = require('./index');

var { histogram_format, clear_and_log, log } = lib;

var data = [0, 1, 2, 3, 4, 5];

function header(title) {
    console.log('\n' + title + '\n')
}

header('default options')
var formatted = histogram_format(data);
console.log(formatted.join('\n'));

header('thin (width = 1)')
var formatted = histogram_format(data, { chart_width: 1 });
log(formatted);

header('longer (width = 14)')
var formatted = histogram_format(data, { chart_width: 14 });
log(formatted);

data = data.map(_ => Math.random() * 1000);
header('random data + standard theme')
var formatted = histogram_format(data);
log(formatted);

header('jim theme')
var formatted = histogram_format(data, 'jim');
log(formatted);

header('equals theme')
var formatted = histogram_format(data, 'equals');
log(formatted);

header('stars theme')
var formatted = histogram_format(data, 'stars');
log(formatted);

header('pipes theme')
var formatted = histogram_format(data, 'pipes');
log(formatted);

header('sparks theme')
var formatted = histogram_format(data, 'sparks');
log(formatted);

header('loop');
var i = 0;

function loop() {
    i++;
    if (i == 20) return;

    data = data.map(v => v + Math.random() * 40);
    var formatted = histogram_format(data, { chart_width: 30 });
    clear_and_log(formatted);

    setTimeout(loop, 200);
}

loop();

