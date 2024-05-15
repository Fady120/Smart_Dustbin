import { StatusBar } from 'expo-status-bar';
import { React, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import CircularProgress from 'react-native-circular-progress-indicator';
import init from 'react_native_mqtt';
import AsyncStorage from '@react-native-async-storage/async-storage';

init({ 
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  reconnect: true,
  sync : {}
});

function onConnect() { 
  console.log("Connected"); 
  client.subscribe("DustBin1");
  client.subscribe("DustBin2");
}

function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("Failed to connect:"+responseObject.errorMessage);
  }
}

 const client = new Paho.MQTT.Client('146.190.125.25', 9001, '');

 client.onConnectionLost = onConnectionLost;
 client.connect({ onSuccess:onConnect, useSSL: false, userName: "username", password:"3737" });

export default function CircleProgress() {
  client.onMessageArrived=(message)=>this.onMessageArrived(message);
  
  onMessageArrived  = (message) =>
  { 
    if(flag12 == 0) {
      if(message.payloadString[0] == '1') {
        // console.log(message.payloadString.slice(1));
        setValue1(message.payloadString.slice(1));
        if(message.payloadString.slice(1) < 0) {
          setValue1(0);
          setFlag11(0);
        }
        else if(message.payloadString.slice(1) < 50 )
        {
          setColor1('#00FF00');
          setFlag11(0);
        }
        else if(message.payloadString.slice(1) >= 50 && message.payloadString.slice(1) < 75)
        {
          setColor1('#FFFF00');
          setFlag11(0);
        }
        else if(message.payloadString.slice(1) >= 75) {
          setColor1('#FF0000');
          if(flag11 == 0) {
            setFlag11(1);
            setFlag12(1);
            Alert.alert('OOPS!', 'The First Dustbin is Almost Full.',[{onPress: () => {setFlag12(0)}}]);
          }
        }
      }
    }

    if(flag22 == 0) {
      if(message.payloadString[0] == '2') {
        //console.log(message.payloadString.slice(1));
        setValue2(message.payloadString.slice(1));
        if(message.payloadString.slice(1) < 0) {
          setValue2(0);
          setFlag21(0);
        }
        else if(message.payloadString.slice(1) < 50 )
        {
          setColor2('#00FF00');
          setFlag21(0);
        }
        else if(message.payloadString.slice(1) >= 50 && message.payloadString.slice(1) < 75)
        {
          setColor2('#FFFF00');
          setFlag21(0);
        }
        else if(message.payloadString.slice(1) >= 75) {
          setColor2('#FF0000');
          if(flag21 == 0) {
            setFlag21(1);
            setFlag22(1);
            Alert.alert('OOPS!', 'The Seconed Dustbin is Almost Full.',[{onPress: () => {setFlag22(0)}}]);
          }
        }
      }
    }
  }

  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);

  const [color1, setColor1] = useState('#00FF00');
  const [color2, setColor2] = useState('#00FF00');

  const [flag11, setFlag11] = useState(0);
  const [flag21, setFlag21] = useState(0);

  const [flag12, setFlag12] = useState(0);
  const [flag22, setFlag22] = useState(0);

  // const pressHandler2= () => {
  //   setValue2(value2 + 25);
  //   var v= value2 + 25;
  //   if(v < 50 )
  //   {
  //     setColor2('#00FF00');
  //   }
  //   else if(v >= 50 && v < 100)
  //   {
  //     setColor2('#FFFF00');
  //   }
  //   else if(v >= 100) {
  //     setColor2('#FF0000');
  //     Alert.alert('OOPS!', 'The Seconed Dustbin is Full.',[{ onPress: () => {setValue2(0);setColor2('#00FF00') }}]);
  // }}

  return (
    <View style={styles.container}>
        <View style={styles.subcontainer1}>
            <CircularProgress
                radius={90}
                value={value1}
                activeStrokeColor={color1}
                fontSize={20}
                valueSuffix={'%'}
                inActiveStrokeColor={'black'}
                inActiveStrokeOpacity={0.2}
                inActiveStrokeWidth={6}
                duration={900}
            />
                <Text style={styles.textcontainer}>First Dustbin</Text>
        </View>

        <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, borderWidth: 5 }}/>

        <View style={styles.subcontainer2}>
            <CircularProgress
                radius={90}
                value={value2}
                activeStrokeColor={color2}
                fontSize={20}
                valueSuffix={'%'}
                inActiveStrokeColor={'black'}
                inActiveStrokeOpacity={0.2}
                inActiveStrokeWidth={6}
                duration={900}
            />
                <Text style={styles.textcontainer}>Seconed Dustbin</Text>
         </View>

      <StatusBar style="auto" /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242c40',
    justifyContent: 'space-around',
  },
  subcontainer1: {
    alignItems: 'center',
    marginTop: 100,
  },
  subcontainer2: {
    alignItems: 'center',
    marginBottom: 100,
  },
  textcontainer: {
    marginTop: 20,
    fontSize: 20,
    color: '#FF6347'
  },
});