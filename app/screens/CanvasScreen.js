import React, {useRef, useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';

// import {TouchableOpacity} from 'react-native-gesture-handler';
import Draggable from 'react-native-draggable';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from '../component/Icon';
import ToolBar from '../component/ToolBar';
import ActionSheet from 'react-native-actions-sheet';
import {TextInput} from 'react-native-gesture-handler';

const CanvasScreen = ({navigation}) => {
  const shapesActionSheet = useRef();
  const shapesOptionActionSheet = useRef();
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
    {
      iconName: 'save',
      iconFamily: 'FontAwesome',
      iconLabel: 'Save',
    },
  ];
  const shapes = [
    'square',
    'circle',
    'triangle',
    'pentagon',
    'hexagon',
    'octagon',
  ];
  const color = ['#0275d8', '#5cb85c', '#5bc0de', '#f0ad4e', '#d9534f'];
  const [mapping, setMapping] = useState([]);
  const [activeShape, setActiveShape] = useState(null);
  const [toggleColorPicker, setToggleColorPicker] = useState(false);
  const [colorpick, setColorPick] = useState(null);

  const openActionSheet = (item) => {
    switch (item.iconLabel) {
      case 'Add Shape':
        shapesActionSheet.current?.setModalVisible(true);
        break;
    }
  };

  const createPolygon = (item) => {
    const polygon = {
      name: item,
      location: {x: 0, y: 0},
      size: 60,
      color: '#e3e3e3',
      rotationAngle: 0,
    };
    const mappingArray = mapping.concat(polygon);
    setMapping(mappingArray);
  };

  const selectShape = (index) => {
    if (index === activeShape) {
      setActiveShape(null);
      setToggleColorPicker(false);
      shapesOptionActionSheet.current?.setModalVisible(false);
    } else {
      setActiveShape(index);
      setToggleColorPicker(false);
      shapesOptionActionSheet.current?.setModalVisible(true);
    }
    console.log(mapping, 'checkeeed');
  };

  const scaleIn = () => {
    const mappingData = [...mapping];
    mappingData[activeShape].size = mappingData[activeShape].size + 5;
    setMapping(mappingData);
  };

  const scaleOut = () => {
    const mappingData = [...mapping];
    mappingData[activeShape].size = mappingData[activeShape].size - 5;
    setMapping(mappingData);
  };

  const rotateRight = () => {
    const mappingData = [...mapping];
    mappingData[activeShape].rotationAngle =
      mappingData[activeShape].rotationAngle + 5;
    setMapping(mappingData);
  };

  const rotateLeft = () => {
    const mappingData = [...mapping];
    mappingData[activeShape].rotationAngle =
      mappingData[activeShape].rotationAngle - 5;
    setMapping(mappingData);
  };

  const fillColor = () => {
    const mappingData = [...mapping];
    mappingData[activeShape].color = colorpick;
    setMapping(mappingData);
  };

  return (
    <>
      <View
        style={{
          backgroundColor: 'blue',
          width: wp(100),
          height: hp(100),
          flexDirection: 'row',
        }}>
        <ToolBar
          action={(item) => openActionSheet(item)}
          shapeStatus={mapping[activeShape]}
        />
        <View
          style={{
            width: '80%',
            height: '100%',
            backgroundColor: 'white',
          }}>
          {/* <Icon
          name={'chevron-back-circle-sharp'}
          iconType={'Ionicons'}
          color="green"
          size={35}
          iconStyle={{position: 'absolute', left: -20, top: 40}}
        /> */}
        </View>
        {mapping.map((item, index) => (
          <Draggable debug x={30} y={0}>
            <TouchableOpacity onPress={() => selectShape(index)}>
              <Icon
                name={item.name}
                iconType={'MaterialCommunityIcons'}
                color={item.color}
                size={item.size}
                iconStyle={
                  index === activeShape
                    ? {
                        borderStyle: 'dashed',
                        borderRadius: 1,
                        borderColor: 'black',
                        borderWidth: 1,
                        transform: [{rotate: `${item.rotationAngle}deg`}],
                      }
                    : {transform: [{rotate: `${item.rotationAngle}deg`}]}
                }
              />
            </TouchableOpacity>
          </Draggable>
        ))}
      </View>
      <ActionSheet ref={shapesActionSheet}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={shapes}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  flexDirection: 'column',
                  margin: 1,
                  width: wp(30),
                  height: wp(30),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => createPolygon(item)}>
                <Icon
                  name={item}
                  iconType={'MaterialCommunityIcons'}
                  color="black"
                  size={35}
                />
              </TouchableOpacity>
            )}
            //Setting the number of column
            numColumns={3}
            keyExtractor={(item, index) => index}
          />
        </SafeAreaView>
      </ActionSheet>
      <ActionSheet ref={shapesOptionActionSheet}>
        {toggleColorPicker ? (
          <SafeAreaView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginVertical: hp(3),
              }}>
              {color.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={{
                      width: wp(10),
                      height: wp(10),
                      borderRadius: wp(10) / 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: item,
                      borderWidth:
                        color.indexOf(colorpick) > -1 && colorpick === item
                          ? 0
                          : 4,
                      borderColor:
                        color.indexOf(colorpick) > -1 && colorpick === item
                          ? 'none'
                          : '#e3e3e3',
                    }}
                    onPress={() => setColorPick(item)}
                  />
                );
              })}
            </View>
            <View>
              <Text style={{fontSize: wp(4), textAlign: 'center'}}>or</Text>
              <Text style={{fontSize: wp(5), textAlign: 'center'}}>
                Custom Color
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  marginVertical: wp(2),
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: wp(4), marginVertical: 'auto'}}>
                  Hex Code:-{' '}
                </Text>
                <TextInput
                  style={{
                    fontSize: wp(4),
                    backgroundColor: '#e3e3e3',
                    width: wp(25),
                    borderRadius: 20,
                    height: wp(7),
                    paddingVertical: 0,
                    paddingHorizontal: wp(4),
                  }}
                  value={colorpick}
                  onChangeText={(text) => setColorPick(text)}
                />
              </View>
              <TouchableOpacity
                style={{
                  padding: wp(2),
                  backgroundColor: 'green',
                  width: wp(25),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: wp(20),
                  marginVertical: wp(6),
                  alignSelf: 'center',
                }}
                onPress={fillColor}>
                <Text
                  style={{
                    fontSize: wp(4),
                    color: 'white',
                  }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        ) : (
          <SafeAreaView
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              paddingVertical: hp(5),
            }}>
            <TouchableOpacity
              style={{
                margin: 1,
                width: wp(10),
                height: wp(10),
                borderRadius: wp(10) / 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'tomato',
              }}
              onPress={scaleIn}>
              <Icon
                name={'plus'}
                iconType={'MaterialCommunityIcons'}
                color="black"
                size={35}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                margin: 1,
                width: wp(10),
                height: wp(10),
                borderRadius: wp(10) / 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'tomato',
              }}
              onPress={scaleOut}>
              <Icon
                name={'minus'}
                iconType={'MaterialCommunityIcons'}
                color="black"
                size={35}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                margin: 1,
                width: wp(10),
                height: wp(10),
                borderRadius: wp(10) / 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'tomato',
              }}
              onPress={rotateLeft}>
              <Icon
                name={'rotate-left'}
                iconType={'MaterialCommunityIcons'}
                color="black"
                size={35}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                margin: 1,
                width: wp(10),
                height: wp(10),
                borderRadius: wp(10) / 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'tomato',
              }}
              onPress={rotateRight}>
              <Icon
                name={'rotate-right'}
                iconType={'MaterialCommunityIcons'}
                color="black"
                size={35}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                margin: 1,
                width: wp(10),
                height: wp(10),
                borderRadius: wp(10) / 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'tomato',
              }}
              onPress={() => setToggleColorPicker(true)}>
              <Icon
                name={'format-color-fill'}
                iconType={'MaterialCommunityIcons'}
                color="black"
                size={35}
              />
            </TouchableOpacity>
          </SafeAreaView>
        )}
      </ActionSheet>
    </>
  );
};

export default CanvasScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
});
