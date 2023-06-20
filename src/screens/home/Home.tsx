import React, { useState, useRef } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import { MenuItem, MenuCategoryOption } from '@common/api/';
import { Banner, MenuFilterComponent, MenuItemComponent } from '@components/ui';
import { useMenuItems } from '@common/hooks';
import { THEME_COLORS } from '@common/styles';

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
  const menuItems: MenuItem[] = useMenuItems(menuCategories, searchString);

  const scrollOffsetY = useRef(new Animated.Value(0)).current;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Banner scrollY={scrollOffsetY} />
      <View style={styles.headerContainer}>
        <MenuFilterComponent
          menuCategories={menuCategories}
          onChangeFilter={(options: MenuCategoryOption) => {
            options.active = !options.active;
            setMenuCategories([...menuCategories]);
          }}
          onChangeSearchText={setSearchString}
        />
      </View>

      <FlatList
        contentContainerStyle={styles.contentContainer}
        onScroll={(e) => {
          scrollOffsetY.setValue(e.nativeEvent.contentOffset.y);
          Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: true }
          );
        }}
        data={menuItems}
        renderItem={({ item }) => <MenuItemComponent menuItem={item} />}
        keyExtractor={(item) => '' + item.id}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.background,
  },
  contentContainer: {
    alignSelf: 'center',
    backgroundColor: THEME_COLORS.background,
    marginTop: 25,
    width: '94%',
    paddingBottom: 200,
  },
  headerContainer: {
    backgroundColor: THEME_COLORS.background,
    paddingLeft: '2%',
    paddingTop: 34,
    paddingBottom: 34,
  },
  separator: {
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: THEME_COLORS.backgroundDark,
    marginBottom: 17,
    marginTop: 17,
    width: '90%',
  },
});
