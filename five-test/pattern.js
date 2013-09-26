var five = require("johnny-five"),
    // or "./lib/johnny-five" when running from the source
    board = new five.Board();

// Extend the prototypes

five.Button.prototype.capture = {
		'state' : 'captureReady',
		'input' : [],
		'lastPushTime' : 0,
		'maxWaitTime' : 4000,
		'maxSequenceLength' : 8,
		'sequences' : [],	// Maximum time the button will wait for next push
		'reset' : function(){
			this.state = 'captureReady';
			this.input =[];
			this.lastPushTime = 0;
			this.maxWaitTime = 4000;
		},
		'mapInput' : function(high, low, target, accuracy, ratio_accuracy){
			low = typeof low !== 'undefined' ? low : 0;
			accuracy = typeof accuracy !== 'undefined' ? accuracy : 2;
			ratio_accuracy = typeof ratio_accuracy !== 'undefined' ? ratio_accuracy : 4;
			target = typeof target !== 'undefined' ? target : this.input;

			var s  = this.input,
				s_lo = Math.min.apply(Math, s),
				s_hi = Math.max.apply(Math, s),
				t_val,
				t_lo = low,
				t_hi = high,
				s_z_hi = s_hi - s_lo,
				t_z_hi = t_hi - t_lo,
				value_ratio,
				t = s.map(function(value){
					value-=s_lo;
					value_ratio = (value/s_z_hi).toFixed(ratio_accuracy);
					t_val = (t_z_hi * value_ratio + t_lo).toFixed(accuracy);
					return t_val;
				});

			target = return t;
		},
		'saveSequence' : function(_target){
			// Save the sequence to a sequences array
			_target = typeof _target !== 'undefined' ? _target : null;
			//target = target || null;
			var self = this;
			var _sequence = self.input;
			if (!!_target) {
				_target.unshift(_sequence);
			} else {
				self.sequences.unshift(_sequence);
			};
		}
	};

five.Led.prototype.strobeTime = 300;
five.Led.prototype.sequence = [];

/////////////////////////////////

board.on("ready", function() {

	var LED13 = new five.Led(10);
	var button = new five.Button(11);
	LED13.strobeTime = 100;

	////////////////////////////////

	button.on("down", function(){
		switch (button.capture.state) {
			case 'captureReady':
				//initialize capture
				button.capture.lastPushTime = new Date();
				button.capture.state = 'captureEnabled';
				break;
			case 'captureEnabled':
				var wait;
				clearTimeout
				var currentTime = new Date();
				var pushTimeMillis = currentTime - button.capture.lastPushTime;
					button.capture.input.push(pushTimeMillis);
					button.capture.lastPushTime = currentTime;
				// if that's not the max number of inputs
				if (button.capture.input.length!==button.capture.maxSequenceLength){
					wait = setTimeout(function(){
						button.capture.mapInput(LED13.sequence);
						playSequence(LED13);
						button.capture.state = 'playingSequence';
						break;
					}, maxWaitTime);
					//break;
				} else {
					// if you reached the max number of inputs
					// seal off the captured sequence
					button.capture.mapInput(LED13.sequence); // Or wherever yo ustore it
					playSequence(LED13); // Or however you want to make the function
					button.capture.state = 'playingSequence';
					break;
				}

				console.log('State '+button.capture.state+'\nCaptured time: '+button.capture.lastPushTime);
				console.log('Input Array: '+button.capture.input);
				
			case 'playingSequence':
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
		LED13.pulse(200);
		button.capture.reset();
		board.wait(1000, function() {
			LED13.fadeOut();
		});	
		console.log('RESET.');
		console.log('button state : '+ button.capture.state);
		console.log('button input : '+ button.capture.input);
	});

	function average(array){
		return ((array[0] + array[1] + array[2])/array.length);
	}

	function playSequence(led, index){
		index = typeof index !== 'undefined' ? index : 0;
		led = typeof led !== 'undefined' ? led : return false;
		// TODO
		//
		// Loops over a sequence attached to the led.prototype
		// or maybe it will just play any sequence
		// it will turn on & off by each sequence value in millis
		//
		// Could also make this a function of Led.prototype if you wanna go
		// the route of building in sequencing to all objects
		if (index < 0 || index == false || index == 'stop'){
			// To stop the sequence from recursing, trigger playSequence(led, ##0)
			// Where ## can equal '-1', bool false, or 'stop'
			led.stop().off();
			return false;
		} else {
			var seq = led.sequence;
			var record = seq[index];
			var r = record*0.5;
			led.on();
			board.wait(r, function(){
				led.stop().off();
				board.wait(r, function(){
					index = index>seq.length ? 0 : index+1;
					playSequence(led, index);
					// After playing one record of the sequence, it recurses back into itself
				});
			});
		}
	}
});