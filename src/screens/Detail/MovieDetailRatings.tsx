import React from 'react';
import {RatingItem} from '@/types/Movie';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {AppText} from '@/components/Text/AppText';
import spacing from '@/theme/spacing';
import typography from '@/theme/typography';

export const MovieDetailRatings: React.FC<{ratings: RatingItem[]}> = ({
  ratings,
}) => {
  if (ratings.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionDescription}>
      <AppText style={styles.sectionTitle}>Ratings:</AppText>
      {ratings.map((item: RatingItem) => {
        const {Source, Value} = item;
        return (
          <View style={styles.itemContainer} key={item.Source.trim()}>
            <AppText style={styles.sectionDescription}>{Source}</AppText>
            <AppText style={styles.sectionDescription}>{Value}</AppText>
          </View>
        );
      })}
    </View>
  );
};

type Styles = {
  sectionContainer: ViewStyle;
  sectionTitle: TextStyle;
  sectionDescription: TextStyle;
  itemContainer: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  sectionContainer: {
    marginBottom: spacing.l,
  },
  sectionTitle: {
    ...typography.s2,
  },
  sectionDescription: {
    ...typography.p1,
  },
  itemContainer: {
    marginVertical: spacing.s,
  },
});
