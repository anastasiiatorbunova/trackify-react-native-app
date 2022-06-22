import React, {Component} from 'react';
import AddTrackerStyle from "./Trackify/Style/AddTrackerStyle";
import {Text, TouchableOpacity, View} from "react-native";

export default class AppComponent extends Component {
    static navigationOptions = {
        header: null,
    };

    // planOptions = () => {
    //     let returnPlanOptions;
    //     let planOptions = [
    //         {
    //             name: 'Everyday',
    //         },
    //         {
    //             name: 'Only weekdays',
    //         },
    //         {
    //             name: 'Only weekends',
    //         },
    //     ];
    //
    //     planOptions.forEach((item)=>{
    //         let styleCheck;
    //         let styleButton;
    //         if(this.state.track.selectedPlan === item.name){
    //             styleCheck = [AddTrackerStyle.checkPlan,AddTrackerStyle.selectedCheckPlan];
    //             styleButton = [AddTrackerStyle.checkButton,AddTrackerStyle.selectedCheckButton];
    //         } else{
    //             styleCheck = AddTrackerStyle.checkPlan;
    //             styleButton = AddTrackerStyle.checkButton;
    //         }
    //         returnPlanOptions.push(
    //             <TouchableOpacity style={styleButton} onPress={()=>{
    //                 let track = this.state.track;
    //                 track.selectedPlan = item.name;
    //                 this.setState({
    //                     track: track
    //                 });
    //             }}>
    //                 <View style={styleCheck}/>
    //                 <Text style={AddTrackerStyle.planText}>{item.name}</Text>
    //             </TouchableOpacity>
    //         );
    //     });
    //
    //     return returnPlanOptions;
    // };

    constructor(props) {
        super(props);
    }

}
