import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    ImageBackground,
    TouchableOpacity,
    Alert, TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AppComponent from '../AppComponent';
import LoaderScreen from '../Components/LoaderScreen';
import AppHeader from '../Components/AppHeader';

import {ScrollView} from "react-navigation";
import objToQueryString from '../functions/objToQueryString';
import MainScreenStyle from "../Main/Style/MainScreenStyle";
import TrackerScreenStyle from "./Style/TrackerScreenStyle";
import AddTrackerStyle from "./Style/AddTrackerStyle";
import {ifIphoneX} from "react-native-iphone-x-helper";

const GLOBALS = require('../settings/Globals');

export default class EditTracker extends AppComponent {
    state = {
        track: {
            id: 0,
            title: '',
            selectedPlan: '',
            donePercent: 0,
            markedDates: [],
        },
        index: 0,
        loading: true,
    };

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({loading: true});
            this.getTrackData();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    getTrackData = async() => {
        try{
            const index = await AsyncStorage.getItem('index');
            const track = await AsyncStorage.getItem('allTracks');
            let trackParse = JSON.parse(track);

            if(!(trackParse < 0)){
                this.setState({
                    track: trackParse[index],
                    index: Number(index),
                    loading: false,
                });
            }
        } catch(err) {
            alert(err);
        }
    };

    saveTrack = async() => {
        try {
            const allTracks = await AsyncStorage.getItem('allTracks');
            let tracks = JSON.parse(allTracks);
            tracks[this.state.index] = this.state.track;
            await AsyncStorage.setItem('allTracks',JSON.stringify(tracks));
            this.props.navigation.goBack();
        } catch(err) {
            alert(err);
        }
    };

    planOptions = () => {
        let returnPlanOptions = [];
        let planOptions = [
            {
                name: 'Everyday',
            },
            {
                name: 'Only weekdays',
            },
            {
                name: 'Only weekends',
            },
        ];

        planOptions.forEach((item)=>{
            let styleCheck;
            let styleButton;
            if(this.state.track.selectedPlan === item.name){
                styleCheck = [AddTrackerStyle.checkPlan,AddTrackerStyle.selectedCheckPlan];
                styleButton = [AddTrackerStyle.checkButton,AddTrackerStyle.selectedCheckButton];
            } else{
                styleCheck = AddTrackerStyle.checkPlan;
                styleButton = AddTrackerStyle.checkButton;
            }
            returnPlanOptions.push(
                <TouchableOpacity
                    style={styleButton}
                    onPress={()=>{
                        let track = this.state.track;
                        track.selectedPlan = item.name;
                        this.setState({
                            track: track
                        });
                    }}
                >
                    <View style={styleCheck}/>
                    <Text style={AddTrackerStyle.planText}>{item.name}</Text>
                </TouchableOpacity>
            );
        });

        return returnPlanOptions;
    };

    renderPage = () => {
        if(this.state.loading === true){
            return <LoaderScreen text="Loading..."/>;
        } else{
            return (
                <View style={MainScreenStyle.body}>
                    <SafeAreaView style={TrackerScreenStyle.headerContainer}>
                        <TouchableOpacity style={TrackerScreenStyle.backButton} onPress={()=> this.props.navigation.goBack()}>
                            <Image source={require('../../assets/back.png')} style={TrackerScreenStyle.imageBack} />
                        </TouchableOpacity>
                        <View style={TrackerScreenStyle.trackTitle}>
                            <Text style={TrackerScreenStyle.trackTitleText}>Your habit</Text>
                        </View>
                    </SafeAreaView>
                    <ScrollView style={AddTrackerStyle.block} keyboardShouldPersistTaps='always'>
                        <View style={{marginBottom:30}}>
                            <TextInput
                                style={AddTrackerStyle.inputTrackTitle}
                                placeholder={'Track Name'}
                                value={this.state.track.title}
                                onChangeText={(text)=> {
                                    let track = this.state.track;
                                    track.title = text;
                                    this.setState({track: track});
                                }}
                            />
                        </View>
                        <View>
                            <Text style={AddTrackerStyle.textPlan}>Select your plan</Text>
                            {this.planOptions()}
                        </View>
                    </ScrollView>
                    <SafeAreaView style={AddTrackerStyle.bottomButton}>
                        <TouchableOpacity style={TrackerScreenStyle.addTrackButton} onPress={()=>this.saveTrack()}>
                            <Text style={TrackerScreenStyle.actionButtonText}>Edit track</Text>
                        </TouchableOpacity>
                    </SafeAreaView>
                </View>
            );
        }
    };

    render() {
        return this.renderPage();
    }
}
