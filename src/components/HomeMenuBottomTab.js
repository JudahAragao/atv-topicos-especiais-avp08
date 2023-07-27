import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Ícones das tabs e de botões telas

import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import Agendamentos from '../screens/Agendamentos';
import BtnNovoAgendamento from './BtnNovoAgendamento';

const Tab = createMaterialBottomTabNavigator();

export default HomeMenuBottomTab = ({ navigation, route }) => {
    return (
        <Tab.Navigator
            activeColor='#1d2226'
            inactiveColor='#424b51'
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
                }}
            />

            <Tab.Screen
                name="Agendamentos"
                component={Agendamentos}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ size, color }) => <BtnNovoAgendamento size={size} color={color} />,
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={Perfil}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />,
                }}
            />
        </Tab.Navigator>
    );
}
