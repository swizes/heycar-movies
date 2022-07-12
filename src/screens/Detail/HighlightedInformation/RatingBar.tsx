import React, {FC} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import spacing from '@/theme/spacing';
import {useTheme} from '@react-navigation/native';
import {colorsPalette} from '@/theme/colorsPalette';
import metrics from '@/theme/metrics';

export const getRatingIconParams = (rating: number, starIndex: number) => {
  if (starIndex > Math.floor(rating) && rating - Math.floor(rating) >= 0.5) {
    return {
      starIconName: 'star-half-sharp',
      fillStar: true,
    };
  } else {
    return {
      starIconName: 'star',
      fillStar: Math.floor(rating) >= starIndex,
    };
  }
};

export const RatingBar: FC<{rating: number}> = ({rating = 0}) => {
  const {colors} = useTheme();

  //IMDB has rating from 0 to 10, we are showing 0 to 5,
  //therefore we divide the existing rating by 2
  const finalRating = rating / 2;

  //Create stars array with default empty star
  const stars = new Array(5).fill('star-outline');

  return (
    <View style={styles.container}>
      {stars.map((item, index) => {
        const ratingIndex = index + 1;
        const {starIconName, fillStar} = getRatingIconParams(
          finalRating,
          ratingIndex,
        );
        const starIconColor = fillStar
          ? colorsPalette.ratingYellow
          : colors.border;

        return (
          <View key={index.toString()} style={styles.starContainer}>
            <Ionicons
              name={starIconName}
              color={starIconColor}
              size={25 * metrics.verticalRem}
            />
          </View>
        );
      })}
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  starContainer: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starContainer: {
    marginRight: spacing.s,
  },
});
