import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { THEME } from '@styles';

interface LabelCheckboxProps {
  label: string;
  value: boolean;
  onChangeChecked: (checked: boolean) => void;
}

export const LabelCheckboxComponent = (props: LabelCheckboxProps) => {
  return (
    <View style={styles.container}>
      <Checkbox
        style={styles.checkbox}
        value={props.value}
        onValueChange={props.onChangeChecked}
        color={props.value ? THEME.colors.primaryMain : undefined}
      />
      <Text style={styles.regularText}>{props.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: Math.round(THEME.typography.fontSize17 / 2),
  },
  checkbox: {
    marginLeft: '2%',
    width: 30,
    height: 30,
  },
  regularText: {
    color: THEME.colors.primaryMain,
    fontFamily: THEME.typography.fontFamilyStandard,
    fontSize: THEME.typography.fontSize17,
    paddingLeft: '2%',
  },
});
