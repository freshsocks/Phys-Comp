#include <math.h>

const int pr = 0; // Photoresistor reading on analog pin A0
const int led[] = {3, 5, 6, 9, 10, 11}; // Each pwm pin with an LED attached
const int leds = 6;
int minVal[leds];
int maxVal[leds];

void setup() {
  Serial.begin(9600);
  pinMode(pr, INPUT); // Set the photoresistor pin as INPUT
  for (int i = 0; i < leds; i++) {
    pinMode(led[i], OUTPUT); // Set each led as an OUTPUT pin
    analogWrite(led[i], 0); // Make sure the led is starting at 0
    minVal[i] = round(exp(i/30));
    maxVal[i] = round(255-exp(leds-i-1));
  };
}

void loop() {
  int value = analogRead(pr);
  int brightness = map(value, 300, 800, 255, 0); // Map the value to a 0-255 range
  // This crazy double ternary makes sure brightness is between 0 and 255.
  brightness = brightness > 0 ? brightness < 255 ? brightness : 255: 0; 
  Serial.println("Brightness: ");
  Serial.print(brightness);
  Serial.println("");
  for (int i = 0; i < leds; i++) {
    //float eex = exp((float)i/6.0);
    //int minVal = round(255-255/eex);
    Serial.println("");
    Serial.print("I: ");
    Serial.print(i);
    Serial.print("    ");
    //Serial.println("MIN VAL: ");
    int localBrightness = map(brightness, minVal[i], maxVal[i], 0, 255);
    localBrightness = localBrightness > 0 ? localBrightness < 255 ? localBrightness : 255: 0;
    if (brightness > minVal[i]) {
      analogWrite(led[i], localBrightness);
      Serial.print("PRINTED LED ");
      Serial.print(i);
      Serial.print("    ");
    } else {
      analogWrite(led[i], 0);
    };
    
    // So if brightness = 83
    // And we are on led[2]
    // minVal will = 85.
    
    //Serial.println("LOC BRT: ");
   Serial.print("mV: ");
   Serial.print(minVal[i]);
   Serial.print("    ");
   Serial.print("xV: ");
   Serial.print(maxVal[i]);
   Serial.print("    ");
   Serial.print("lB: ");
   Serial.print(localBrightness);
   Serial.println("");
  };
}
//void on(i, pwmValue){
//  analogWrite(led[i], pwmValue);
//}
