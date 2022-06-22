import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    ImageBackground,
    TouchableOpacity,
    Alert,
    TextInput,
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

const GLOBALS = require('../settings/Globals');

export default class AddTracker extends AppComponent {
    state = {
        allTracks: [],
        track: {
            id: 0,
            title: '',
            selectedPlan: '',
            donePercent: 0,
            markedDates: [],
        },
        idCount: 0,
        selectedPlanOption: '',
        loading: true,
    };

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({loading: true});
            this.idCount();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    idCount = async() => {
        try{
            const idCount = await AsyncStorage.getItem('idCount');
            let idCountParse = Number(idCount);
            const allTracks = await AsyncStorage.getItem('allTracks');
            let allTracksParse = JSON.parse(allTracks);

            if(idCountParse != null && idCountParse != 'undefined'){
                this.setState({
                    idCount: idCountParse,
                    allTracks: allTracksParse,
                    loading: false,
                });
            }

        } catch (err){
            alert(err);
        }
    };

    addTrack = async() => {
        if(this.state.track.title != '' && this.state.track.selectedPlan != ''){
            try{
                let ids = this.state.idCount;
                ids += 1;

                let track = this.state.track;
                track.id = ids;
                this.setState({
                    track: track,
                });

                let allTracks;
                allTracks = this.state.allTracks;
                allTracks.push(this.state.track);
                this.setState({
                    allTracks: allTracks,
                });

                await AsyncStorage.setItem('allTracks', JSON.stringify(allTracks));
                await AsyncStorage.setItem('idCount', JSON.stringify(ids));
                this.idCount();
                this.props.navigation.navigate('MainScreen');
            } catch(err){
                alert(err);
            }
        } else {
            Alert.alert(
                'Warning',
                'Fill all fields',
                [
                    { text: 'Cancel', style: 'cancel',},
                ], {cancelable: false},
            );
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
            return(
                <View style={MainScreenStyle.body}>
                    <SafeAreaView style={TrackerScreenStyle.headerContainer}>
                        <TouchableOpacity style={TrackerScreenStyle.backButton} onPress={()=> this.props.navigation.navigate('MainScreen')}>
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
                                placeholderTextColor = {'rgba(255,255,255,0.6)'}
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
                        <TouchableOpacity style={TrackerScreenStyle.addTrackButton} onPress={()=>this.addTrack()}>
                            <Text style={TrackerScreenStyle.actionButtonText}>Make your best</Text>
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
