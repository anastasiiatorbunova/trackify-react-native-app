import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    ImageBackground,
    TouchableOpacity,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AppComponent from '../AppComponent';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import { isWeekend } from "date-fns";

import {ScrollView} from "react-navigation";
import LoaderScreen from '../Components/LoaderScreen';
import objToQueryString from '../functions/objToQueryString';
import MainScreenStyle from "../Main/Style/MainScreenStyle";
import TrackerScreenStyle from "../Trackify/Style/TrackerScreenStyle";
import {ifIphoneX} from "react-native-iphone-x-helper";

const GLOBALS = require('../settings/Globals');

export default class TrackerScreen extends AppComponent {
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
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({loading: true});
            this.getData();

            LocaleConfig.locales['fr'] = {
                monthNames: ['January','February','March','April','May','June','July','August','September','October','November','December'],
                dayNames: ['SUN','MON','TUE','WED','THU','FRI','SAT'],
                dayNamesShort: ['SUN','MON','TUE','WED','THU','FRI','SAT'],
            };
            LocaleConfig.defaultLocale = 'fr';
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    getData = async() => {
        try{
            const index = await AsyncStorage.getItem('index');
            const track = await AsyncStorage.getItem('allTracks');
            let trackParse = JSON.parse(track);

            if(track != null){
                this.setState({
                    track: trackParse[index],
                    index: Number(index),
                    loading: false,
                });
            }
        } catch(err){
            alert(err);
        }
    };

    setPercentage = async () => {
        try{
            const indexTrack = await AsyncStorage.getItem('index');
            const trackTrack = await AsyncStorage.getItem('allTracks');
            let trackParse = JSON.parse(trackTrack);
            trackParse[indexTrack] = this.state.track;
            await AsyncStorage.setItem('allTracks', JSON.stringify(trackParse));
        } catch (err){
            alert(err);
        }
    };

    onRemoveButton = (index) => {
        let trackIndex = index;
        try{
            Alert.alert(
                'Warning',
                'Are you sure you want to remove your track?',
                [
                    { text: 'Remove',
                        onPress: async () => {
                            const allTracks = await AsyncStorage.getItem('allTracks');
                            let allTracksParse = JSON.parse(allTracks);
                            allTracksParse.splice(trackIndex, 1);
                            await AsyncStorage.setItem('allTracks', JSON.stringify(allTracksParse));
                            this.props.navigation.navigate('MainScreen');
                        }},
                    { text: 'Cancel', style: 'cancel',},
                ], {cancelable: false},
            );
        } catch(err){
            alert(err);
        }
    };

    onEditButton = () => {
        this.props.navigation.navigate('EditTracker');
    };

    selectDays = async (day, disableClick, alert) => {
        if(alert === true){
            Alert.alert(
                'Warning',
                'You cannot mark days in advance.',
                [
                    { text: 'Cancel', style: 'cancel',},
                ], {cancelable: false},
            );
        } else {
            if (disableClick === false) {
                let track = this.state.track;
                let index = track.markedDates.findIndex((item) => item === day.dateString);
                if (track.markedDates.length === 0) {
                    track.markedDates.push(day.dateString);
                } else {
                    if (index < 0) {
                        track.markedDates.push(day.dateString);
                    } else {
                        track.markedDates.splice(index, 1);
                    }
                }
                this.setState({track: track});

                const indexTrack = await AsyncStorage.getItem('index');
                const trackTrack = await AsyncStorage.getItem('allTracks');
                let trackParse = JSON.parse(trackTrack);
                trackParse[indexTrack] = this.state.track;
                await AsyncStorage.setItem('allTracks', JSON.stringify(trackParse));
            } else {
                return;
            }
        }
    };

    percentTextOutput = () => {
        let textStyle;
        let hundredPercentStyle;

        if(this.state.track.donePercent > 60 && this.state.track.donePercent <= 100){
            textStyle = MainScreenStyle.greenStyle;
        } if(this.state.track.donePercent <= 60 && this.state.track.donePercent > 20){
            textStyle = MainScreenStyle.yellowStyle;
        } if(this.state.track.donePercent <= 20) {
            textStyle = MainScreenStyle.redStyle;
        }
        if(this.state.track.donePercent === 100){
            hundredPercentStyle = {color:'#2ecc71'};
        } else{
            hundredPercentStyle = {color:'#9e9ea1'};
        }

        return (
            <View style={TrackerScreenStyle.percentBlock}>
                {this.state.track.donePercent === 100 ? <Text></Text> :
                    <Text style={[TrackerScreenStyle.percentText,textStyle]}>{this.state.track.donePercent}%</Text>}
                <Text style={[TrackerScreenStyle.percentText,hundredPercentStyle]}>100%</Text>
            </View>
        );
    };

    renderPage = () => {
        Date.prototype.yyyymmdd = function() {
            let mm = this.getMonth() + 1;
            let dd = this.getDate();

            return [this.getFullYear(),
                (mm>9 ? '' : '0') + mm,
                (dd>9 ? '' : '0') + dd
            ].join('-');
        };
        let data = new Date();
        let compareDate = String(data.yyyymmdd());
        let countDays = 0;
        let countMarkedDays = 0;
        let backgroundGradient;
        let cornerRadius = {};

        if(this.state.track.donePercent > 60 && this.state.track.donePercent <= 100){
            backgroundGradient = '#2ecc71';
        } if(this.state.track.donePercent <= 60 && this.state.track.donePercent > 20){
            backgroundGradient = '#f0c30f';
        } if(this.state.track.donePercent <= 20) {
            backgroundGradient = '#e34b3b';
        } if(this.state.track.donePercent === 100 || this.state.track.donePercent === 0){
            cornerRadius = {borderRadius:5};
        }

        if(this.state.loading === true){
            return <LoaderScreen text="Loading..."/>;
        } else{
            return(
                <View style={TrackerScreenStyle.bodyTrack}>
                    <SafeAreaView style={[TrackerScreenStyle.headerContainer,TrackerScreenStyle.headerContainerTrack]}>
                        <TouchableOpacity style={[TrackerScreenStyle.backButton,{marginLeft:20}]} onPress={()=> this.props.navigation.goBack()}>
                            <Image source={require('../../assets/back.png')} style={TrackerScreenStyle.imageBack} />
                        </TouchableOpacity>
                        <View style={TrackerScreenStyle.trackTitle}>
                            <Text style={TrackerScreenStyle.trackTitleText}>{this.state.track.title}</Text>
                        </View>
                    </SafeAreaView>
                    <ScrollView style={{flexDirection:'column'}}>
                        <View style={TrackerScreenStyle.monthContainer}>
                            <Calendar
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#fff',
                                }}
                                theme={{
                                    backgroundColor: 'transparent',
                                    calendarBackground: 'transparent',
                                    selectedDayBackgroundColor: '#ffffff',
                                    selectedDayTextColor: '#171717',
                                    textSectionTitleColor: '#fff',
                                    monthTextColor: '#fff',
                                    textMonthFontSize: 20,
                                    textDayHeaderFontSize: 13,
                                }}
                                current={Date()}
                                //onDayPress={(day) => this.selectDays(day)}
                                //markedDates={{ [this.state.track.markedDates] : {disabled: false, startingDay: true, color: 'green', endingDay: true} }}
                                monthFormat={'MMMM yyyy'}
                                hideArrows={true}
                                hideExtraDays={false}
                                disableMonthChange={false}
                                firstDay={1}
                                hideDayNames={false}
                                markingType={'period'}
                                dayComponent={({date, state}) => {
                                    let disabled = isWeekend(date.timestamp);
                                    let marked = this.state.track.markedDates.includes(date.dateString);
                                    let style;
                                    let alert;
                                    let blockStyle;
                                    let disableClick;

                                    if(marked === true) {
                                        blockStyle = [TrackerScreenStyle.selectedBlock,TrackerScreenStyle.dayBlock];
                                    } else {
                                        blockStyle = [TrackerScreenStyle.notSelectedBlock,TrackerScreenStyle.dayBlock];
                                    }

                                    if(state === 'disabled'){
                                        style = [TrackerScreenStyle.disabledDay,{fontSize:18,color: '#3e3e3e',}];
                                    } else {
                                        if (disabled === false) {
                                            if (this.state.track.selectedPlan === 'Only weekdays' || this.state.track.selectedPlan === 'Everyday') {
                                                style = [TrackerScreenStyle.notDisabledDay, {fontSize: 18}];
                                                countDays += 1;
                                                if(marked === true){
                                                    style.push({color:'#171717'});
                                                }
                                                disableClick = false;
                                            }
                                            if (this.state.track.selectedPlan === 'Only weekends') {
                                                style = [TrackerScreenStyle.disabledDay, {fontSize: 18}];
                                                blockStyle = [TrackerScreenStyle.notSelectedBlock,TrackerScreenStyle.dayBlock];
                                                disableClick = true;
                                            }
                                        }
                                        if (disabled === true) {
                                            if (this.state.track.selectedPlan === 'Only weekends' || this.state.track.selectedPlan === 'Everyday') {
                                                style = [TrackerScreenStyle.notDisabledDay, {fontSize: 18,}];
                                                countDays += 1;
                                                if(marked === true){
                                                    style.push({color:'#171717'});
                                                }
                                                disableClick = false;
                                            }
                                            if (this.state.track.selectedPlan === 'Only weekdays') {
                                                style = [TrackerScreenStyle.disabledDay, {fontSize: 18,color: '#3e3e3e',}];
                                                blockStyle = [TrackerScreenStyle.notSelectedBlock,TrackerScreenStyle.dayBlock];
                                                disableClick = true;
                                            }
                                        }
                                    }

                                    if (marked === true && disableClick === false){
                                        countMarkedDays += 1;
                                    }

                                    if(compareDate > date.dateString || compareDate === date.dateString){
                                        disableClick = false;
                                        alert = false;
                                    } else{
                                        disableClick = true;
                                        alert = true;
                                    }

                                    return[
                                        this.countDaysFunc(countDays, countMarkedDays),
                                        <TouchableOpacity
                                            style={[blockStyle]}
                                            onPress={()=> this.selectDays(date, disableClick, alert)}
                                        >
                                            <Text style={style}>{date.day}</Text>
                                        </TouchableOpacity>
                                    ];
                                }}
                            />
                        </View>
                        <View style={TrackerScreenStyle.actionButtonsBlock}>
                            <TouchableOpacity style={TrackerScreenStyle.actionButton} onPress={()=> this.onEditButton()}>
                                <Text style={TrackerScreenStyle.actionButtonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={TrackerScreenStyle.actionButton} onPress={()=> this.onRemoveButton(this.state.index)}>
                                <Text style={TrackerScreenStyle.actionButtonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={TrackerScreenStyle.progressBlock}>
                            <Text style={TrackerScreenStyle.progressText}>Progress</Text>
                            <View style={{flexDirection:'row'}}>
                                <View
                                    style={[TrackerScreenStyle.gradientBlock, cornerRadius,
                                        {
                                            width: this.state.track.donePercent+'%',
                                            backgroundColor: backgroundGradient,
                                            borderBottomLeftRadius: 5,
                                            borderTopLeftRadius: 5,
                                        }
                                        ]}
                                />
                                <View
                                    style={[TrackerScreenStyle.gradientBlock, cornerRadius,
                                        {
                                            width: 100-this.state.track.donePercent+'%',
                                            backgroundColor: '#eeeeef',
                                            borderBottomRightRadius: 5,
                                            borderTopRightRadius: 5,
                                        }
                                        ]}
                                />
                            </View>
                            {this.percentTextOutput()}
                        </View>
                    </ScrollView>
                    <SafeAreaView style={{marginBottom:ifIphoneX(10,25)}}>
                        <View style={{width:'100%',paddingHorizontal:20}}>
                            <TouchableOpacity
                                style={TrackerScreenStyle.addTrackButton}
                                onPress={()=> this.props.navigation.navigate('AddTracker')}
                            >
                                <Text style={TrackerScreenStyle.actionButtonText}>Add new</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </View>
            );
        }
    };

    countDaysFunc = (countDays, countMarkedDays) => {
        let donePercent = 0;
        donePercent = Math.round(100*countMarkedDays/countDays);
        let track = this.state.track;
        track.donePercent = donePercent;
        this.setState({track: track});
        this.setPercentage();
    };

    render() {
        return this.renderPage();
    }
}
