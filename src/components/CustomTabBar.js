import React ,{useContext} from "react";
import styled from "styled-components/native";

import HomeIcon from "../assets/home.svg";
import SeachIcon from "../assets/search.svg";
import TodayIcon from "../assets/today.svg";
import FavoritesIcon from "../assets/favorite.svg";
import AccountIcon from "../assets/account.svg";

import { UserContext} from "../contexts/UserContext";

const TabArea = styled.View`
    height: 60px;
    background-color: #4eadbe;
    flex-direction: row;
`;
const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;
const TabItemCenter = styled.TouchableOpacity`
    width: 70px;
    height: 70px;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    border-radius: 35px;
    border: 3px solid #4eadbe;
    margin-top: -20px;
`;
const AvatarIcon = styled.Image`
    width: 24px;
    height: 24px;
    border-radius: 12px;
`;


export default ({state, navigation}) => {

    const {state: user} = useContext(UserContext);

    const goTo = (screenName) => {
        navigation.navigate(screenName);
    }

    return (
        <TabArea>
            <TabItem onPress={()=>goTo('Home')} >
                <HomeIcon style={{opacity: state.index===0? 1 : 0.5 }} width="24" height="24" fill="#FFFFFF" />
            </TabItem>
            <TabItem onPress={()=>goTo('Search')} >
                <SeachIcon style={{opacity: state.index===1? 1 : 0.5 }} width="24" height="24" fill="#FFFFFF" />
            </TabItem>
            <TabItemCenter onPress={()=>goTo('Appointment')} >
                <TodayIcon  width="32" height="32" fill="#4eadbe" />
            </TabItemCenter>
            <TabItem onPress={()=>goTo('Favorites')} >
                <FavoritesIcon style={{opacity: state.index===3? 1 : 0.5 }} width="24" height="24" fill="#FFFFFF" />
            </TabItem>
            <TabItem onPress={()=>goTo('Profile')} >
                {user.avatar !='' ?
                    <AvatarIcon source={{uri: user.avatar}} />
                    :
                    <AccountIcon style={{opacity: state.index === 4 ? 1 : 0.5 }} width="24" height="24" fill="#FFFFFF" />
                }
            </TabItem>
        </TabArea>
    )
}