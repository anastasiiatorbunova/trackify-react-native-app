import {StyleSheet} from 'react-native';

const BodyStyle = StyleSheet.create({
    simplePage: {
        flex: 1,
        justifyContent: 'center',

    },
    pageLayout: {
        backgroundColor: '#f1f2f4',
        height: '100%',
    },
    pageContent: {
        flex: 1,
    },
    emptyPageContent: {
        flex: 1,
        justifyContent: 'center',
    },
    emptyPageText: {
        textAlign: 'center',
        fontSize: 20,
    },
});

export default BodyStyle;
