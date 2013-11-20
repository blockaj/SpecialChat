#include <Servo.h>
const int servoPin = 10;
Servo myServo;

void setup()
{
  Serial.begin(9600);
  myServo.attach(servoPin); 
}

void loop()
{
  if (Serial.available())
  {
    int incoming = Serial.read();
    digitalWrite(incoming);
  }
}


