import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardType } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { THEME_COLORS, THEME_TYPOGRAPHY } from '@common/styles';

interface LabelInputProps {
  label: string;
  mask?: string;
  keyboardType?: KeyboardType;
  value: string;
  onChangeText: (text: string) => void;
}

export const LabelInputComponent = (props: LabelInputProps) => {
  return (
    <>
      <Text style={styles.regularText}>{props.label}</Text>
      {props.mask ? (
        <MaskedTextInput
          style={styles.input}
          autoCapitalize={'none'}
          clearButtonMode={'while-editing'}
          defaultValue={props.value}
          mask={props.mask}
          onChangeText={(_formatted, extracted) =>
            props.onChangeText(extracted)
          }
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        ></MaskedTextInput>
      ) : (
        <TextInput
          autoCapitalize={'none'}
          style={styles.input}
          value={props.value}
          onChangeText={props.onChangeText}
          clearButtonMode={'while-editing'}
          keyboardType={props.keyboardType ? props.keyboardType : 'default'}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    alignSelf: 'center',
    borderColor: THEME_COLORS.primaryMain,
    backgroundColor: THEME_COLORS.background,
    borderRadius: 0,
    borderBottomWidth: 2,
    color: THEME_COLORS.textStandard,
    fontSize: THEME_TYPOGRAPHY.fontSize17 as number,
    height: 34,
    width: '96%',
  },
  regularText: {
    color: THEME_COLORS.primaryMain,
    fontFamily: THEME_TYPOGRAPHY.fontFamilyStandard as string,
    fontSize: THEME_TYPOGRAPHY.fontSize17 as number,
    paddingBottom: 5,
    paddingLeft: '2p%',
    paddingTop: (THEME_TYPOGRAPHY.fontSize17 as number) * 2,
    textAlign: 'left',
  },
});
