// Pull-up Inputs
// Testing the built-in 20kOhm pull-up resistors on the Arduino pins set to Inputs.
//
// Pull-up:
//    open (pin's natural state)          |  1, on, 5v+
//    closed (a switch connected to GND)  |  0, off, grounded
//
// Pull-down: - DEFAULT
//    open (pin's natural state)          |  0, off, grounded
//    closed (a switch connected voltage) |  1, on, 5v+
//

int pullup = 8;
int pulldown = 2; // The pull-down needs to be far away from the pull-up because it will get false readings
                  // if it's not connected to an external pull-down.

void setup() {
  pinMode(pullup, INPUT);  // Sets pin to High-Impedance input. Minor voltage leak will occur on HIGH.
  digitalWrite(pullup, HIGH);  // This is how you enable the pull-up resistors in the pins.

  pinMode(pulldown, INPUT); // Set the default pull-down input which takes a voltage to read ON state.

  Serial.begin(9600); // We are going to print the pin states for debug
}

void loop() {
  if (digitalRead(pullup)==0) Serial.println("PULL-UP ON"); // The ON state for pull-up r.s is INVERTED
  if (digitalRead(pulldown)==1) Serial.println("PULL-DOWN ON");
}

// HOW TO USE
//
// Just take a lead from pin 8 to one of the GND pins and it should read high.
// Or, you could set up a button on the breadboard so that one lead is going to GND and the other leads into pin 8.
//
// Pin 9 just needs a voltage in WITH A RESISTOR. **DO NOT** just connect a lead 
// from 3.3V||5V to pin 9, that will probably short circuit your Dui. The reason you can do that on the pull-up pin
// is that the pin is set to High-Impediance so it will abrely put any voltage out and it is connected to the voltage
// that it needs internally on the board to read a high state. This is why I feel like pull-ups are WAY safer to use.
// They also barely draw any currrent while they are "open" and remaining in a HIGH state. 
//
// Curiously enough, the human body has an output voltage. You will see this if you simply touch pin 2. The serial 
// readout will show that pin 2 is getting switch to an ON state.
//
// For wiring a pull-down (default) input, you need an external pull-down resistor on the button so that you dont get
// any ghost voltage. Check this out for details. http://arduino.cc/en/Tutorial/Button

