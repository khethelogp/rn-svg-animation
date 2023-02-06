import React from 'react';
import {PixelRatio, StyleSheet, View} from 'react-native';
import CircularProgress from './CircularProgress';

const radius = PixelRatio.roundToNearestPixel(130);
const STROKE_WIDTH = 30;

const App = () => {
  const style = styles();

  return (
    <View style={style.container}>
      <View style={style.ringChartContainer}>
        <CircularProgress
          strokeWidth={STROKE_WIDTH}
          radius={radius}
          backgroundColor="#63C132"
          percentageComplete={85}
        />
      </View>
    </View>
  );
};

export default App;

const styles = () => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    ringChartContainer: {
      width: radius * 2,
      height: radius * 2,
    },
  });
};
