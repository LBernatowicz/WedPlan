import React, { ReactElement, useRef } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Transition, Transitioning } from 'react-native-reanimated';
import { margins } from '../../assets/utils/margins';

type Props = {
  children: ReactElement;
  durationTime?: number;
  setToggle: any;
  toggle: boolean;
};

const ExtensionContainer = ({
  children,
  durationTime = 200,
  setToggle,
  toggle,
}: Props) => {
  const ref = useRef(null);

  const transition = (
    <Transition.Together>
      <Transition.In type={'fade'} durationMs={durationTime} />
      <Transition.Change />
      <Transition.Out type={'fade'} durationMs={durationTime} />
    </Transition.Together>
  );

  const externalAction = () => {
    setToggle((prevState: boolean) => !prevState);
  };

  return (
    <Transitioning.View
      style={[styles.container]}
      transition={transition}
      ref={ref}>
      <TouchableOpacity
        onPress={() => {
          // @ts-ignore
          ref.current.animateNextTransition();
          externalAction();
        }}
        activeOpacity={0.9}
        style={styles.touchableContainer}>
        {children}
      </TouchableOpacity>
    </Transitioning.View>
  );
};

export default ExtensionContainer;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    margin: margins.maxVerticalMargin,
  },
  touchableContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
