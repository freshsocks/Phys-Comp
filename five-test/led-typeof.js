var five = require("johnny-five"),
    // or "./lib/johnny-five" when running from the source
    board = new five.Board(),
    led = new five.Led(13),
    arr = [23432,2342353,565];

  console.log((typeof arr));