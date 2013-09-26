var five = require("johnny-five"),
    // or "./lib/johnny-five" when running from the source
    board = new five.Board();

board.on("ready", function() {

	// Create an Led on pin 13 and strobe it on/off
	// Optionally set the speed; defaults to 100ms
	five.Button.prototype.capture = {
			'state' : 0,
			'input' : [],
			'lastPushTime' : 0
		};
	five.Led.prototype.strobeTime = 300;

	var LED13 = new five.Led(10);
	var button = new five.Button(11);
	LED13.strobeTime = 100;

	button.on("down", function(){
		switch (button.capture.state) {
			case 0:
				//initialize capture
				button.capture.lastPushTime = new Date();
				console.log('State 0\nCaptured time: '+button.capture.lastPushTime);
				button.capture.input = [];
				button.capture.state = 1;
				//////
				//////
				break;
			case 1:
				var currentTime = new Date();
				var pushTimeMillis = currentTime - button.capture.lastPushTime;
				button.capture.input[0] = pushTimeMillis;
				button.capture.lastPushTime = currentTime;
				console.log('State 1\nCaptured time: '+button.capture.lastPushTime);
				console.log('Input Array: '+button.capture.input);
				button.capture.state = 2;
				//////
				//////
				break;
			case 2:
				var currentTime = new Date();
				var pushTimeMillis = currentTime - button.capture.lastPushTime;
				button.capture.input[1] = pushTimeMillis;
				button.capture.lastPushTime = currentTime;
				console.log('State 2\nCaptured time: '+button.capture.lastPushTime);
				console.log('Input Array: '+button.capture.input);
				button.capture.state = 3;
				//////
				//////
				break;
			case 3:
				var currentTime = new Date();
				var pushTimeMillis = currentTime - button.capture.lastPushTime;
				button.capture.input[2] = pushTimeMillis;
				button.capture.lastPushTime = currentTime;
				//
				console.log('State 3\nCaptured time: '+button.capture.lastPushTime);
				console.log('Input Array: '+button.capture.input);
				// Set LED stuff
				LED13.strobeTime = average(button.capture.input)*0.5;
				board.wait(LED13.strobeTime, function(){
					LED13.strobe(LED13.strobeTime);
				});
				// Reset button state
				//button.capture.state = 0;
				// Don't reset the state until you hold button down
				// LOG
				console.log('strobing. LED13.strobeTime: '+LED13.strobeTime);
				//////
				//////
				break;
			default:
				console.log('ERROR: there was some kinf of error with the button state. Resetting values...');
				button.capture.state = 0;
				button.capture.input = [];
				button.capture.lastPushTime = 0;
		}
	});

	button.on("hold", function(){
		LED13.pulse(100);
		button.capture.state = 0;
		board.wait( 500, function() {
			LED13.stop().off();
		});	
		console.log('RESET.');
		console.log('button state : '+ button.capture.state);
		console.log('button input : '+ button.capture.input);
	});

	function average(array){
		return ((array[0] + array[1] + array[2])/array.length);
	}

});