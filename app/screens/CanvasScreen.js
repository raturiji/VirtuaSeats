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
  const [mapping, setMapping] = useState([]);
  const [activeShape, setActiveShape] = useState(null);

  // useEffect(() => {
  //   console.log(mapping, 'test');
  // }, [mapping]);

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
      shapesOptionActionSheet.current?.setModalVisible(false);
    } else {
      setActiveShape(index);
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

  return (
    <>
      <View
        style={{
          backgroundColor: 'blue',
          width: wp(100),
          height: hp(100),
          flexDirection: 'row',
        }}>
        <ToolBar action={(item) => openActionSheet(item)} />
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
            onPress={rotateRight}>
            <Icon
              name={'format-color-fill'}
              iconType={'MaterialCommunityIcons'}
              color="black"
              size={35}
            />
          </TouchableOpacity>
        </SafeAreaView>
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
