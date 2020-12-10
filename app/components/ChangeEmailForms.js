import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import TextInput from './TextInput';
import Button from './Button';
import emailValidator from '../functions/emailValidator';
import passwordValidator from '../functions/passwordValidator';
import changePassword from '../functions/changePassword';
import updateUserAccount from '../functions/updateUserAccount';


const ChangeEmailForms = props => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const httpAuthType = useSelector(state => state.httpAuthType)
    
    return (
        <View style={styles.container}>
            <View style={styles.titleGrouping}>
                <Text style={styles.title}>Change Email</Text>
                <Text style={styles.description}>
                    Enter your new email address.
                </Text>
            </View>
            <View style={styles.formGrouping}>
                <TextInput 
                icon='mail'
                placeholder='Enter your new email'
                secureTextEntry={false}
                validator={emailValidator}
                setCredentials={setEmail}
                isValidation={true}
                />
            </View>
            <View style={styles.buttonGrouping}>
                <Button 
                label='Change Email'
                variant='primary'
                onPress={() => updateUserAccount({'email': email}, dispatch, httpAuthType, props.navigation)}
                />
            </View>
            <View style={styles.footerGrouping}>
                <Pressable 
                style={({ pressed }) => [styles.backButton, { opacity: pressed ? 0.5 : 1, backgroundColor: pressed ? "#F24E4E" : "white" }]}
                onPress={() => props.navigation.navigate('Profile')}
                >
                    <Feather style={styles.arrowIcon} name='arrow-left' size={24} color='black'>
                        <Text style={styles.BackButtonText}>Back</Text>
                    </Feather>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleGrouping: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    formGrouping: {
        marginBottom: 20,
    },
    buttonGrouping: {

    },
    title: {
        fontFamily: 'Raleway-Bold',
        fontWeight: '700',
        fontSize: 24,
        lineHeight: 30,
        color: '#0C0D34',
        textAlign: 'center',
    },
    description: {
        fontFamily: 'Raleway-Regular',
        fontSize: 16,
        lineHeight: 24,
        paddingLeft: 44,
        paddingRight: 44,
        color: '#0C0D34',
        textAlign: 'center',
    },
    footerGrouping: {
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        borderRadius: 24,
        padding: 10
    },
    arrowIcon: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    BackButtonText: {
        fontFamily: 'Raleway-Bold',
        fontSize: 24,
        color: 'black',
        textAlign: 'center',
    },
})

export default ChangeEmailForms;


