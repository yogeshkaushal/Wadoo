import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    TouchableOpacity,
} from 'react-native';
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/core';

const LoginScreen = () => {

    const navigation = useNavigation();

    const onGoogleButtonPress = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();

            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);

            navigation.navigate('Tabs');
            return auth().signInWithCredential(googleCredential);


        } catch (error) {
            console.log(error, "ERROR")
        }
    };

    return (
        <SafeAreaView style={styles.safeAreaView}>
            <View style={styles.conatiner}>
                <GoogleSigninButton
                    style={{ width: 192, height: 48 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={onGoogleButtonPress} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    safeAreaView: {
        flex: 1,
    },
    textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonStyle: {
        backgroundColor: 'red',
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginVertical: 10,
    },
});

export default LoginScreen;
