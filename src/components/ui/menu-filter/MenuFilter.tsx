import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MenuCategoryOption } from '@common/api';
import { STYLE_BUTTON, THEME_COLORS, THEME_TYPOGRAPHY } from '@common/styles';

interface MenuFilterProps {
  menuCategories: MenuCategoryOption[];
  onChangeFilter: (options: MenuCategoryOption) => void;
  onChangeSearchText: (text: string) => void;
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
          props.onChangeFilter(options);
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
      <View style={styles.seachContainer}>
        <View style={styles.seachWrapper}>
          <Ionicons
            style={styles.searchIcon}
            name="md-search-sharp"
            size={17}
            color={THEME_COLORS.primaryMain}
          />
          <TextInput
            autoCapitalize={'none'}
            style={styles.searchInput}
            clearButtonMode={'while-editing'}
            onChangeText={(text: string) => props.onChangeSearchText(text)}
          />
        </View>
      </View>
      <FlatList
        contentContainerStyle={styles.contentContainer}
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
    width: '96%',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: '96%',
    alignSelf: 'center',
  },
  button: {
    borderColor: THEME_COLORS.background,
    backgroundColor: THEME_COLORS.backgroundLight,
    borderWidth: 1,
    borderRadius: 22,
  },
  buttonSelected: {
    borderColor: THEME_COLORS.primaryMain,
    backgroundColor: THEME_COLORS.background,
    borderWidth: 1,
  },
  buttonText: {
    color: THEME_COLORS.textStandard,
    fontFamily: THEME_TYPOGRAPHY.fontFamilyBold as string,
    opacity: 0.25,
  },
  buttonTextSelected: {
    color: THEME_COLORS.primaryMain,
    opacity: 1,
  },
  textRegular: {
    color: THEME_COLORS.primaryMain,
    fontFamily: THEME_TYPOGRAPHY.fontFamilyStandard as string,
    fontSize: THEME_TYPOGRAPHY.fontSize17 as number,
  },
  textTitle: {
    fontSize: THEME_TYPOGRAPHY.fontSize24 as number,
    fontFamily: THEME_TYPOGRAPHY.fontFamilyMedium as string,
    paddingBottom: 12,
  },
  separator: {
    width: THEME_TYPOGRAPHY.fontSize17 as number,
  },
  seachContainer: {
    // backgroundColor: THEME_COLORS.primaryMain,
    paddingBottom: 17,
    width: '100%',
  },
  seachWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: THEME_COLORS.background,
    borderColor: THEME_COLORS.primaryMain,
    borderWidth: 1,
    flexDirection: 'row',
    borderRadius: 6,
  },
  searchIcon: {
    paddingLeft: (THEME_TYPOGRAPHY.fontSize17 as number) / 2,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'transparent',
    color: THEME_COLORS.textStandard,
    fontSize: THEME_TYPOGRAPHY.fontSize17 as number,
    height: 34,
    borderRadius: 6,
  },
});
