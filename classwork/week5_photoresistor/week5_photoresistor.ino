const int photo = 0; // analog pin A0

void setup() {
	Serial.begin(9600);
}
void loop() {
  int value = analogRead(photo);
  Serial.println(value);  // Voltage coming into A0
  int mappedVal = map(value, 100, 1000, 0, 10); // Map the value to a 1-10 range
  Serial.print("Brightness: ");
  Serial.println(mappedVal);
  delay(1000);  //Wait for a second
}
