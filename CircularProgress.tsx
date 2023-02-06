import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, {Circle} from 'react-native-svg';

type CircularProgressProps = {
  strokeWidth: number;
  radius: number;
  backgroundColor: string;
  percentageComplete: number;
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress: React.FC<CircularProgressProps> = props => {
  const {backgroundColor, percentageComplete, radius, strokeWidth} = props;
  const style = styles();

  const innerRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * innerRadius;

  //   animations
  const invertedCompletion = (100 - percentageComplete) / 100;
  const theta = useSharedValue(2 * Math.PI);
  const animateTo = useDerivedValue(() => 2 * Math.PI * invertedCompletion);

  const FADE_DELAY = 1500;

  const textOpacity = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(theta.value * innerRadius, {
        duration: FADE_DELAY,
      }),
    };
  });

  const powerTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(textOpacity.value, {
        duration: FADE_DELAY,
      }),
    };
  });

  const powerPercentTextStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(textOpacity.value, {
        duration: FADE_DELAY,
      }),
    };
  });

  return (
    <View style={style.container}>
      <Svg style={StyleSheet.absoluteFill}>
        <AnimatedCircle
          animatedProps={animatedProps}
          cx={radius}
          cy={radius}
          r={innerRadius}
          fill={'transparent'}
          stroke={backgroundColor}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeWidth={strokeWidth}
          strokeDashoffset={2 * Math.PI * (innerRadius * 0.5)}
          strokeLinecap="round"
        />
      </Svg>
      <Animated.Text style={[style.powerText, powerTextStyle]}>
        Power %
      </Animated.Text>
      <Animated.Text style={[style.powerPercentage, powerPercentTextStyle]}>
        {percentageComplete}
      </Animated.Text>
      <Button
        color={'gray'}
        title="Animate!"
        onPress={() => {
          if (!textOpacity.value) {
            theta.value = animateTo.value;
            textOpacity.value = 1;
          } else {
            theta.value = 2 * Math.PI * 1.001;
            textOpacity.value = 0;
          }
        }}
      />
    </View>
  );
};

export default CircularProgress;

const styles = () => {
  return StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'center',
      alignItems: 'center',
    },
    powerText: {
      fontSize: 30,
      fontWeight: '300',
    },
    powerPercentage: {
      fontSize: 60,
      fontWeight: '200',
    },
  });
};
