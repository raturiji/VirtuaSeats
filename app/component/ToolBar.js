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
import Icon from '../component/Icon';

const ToolBar = ({navigation, action}) => {
  console.log(action, 'checked');
  const option = [
    {
      iconName: 'shape-polygon-plus',
      iconFamily: 'MaterialCommunityIcons',
      iconLabel: 'Add Shape',
    },
    {
      iconName: 'pencil',
      iconFamily: 'FontAwesome',
      iconLabel: 'Draw Shape',
    },
    {
      iconName: 'undo',
      iconFamily: 'FontAwesome',
      iconLabel: 'Undo',
    },
    {
      iconName: 'text',
      iconFamily: 'Ionicons',
      iconLabel: 'Text',
    },
    {
      iconName: 'save',
      iconFamily: 'FontAwesome',
      iconLabel: 'Save',
    },
  ];
  return (
    <View
      style={{
        width: wp(20),
        height: hp(100),
        backgroundColor: '#0CAFFF',
      }}>
      {option.map((item, index) => (
        <TouchableOpacity
          style={{
            height: wp(100) / 6,
            width: wp(20),
            borderBottomWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key={index}
          onPress={() => action(item)}>
          <Icon
            name={item.iconName}
            iconType={item.iconFamily}
            color="white"
            size={35}
          />
          <Text style={{color: 'white'}}>{item.iconLabel}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ToolBar;
