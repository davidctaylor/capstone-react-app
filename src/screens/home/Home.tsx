import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MenuItem, MenuCategoryOption } from '@api/';
import { Banner, MenuFilterComponent, MenuItemComponent } from '@components/ui';
import { useMenuItems } from '@utils';
import { THEME } from '@styles';

const MenuCategories: MenuCategoryOption[] = [
  { active: true, id: 'desserts', label: 'Desserts' },
  { active: true, id: 'drinks', label: 'Drinks' },
  { active: true, id: 'mains', label: 'Mains' },
  { active: true, id: 'specials', label: 'Specials' },
  { active: true, id: 'starters', label: 'Starters' },
];

export const HomeScreen = () => {
  const [menuCategories, setMenuCategories] =
    useState<MenuCategoryOption[]>(MenuCategories);
  const [searchString, setSearchString] = useState<string>('');
  const menuItems = useMenuItems<MenuItem[]>(menuCategories, searchString);

  return (
    <SafeAreaView style={styles.container}>
      <Banner />
      <View style={styles.seachContainer}>
        <View style={styles.seachWrapper}>
          <Ionicons
            style={styles.searchIcon}
            name="md-search-sharp"
            size={17}
            color={THEME.colors.primaryMain}
          />
          <TextInput
            autoCapitalize={'none'}
            style={styles.searchInput}
            clearButtonMode={'while-editing'}
            onChangeText={(text: string) => setSearchString(text)}
          />
        </View>
      </View>
      <Text style={styles.textTitle}>ORDER FOR DELIVERY!</Text>
      <MenuFilterComponent
        menuCategories={menuCategories}
        onChangeChecked={(options: MenuCategoryOption) => {
          options.active = !options.active;
          setMenuCategories([...menuCategories]);
        }}
      />
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={menuItems}
        renderItem={({ item }) => <MenuItemComponent menuItem={item} />}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  contentContainer: {
    alignSelf: 'center',
    backgroundColor: THEME.colors.background,
    marginTop: 25,
    width: '94%',
  },
  separator: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: THEME.colors.backgroundDark,
    marginBottom: 17,
    marginTop: 17,
    width: '90%',
  },
  textTitle: {
    color: THEME.colors.primaryMain,
    fontFamily: THEME.typography.fontFamilyStandard,
    fontSize: 32,
    paddingLeft: '2%',
    paddingBottom: 17,
    paddingTop: 17,
  },

  seachContainer: {
    backgroundColor: THEME.colors.primaryMain,
    paddingBottom: 17,
    width: '100%',
  },
  seachWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: THEME.colors.backgroundLight,
    flexDirection: 'row',
    width: '94%',
    borderRadius: 6,
  },
  searchIcon: {
    paddingLeft: THEME.typography.fontSize17 / 2,
  },
  searchInput: {
    flex: 1,
    backgroundColor: THEME.colors.backgroundLight,
    color: THEME.colors.textStandard,
    fontSize: THEME.typography.fontSize17,
    height: 34,
    borderRadius: 6,
  },
});
