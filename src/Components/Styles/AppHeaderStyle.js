import {StyleSheet} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const AppHeaderStyle = StyleSheet.create({
    safeArea: {
        backgroundColor: '#171717',
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 70,
        paddingBottom: 10,
        paddingHorizontal: 20,
        marginTop: ifIphoneX(10, 20),
    },
    headerLogo: {
        width: 170,
        height: 60,
        resizeMode: 'contain',
    },
    headerCartIcon: {
        height: 30,
        width: 40,
        resizeMode: 'contain',
    },
});

export default AppHeaderStyle;
