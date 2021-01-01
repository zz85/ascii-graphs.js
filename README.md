# Ascii Graphs js

A simple ascii graphing tool in node.js (and possibly in the browser)

Currently only supporting Histogram (Barcharts) and Sparkline

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

### Examples

- node test.js
- node system.js
- browser test.html


```sh
echo "Array(20).fill(0).map(_=>Math.random() * 1000 | 0).forEach(x => console.log(x))"  | node - | node stdin

echo "Array(2000).fill(0).map(_=>Math.random() * 10000 | 0).forEach(x => console.log(x))"  | node - | node stdin-histogram
```

```

### Themes

Use one of these: `standard`, `jim`,`equals`,`stars`,`pipes`,`sparks`, `bitly`.

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

bitly theme

    204 |∎∎∎∎∎∎∎∎∎∎∎∎∎∎                                               | 9.60%
    597 |∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎                   | 28.10%
    164 |∎∎∎∎∎∎∎∎∎∎∎                                                  | 7.74%
     82 |∎∎∎∎∎                                                        | 3.85%
    234 |∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎                                             | 11.01%
    844 |∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎∎ | 39.71%

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

```
node system
Memory usage
16428531712 |████████████████████████████▊  | 100.00%
CPU Usage

      0 |████████▊            | 27.44%
      0 |█▍                   | 4.22%
      0 |███████▋             | 24.02%
      0 |█▍                   | 4.22%
      0 |█████▍               | 16.89%
      0 |▊                    | 2.11%
      0 |██████▏              | 19.00%
      0 |▊                    | 2.11%
Trend lines
|▅▄▄▄▄▄▄▅▄▄▄▄▄▃▃▃▃▃▃▃▃▄▄▃▄▃▃▄▄▃▁▁▁▁▁▁▁▁▁▁| Min: 0.00 Avg: 0.22 Max: 1.00
|▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁| Min: 0.00 Avg: 0.02 Max: 1.00
|▄▄▃▃▄▃▄▄▄▃▃▄▄▃▃▃▃▃▃▃▃▃▃▃▄▃▁▄▃▃▁▁▁▁▁▁▁▁▁▁| Min: 0.00 Avg: 0.19 Max: 1.00
|▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁| Min: 0.00 Avg: 0.02 Max: 1.00
|▃▃▄▃▃▃▃▄▃▃▃▄▃▃▃▃▁▃▁▁▃▃▃▃▃▁▃▃▃▃▁▁▁▁▁▁▁▁▁▁| Min: 0.00 Avg: 0.16 Max: 1.00
|▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁| Min: 0.00 Avg: 0.02 Max: 1.00
|▄▃▃▃▃▃▃▃▃▃▃▃▃▃▁▁▁▁▃▁▃▁▃▁▃▁▁▃▃▁▁▁▁▁▁▁▁▁▁▁| Min: 0.00 Avg: 0.13 Max: 1.00
|▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁| Min: 0.00 Avg: 0.02 Max: 1.00

```

#### Other projects that makes ascii graphs

- https://github.com/mkaz/termgraph
- https://github.com/Evizero/UnicodePlots.jl
- https://github.com/kroitor/asciichart
- https://github.com/bitly/data_hacks
