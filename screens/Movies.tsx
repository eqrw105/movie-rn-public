import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, FlatList,  Platform, RefreshControl, Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import { AnyStyledComponent } from 'styled-components';
import styled from 'styled-components/native';
import { Movie, movieApi, MovieResponse } from '../api';
import HList from '../components/HList';
import HMedia from '../components/HMedia';
import Loader from '../components/Loader';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: 600;
    margin-left: 20px;
`;

const ComingSoonTitle = styled(ListTitle)`
    margin-bottom: 20px;
`;

const HSeparator = styled.View`
    height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<AnyStyledComponent, "Movie">> = ({navigation: { navigate }}) => {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);
    const {isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery<MovieResponse>(["movies", "nowPlaying"], movieApi.nowPlaying);
    const {isLoading: upcomingLoading, data: upcomingData, hasNextPage, fetchNextPage } = useInfiniteQuery<MovieResponse>(["movies", "upcoming"], movieApi.upcoming, {
        getNextPageParam: (currentPage) => {
            const nextPage = currentPage.page + 1;
            return nextPage > currentPage.total_pages ? null : nextPage;
        }
    });
    const {isLoading: trendingLoading, data: trendingData } = useQuery<MovieResponse>(["movies", "trending"], movieApi.trending);
    const onRefresh = async() => {
        setRefreshing(true);
        await queryClient.refetchQueries(["movies"]);
        setRefreshing(false);
    };
    const loadMore = () => {
        if(hasNextPage) {
            fetchNextPage();
        };
    };
    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
    return loading ? 
        <Loader/>:
        upcomingData ? (<FlatList
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListHeaderComponent={<>
                    <Swiper
                        autoplay
                        autoplayTimeout={3.5}
                        showsButtons={false}
                        showsPagination={false}
                        horizontal
                        loop
                        containerStyle={{ marginBottom: 20, width: "100%", height: SCREEN_HEIGHT / 4 }}>
                        {nowPlayingData?.results.map((movie) => 
                            <Slide
                                key={movie.id} 
                                backdropPath={movie.backdrop_path || ""}
                                posterPath={movie.poster_path || ""}
                                originalTitle={movie.original_title}
                                voteAverage={movie.vote_average}
                                overview={movie.overview}
                                fullData={movie}
                            />
                        )}
            </Swiper>
            {trendingData? <HList title="Trending Movies" data={trendingData.results} /> : null}
            <ComingSoonTitle>Comming Soon</ComingSoonTitle>
        </>}
                data={upcomingData.pages.map((page) => page.results).flat()}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ItemSeparatorComponent={() => <HSeparator/>}
                keyExtractor={(item) => item.id + ""}
                renderItem={({item}) => (
                    <HMedia
                    posterPath={item.poster_path || ""}
                    originalTitle={item.original_title}
                    overview={item.overview}
                    releaseDate={item.release_date}
                    fullData={item}/>
                )}
            />) : null;
}
export default Movies;