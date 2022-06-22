import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AppComponent from '../AppComponent';
import LoaderScreen from '../Components/LoaderScreen';
import AppHeader from '../Components/AppHeader';
import MainScreenStyle from './Style/MainScreenStyle';
import {ScrollView} from "react-navigation";
import objToQueryString from '../functions/objToQueryString';

const GLOBALS = require('../settings/Globals');

export default class MainScreen extends AppComponent {
    state = {
        allTracks: [],
        loading: true,
    };

    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener('didFocus', () => {
            this.getData();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }

    getData = async() =>{
        try{
            const allTracks = await AsyncStorage.getItem('allTracks');
            let allTracksParse = JSON.parse(allTracks);

            if(!(allTracksParse < 0)){
                this.setState({
                    allTracks: allTracksParse,
                    loading: false,
                });
            }
        } catch(err){
            alert(err);
        }
    };

    goToTrack = async(index) => {
        try{
            await AsyncStorage.setItem('index', JSON.stringify(index));
            this.props.navigation.navigate('TrackerScreen');
        } catch(err){
            alert(err);
        }
    };

    tracksBlocks = () => {
        let returnTracks= [];

        if(this.state.allTracks != null){
            this.state.allTracks.forEach((item, index) => {
                let styleForItem;
                if(item.donePercent > 60 && item.donePercent <= 100){
                    styleForItem = MainScreenStyle.greenStyle;
                } if(item.donePercent <= 60 && item.donePercent > 20){
                    styleForItem = MainScreenStyle.yellowStyle;
                } if(item.donePercent <= 20) {
                    styleForItem = MainScreenStyle.redStyle;
                }

                returnTracks.push(
                    <TouchableOpacity onPress={()=> {
                        this.goToTrack(index);
                    }}>
                        <View style={MainScreenStyle.trackBlock}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Text style={MainScreenStyle.trackBlockTitle}>{item.title}</Text>
                                <Text style={[MainScreenStyle.trackBlockPercent,styleForItem]}>{item.donePercent}%</Text>
                            </View>
                            <View>
                                <Image source={require('../../assets/arrow.png')}  style={MainScreenStyle.trackArrow} />
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            });
        } else {
            returnTracks.push(
                <View style={MainScreenStyle.emptyTextBlock}>
                    <Text style={MainScreenStyle.emptyText}>You haven't had any tracks yet.</Text>
                    <Text style={MainScreenStyle.emptyText}>Add one to start.</Text>
                </View>
            );
        }

        return returnTracks;
    };

    renderPage = () => {
        if(this.state.loading === true){
            return <LoaderScreen text="Loading..."/>;
        } else{
            return(
                <View style={MainScreenStyle.body}>
                    <AppHeader navigation={this.props.navigation} />
                    <View style={MainScreenStyle.container}>
                        <View style={MainScreenStyle.subtitle}>
                            <View style={{flex:1}}>
                                <Text style={MainScreenStyle.subtitleText}>Stay on track with your Trackify</Text>
                            </View>
                            <View style={{flex:1,alignItems:'flex-end'}}>
                                <TouchableOpacity style={MainScreenStyle.addButton} onPress={()=> this.props.navigation.navigate('AddTracker')}>
                                    <Image source={require('../../assets/plus.png')}  style={MainScreenStyle.addButtonText} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {this.tracksBlocks()}
                    </View>
                </View>
            );
        }
    };

    render() {
        return this.renderPage();
    }
}
