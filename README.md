# Ascii Graphs js
A simple ascii graphing tool in node.js

Currently only supporting Histogram and Sparkline

### Basic Usage

```
var data = [1, 2, 3, 4, 5];
var formatted = histogram_format(data);
console.log(formatted.join('\n'));
```

### API

```
var formatted_string = histogram_format(data, theme, options);
var options = {
    chart_width /* width of a full bar */
    divider /* character to mark the start and end of bar
    block_formatter /* callback for generating a character block */
    last_formatter /* callback for the last character, can handle partial values */
    max /* override max value */
    min /* override min value */
}

clear_and_log(lines) - clears previously printed lines and updates with new formatted lines

```

### Themes

Use one of these: `standard`, `jim`,`equals`,`stars`,`pipes`,`sparks`.

eg.

```
var formatted = histogram_format(data, 'jim');
var formatted = histogram_format(data, 'pipes');
```

### Customization
Take a look at `test.js`

```
node test

default options

      0 |     | 0.00%
      1 |▉    | 6.67%
      2 |█▋   | 13.33%
      3 |██▌  | 20.00%
      4 |███▎ | 26.67%
      5 |████ | 33.33%

thin (width = 1)

      0 |  | 0.00%
      1 |▎ | 6.67%
      2 |▌ | 13.33%
      3 |▋ | 20.00%
      4 |▉ | 26.67%
      5 |█ | 33.33%

longer (width = 14)

      0 |               | 0.00%
      1 |██▉            | 6.67%
      2 |█████▋         | 13.33%
      3 |████████▌      | 20.00%
      4 |███████████▎   | 26.67%
      5 |██████████████ | 33.33%

random data + standard theme

    844 |███▉ | 24.55%
    357 |█▋   | 10.38%
    448 |██   | 13.03%
    899 |████ | 26.13%
    473 |██▏  | 13.74%
    418 |█▉   | 12.17%

jim theme

    844 --------------------------------------------------------o     24.55%
    357 -----------------------o                                      10.38%
    448 -----------------------------o                                13.03%
    899 ------------------------------------------------------------o 26.13%
    473 -------------------------------o                              13.74%
    418 ---------------------------o                                  12.17%

equals theme

    844 |============================]  | 24.55%
    357 |===========]                   | 10.38%
    448 |==============]                | 13.03%
    899 |==============================]| 26.13%
    473 |===============]               | 13.74%
    418 |=============]                 | 12.17%

stars theme

    844 |******************   | 24.55%
    357 |*******              | 10.38%
    448 |*********            | 13.03%
    899 |******************** | 26.13%
    473 |**********           | 13.74%
    418 |*********            | 12.17%

pipes theme

    844 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||    | 24.55%
    357 |||||||||||||||||||||||||                                     | 10.38%
    448 |||||||||||||||||||||||||||||||                               | 13.03%
    899 ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||| | 26.13%
    473 |||||||||||||||||||||||||||||||||                             | 13.74%
    418 |||||||||||||||||||||||||||||                                 | 12.17%

sparks theme

    844 |█ | 24.55%
    357 |▄ | 10.38%
    448 |▅ | 13.03%
    899 |█ | 26.13%
    473 |▅ | 13.74%
    418 |▅ | 12.17%

loop

   1330 |██████████████████████████████ | 22.96%
    721 |████████████████▍              | 12.44%
    827 |██████████████████▊            | 14.29%
   1250 |████████████████████████████▎  | 21.59%
    844 |███████████████████▏           | 14.57%
    820 |██████████████████▌            | 14.15%

sparkline

| ▁▃▄▅▆▇█| Min: 1.00 Avg: 3.50 Max: 8.00

longer sparkline

|▃▃▁▅▄ ▆█▅▆▅▇▆▄▄▆▇▅▁▇▅▃▆▃▄▃▅▃▄▄▅▅▄▄▅▃▁▄▄▅▁▅▇▆| Min: 0.30 Avg: 49.80 Max: 99.42

animate sparkline

|▃▁▁▁▃▄▄▅▆▆▇▇▇█▇▇▇▇▆▆▅▄▄▃▁▁ ▁▃▃▄▅▅▆▆| Min: -1.00 Avg: 0.84 Max: 1.00
```
