import React, {FC} from 'react';
import {StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import typography from '@/theme/typography';
import spacing from '@/theme/spacing';
import {AppText} from '@/components/Text/AppText';
import {Movie} from '@/types/Movie';
import {MovieDetailRatings} from '@/screens/Detail/MovieDetailRatings';

export const MovieDetailInformation: FC<{movie: Movie}> = ({movie}) => {
  const {Year, Runtime, Director, Actors, Plot, Rated, Genre, Country} = movie;

  return (
    <View style={styles.container}>
      <AppText style={styles.metaData}>
        {Year} | {Runtime} | {Director}
      </AppText>
      <View style={styles.sectionContainer}>
        <AppText style={styles.sectionTitle}>Cast:</AppText>
        <AppText style={styles.sectionDescription}>{Actors}</AppText>
      </View>
      <View style={styles.sectionContainer}>
        <AppText style={styles.sectionTitle}>About the movie:</AppText>
        <AppText style={styles.sectionDescription}>{Plot}</AppText>
      </View>
      <View style={styles.sectionContainer}>
        <AppText style={styles.sectionTitle}>Genres:</AppText>
        <AppText style={styles.sectionDescription}>{Genre}</AppText>
      </View>
      <View style={styles.sectionContainer}>
        <AppText style={styles.sectionTitle}>Classification:</AppText>
        <AppText style={styles.sectionDescription}>{Rated}</AppText>
      </View>
      <View style={styles.sectionContainer}>
        <AppText style={styles.sectionTitle}>Country:</AppText>
        <AppText style={styles.sectionDescription}>{Country}</AppText>
      </View>
      <MovieDetailRatings ratings={movie.Ratings} />
    </View>
  );
};

type Styles = {
  container: ViewStyle;
  metaData: TextStyle;
  sectionContainer: ViewStyle;
  sectionTitle: TextStyle;
  sectionDescription: TextStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    marginTop: spacing.l,
    paddingHorizontal: spacing.l,
  },
  metaData: {
    marginBottom: spacing.l,
    ...typography.p1,
  },
  sectionContainer: {
    marginBottom: spacing.l,
  },
  sectionTitle: {
    ...typography.s2,
  },
  sectionDescription: {
    ...typography.p1,
  },
});
