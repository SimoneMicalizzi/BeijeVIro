/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
} from 'react-native';

import {
  ViroVRSceneNavigator,
  ViroARSceneNavigator,

} from 'react-viro';

/*
  TODO: Insert your API key below
 */
var sharedProps = {
  apiKey: "API_KEY_HERE",
}

// Sets the default scene you want for AR and VR
var SpaceARScene = require('./js/Space');
var NoSpaceARScene = require('./js/NoSpace');

var UNSET = "UNSET";
var VR_NAVIGATOR_TYPE = "VR";
var AR_NAVIGATOR_TYPE = "AR";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ViroSample extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType: defaultNavigatorType,
      sharedProps: sharedProps,
      stateSpace: null
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARSpaceNavigator = this._getARSpaceNavigator.bind(this);
    this._getARNoSpaceNavigator = this._getARNoSpaceNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE && this.state.stateSpace) {
      return this._getARSpaceNavigator()
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE && !this.state.stateSpace) {
      return this._getARNoSpaceNavigator()

    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            Scegli l'esperienza desiderata:
          </Text>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE, true)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>Con Spazio</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE, false)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>Senza Spazio</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARSpaceNavigator() {
    return (
      <>
        <TouchableHighlight style={localStyles.exitButton}
          onPress={this._exitViro}>
          <Text>Torna indietro</Text>
        </TouchableHighlight >
        <ViroARSceneNavigator {...this.state.sharedProps}
          initialScene={{ scene: SpaceARScene }}
        />
      </>
    );
  }

  // Returns the ViroSceneNavigator which will start the VR experience
  _getARNoSpaceNavigator() {
    return (
      <>
        <TouchableHighlight style={localStyles.exitButton}
          onPress={this._exitViro}>
          <Text>Torna indietro</Text>
        </TouchableHighlight >
        <ViroARSceneNavigator {...this.state.sharedProps}
          initialScene={{ scene: NoSpaceARScene }}
        />
      </>
    );
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType, paramSpace) {
    return () => {
      this.setState({
        navigatorType: navigatorType,
        stateSpace: paramSpace
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType: UNSET
    })
  }
}


var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: "black",
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "black",
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 40,
    marginLeft: 25,
    // marginBottom: 10,
    backgroundColor: '#FFFFFF80',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

module.exports = ViroSample
