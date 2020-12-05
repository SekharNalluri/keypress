import {Content} from 'native-base';
import React from 'react';
import { Fragment } from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
} from 'victory-native';
import {Images} from '../config/Images';

const ResultScreen = (props) => {
  const [l_data, setL_data] = React.useState([]);
  const [r_data, setR_data] = React.useState([]);

  let {puretoneTestResults = [], audiogramOverlay, display} = props.resultData;
  display = props.resultData.display;
  display = display===null? null : display===undefined ? 'whiteboard' : display;
  let y_axis = [
    '-5',
    '0',
    '5',
    '10',
    '15',
    '20',
    '25',
    '30',
    '35',
    '40',
    '45',
    '50',
    '55',
    '60',
    '65',
    '70',
    '75',
    '80',
  ];
  let x_axis = ['0', '250', '500', '1000', '2000', '4000', '8000', ''];

  const processData = () => {
    if (puretoneTestResults && puretoneTestResults.length) {
      let left =
        puretoneTestResults &&
        puretoneTestResults.filter((val) => val.channel == 'left');
      let right =
        puretoneTestResults &&
        puretoneTestResults.filter((val) => val.channel == 'right');
      l_data_temp = left.map((val) => ({
        x: x_axis.indexOf(val.x.toString()) + 1,
        y: y_axis.indexOf(val.y.toString()) + 1,
        symbol: 'plus',
      }));
      r_data_temp = right.map((val) => ({
        x: x_axis.indexOf(val.x.toString()) + 1,
        y: y_axis.indexOf(val.y.toString()) + 1,
      }));
      setL_data(l_data_temp);
      setR_data(r_data_temp);
    }
  };
  const [fullData, setFullData] = React.useState({});
  const getLines = (canvas, e) => {
    if (e && e.whiteboardData) {
      let data = e.whiteboardData;
     
      //let canvas = React.createElement("canvas");
     // let canvas = document.createElement('canvas');
     //console.log('CANVAS_OBJ', canvas);
     if(canvas==undefined){
       return null;
     }
      canvas.width = data.width;
      canvas.height = data.height;
      let context = canvas.getContext('2d');
      context.lineJoin = 'round';
      context.lineCap = 'round';
      data.lines.forEach((line) => {
        context.strokeStyle = line.brushColor;
        context.lineWidth = line.brushRadius;
        line.points.forEach((p) => {
          context.lineTo(p.x, p.y);
        });
        context.stroke();
      });
      return canvas.toDataURL();
    }
    return null;
  };
  React.useEffect(() => {
    console.log('RESV_DATAT', props.resultData);
    processData();
    let data = props.resultData;
    if (props.resultData && props.resultData.display ) {

    } else {
      if(props.resultData.whiteboardImageData){
       display ='whiteboard';
       console.log('WHITEBOARD_DATF',props.resultData.whiteboardImageData);
      }
    }
    console.log('RES_DATA', JSON.stringify(props.resultData, null, 5));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.resultData]);

  const DrawImage = (props) => {
    const canvas = React.useRef(null);
    return (
      <View style={styles.iconsImage}>
      
        <Image
          source={{uri:props.resultData.whiteboardImageData}}
          style={{
            opacity: 1,
            padding: 10,
            marginTop:-29,
            marginLeft: -35,
          }}
          resizeMode="stretch"
          height={273}
          width={290}
          {...props}
        />
      </View>
    );
  };

  const SpeechImage = (props) => {
    return (
      <View style={styles.speechImage}>
        <Image
          source={Images.resultBGSpeech}
          style={{opacity: 0.4, 
            //marginTop: 10,
            
            marginLeft: -5}}
          resizeMode="stretch"
          width={275}
          height={166}
          {...props}
        />
      </View>
    );
  };

  const IconsImage = (props) => {
    console.log('IMAGE_DATA', props);
    return (
      <View style={styles.iconsImage}>
        <Image
          source={Images.resultBGIcons}
          style={{
            opacity: 0.4,
            padding: 10,
            //marginTop: -14,
            marginLeft: -30,
          }}
          resizeMode="stretch"
          height={280}
          width={290}
          {...props}
        />
      </View>
    );
  };

  const OverlayBackground = () => {
    if (audiogramOverlay === 'speech') return <SpeechImage />;
    else if (audiogramOverlay === 'icons') return <IconsImage />;
    else if (!audiogramOverlay && display=="whiteboard") return <DrawImage {...props} />;
    else return <></>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}> 
         {display == 'audiogram'?(<VictoryChart
            theme={VictoryTheme.material}
            width={400}
            height={400}
            domainPadding={{x: [0, 16], y: [0, 7]}}
            style={{background: {opacity: 0.4}}}
            backgroundComponent={<OverlayBackground />}>
            <VictoryAxis
              dependentAxis
              invertAxis
              tickCount={17}
              label={'volume (db)'}
              axisLabelComponent={<VictoryLabel dy={-22} />}
              tickValues={y_axis}
            />
            <VictoryAxis
              crossAxis
              orientation="top"
              label={'frequency (hz)'}
              axisLabelComponent={<VictoryLabel dy={-22} />}
              tickValues={x_axis}
              offsetX={200}
            />

            <VictoryLine style={{data: {stroke: '#c43a31'}}} data={r_data} />
            <VictoryScatter style={{data: {fill: '#c43a31'}}} data={r_data} />

            <VictoryLine style={{data: {stroke: '#000080'}}} data={l_data} />
            <VictoryScatter style={{data: {fill: '#000080'}}} data={l_data} />
            
          </VictoryChart>):(null)}
        {display != 'audiogram' && (
          <Text style={styles.waitmsg}>
            Please wait while we process your results.
          </Text>
        )}
      </View>
    </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    paddingBottom: 20,
  },
  result: {
    width: '90%',
    height: '90%',
  },
  speechImage: {
    paddingTop: 150,
    paddingLeft: 60,
    height: 300,
    width: 300,
  },
  iconsImage: {
    padding: 80,
    height: 300,
    width: 300,
  },
  waitmsg: {
    fontSize: 22,
    fontFamily: 'LibreFranklin-Medium',
    textAlign:'center',
    alignSelf:'center'
  },
});
