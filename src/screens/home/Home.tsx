import React, { useState } from 'react';
import { FlatList, StyleSheet, SafeAreaView, Text, View } from 'react-native';
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
      <Banner onChangeSearch={(text: string) => setSearchString(text)} />
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
    borderWidth: 1,
    borderColor: THEME.colors.backgroundDark,
    backgroundColor: THEME.colors.background,
    borderRadius: 6,
    marginTop: 25,
    paddingBottom: THEME.typography.fontSize17,
    paddingTop: THEME.typography.fontSize17,
    width: '94%',
  },
  separator: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: THEME.colors.backgroundDark,
    marginBottom: 17,
    marginTop: 17,
    width: '96%',
  },
  textTitle: {
    color: THEME.colors.primaryMain,
    fontFamily: THEME.typography.fontFamilyStandard,
    fontSize: 32,
    paddingLeft: '2%',
    paddingBottom: 17,
    paddingTop: 17,
  },
});
