import React, { useState, useEffect }from "react";
import { Platform, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { request, PERMISSIONS} from 'react-native-permissions';
import Geolocation from "@react-native-community/geolocation";

import { 
    Container,
    Scrooler,

    HeaderArea,
    HeaderTitle,
    SearchButtom,
    
    LocationArea,
    LocationInput,
    LocationFinder,

    LoadingIcon,
    ListArea,

 } from "./styles";

import SearchIcon from "../../assets/search.svg";
import MyLocationIcon from "../../assets/my_location.svg";
import Api from "../../Api";
import BarberItem from '../../components/BarberItem';



export default () => {

    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    const handleLocationFinder = async () => {
        setCoords(null);

        let result = await request(
            Platform.OS === 'ios' ?
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
                :
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        );
        if(result == 'granted') {
            
            setLoading(true);
            setLocationText('');
            setList([]);

            Geolocation.getCurrentPosition((info) => {
                setCoords(info.coords);
                getBarbers();
            })


        }

    }

    const getBarbers = async () => {
        setLoading(true);
        setList([]);

        let lat = null;
        let lng = null;

        if(coords) {
            lat = coords.latitude;
            lng = coords.longitude;
        }

        let res = await Api.getBarbers(lat, lng);

        if(res.error == ''){
            if(res.loc){
                setLocationText(res.loc);
            }
            setList(res.data);

        }else{
            alert("Error: " +res.error);
        }

        setLoading(false);
    }

    const onRefresh = () => {
        setRefreshing(false);
        getBarbers();
    }

    useEffect(()=>{
        getBarbers();
    },[]);

    return (
        <Container>
            <Scrooler refreshControl= {
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2} >Encontre o seu barbeiro favorito</HeaderTitle>
                    <SearchButtom onPress={()=>navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF" />
                    </SearchButtom>
                </HeaderArea>
                <LocationArea>
                    <LocationInput 
                        placeholder="Onde você está ?" 
                        placeholderTextColor="#FFFFFF" 
                        value={locationText}
                        onChangeText={t=>setLocationText(t)}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
                    </LocationFinder>
                </LocationArea>
                {
                    loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                }

                <ListArea>
                    {list.map((item, k)=>(
                        <BarberItem key={k} data={item} />
                    ))}
                </ListArea>

            </Scrooler>

        </Container>
    )
}