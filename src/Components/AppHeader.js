import React from 'react';
import {
    View,
    Image,
    Text,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import AppHeaderStyle from './Styles/AppHeaderStyle';

export default class AppHeader extends React.Component {
    goToPage = async route => {
        this.props.navigation.navigate(route);
    };

    render() {
        return (
            <SafeAreaView style={AppHeaderStyle.safeArea}>
                <View style={AppHeaderStyle.container}>
                    <View>
                        <Image source={require('../../assets/logo.png')} style={AppHeaderStyle.headerLogo} />
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}
