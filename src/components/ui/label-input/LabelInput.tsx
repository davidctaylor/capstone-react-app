import React from 'react';
import { StyleSheet, Text, TextInput, KeyboardType } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { THEME } from '@styles';

interface LabelInputProps {
  label: string;
  mask?: string;
  keyboardType?: KeyboardType;
  value: string;
  onChangeText: (text: string) => void;
}

export const LabelInput = (props: LabelInputProps) => {
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
    borderColor: THEME.colors.primaryMain,
    backgroundColor: THEME.colors.backgroundLight,
    borderRadius: 0,
    borderBottomWidth: 2,
    color: THEME.colors.textStandard,
    fontSize: THEME.typography.fontSize17,
    height: 34,
    width: '96%',
  },
  regularText: {
    color: THEME.colors.primaryMain,
    fontFamily: THEME.typography.fontFamilyStandard,
    fontSize: THEME.typography.fontSize17,
    paddingBottom: 5,
    paddingLeft: '2p%',
    paddingTop: THEME.typography.fontSize17 * 2,
    textAlign: 'left',
  },
});
