import PropTypes from 'prop-types'
import React from 'react'
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'
import Color from './Color'
import { StylePropType } from './utils'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.defaultColor,
    borderRadius: 15,
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    backgroundColor: Color.backgroundTransparent,
    color: Color.white,
    fontSize: 12,
  },
  activityIndicator: {
    marginTop: Platform.select({
      ios: -14,
      android: -16,
      default: -15,
    }),
  },
})

export interface LoadLaterProps {
  isLoadingLater?: boolean
  label?: string
  containerStyle?: StyleProp<ViewStyle>
  wrapperStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  activityIndicatorStyle?: StyleProp<ViewStyle>
  activityIndicatorColor?: string
  activityIndicatorSize?: number | 'small' | 'large'
  onLoadLater?(): void
}

export default class LoadLater extends React.Component<LoadLaterProps> {
  static defaultProps = {
    onLoadLater: () => {},
    isLoadingLater: false,
    label: 'Load later messages',
    containerStyle: {},
    wrapperStyle: {},
    textStyle: {},
    activityIndicatorStyle: {},
    activityIndicatorColor: 'white',
    activityIndicatorSize: 'small',
  }

  static propTypes = {
    onLoadLater: PropTypes.func,
    isLoadingLater: PropTypes.bool,
    label: PropTypes.string,
    containerStyle: StylePropType,
    wrapperStyle: StylePropType,
    textStyle: StylePropType,
    activityIndicatorStyle: StylePropType,
    activityIndicatorColor: PropTypes.string,
    activityIndicatorSize: PropTypes.string,
  }

  renderLoading() {
    if (this.props.isLoadingLater === false) {
      return (
        <Text style={[styles.text, this.props.textStyle]}>
          {this.props.label}
        </Text>
      )
    }
    return (
      <View>
        <Text style={[styles.text, this.props.textStyle, { opacity: 0 }]}>
          {this.props.label}
        </Text>
        <ActivityIndicator
          color={this.props.activityIndicatorColor!}
          size={this.props.activityIndicatorSize!}
          style={[styles.activityIndicator, this.props.activityIndicatorStyle]}
        />
      </View>
    )
  }
  render() {
    return (
      <TouchableOpacity
        style={[styles.container, this.props.containerStyle]}
        onPress={() => {
          if (this.props.onLoadLater) {
            this.props.onLoadLater()
          }
        }}
        disabled={this.props.isLoadingLater === true}
        accessibilityTraits='button'
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          {this.renderLoading()}
        </View>
      </TouchableOpacity>
    )
  }
}
