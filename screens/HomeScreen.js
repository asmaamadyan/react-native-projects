import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { StatusBar } from "expo-status-bar"
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import { styles } from "../theme"
import TrendingMovies from "../components/trendingMovies"
import MovieList from "../components/movieList"
import { useNavigation } from "@react-navigation/native"
import Loading from "../components/loading"
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/movieedb"

// import {Bars3CenterLeftIcon} from 'react-native-heroicons/outline'


const ios = Platform.OS =='ios '

export default function HomeScreen(){

  const [trending,setTrending] = useState([]) ;

  const [upComing , setUpComing] = useState([]) ;

  const [toRated , setTopRated] = useState([]) ;

  const [loading , setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(()=>{
    getTrendingMovies();
    getupcomingMovies();
    getTopRatedMovies();
  },[])

  const getTrendingMovies  = async () => {
    const data = await fetchTrendingMovies();
    // console.log ('got trending' ,data)
    if (data && data.results)setTrending(data.results);
    setLoading(false);
  }
  const getupcomingMovies  = async () => {
    const data = await fetchUpcomingMovies();
    console.log ('got upcoming' ,data)
    if (data && data.results)setUpComing(data.results);
;
  }
  const getTopRatedMovies  = async () => {
    const data = await fetchTopRatedMovies();
    console.log ('got top rated' ,data)
    if (data && data.results)setTopRated(data.results);
    setLoading(false);
  }


  return (
  <View  className="flex-1 bg-neutral-800"  >
    {/* search bar and logo */}
    <SafeAreaView className={ios? "mb-2 " : "mb-3"}  >
    <StatusBar style="light"/>
    <View className ="flex-row justify-between item-center mx-4">
     <Bars3CenterLeftIcon size = "30" strokeWidth = {2} color = "white" /> 
     <Text className = "text-white text-3xl font-bold">
      <Text style={styles.text}>Movies</Text>
     </Text>
     <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
      <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
     </TouchableOpacity>
    </View>
    </SafeAreaView>
{loading? (<Loading />) :
(

    <ScrollView showsVerticalScrollIndicator = {false} contentContainerStyle = {{paddingBottom: 20}}>
      {/* trending movies carousel */}
     {trending.length > 0 && <TrendingMovies data={trending} />}

      {/* upcoming movies row */}
      <MovieList title ="Upcoming" data ={upComing} />

      {/* top rated movies row */}

      <MovieList title ="Top Rated" data ={toRated} />

    </ScrollView>
)}



  </View>
  )
}