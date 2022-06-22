import React from 'react';
import {
    Text,
    StyleSheet,
} from 'react-native';

export default class MText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let styles = [stylesSet.defaultStyle];
        if (this.props.bold !== undefined) {
            styles.push(stylesSet.bold);
        }
        else if (this.props.medium !== undefined) {
            styles.push(stylesSet.medium);
        }
        styles.push(this.props.style)
        return (
            <Text style={styles}>
                {this.props.children}
            </Text>
        );
    }
}

const stylesSet = StyleSheet.create({
    defaultStyle: {
        fontFamily: 'Montserrat-Regular',
    },
    medium: {
        fontFamily: 'Montserrat-Medium',
    },
    bold: {
        fontFamily: 'Montserrat-Bold',
    },
});
