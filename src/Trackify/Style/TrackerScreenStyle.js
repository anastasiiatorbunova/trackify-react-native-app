import {StyleSheet} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const TrackerScreenStyle = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: ifIphoneX(5,20),
        backgroundColor: '#171717',
    },
    headerContainerTrack: {
        marginTop: ifIphoneX(0,0),
        paddingTop: ifIphoneX(5,20)
    },
    bodyTrack:{
        backgroundColor: '#fff',
        paddingHorizontal: 0,
        flex: 1,
    },
    backButton: {
        //flex: 1,
    },
    trackTitle: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageBack: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    trackTitleText:{
        color: '#fff',
        fontSize: 25,
    },
    monthName: {
        width: '100%',
        justifyContent: 'center',
    },
    monthNameText: {
        color: '#fff',
        fontSize: 18,
    },
    actionButtonsBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal:20,
    },
    actionButton: {
        height: 75,
        width: '45%',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#171717',
    },
    actionButtonText: {
        color: '#fff',
        //fontFamily: 'Gotham-Bold',
        fontSize: 20,
        letterSpacing: 0.5,
        fontWeight: 'bold',
    },
    addTrackButton: {
        backgroundColor: '#2ecc71',
        width: '100%',
        height: 80,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    monthContainer: {
        backgroundColor: '#171717',
        marginBottom: 20,
        borderBottomRightRadius: 15,
        borderBottomLeftRadius: 15,
        flex: 1,
        paddingHorizontal:20,
        paddingBottom: 30,
        paddingTop: 20,

        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        elevation: 6,
    },
    notDisabledDay: {
        color: '#fff',
    },
    disabledDay: {
        color: '#3e3e3e',
    },
    dayBlock: {
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedBlock: {
        backgroundColor: '#fff',
    },
    notSelectedBlock: {
        backgroundColor: 'transparent',
    },
    progressBlock: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    progressText: {
        color: '#282829',
        fontSize: 20,
        marginBottom: 5,
    },
    percentBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    percentText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    gradientBlock: {
        height: 20,
    },
});

export default TrackerScreenStyle;
