import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, useColorScheme, View } from 'react-native';
import styled from 'styled-components/native';
import { Movie } from '../api';
import { makeImagePath } from '../utils';
import Poster from './Poster';

const Title = styled.Text`
    color: ${(props) => props.theme.textColor};
    font-size: 12px;
    font-weight: 600;
`;

const Wrapper = styled.View`
    flex-direction: row;
    height: 100%;
    justify-content: center;
    align-items: center;
`;

const Column = styled.View`
    width  : 40%;
    margin-left: 15px;
`;

const Overview = styled.Text`
    color: rgba(255, 255, 255, 0.8);
    margin-top: 10px;
    font-size: 12px;
`;

const Votes = styled(Overview)`
    font-size: 10px;
`;

interface SliedProps {
    backdropPath:string;
    posterPath:string;
    originalTitle:string;
    voteAverage:number;
    overview:string;
    fullData: Movie;
}

const Slide:React.FC<SliedProps> = ({backdropPath, posterPath, originalTitle, voteAverage, overview, fullData}) => {
    const isDark = useColorScheme() === "dark";
    const navigation = useNavigation();
    const goToDetail = () => {
        navigation.navigate("Stack", { screen: "Detail", params: {
            ...fullData
          } });
    };
    return (
        <TouchableWithoutFeedback
            onPress={goToDetail}>
            <View style={{flex: 1}}>
                        <Image style={StyleSheet.absoluteFill} source={{uri:makeImagePath(backdropPath)}} />
                        <BlurView tint={isDark ? "dark" : "light"} intensity={95} style={StyleSheet.absoluteFill}> 
                        <Wrapper>
                            <Poster path={posterPath}/>
                            <Column>
                                <Title>{originalTitle}</Title>
                                {voteAverage > 0 ? <Votes>⭐{voteAverage}/10</Votes> : null }
                                <Overview>
                                    {overview.slice(0, 80)}
                                    {overview.length > 80 ? "..." : null}
                                </Overview>
                            </Column>
                        </Wrapper>   
                        
                        </BlurView>
                            
                            
                        </View>
        </TouchableWithoutFeedback>
    );
};
export default Slide;