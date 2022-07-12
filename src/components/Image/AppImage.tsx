import React, {FC, useState} from 'react';
import {Image, ImageProps} from 'react-native';
import {images} from '@/assets/images';

export const AppImage: FC<ImageProps> = props => {
  const [imageError, setImageError] = useState(false);
  return (
    <Image
      {...props}
      source={imageError ? images.logo : props.source}
      onError={() => setImageError(true)}
    />
  );
};
