import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import { tvApi } from '../api';
import HList from '../components/HList';
import Loader from '../components/Loader';

const Tv = () => {
    const queryClient = useQueryClient();
    const [refreshing, setRefreshing] = useState(false);
    const { isLoading:todayLoading, data:todayData, isRefetching: todayRefetching} = useQuery(["tv", "today"], tvApi.airingToday);
    const { isLoading:topLoading, data:topData, isRefetching: topRefetching} = useQuery(["tv", "top"], tvApi.topRated);
    const { isLoading:trendingLoading, data:trendingData, isRefetching: trendingRefetching} = useQuery(["tv", "trending"], tvApi.trending);
    const onRefresh = async () => {
        setRefreshing(true);
        await queryClient.refetchQueries(["tv"]);
        setRefreshing(false);
    };
    const loading = todayLoading || topLoading || trendingLoading;
    return loading?
        <Loader/>:
        (
            <ScrollView 
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            contentContainerStyle={{paddingVertical: 20}}>
                <HList title="Trending TV" data={trendingData.results}/>
                <HList title="Airing Today" data={todayData.results}/>
                <HList title="Top Rated TV" data={topData.results}/>                
            </ScrollView>
        );
};
export default Tv;