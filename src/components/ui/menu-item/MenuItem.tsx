import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { MenuItem, HttpApi } from '@api/';
import { THEME } from '@styles';

interface MenuItemProps {
  menuItem: MenuItem;
  onChangeChecked: (checked: boolean) => void;
}

const formatPrice = (price: string) =>
  '$' +
  Number(price)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

export const MenuItemComponent = (props: MenuItemProps) => {
  const [imageSource, setImageSource] = useState<ImageSourcePropType>({
    uri: HttpApi.getMenuItemImageUrl(props.menuItem.image),
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={[styles.textRegular, styles.textTitle]}>
          {props.menuItem.name}
        </Text>
        <Text style={styles.textRegular} numberOfLines={2}>
          {props.menuItem.description}
        </Text>
        <Text style={[styles.textRegular, styles.textPrice]}>
          {formatPrice(props.menuItem.price)}
        </Text>
      </View>
      <Image
        style={styles.image}
        source={imageSource}
        resizeMode="contain"
        accessible={true}
        accessibilityLabel={`${props.menuItem.name} Image`}
        onError={() =>
          /* eslint-disable-next-line @typescript-eslint/no-var-requires */
          setImageSource(require('../../../../assets/images/Logo.png'))
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '96%',
    alignSelf: 'center',
  },
  textContainer: {
    flexDirection: 'column',
    flex: 0.9,
  },
  image: {
    height: 100,
    width: 100,
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
  textPrice: {
    fontSize: THEME.typography.fontSize20,
    fontFamily: THEME.typography.fontFamilyMedium,
    paddingTop: 10,
  },
});
