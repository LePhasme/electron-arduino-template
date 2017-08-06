int timeBetweenReadings = 500;

void setup() {
   Serial.begin(115200);
}

void loop() {
  Serial.println("{\"foo\":\"bar\",\"baz\":42}");
  delay(timeBetweenReadings);
}
