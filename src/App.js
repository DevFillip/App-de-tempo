import {useState} from 'react'
import './styles.css'
import {FaWind, FaCloudSun, FaTemperatureLow} from 'react-icons/fa'
import {WiHumidity} from 'react-icons/wi'



function App() {
  const [data, setData] = useState({})
  const [location, setlocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c94d80840abbfc5e33bb59cbe38c477b&lang=pt_br`

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
      if(location != ){
        console.log('Lugar inválido')
      }else{
        fetch(url)
        .then(resp => resp.json())
        .then((data) => {
          setData(data)
        })
        .catch((err) => 'erro não encontrado' + err)
      setlocation('')
      }
      }
        
    }
    
  return (
    <div className="app">
      <h1>Weather app</h1>

      <div className='pesquisa'>
        <input
        value={location}
        onChange={event => setlocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Cidade..."
        type='text'
        ></input>
        {}
      </div>

      {data.name != undefined && 
       <>
      <div className="container">
        <div className="topo">
          <div className="localizacao">
            <h2>{data.name}</h2>
          </div>
          <div className="temp">
            {data.main ?  <h2>{data.main.temp.toFixed()}°c</h2> : null}
          </div>
        </div>
        
          <div className="informacoes">
          <h3>Informações do tempo</h3>

            <div className="descricao">
              <FaCloudSun/>
              <div>
                {data.weather ? <p>{data.weather[0].main}</p> : null}
                <span>Tempo</span>
              </div>
            </div>
            <div className="sensacao">
              <FaTemperatureLow/>
              <div>
                {data.main ? <p>{data.main.feels_like.toFixed()}°c</p> : null}
                <span>Sensação</span>
                </div>
            </div>
            <div className="humidity">  
              <WiHumidity/>
              <div>
              {data.main ? <p>{data.main.humidity.toFixed()}%</p> : null}
              <span>Humidade</span>
                </div>
            </div>
            <div className="wind">
              <FaWind/>
              <div>
              {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
              <span>Vento</span>
                </div>
            </div>
          </div>
      </div>
      <div className='copy'>
        <span>&copy; Feito por @Fillip_Hudson</span>
      </div>
      </>
      }
      

    </div>
  );
}

export default App;
