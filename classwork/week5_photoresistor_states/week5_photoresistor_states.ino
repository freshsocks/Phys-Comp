#include <math.h>

const int pr = 0; // Photoresistor reading on analog pin A0
int led[] = {3, 5, 6, 9, 10, 11}; // Each pwm pin with an LED attached
int leds = 6;

void setup() {
  Serial.begin(9600);
  pinMode(pr, INPUT); // Set the photoresistor pin as INPUT
  for (int i = 0; i < leds; i++) {
    pinMode(led[i], OUTPUT); // Set each led as an OUTPUT pin
    analogWrite(led[i], 0); // Make sure the led is starting at 0
  }
}

void loop() {
  int value = analogRead(pr);
  int brightness = map(value, 300, 800, 255, 0); // Map the value to a 0-255 range
  // This crazy double ternary makes sure brightness is between 0 and 255.
  brightness = brightness > 0 ? brightness < 255 ? brightness : 255: 0; 
  Serial.print("Brightness: ");
  Serial.print(brightness);
  Serial.println("");
  for (int i = 0; i < leds; i++) {
    double minValD = (i/leds)*255;
    int minVal = round(minValD);
    Serial.print("I: ");
    Serial.print(i);
    Serial.println("");
    //Serial.println("MIN VAL: ");
    int localBrightness = map(brightness, minVal, 255, 0, 255);
    if (brightness > minVal) {
      analogWrite(led[i], localBrightness);
    };
    
    // So if brightness = 83
    // And we are on led[2]
    // minVal will = 85.
    
    //Serial.println("LOC BRT: ");
   Serial.print("MinVal: ");
   Serial.print(minVal);
   Serial.println("");
  };
}
//void on(i, pwmValue){
//  analogWrite(led[i], pwmValue);
//}
