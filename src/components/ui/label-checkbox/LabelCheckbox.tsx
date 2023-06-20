import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';
import { THEME_COLORS, THEME_TYPOGRAPHY } from '@common/styles';

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
        color={props.value ? THEME_COLORS.primaryMain : undefined}
      />
      <Text style={styles.regularText}>{props.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: Math.round((THEME_TYPOGRAPHY.fontSize17 as number) / 2),
  },
  checkbox: {
    marginLeft: '2%',
    width: 30,
    height: 30,
  },
  regularText: {
    color: THEME_COLORS.primaryMain,
    fontFamily: THEME_TYPOGRAPHY.fontFamilyStandard as string,
    fontSize: THEME_TYPOGRAPHY.fontSize17 as number,
    paddingLeft: '2%',
  },
});
