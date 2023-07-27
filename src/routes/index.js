import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text, Alert } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Stack = createNativeStackNavigator()

export default Routes = () => {
    return <Stack.Navigator>
        <Stack.Screen
            name="Welcome"
            component={Welcome}
            options={{ headerShown: false }}
        />

        <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
        />

        <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
        />

        <Stack.Screen
            name="HomeMenuBottomTab"
            component={HomeMenuBottomTab}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
}