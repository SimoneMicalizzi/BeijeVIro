'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  Viro360Image,
  ViroScene,
  ViroConstants,
  Viro3DObject,
  ViroAmbientLight,
  ViroAnimations,
  ViroMaterials,
  ViroSphere
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: "Initializing AR...",

    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);

    // this.arrTexture = [
    //   require('./res/texture1.jpg'),
    //   require('./res/texture2.jpg'),
    //   require('./res/texture3.jpg'),
    //   require('./res/texture4.jpg'),
    //   require('./res/texture5.jpg'),
    //   require('./res/texture6.jpg'),
    //   require('./res/texture7.jpg'),
    //   require('./res/texture8.jpg')
    // ]
  }

  render() {
    ViroAnimations.registerAnimations({
      loopRotate: { properties: { rotateY: "+=45" }, duration: 1000 },
    });
    // ViroMaterials.createMaterials({ earth: { shininess: 1, lightingModel: "Blinn", diffuseTexture: require('./res/Earth/basic.jpg'), normalTexture: require('./res/Earth/lights.jpg') }});
    // ViroMaterials.createMaterials({ earth: { shininess: 1, lightingModel: "Blinn", diffuseTexture: require('./res/earth/large_scale_detailed_satellite_map_of_the_World.jpg'), normalTexture: require('./res/earth/8k_earth_specular_reflection_map.tif') }})
    ViroMaterials.createMaterials({ earth: { shininess: 1, lightingModel: "Blinn", diffuseTexture: require('./res/earth/large_scale_detailed_satellite_map_of_the_World.jpg'), } });
    ;

    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
        <Viro360Image source={require('./res/space.jpg')} />
        <ViroAmbientLight color="#FFFFFF" />
        <ViroSphere
          heightSegmentCount={20}
          widthSegmentCount={20}
          radius={0.5}
          position={[0, 0, -2]}
          materials={["earth"]}
          animation={{
            name: 'loopRotate',
            run: true,
            loop: true
          }}
        />
        {/* <Viro3DObject
          source={require('./res/earth/EARTH_obj.obj')}
          materials={["earth"]}
          position={[0.0, 0.0, -2]}
          scale={[1, 1, 1]}
          // animation={{
          //   name: 'loopRotate',
          //   run: true,
          //   loop: true
          // }}
          type="OBJ" /> */}

      </ViroARScene>

    );
  }


  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: "Hello World!"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      this.setState({
        text: "Tracking Lost!"
      });
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;
