import React from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import {Colors} from '../../utils/Constants';
import ShareIcon from '../../assets/icons/ic_share.svg';
import LikeIcon from '../../assets/icons/ic_like.svg';
import config from '../../utils/Config';
import LinearGradient from 'react-native-linear-gradient';
import RatingIcon from '../../assets/icons/ic_rating.svg';

const PostComponent = ({data, onClickPost, onClickLike, onShare}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.outerPostView}
      onPress={onClickPost}>
      <ImageBackground
        source={{uri: data?.image}}
        resizeMode="cover"
        blurRadius={3}
        style={styles.imageBackground}>
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.7)']}
          locations={[0, 0.6, 1]}
          style={styles.gradientBox}>
          <Image
            source={{uri: data?.image}}
            resizeMode="contain"
            style={styles.movieStyle}
          />
        </LinearGradient>
        <View style={styles.usernameContainer}>
          <Image
            source={{uri: data?.image}}
            resizeMode="cover"
            style={styles.userImageStyle}
          />
          <Text numberOfLines={1} style={styles.usernameText}>
            Yogesh Kaushal
          </Text>
        </View>
        <View style={styles.movieNameContainer}>
          <Text numberOfLines={1} style={styles.movieNameText}>
            Blacklist
          </Text>
          <View style={styles.ratingBox}>
            <RatingIcon
              width={12}
              height={12}
              style={{marginRight: moderateScale(5)}}
            />
            <Text style={styles.subTextStyle}>3.4</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.bottomContainer}>
        <View style={styles.likesContainer}>
          <TouchableOpacity onPress={onClickLike} style={styles.iconClick}>
            <LikeIcon width={23} height={23} />
          </TouchableOpacity>
          <Text style={styles.likesText}>343 likes</Text>
          <TouchableOpacity onPress={onShare} style={styles.iconClick}>
            <ShareIcon width={23} height={23} />
          </TouchableOpacity>
        </View>
        <Text numberOfLines={3} style={styles.subTextStyle}>
          Best movie to watch in the free time so far after a decade. please do
          watch this movie and recommend others too.
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    aspectRatio: 2 / 1,
  },
  movieStyle: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: '100%',
  },
  outerPostView: {
    width: '95%',
    alignSelf: 'center',
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(12),
    overflow: 'hidden',
  },
  bottomContainer: {
    backgroundColor: Colors.bgColor,
    padding: moderateScale(10),
  },
  likesContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: moderateScale(10),
  },
  likesText: {
    flex: 1,
    fontFamily: config.fonts.regular,
    fontSize: moderateScale(16),
    marginHorizontal: moderateScale(10),
    color: config.colors.orangeColor,
  },
  subTextStyle: {
    marginVertical: 3,
    color: config.colors.subTextColor,
    fontSize: moderateScale(14),
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    padding: moderateScale(10),
    top: 0,
  },
  usernameText: {
    color: 'white',
    marginLeft: moderateScale(7),
    fontFamily: config.fonts.bold,
  },
  movieNameText: {
    color: 'white',
    flex: 1,
    marginLeft: moderateScale(7),
    fontSize: moderateScale(19),
    fontFamily: config.fonts.bold,
  },
  userImageStyle: {
    width: moderateScale(25),
    height: moderateScale(25),
    borderColor: 'lightgrey',
    borderWidth: 0.5,
    borderRadius: moderateScale(100),
  },
  movieNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    padding: moderateScale(10),
    bottom: 0,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconClick: {
    padding: 3,
  },
});

export default PostComponent;
