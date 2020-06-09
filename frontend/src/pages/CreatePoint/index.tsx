import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react'
import {Link, useHistory} from 'react-router-dom'
import { FiArrowLeft} from 'react-icons/fi'
import {toast} from 'react-toastify'
import axios from 'axios'

import { Map, TileLayer, Marker } from 'react-leaflet'
import { LeafletMouseEvent, latLng } from 'leaflet'


import './styles.css'

import api from '../../services/api'

import logo from '../../assets/logo.svg'
import Dropzone from '../../components/Dropzone'

// interfaces definem o formato de arrays e objetos

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface IBGEUFReponse {
  sigla: string
}

interface IBGECityReponse {
  nome: string
}




const CreatePoint = () => {
  const history = useHistory()
  // arr ou obj informar o tipo da variavel
  const [items, setItems] = useState<Item[]>([])
  const [selectedItems, setSelectedItems] = useState<number[]>([])

  const [ufs, setUfs] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');

  const [citties, setCitties] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState('0');

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])

  const [selectedFile, setSelectedFile] = useState<File>();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: ''
  })

  // Get available collectable items from API
  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL)
    api.get('items').then(response => {
      console.log(response.data)
      setItems(response.data)
    })
  }, [])

  // Get UFs from IBGE
  useEffect(() => {
    axios.get<IBGEUFReponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
    
      const ufInitials = response.data.map(uf => uf.sigla)
      setUfs(ufInitials)

    })
  }, [])

  // Get cities from IBGE
  useEffect(() => {
  if(selectedUf === '0'){
    return
  }

  axios
  .get<IBGECityReponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
  .then(response => {
    const cityNames = response.data.map(city => city.nome)
    setCitties(cityNames)
  })


  }, [selectedUf])

  // Get user initial position
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;

      setInitialPosition([latitude, longitude])
    })
  }, [])

  function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
      
    const selectedUf = event.target.value
    setSelectedUf(selectedUf)
  }

  function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
      
    const selectedCity = event.target.value
    setSelectedCity(selectedCity)
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSelectedPosition([
      event.latlng.lat,
      event.latlng.lng
    ])
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const {name, value} = event.target

    setFormData({...formData, [name]: value})
    
  }

  function handleSelectItem(id: number){   

    const alreadySelected = selectedItems.findIndex(item => item == id)
    
    if(alreadySelected >= 0 ){
      const filteredItems = selectedItems.filter(item => item !== id)
      setSelectedItems(filteredItems)
    }else {
      setSelectedItems([...selectedItems, id])
    }     
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()    

    const {name, email, whatsapp} = formData;
    const uf = selectedUf;
    const city = selectedCity;
    const [latitude, longitude] = selectedPosition;
    const items = selectedItems;

    const data = new FormData()

    data.append('name', name);
    data.append('email', email);
    data.append('whatsapp', whatsapp);
    data.append('uf', uf);
    data.append('city', city);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('items', items.join(','));
    
    if(selectedFile){
      data.append('image', selectedFile)
    }

   await api.post('points', data)
    toast('Ponto de coleta criado!')
    history.push('/')
  }
  
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta"/>
        <Link to='/'>
          <FiArrowLeft/>
          <span>Voltar para Home</span>          
          </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>Cadastro do <br/>
        ponto de coleta</h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>
          <div className="field">
            <label htmlFor="name">
              Nome da Entindade
            </label>
            <input 
            type="text" 
            name="name" 
            id="name"
            onChange={handleInputChange}
            />
          </div>
          <div className="field-group">

          <div className="field">
            <label htmlFor="name">
              E-mail
            </label>
            <input 
            type="text" 
            name="email" 
            id="email"
            onChange={handleInputChange}
            />
          </div>

          <div className="field">
            <label htmlFor="name">
              Whatsapp
            </label>
            <input 
            type="text" 
            name="whatsapp" 
            id="whatsapp"
            onChange={handleInputChange}
            />
          </div>
         
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione um edenreço no mapa</span>
          </legend>
          <Map center={initialPosition} zoom={14} onclick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            <Marker position={selectedPosition}/>
             
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">
                Estado (UF)
              </label>
              <select 
              name="uf" 
              id="uf" 
              value={selectedUf} 
              onChange={handleSelectUf}>
              <option value={'0'}>Selecione um Estado</option>

                {ufs.map(uf => (
                <option key={uf} value={uf} >{uf}</option>

                ))}
                
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">
                Cidade 
              </label>
              <select 
                name="city" 
                id="city"
                value={selectedCity}
                onChange={handleSelectCity}
                >
                <option value="0">Selecione uma Cidade</option>
                {citties.map(city => (
                <option key={city} value={city} >{city}</option>

                ))}
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>
          <ul className="items-grid">
            {items.map(item => (
                <li 
                key={item.id} 
                onClick={() => handleSelectItem(item.id)}
                className={selectedItems.includes(item.id) ? 'selected' : ''} >
                <img src={item.image_url} alt={item.title}/>
                <span>{item.title}</span>
              </li>
            ))}         

          </ul>
        </fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  )
}

export default CreatePoint;