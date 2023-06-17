import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MenuCategoryOption } from '@interfaces';
import { STYLE_BUTTON, THEME } from '@styles';

interface MenuFilterProps {
  menuCategories: MenuCategoryOption[];
  onChangeChecked: (options: MenuCategoryOption) => void;
}

export const MenuFilterComponent = (props: MenuFilterProps) => {
  const getButton = (options: MenuCategoryOption) => {
    return (
      <TouchableOpacity
        style={[
          STYLE_BUTTON.button,
          styles.button,
          options.active ? styles.buttonSelected : {},
        ]}
        onPress={() => {
          props.onChangeChecked(options);
        }}
      >
        <Text
          style={[
            STYLE_BUTTON.buttonText,
            styles.buttonText,
            options.active ? styles.buttonTextSelected : {},
          ]}
        >
          {options.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal={true}
        data={props.menuCategories}
        renderItem={({ item }) => getButton(item)}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '96%',
    alignSelf: 'center',
  },
  button: {
    borderColor: THEME.colors.background,
    backgroundColor: THEME.colors.backgroundLight,
    borderWidth: 1,
    borderRadius: 22,
  },
  buttonSelected: {
    borderColor: THEME.colors.primaryMain,
    backgroundColor: THEME.colors.background,
    borderWidth: 1,
  },
  buttonText: {
    color: THEME.colors.textStandard,
    fontFamily: THEME.typography.fontFamilyBold,
    opacity: 0.25,
  },
  buttonTextSelected: {
    color: THEME.colors.primaryMain,
    opacity: 1,
  },
  textRegular: {
    color: THEME.colors.primaryMain,
    fontFamily: THEME.typography.fontFamilyStandard,
    fontSize: THEME.typography.fontSize17,
  },
  textTitle: {
    fontSize: THEME.typography.fontSize24,
    fontFamily: THEME.typography.fontFamilyMedium,
    paddingBottom: 12,
  },
  separator: {
    width: THEME.typography.fontSize17,
  },
});
