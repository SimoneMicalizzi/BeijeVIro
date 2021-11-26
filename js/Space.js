'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Modal,
    Button,
    TouchableWithoutFeedback,
    TouchableHighlight
} from 'react-native';

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
    ViroNode,
    ViroPortalScene,
    ViroPortal,
    ViroVideo,
    ViroCamera
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
    constructor() {
        super();

        // Set initial state here
        this.state = {
            text: 'Initializing AR...',
            textParam: "",
            planetTitleText: "Il Sistema Solare",
            planetDescriptionText: "Il sistema solare è un sistema planetario costituito da una varietà di corpi celesti mantenuti in orbita dalla forza gravitazionale del Sole",
            modalVisible: true,
            videoPaused: true,
            planetVideo: "",
            sunPosition: [0, -2, -2],
            camera: {
                "sun": false,
                "earth": false
            },
            active: "non attiva"
        };

        // this.sunPosition = [0, -2, -2]

        // bind 'this' to functions
        this._onInitialized = this._onInitialized.bind(this);
        this.changePlanet = this.changePlanet.bind(this);
        this._getVideoIfAvailable = this._getVideoIfAvailable.bind(this)
        this.handleCamera = this.handleCamera.bind(this)
        this.planets = {
            "sun": {
                titleText: "Il Sole",
                descriptionText: "Il Sole (dal latino: Sol) è la stella madre del sistema solare, attorno alla quale orbitano gli otto pianeti principali (tra cui la Terra).",
                planetVideo: require('./res/planetsVideos/sun.mp4')
            },
            "mercury": {
                titleText: "Mercurio",
                descriptionText: "Conosciuto sin dal tempo dei Sumeri, il suo nome è tratto dalla mitologia romana. Il pianeta è stato associato a Mercurio, messaggero degli dei."
            },
            "venus": {
                titleText: "Venere",
                descriptionText: "Prende il nome dalla dea romana dell'amore e della bellezza.Venere è il secondo pianeta del Sistema solare in ordine di distanza dal Sole."
            },
            "earth": {
                titleText: "La Terra",
                descriptionText: "La Terra è il terzo pianeta in ordine di distanza dal Sole e il più grande dei pianeti terrestri del sistema solare, sia per massa sia per diametro."
            },
            "mars": {
                titleText: "Marte",
                descriptionText: "Marte prende il nome dall'omonima divinità della mitologia romana.Marte è il quarto pianeta del sistema solare in ordine di distanza dal Sole. "
            },
            "jupiter": {
                titleText: "Giove",
                descriptionText: "Giove (dal latino Iovem) è il quinto pianeta del sistema solare in ordine di distanza dal Sole e il più grande di tutto il sistema planetario."
            },
            "saturn": {
                titleText: "Saturno",
                descriptionText: "Saturno è il sesto pianeta del sistema solare in ordine di distanza dal Sole e il secondo pianeta più massiccio dopo Giove. "
            },
            "uranus": {
                titleText: "Urano",
                descriptionText: "Urano è il settimo pianeta del sistema solare in ordine di distanza dal Sole, il terzo per diametro e il quarto per massa."
            },
            "neptune": {
                titleText: "Nettuno",
                descriptionText: "Nettuno è l'ottavo e più lontano pianeta del Sistema solare partendo dal Sole. Ha una composizione simile a quella di Urano"
            },
            "plutone": {
                titleText: "Plutone",
                descriptionText: "Plutone è un pianeta nano orbitante nella parte esterna del sistema solare.Come corpo celeste del sistema solare, Plutone è il sedicesimo per grandezza."
            }
        }

    }

    changePlanet = (param) => () => {
        this._getVideoIfAvailable(param)
        this.setState({
            planetTitleText: this.planets[param].titleText,
            planetDescriptionText: this.planets[param].descriptionText
        })
    }

    handleCamera = (param) => () => {
        let objCamera = this.state.camera
        if (param === "sun") {
            objCamera["sun"] = true
            objCamera["earth"] = false
        } else {
            objCamera["earth"] = true
            objCamera["sun"] = false
        }
        this.setState({
            camera: objCamera,
            active: "attiva"
        })
    }

    // changePlanet( position , objectTag) {
    // }

    render() {
        ViroAnimations.registerAnimations({
            mercuryRevolution: { properties: { rotateY: 360 }, duration: 5350 },
            venusRevolution: { properties: { rotateY: 360 }, duration: 12345 },
            earthRevolution: { properties: { rotateY: 360 }, duration: 20000 },
            moonRevolution: { properties: { rotateY: 360 }, duration: 2086 },
            marsRevolution: { properties: { rotateY: 360 }, duration: 37000 },
            jupiterRevolution: { properties: { rotateY: 360 }, duration: 50000 },
            saturnRevolution: { properties: { rotateY: 360 }, duration: 60000 },
            uranusRevolution: { properties: { rotateY: 360 }, duration: 75000 },
            neptuneRevolution: { properties: { rotateY: 360 }, duration: 90000 },
            plutoRevolution: { properties: { rotateY: 360 }, duration: 120000 },

            sunRotation: { properties: { rotateY: '+=5' }, duration: 2000 },
            earthRotation: { properties: { rotateY: '+=5' }, duration: 1600 },
            moonRotation: { properties: { rotateY: '+=5' }, duration: 1086 },
            mercuryRotation: { properties: { rotateY: '+=5' }, duration: 1000 },
            venusRotation: { properties: { rotateY: '+=5' }, duration: 1000 },
            marsRotation: { properties: { rotateY: '+=5' }, duration: 1000 },
            jupiterRotation: { properties: { rotateY: '+=5' }, duration: 1000 },
        });
        ViroMaterials.createMaterials({
            sun: {
                shininess: 1,
                lightingModel: 'Blinn',
                diffuseTexture: require('./res/Textures/Sun/2k_sun.jpg'),
            },
            mercury: {
                shininess: 1,
                lightingModel: 'Blinn',
                diffuseTexture: require('./res/Textures/Mercury/2k_mercury.jpg'),
            },
            venus: {
                shininess: 1,
                lightingModel: 'Blinn',
                diffuseTexture: require('./res/Textures/Venus/2k_venus_atmosphere.jpg'),
            },
            earth: {
                shininess: 1,
                lightingModel: 'Blinn',
                diffuseTexture: require('./res/Textures/Earth/2k_earth_with_clouds.jpg'),
            },
            moon: {
                shininess: 1,
                lightingModel: 'Blinn',
                diffuseTexture: require('./res/Textures/Moon/2k_moon.jpg'),
            },
            mars: {
                shininess: 1,
                lightingModel: 'Blinn',
                diffuseTexture: require('./res/Textures/Mars/2k_mars.jpg'),
            },
            jupiter: {
                shininess: 1,
                lightingModel: 'Blinn',
                diffuseTexture: require('./res/Textures/Jupiter/2k_jupiter.jpg'),
            },
            saturn: {
                shininess: 1,
                lightingModel: 'Blinn',
                diffuseTexture: require('./res/saturn/Saturn_(body).jpg'),
            },
            uranus: {
                shininess: 1,
                lightingModel: 'Blinn',
                diffuseTexture: require('./res/Textures/Uranus/2k_uranus.jpg'),
            },
            neptune: {
                shininess: 1,
                lightingModel: 'Blinn',
                diffuseTexture: require('./res/Textures/Neptune/2k_neptune.jpg'),
            },
            pluto: {
                shininess: 1,
                lightingModel: 'Blinn',
                diffuseTexture: require('./res/Textures/Pluto/plutomap2k.jpg'),
            },
        });

        return (
            <>
                <ViroARScene onTrackingUpdated={this._onInitialized}>
                    <ViroAmbientLight color="#FFFFFF" intensity={200} />

                    {/* Portale 
                    <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={() => { }}>
                        <ViroPortal position={[1, 0, -1]} scale={[.009, .009, .009]} >
                            <Viro3DObject source={require('./res/DragonJawPortal_OBJ/DragonJawPortal.obj')}
                                resources={[require('./res/DragonJawPortal_OBJ/DragonJawPortal_Diffuse.png'),
                                require('./res/DragonJawPortal_OBJ/DragonJawPortal_Normal.png'),
                                require('./res/DragonJawPortal_OBJ/DragonJawPortal_Spec.png')]}
                                type="OBJ" scale={[0.2, 0.2, 0.2]} />
                        </ViroPortal> */}

                    <Viro360Image source={require('./res/space.jpg')} />

                    <ViroFlexView style={styles.titleContainer} position={[-2.8, 1, -7]} rotation={[0, 40, 0]} height={2} width={4}
                    // animation={{ name: this.state.mainAnimation, run: this.state.runAnimation, loop: false }} 
                    >
                        <ViroText style={styles.planetTitleText} text={this.state.planetTitleText} width={4} height={.5} />
                        <ViroText style={styles.planetDescriptionText} text={this.state.planetDescriptionText} />
                    </ViroFlexView>
                    <ViroFlexView style={styles.titleContainer} position={[6.8, 1, -5]} rotation={[0, -80, 0]} height={2} width={4}
                    // animation={{ name: this.state.mainAnimation, run: this.state.runAnimation, loop: false }} 
                    >
                        <ViroText style={styles.planetTitleText} text={"Scegli il POV"} width={4} height={.7} />
                        <ViroText style={styles.planetTitleText} text={"Camera Sole - Attiva: " + this.state.active} onTouch={this.handleCamera("sun")} width={4} height={.5} />
                        <ViroText style={styles.planetTitleText} text={"Camera Terra - Attiva: " + this.state.active} onTouch={this.handleCamera("earth")} width={4} height={.5} />
                    </ViroFlexView>
                    {this.state.planetVideo !== "" &&
                        <ViroVideo position={[2.8, 1, -7]} rotation={[0, -40, 0]} paused={this.state.videoPaused} loop={true} height={2} width={4}
                            onClick={this._onClickVideo} source={this.state.planetVideo} />
                    }
                    <ViroSphere
                        heightSegmentCount={30}
                        widthSegmentCount={30}
                        radius={0.4}
                        position={[0, -2, -2]}
                        materials={['sun']}
                        onClick={this.changePlanet("sun")}
                        animation={{
                            name: 'sunRotation',
                            run: true,
                            loop: true,
                        }}
                    />
                    <ViroCamera position={this.state.sunPosition} active={this.state.camera["sun"]} />

                    <ViroNode //Mercurio
                        position={[0, -2, -2]}
                        rotation={[0, 0, 0]}
                        animation={{
                            name: 'mercuryRevolution',
                            run: true,
                            loop: true,
                        }}>
                        <ViroSphere
                            heightSegmentCount={30}
                            widthSegmentCount={30}
                            radius={0.05}
                            position={[0.8, 0, 0]}
                            materials={['mercury']}
                            onClick={this.changePlanet("mercury")}
                            animation={{
                                name: 'earthRotation',
                                run: true,
                                loop: true,
                            }}
                        />
                    </ViroNode>
                    <ViroNode //Venere
                        position={[0, -2, -2]}
                        rotation={[0, 0, 0]}
                        animation={{
                            name: 'venusRevolution',
                            run: true,
                            loop: true,
                        }}>
                        <ViroSphere
                            heightSegmentCount={30}
                            widthSegmentCount={30}
                            radius={0.085}
                            position={[1.4, 0, 0]}
                            materials={['venus']}
                            onClick={this.changePlanet("venus")}
                            animation={{
                                name: 'earthRotation',
                                run: true,
                                loop: true,
                            }}
                        />
                    </ViroNode>
                    <ViroNode //Terra
                        position={[0, -2, -2]}
                        rotation={[0, 0, 0]}
                        animation={{
                            name: 'earthRevolution',
                            run: true,
                            loop: true,
                        }}>
                        <ViroCamera position={[0,0,0]} active={this.state.camera["earth"]} >
                            <ViroSphere //Terra
                                heightSegmentCount={30}
                                widthSegmentCount={30}
                                radius={0.1}
                                position={[2, 0, 0]}
                                rotation={[0, 0, -24]}
                                materials={['earth']}
                                onClick={this.changePlanet('earth')}
                                animation={{
                                    name: 'earthRotation',
                                    run: true,
                                    loop: true,
                                }}
                            />
                        </ViroCamera>
                        <ViroNode //Terra-Luna
                            position={[2.2, 0, 0]}
                            animation={{
                                name: 'moonRotation',
                                run: true,
                                loop: true,
                            }}
                        >
                            <ViroSphere //Luna
                                heightSegmentCount={30}
                                widthSegmentCount={30}
                                // position={[2.2, 0, 0]}
                                radius={0.02}
                                materials={["moon"]}
                            // animation={{
                            //     name: 'moonRotation',
                            //     run: true,
                            //     loop: true,
                            // }}
                            />
                        </ViroNode>
                    </ViroNode>
                    <ViroNode //Marte
                        position={[0, -2, -2]}
                        rotation={[0, 0, 0]}
                        animation={{
                            name: 'marsRevolution',
                            run: true,
                            loop: true,
                        }}>
                        <ViroSphere
                            heightSegmentCount={30}
                            widthSegmentCount={30}
                            radius={0.09}
                            position={[2.4, 0, 0]}
                            rotation={[0, 0, -24]}
                            materials={['mars']}
                            onClick={this.changePlanet('mars')}
                            animation={{
                                name: 'earthRotation',
                                run: true,
                                loop: true,
                            }}
                        />
                    </ViroNode>
                    <ViroNode //Giove
                        position={[0, -2, -2]}
                        rotation={[0, 0, 0]}
                        animation={{
                            name: 'jupiterRevolution',
                            run: true,
                            loop: true,
                        }}>
                        <ViroSphere
                            heightSegmentCount={30}
                            widthSegmentCount={30}
                            radius={0.18}
                            position={[3.2, 0, 0]}
                            rotation={[0, 0, -24]}
                            materials={['jupiter']}
                            onClick={this.changePlanet('jupiter')}
                            animation={{
                                name: 'earthRotation',
                                run: true,
                                loop: true,
                            }}
                        />
                    </ViroNode>
                    <ViroNode //Saturn
                        position={[0, -2, -2]}
                        rotation={[0, 0, 0]}
                        animation={{
                            name: 'saturnRevolution',
                            run: true,
                            loop: true,
                        }}>
                        <Viro3DObject source={require('./res/saturn/Saturn.obj')}
                            position={[3.8, 0, 0]}
                            rotation={[0, 0, -24]}
                            materials={["saturn"]}
                            onClick={this.changePlanet('saturn')}
                            scale={[0.14, 0.14, 0.14]}
                            type="OBJ"
                            animation={{
                                name: 'earthRotation',
                                run: true,
                                loop: true,
                            }} />
                    </ViroNode>
                    <ViroNode //Urano
                        position={[0, -2, -2]}
                        rotation={[0, 0, 0]}
                        animation={{
                            name: 'uranusRevolution',
                            run: true,
                            loop: true,
                        }}>
                        <ViroSphere
                            heightSegmentCount={30}
                            widthSegmentCount={30}
                            radius={0.09}
                            position={[4.4, 0, 0]}
                            rotation={[0, 0, -24]}
                            materials={['uranus']}
                            onClick={this.changePlanet('uranus')}
                            animation={{
                                name: 'earthRotation',
                                run: true,
                                loop: true,
                            }}
                        />
                    </ViroNode>
                    <ViroNode //Nettuno
                        position={[0, -2, -2]}
                        rotation={[0, 0, 0]}
                        animation={{
                            name: 'neptuneRevolution',
                            run: true,
                            loop: true,
                        }}>
                        <ViroSphere
                            heightSegmentCount={30}
                            widthSegmentCount={30}
                            radius={0.085}
                            position={[4.8, 0, 0]}
                            rotation={[0, 0, -24]}
                            materials={['neptune']}
                            onClick={this.changePlanet('neptune')}
                            animation={{
                                name: 'earthRotation',
                                run: true,
                                loop: true,
                            }}
                        />
                    </ViroNode>
                    <ViroNode //Plutone
                        position={[0, -2, -2]}
                        rotation={[0, 0, 0]}
                        animation={{
                            name: 'plutoRevolution',
                            run: true,
                            loop: true,
                        }}>
                        <ViroSphere
                            heightSegmentCount={30}
                            widthSegmentCount={30}
                            radius={0.06}
                            position={[5.4, 0, 0]}
                            rotation={[0, 0, -24]}
                            materials={['pluto']}
                            onClick={this.changePlanet('pluto')}
                            animation={{
                                name: 'earthRotation',
                                run: true,
                                loop: true,
                            }}
                        />
                    </ViroNode>
                </ViroARScene>
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


    _getVideoIfAvailable = (param) => {

        var planet = this.planets[param];
        let tempVideo = ""
        // if video not available, then return nothing.
        if (planet.planetVideo) {
            tempVideo = planet.planetVideo
        }

        this.setState({
            planetVideo: tempVideo
        })
        // return (

        //     <ViroVideo position={[3.8, -1.1, -7]} rotation={[0, -40, 0]} paused={this.state.videoPaused} loop={true} height={2} width={4}
        //         onClick={this._onClickVideo} source={planet.planetVideo}
        //     // animation={{ name: this.state.mainAnimation, run: this.state.runAnimation, loop: false }} 
        //     />
        // );
    }

    _onClickVideo = () => {
        this.setState({
            videoPaused: !this.state.videoPaused,
        });
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
    titleContainer: {
        flexDirection: 'column',
        backgroundColor: "#FFFFFF80",
        padding: .2,
    },

    planetTitleText: {
        fontFamily: 'sans-serif-light',
        fontSize: 30,
        color: '#222222',
        textAlignVertical: 'center',
        textAlign: 'left',
    },
    planetDescriptionText: {
        fontFamily: 'sans-serif-light',
        fontSize: 18,
        color: '#222222',
        textAlignVertical: 'center',
        textAlign: 'left',
        flex: 1,
    },

});

module.exports = HelloWorldSceneAR;
