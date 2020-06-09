import React, {useEffect, useState} from 'react'
import {RectButton} from 'react-native-gesture-handler'
import {Feather as Icon} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import {StyleSheet, ImageBackground, Text, View, Image} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'
interface IBGEUFReponse {
  sigla: string,
  nome: string,
}

interface IBGECityReponse {
  nome: string
}

interface parsedIBGResponse {
  label: string,
  value: string,
}

const pickerSettings = {
  style: {
    inputIOS: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,   
    },
    inputAndroid: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
      color: '#222'
    },
  },
  placeholder: {
    city: {
      label: 'Selecione uma Cidade',
      value: null,
      color: '#222',
    },
    uf: {
      label: 'Selecione um Estado',
      value: null,
      color: '#222',
    }
  }

}

export default function Home(){
  const [parsedUfs, setParsedUfs] = useState<parsedIBGResponse[]>([])
  const [parsedCitties, setParsedCitties] = useState<parsedIBGResponse[]>([])

  const [selectedUf, setSelectedUf] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')

  
  const navigation = useNavigation()

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      selectedCity,
      selectedUf,
    })
  }

  useEffect(() => {
    axios.get<IBGEUFReponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
      const ufs = response.data.map(uf => {
        return {
          label: uf.nome,
          value: uf.sigla
        }
      })      
      setParsedUfs(ufs)      
    })
  }, [])

  useEffect(() => {
    if(selectedUf === '0'){
      return
    }  
    axios
    .get<IBGECityReponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
    .then(response => {     

      const citties = response.data.map(city => {
        return {
          label: city.nome,
          value: city.nome
        }
      })
      setParsedCitties(citties)      
    })
   
    }, [selectedUf])

  return (
    <ImageBackground 
      source={require('../../assets/home-background.png')} 
      style={styles.container}
      imageStyle={{width: 274, height: 368}}
      >
      <View style={styles.main}>
      <Image source={require('../../assets/logo.png')}/>
        <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
      </View>
      <View >
        <RNPickerSelect
              placeholder={pickerSettings.placeholder.uf}              
              onValueChange={(value) => {
                console.log(value)
                setSelectedUf(value)}}
              items={parsedUfs}
              style={pickerSettings.style}
          />   
        <RNPickerSelect
          placeholder={pickerSettings.placeholder.city}              
          onValueChange={(value) => {
            console.log(value)
            setSelectedCity(value)}}
          items={parsedCitties}
          style={pickerSettings.style}
        />
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Icon name='arrow-right' color='#FFF' size={24}/>
          </View>       
          <Text style={styles.buttonText}> Entrar </Text>        
        </RectButton>        
      </View>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  picker: {
    borderRadius: 12,    
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});