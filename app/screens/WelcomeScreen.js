import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const WelcomeScreen = ({navigation}) => {
  return (
    <View>
      <View style={{width: wp(100), alignItems: 'center'}}>
        <Image
          source={require('../assets/logo.png')}
          style={{width: 250, height: 250}}
        />
        {/* <Text style={{fontSize: 25}}>Virtua Seats</Text> */}
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>
          Welcome
        </Text>
        <TouchableOpacity
          style={{
            padding: 12,
            backgroundColor: 'red',
            width: 200,
            marginVertical: 20,
          }}
          onPress={() => navigation.navigate('CanvasScreen')}>
          <Text style={{fontSize: 18, textAlign: 'center', color: 'white'}}>
            Create New Project
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{padding: 12, backgroundColor: 'red', width: 200}}>
          <Text style={{fontSize: 18, textAlign: 'center', color: 'white'}}>
            Open Existing Project
          </Text>
        </TouchableOpacity>
      </View>
      <View />
    </View>
  );
};

export default WelcomeScreen;
