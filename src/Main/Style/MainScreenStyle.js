import {StyleSheet} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const MainScreenStyle = StyleSheet.create({
    body: {
        backgroundColor: '#171717',
        flex: 1,
        paddingHorizontal: 20,
    },
    container: {
        flex: 1,
    },
    subtitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginBottom: 30,
    },
    subtitleText: {
        //fontFamily: 'Gotham-Regular',
        fontSize: 18,
        lineHeight: 25,
        color: '#fff',
    },
    addButton: {
        backgroundColor: '#2ecc71',
        width: 75,
        height: 75,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addButtonText: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    trackBlock: {
        backgroundColor: '#282829',
        width: '100%',
        height: 75,
        borderRadius: 15,
        marginBottom: 25,
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    trackBlockTitle: {
        //fontFamily: 'Gotham-Bold',
        fontSize: 20,
        color: '#fff',
        marginRight: 15,
    },
    trackBlockPercent: {
        //fontFamily: 'Gotham-Light',
        fontSize: 15,
        color: '#fff',
    },
    trackArrow: {
        width: 15,
        height: 20,
        resizeMode: 'contain',
    },
    greenStyle: {
        color: '#2ecc71',
    },
    yellowStyle: {
        color: '#f0c30f',
    },
    redStyle: {
        color: '#e34b3b',
    },
    emptyText: {
        fontSize: 22,
        color: '#fff',
    },
    emptyTextBlock: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default MainScreenStyle;
