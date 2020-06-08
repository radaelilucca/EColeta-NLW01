import React, {useEffect, useState} from 'react';
import Constants from 'expo-constants'
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image, SafeAreaView, Alert  } from 'react-native';
import {Feather as Icon} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import MapView, {Marker} from 'react-native-maps';
import {SvgUri} from 'react-native-svg'
import * as Location from 'expo-location'

import api from '../../services/api'

interface Item {
  title: string;
  id: number;
  image_url: string;
}

interface Point {  
  id: number;
  image: string;
  name: string;
  latitude: number;
  longitude: number;
  
}

const Points = () => {
  const [items, setItems] = useState<Item[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  const [points, setPoints] = useState<Point[]>([])
  const navigation = useNavigation()

  function handleNavigateBack(){
    navigation.goBack()
  }

  function handleNavigateToDetail(id: number){
    navigation.navigate('Detail', {point_id: id})
  }
  // get items from api
  useEffect(() => {
    async function getItemsFromApi(){
    const response = await api.get('/items');
    setItems(response.data)
    }
    getItemsFromApi()
  }, [])

  // get user position

  useEffect(() => {
    async function loadPosition() {
      const {status} = await Location.requestPermissionsAsync()

      if(status !== 'granted'){
        Alert.alert('Ooooops...', 'Precisamos de ssua permissão para obter a localização.')
        return
      }

      const location = await Location.getCurrentPositionAsync()

      const {latitude, longitude} = location.coords;

      setInitialPosition([
        latitude,
        longitude
      ])
    }

    loadPosition()
  }, [])

  function handleSelectItem(id: number){   

    const alreadySelected = selectedItems.findIndex(item => item == id)
    
    if(alreadySelected >= 0 ){
      const filteredItems = selectedItems.filter(item => item !== id)
      setSelectedItems(filteredItems)
    }else {
      setSelectedItems([...selectedItems, id])
    }     
  }

  // Get points
  useEffect(() => {
    api.get('points', {
      params: {
        city: 'Rio de Janeiro',
        uf: 'RJ',
        items: [3]
      }
    }).then(response => {
      setPoints(response.data)
    } )
  }, [])
    
    

  return (
    <SafeAreaView style={{flex: 1}}>
    <View style={styles.container} >
      <TouchableOpacity onPress={handleNavigateBack}>
      <Icon name='arrow-left' size={20} color={'#34cb79'} />
      </TouchableOpacity>

      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

      <View style={styles.mapContainer}>
        {initialPosition[0] !== 0 && <MapView style={styles.map} 
        loadingEnabled={initialPosition[0] === 0}
        initialRegion={{
          latitude: initialPosition[0],
          longitude: initialPosition[1],
          latitudeDelta: 0.014,
          longitudeDelta: 0.014,
        }}>
          {points.map(point => (
            <Marker
              key={String(point.id)}
              style={styles.mapMarker} 
              onPress={() => handleNavigateToDetail(point.id)}
              coordinate={{
                latitude: Number(point.latitude),
                longitude: Number(point.longitude),
            }}>
              <View style={styles.mapMarkerContainer}>
              <Image style={styles.mapMarkerImage} source={{
                uri: point.image
              }}/>
              <Text style={styles.mapMarkerTitle}>
               {point.name}
              </Text>
  
              </View>
  
            </Marker>
          ))}

        </MapView>}

      </View>

    </View>
    <View style={styles.itemsContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 20}}
      >
        {items.map(item => (
          <TouchableOpacity 
          style={[styles.item, selectedItems.includes(item.id) ? styles.selectedItem : {}]} 
          onPress={() => handleSelectItem(item.id)} 
          key={String(item.id)}
          activeOpacity={0.7}
          >
          <SvgUri width={42} height={42} uri={item.image_url}/>
          <Text style={styles.itemTitle}>{item.title}</Text>
          </TouchableOpacity>

        ))}
      </ScrollView>
    </View>
    </SafeAreaView>
  
    )
}

export default Points;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 30,
  },

  title: {
    fontSize: 20,
    fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Roboto_400Regular',
  },

  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },

  map: {
    width: '100%',
    height: '100%',
  },

  mapMarker: {
    width: 90,
    height: 80, 
  },

  mapMarkerContainer: {
    width: 90,
    height: 70,
    backgroundColor: '#34CB79',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },

  mapMarkerTitle: {
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    color: '#FFF',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },

  item: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#eee',
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'space-between',

    textAlign: 'center',
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    textAlign: 'center',
    fontSize: 13,
  },
});