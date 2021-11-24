'use strict';

import React, { Component } from 'react';

import { StyleSheet, View, Text, Modal, Button, TouchableWithoutFeedback } from 'react-native';

import {
    ViroARScene,
    ViroFlexView,
    ViroText,
    Viro360Image,
    ViroScene,
    ViroConstants,
    Viro3DObject,
    ViroAmbientLight,
    ViroAnimations,
    ViroMaterials,
    ViroSphere,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
    constructor() {
        super();

        // Set initial state here
        this.state = {
            text: 'Initializing AR...',
            modalVisible: true,
        };

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
        this._onClick = this._onClick.bind(this);
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

    _onClick() {
        console.log("you just clicked the sun")
        this.setState({
            modalVisible: true,
        });
    }

    render() {
        ViroAnimations.registerAnimations({
            firstMovementOrbit: {
                properties: { positionX: '-=3', positionZ: '-=2', rotateX: '+=45'},
                duration: 20000,
            },
            secondMovementOrbit: { properties: { positionX: '-=3', positionZ: '-=2' }, duration: 20000 },
            thirdMovementOrbit: { properties: { positionX: '+=3', positionZ: '-=2' }, duration: 20000 },
            fourthMovementOrbit: { properties: { positionX: '+=3', positionZ: '-=2' }, duration: 20000 },

            loopRotate: { properties: { rotateY: '+=5' }, duration: 1000 },
            rotateAndMovePicture: [
                [
                    'firstMovementOrbit',
                    'secondMovementOrbit',
                    'thirdMovementOrbit',
                    'fourthMovementOrbit',
                ],
                ['loopRotate'],
            ],
        });
        // ViroMaterials.createMaterials({ earth: { shininess: 1, lightingModel: "Blinn", diffuseTexture: require('./res/Earth/basic.jpg'), normalTexture: require('./res/Earth/lights.jpg') }});
        // ViroMaterials.createMaterials({ earth: { shininess: 1, lightingModel: "Blinn", diffuseTexture: require('./res/earth/large_scale_detailed_satellite_map_of_the_World.jpg'), normalTexture: require('./res/earth/8k_earth_specular_reflection_map.tif') }})
        ViroMaterials.createMaterials({
            earth: {
                shininess: 1,
                lightingModel: 'Blinn',
                diffuseTexture: require('./res/earth/large_scale_detailed_satellite_map_of_the_World.jpg'),
            },
            sun: {
                shininess: 1,
                lightingModel: 'Blinn',
                diffuseTexture: require('./res/sun.jpg'),
            },
        });

        return (
            <>
                <ViroARScene onTrackingUpdated={this._onInitialized}>
                    <Viro360Image source={require('./res/space.jpg')} />
                    {/* <Viro360Image source={require('./res/space2.jpg')} /> */}
                    <ViroAmbientLight color="#FFFFFF" />
                    <ViroSphere
                        heightSegmentCount={30}
                        widthSegmentCount={30}
                        radius={0.45}
                        position={[0, 0, -2]}
                        materials={['sun']}
                        onClick={this._onClick} //sole
                        animation={{
                            name: 'loopRotate',
                            run: true,
                            loop: true,
                        }}
                    />
                    <ViroSphere
                        heightSegmentCount={30}
                        widthSegmentCount={30}
                        radius={0.3}
                        position={[3, 0, -4]}
                        materials={['earth']}
                        animation={{
                            name: 'rotateAndMovePicture',
                            run: true,
                            loop: true,
                        }}
                    />

                    {/* {this.state.modalVisible && */}
                        {/* <ViroFlexView style={{ flexDirection: 'row', padding: .1, backgroundColor: '#ffffff'}}
                            width={0.2} height={0.2}
                            position={[0, 0.3, -1.0]}
                            rotation={[0, 45, 0]} >

                            <ViroText fontSize={0.1}
                                position={[0, 0.3, -1.0]}
                                width={0.1} height={0.2}
                                // outerStroke={{ type: "DropShadow", width: 2, color: '#444444' }}
                                text="Sun" />
                        </ViroFlexView> */}
                    {/* } */}
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

                {/* <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text>Sun</Text>
                                <TouchableWithoutFeedback >
                                    <Text>Hide Modal</Text>
                                </TouchableWithoutFeedback >
                            </View>
                        </View>
                    </Modal>
                </View> */}
            </>
        );
    }

    _onInitialized(state, reason) {
        if (state == ViroConstants.TRACKING_NORMAL) {
            this.setState({
                text: 'Hello World!',
            });
        } else if (state == ViroConstants.TRACKING_NONE) {
            this.setState({
                text: 'Tracking Lost!',
            });
        }
    }
}

var styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    helloWorldTextStyle: {
        fontFamily: 'Arial',
        fontSize: 30,
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});

module.exports = HelloWorldSceneAR;
