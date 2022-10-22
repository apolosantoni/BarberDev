import React,{ useState, useContext} from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import {UserContext} from "../../contexts/UserContext";
import { 
        Container,
        InputArea,
        CustomButtom,
        CustomButtomText,
        SignMessageButton,
        SignMessageButtonText,
        SignMessageButtonTextBold
        } from "./styles";

import Api from '../../Api';

import SignInput from "../../components/SignInput";

import BarberLogo from "../../assets/barber.svg";
import EmailIcon from "../../assets/email.svg";
import LockIcon from "../../assets/lock.svg";

export default () => {
    
    const {dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    const [emailField, setEmailField] = useState('suporte@b7web.com.br');
    const [passwordField, setPasswordField] = useState('1234');

    const handleSignClick = async () => {

        if(emailField != '' && passwordField != ''){

            let json = await Api.signIn(emailField, passwordField);
            if(json.token){
                await AsyncStorage.setItem('token', json.token);
                
                userDispatch({
                    type: 'setAvatar',
                    payload:{
                        avatar: json.data.avatar
                    }
                });

                navigation.reset({
                    routes: [{name: 'MainTab'}]
                })

            }else{
                alert("E-mail / senha incorretos !");
            }

        }else{
            alert('Preencha os campos!');
        }

    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignUp'} ]
        })
    }

    return (
        <Container>
            <BarberLogo width="80%" height="120" />

            <InputArea>
                <SignInput 
                    IconSvg={EmailIcon}  
                    placeholder="Digite seu e-mail"
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                />
                <SignInput 
                    IconSvg={LockIcon} 
                    placeholder="Digite sua senha"
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password={true}
                />

                <CustomButtom onPress={handleSignClick} >
                    <CustomButtomText>LOGIN</CustomButtomText>
                </CustomButtom>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ainda não possui uma conta ? </SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}