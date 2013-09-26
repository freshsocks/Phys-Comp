var five = require("johnny-five"),
    // or "./lib/johnny-five" when running from the source
    board = new five.Board();

board.on("ready", function() {

	// Create an Led on pin 13 and strobe it on/off
	// Optionally set the speed; defaults to 100ms
	five.Button.prototype.capture = {
			'state' : 0,
			'input' : [],
			'lastPushTime' : 0,
			'maxWaitTime' : 4000,	// Maximum time the button will wait for next push
			'reset' : function(){
				this.state = 0;
				this.input =[];
				this.lastPushTime = 0;
				this.maxWaitTime = 4000;
			}
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
				if (pushTimeMillis > button.capture.maxWaitTime){
					button.capture.reset();
				} else {
					button.capture.input.push(pushTimeMillis);
					button.capture.lastPushTime = currentTime;
					console.log('State '+button.capture.state+'\nCaptured time: '+button.capture.lastPushTime);
					console.log('Input Array: '+button.capture.input);
					button.capture.state ++;
				};
				//////
				//////
				break;
			case 2:
				var currentTime = new Date();
				var pushTimeMillis = currentTime - button.capture.lastPushTime;
				if (pushTimeMillis > button.capture.maxWaitTime){
					button.capture.reset();
				} else {
					button.capture.input.push(pushTimeMillis);
					button.capture.lastPushTime = currentTime;
					console.log('State '+button.capture.state+'\nCaptured time: '+button.capture.lastPushTime);
					console.log('Input Array: '+button.capture.input);
					button.capture.state ++;
				};
				//////
				//////
				break;
			case 3:
				var currentTime = new Date();
				var pushTimeMillis = currentTime - button.capture.lastPushTime;
				if (pushTimeMillis > button.capture.maxWaitTime){
					button.capture.reset();
				} else {
					button.capture.input.push(pushTimeMillis);
					button.capture.lastPushTime = currentTime;
					console.log('State '+button.capture.state+'\nCaptured time: '+button.capture.lastPushTime);
					console.log('Input Array: '+button.capture.input);
					button.capture.state ++;
				};
				//////
				//////
				//break;  //Don't break, because we want to run the next set
			case 4:
				// Set LED stuff
				LED13.strobeTime = parseInt(average(button.capture.input)*0.5);
				board.wait(LED13.strobeTime, function(){
					LED13.strobe(LED13.strobeTime);
				});
				
				// Don't reset the state until you hold button down
				// LOG
				console.log('strobing. LED13.strobeTime: '+LED13.strobeTime);
				// Change to a blank state where nothing happens
				button.capture.state = 5;
				//////
				//////
				break;
			case 5:
				// Do nothing
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
		LED13.pulse(500);
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