import {
    createStackNavigator,
    StackViewTransitionConfigs,
} from 'react-navigation-stack';
import { createSwitchNavigator } from 'react-navigation';

import MainScreen from '../Main/MainScreen';
import AddTracker from '../Trackify/AddTracker';
import EditTracker from '../Trackify/EditTracker';
import TrackerScreen from '../Trackify/TrackerScreen';

const AppStack = createStackNavigator(
    {
        MainScreen: MainScreen,
        AddTracker: AddTracker,
        EditTracker: EditTracker,
        TrackerScreen: TrackerScreen,
    },
    {
        transitionConfig: () => StackViewTransitionConfigs.NoAnimation,
    }
);

export default createSwitchNavigator(
    {
        App: AppStack,
    },
    {
        initialRouteName: 'App',
    }
);
