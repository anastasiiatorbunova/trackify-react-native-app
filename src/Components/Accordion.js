/**
 *  Source: https://github.com/KPS250/React-Native-Accordion
 */

import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Icon } from 'native-base';
import CafeProductStyle from "../CafeMenu/Styles/CafeProductStyle";

export default class Accordion extends Component{

    constructor(props) {
        super(props);
        this.state = {
            data: props.content,
            expanded : this.props.expanded !== undefined ? this.props.expanded : false,
        }
    }

    render() {
        return (
            <View>
                <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpand()}>
                    <Text style={[styles.title, styles.font, CafeProductStyle.priceCupText]}>{this.props.title}</Text>
                    {
                        this.props.content !== undefined &&
                        <Icon name={this.state.expanded ? 'ios-arrow-down' : 'ios-arrow-forward'} size={30} color={'#5E5E5E'} />
                    }

                </TouchableOpacity>
                {
                    this.state.expanded && this.props.content !== undefined &&
                    <View style={styles.child}>
                        {this.props.content}
                    </View>
                }

            </View>
        )

    }

    toggleExpand=()=>{
        this.setState({expanded : !this.state.expanded})
    }

}

const styles = StyleSheet.create({
    title:{
        fontFamily: 'Montserrat-Bold',
        fontSize: 15,
        color: '#000000',
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:66,
        paddingLeft: 20,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f3f3',
        borderStyle: 'solid',
    },
    parentHr:{
        height:1,
        color: '#fff',
        width:'100%'
    },
    child:{
        backgroundColor: '#f3f3f3',
        padding: 16,
    }

});
