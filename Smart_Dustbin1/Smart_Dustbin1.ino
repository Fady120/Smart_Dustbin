#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Servo.h>
#define echoPin D6 
#define trigPin D5 

// WiFi
const char *ssid = "FadyDSL";
const char *password = "BNm852987@";

// MQTT Broker
const char *mqtt_broker = "146.190.125.25";
const char *topic = "DustBin1";
const char *mqtt_username = "username";
const char *mqtt_password = "3737";
char msg_out[20];
char dest[24];
const int mqtt_port = 1883;
String msg;
  
int IRSensor = D7;
Servo myservo;
long duration;
float distance; 
int binLevel;

WiFiClient espClient;
PubSubClient client(espClient);

void setup(){
  Serial.begin(9600);
  
  pinMode(D4, OUTPUT);
  digitalWrite(D4, HIGH);
  
  pinMode(trigPin, OUTPUT); 
  pinMode(echoPin, INPUT); 
  
  pinMode(IRSensor, INPUT);
  
  myservo.attach(D1);
  myservo.write(0);
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print("."); 
  }
  
  Serial.println("");
  Serial.println("WiFi conncted");
  Serial.println(WiFi.localIP());

  client.setServer(mqtt_broker, mqtt_port);
  
  while (!client.connected()) {
      String client_id = "esp8266-client-dw"; 
      client_id += String(WiFi.macAddress()); 
      Serial.printf("Connecting to mqtt broker....\n", client_id.c_str());
      Serial.println(client_id.c_str());
      if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
           Serial.println("mqtt broker connected");
           digitalWrite(D4, LOW);
      } else {
          Serial.print("failed with state");
          Serial.print(client.state());
          delay(2000);
      }
  }
  
}


void loop(){
  client.loop();
  int sensorStatus = digitalRead(IRSensor);
  if (sensorStatus == 0) 
  {
    myservo.write(180);
    delay(2950);
  }
  else if (sensorStatus == 1) {
    myservo.write(0);
  }

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;
  binLevel = ((25.96 - distance)/25.96)*100;
  sprintf(msg_out, "%d",binLevel);
  strcpy(dest, "1");
  strcat(dest, msg_out);
  Serial.print("dis: ");
  Serial.println(distance);
  Serial.print("bin: ");
  Serial.println(binLevel);
//  delay(1000);  
  client.publish(topic,dest);
  client.subscribe(topic);
}
