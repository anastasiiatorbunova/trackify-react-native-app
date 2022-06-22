import {StyleSheet} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const AppFooterStyle = StyleSheet.create({
    safeArea: {
        backgroundColor: '#ffffff',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    container: {
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        marginBottom: ifIphoneX(0, 10),
    },
});

export default AppFooterStyle;
