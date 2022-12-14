import React, {useState, useEffect} from "react";
import { useNavigation, useRoute } from "@react-navigation/native"; 
import Swiper from "react-native-swiper";

import Stars from "../../components/Stars";
import BarberModal from "../../components/BarberModal";

import FavoritoIcon from "../../assets/favorite.svg";
import FavoritoFullIcon from "../../assets/favorite_full.svg";
import BackIcon from "../../assets/back.svg"
import NavPrevIcon from "../../assets/nav_prev.svg"
import NavNextIcon from "../../assets/nav_next.svg"

import { 
        Container,
        Scroller,
        SwipeDot,
        SwipeDotActive,
        SwipeItem,
        SwipeImage,
        FakeSwiper,

        PageBody,

        UserInfoArea,
        UserAvatar,
        UserInfo,
        UserInfoName,
        UserFavButton,

        ServiceArea,
        ServicesTitle,
        ServiceInfo,
        ServiceItem,
        ServiceName,
        ServicePrice,
        ServiceChooseButton,
        ServiceChooseButtonText,

        TestimonialArea,
        TestimonialItem,
        TestimonialInfo,
        TestimonialName,
        TestimonialBody,


        BackButton,
        LoadingIcon,

        } from "./styles";

import Api from "../../Api";

export default ({data}) => {
    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    });
    const [loading, setLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);
    const [selectedService, setSelecteService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getBarberInfo = async () => {

            setLoading(true);

            let json = await Api.getBarber(userInfo.id);
            if(json.error == ''){
                //console.log("Dados :", json.data);
                setUserInfo(json.data);
                setFavorited(json.data.favorited);

            }else{

                alert("Error: " + json.error);
            }
            setLoading(false);
        }
        getBarberInfo();
    },[])

    const handleBack = () => {
        
        navigation.goBack();
    }

    const handleServiceChoose = (key) => {
        setSelecteService(key);
        setShowModal(true);
    }

    const handleFavClick = () => {
        setFavorited( !favorited );
        Api.setFavorite(userInfo.id);
    }

    return (
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length > 0 ? 
                <Swiper
                    style={{height: 240}}
                    dot={<SwipeDot />}
                    activeDot={<SwipeDotActive />}
                    paginationStyle={{top: 15, right:15, bottom: null, left: null}}
                    autoplay={true}
                    >
                    {
                        userInfo.photos.map((item, key)=> (
                            <SwipeItem key={key}>
                                <SwipeImage source={{uri:item.url}} resizeMode="cover" />
                            </SwipeItem>
                        ))
                    }
                </Swiper>    
                :
                <FakeSwiper ></FakeSwiper>
                }

            <PageBody>
                <UserInfoArea>
                    <UserAvatar source={{uri: userInfo.avatar}}/>
                    <UserInfo>
                        <UserInfoName>{userInfo.name}</UserInfoName>
                        <Stars stars={userInfo.stars} showNumber={true} />
                    </UserInfo>
                <UserFavButton onPress={handleFavClick}>
                    {favorited ?
                        <FavoritoFullIcon width="24" height="24" fill="#FF0000" />
                    :
                        <FavoritoIcon width="24" height="24" fill="#FF0000" />
                    }
                </UserFavButton>
                </UserInfoArea>
                {loading&& <LoadingIcon size="large" color="#000000" />}
                {userInfo.services && 
                    <ServiceArea>
                        <ServicesTitle>Lista de Servi??os</ServicesTitle>
                        {
                            userInfo.services.map((item, key)=> (
                                <ServiceItem key={key}>
                                    <ServiceInfo>
                                        <ServiceName>{item.name}</ServiceName>
                                        <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                                    </ServiceInfo>
                                    <ServiceChooseButton onPress={()=>handleServiceChoose(key)}>
                                        <ServiceChooseButtonText>Agendar</ServiceChooseButtonText>
                                    </ServiceChooseButton>
                                </ServiceItem>
                            ))
                        }
                    </ServiceArea>
                }
                {userInfo.testimonials && userInfo.testimonials.length > 0 &&
                    <TestimonialArea>
                        
                        <Swiper
                            style={{height: 110}}
                            showsPagination={false}
                            showsButtons={true}
                            prevButton={<NavPrevIcon width="35" height="35" fill="#000000" />}
                            nextButton={<NavNextIcon width="35" height="35" fill="#000000" />}
                            >
                            {
                                userInfo.testimonials.map((item, key)=> (
                                    <TestimonialItem key={key}>
                                        <TestimonialInfo> 
                                            <TestimonialName> {item.name} </TestimonialName>
                                            <Stars stars={item.rate} showNumber={false} />
                                        </TestimonialInfo>
                                        <TestimonialBody>{item.body}</TestimonialBody>
                                    </TestimonialItem>
                                ))
                            }
                        </Swiper>    
                    </TestimonialArea>
                }   
            </PageBody>
            </Scroller>
            <BackButton onPress={handleBack}>
                <BackIcon width="44" height="44" fill="#FFFFFF" />
            </BackButton>
            <BarberModal 
                show={showModal} 
                setShowModal={setShowModal}
                user={userInfo}
                service={selectedService}
            />
        </Container>
    )
}