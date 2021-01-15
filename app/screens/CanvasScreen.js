import React, {useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  UIManager,
} from 'react-native';

import {TouchableOpacity} from 'react-native-gesture-handler';
import Draggable from 'react-native-draggable';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CanvasScreen = ({navigation}) => {
  return (
    <View
      style={{
        backgroundColor: 'blue',
        width: wp(100),
        height: hp(100),
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: wp(30),
          height: hp(100),
          backgroundColor: '#e3e3e3',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#e3e3e3',
            height: wp(100) / 6,
            width: wp(100),
            borderBottomWidth: 1,
          }}
        />
      </View>
      <View
        style={{
          width: '80%',
          height: '100%',
          backgroundColor: 'white',
        }}
      />
      {/* <Draggable
        debug
        x={50}
        y={50}
        onDragRelease={(event) => console.log(event.nativeEvent, 'checked')}>
        <View style={{width: 100, height: 100, borderRadius: 4}}>
          <Text style={{color: 'black'}}>Drag This!</Text>
        </View>
      </Draggable> */}
    </View>
  );
};

export default CanvasScreen;
