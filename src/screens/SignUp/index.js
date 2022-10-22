import React,{ useState, useContext} from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";

import { UserContext } from "../../contexts/UserContext";
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
import PersonIcon from "../../assets/person.svg";

export default () => {
    
    const {dispatch: userDispatch} = useContext(UserContext);
    const navigation = useNavigation();

    const [nameField, setNameField] = useState('');
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');

    const handleSignClick = async () => {
        if(nameFiel != '' && emailField != '' && passwordField != ''){

            let json = await Api.signUp(nameField, emailField, passwordField);
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
            routes: [{name: 'SignIn'} ]
        })
    }

    return (
        <Container>
            <BarberLogo width="80%" height="120" />

            <InputArea>
                <SignInput 
                    IconSvg={PersonIcon}  
                    placeholder="Digite seu nome"
                    value={nameField}
                    onChangeText={t=>setNameField(t)}
                />
                <SignInput 
                    IconSvg={EmailIcon} 
                    placeholder="Digite seu e-mail"
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                />
                <SignInput 
                    IconSvg={LockIcon} 
                    placeholder="Confirme sua senha"
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    password={true}
                />

                <CustomButtom onPress={handleSignClick} >
                    <CustomButtomText>CADASTRAR</CustomButtomText>
                </CustomButtom>
            </InputArea>

            <SignMessageButton onPress={handleMessageButtonClick}>
                <SignMessageButtonText>Ja possui uma conta ? </SignMessageButtonText>
                <SignMessageButtonTextBold>Faça o Login</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}