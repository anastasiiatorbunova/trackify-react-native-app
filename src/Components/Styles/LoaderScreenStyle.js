import {StyleSheet} from 'react-native';

const LoaderScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#171717',
    },
    loaderBlock: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activityIndicator: {
        marginRight: 10,
    },
});

export default LoaderScreenStyle;
