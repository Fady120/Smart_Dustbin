import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { switchMode } from '../redux-store/Actions';
import { Ionicons  } from '@expo/vector-icons'; 

export default function App() {
    // get the current theme
    const theme = useSelector(state => state.theme);
    // initialize action dispatcher
    const dispatch = useDispatch();
    // define a component mode state
    const [mode, setMode] = useState(theme.mode);

    const handleThemeChange = () => { 
        dispatch(switchMode(theme.mode === 'light' ? 'dark' : 'light'));
    }
    
    // Update the app Incase the theme mode changes
    useEffect(() => { 
        setMode(theme.mode);
    }, [theme]);
    
    // Render a view with different style classes depending on the theme mode
    
    return (
        <View style={mode == 'light' ? styles.container_light : styles.container_dark}>
            <TouchableOpacity onPress={handleThemeChange}>
                <Ionicons name="moon" size={30} color="blue"/>
            </TouchableOpacity>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container_light: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container_dark: {
        flex: 1,
        backgroundColor: '#242c40',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text_light: {
        marginBottom: 20,
        color: '#000'
    },
    text_dark: {
        marginBottom: 20,
        color: "#fff"
    },

});