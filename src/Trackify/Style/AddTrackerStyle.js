import {StyleSheet} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const AddTrackerStyle = StyleSheet.create({
    block: {
        marginTop: 50,
    },
    inputTrackTitle: {
        height: 75,
        width: '100%',
        backgroundColor: '#282829',
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: '#b7b7b7',
        color: '#fff',
        fontSize: 20,
        paddingLeft: 30,
        paddingRight: 20,
    },
    textPlan: {
        fontSize: 20,
        color: '#fff',
        marginBottom: 20,
    },
    checkPlan: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: '#282829',
        borderRadius: 10,
        marginRight: 15,
    },
    selectedCheckPlan: {
        backgroundColor: '#fff',
        fontSize: 17,
    },
    planText: {
        color: '#fff',
        //fontFamily: 'Gotham-Bold',
        fontSize: 20,
    },
    checkButton: {
        height: 75,
        width: '100%',
        backgroundColor: '#282829',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#282829',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        paddingHorizontal: 20,
    },
    selectedCheckButton:{
        borderColor: '#fff',
    },
    bottomButton: {
        marginBottom: ifIphoneX(10,25),
    },
});

export default AddTrackerStyle;
