import React from 'react';
import {
    View,
    Image,
    Text,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import AppFooterStyle from './Styles/AppFooterStyle';

export default class AppFooter extends React.Component {
    goToPage = async route => {
        this.props.navigation.navigate(route);
    };

    render() {
        return (
            <SafeAreaView style={AppFooterStyle.safeArea}>
                <View style={AppFooterStyle.container} />
            </SafeAreaView>
        );
    }
}
