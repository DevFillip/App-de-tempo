import {useState} from 'react'
import './styles.css'
import {FaWind, FaCloudSun, FaTemperatureLow} from 'react-icons/fa'
import {WiHumidity} from 'react-icons/wi'

function WeatherApp() {
  const [data, setData] = useState({})
  const [localizacao, setlocalizacao] = useState('')
  const [mensagem, setMensagem] = useState()

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&units=metric&lang=pt_br&appid=c94d80840abbfc5e33bb59cbe38c477b`

  const pesquisaLocalizacao = (event) => {
    if(event.key === 'Enter'){
        fetch(url)
        .then((resp) => 
          resp.json()
        )
        .then((data) => {
          setMensagem('')
          if(String(data.cod) === '404'){
            setMensagem('Cidade não encontrada!')
          }else{
            setData(data)
          }
         
        })
        setlocalizacao('')
      }
    }
    
  return (
    <div className="weather-app">
      <h1>Weather app</h1>

      <div className='pesquisa'>
        <input
        value={localizacao}
        onChange={event => setlocalizacao(event.target.value)}
        onKeyPress={pesquisaLocalizacao}
        placeholder="Cidade..."
        type='text'
        ></input>
      </div>

      {mensagem && <h3 className='mensagem'>{mensagem}</h3>}
      {data.name !== undefined && 
    <>
      <div className="container-dados">

        <div className="topo">
          <div className="localizacao">
            <h2>{data.name}</h2>
          </div>
          <div className="temperatura">
            {data.main ?  <h2>{data.main.temp.toFixed()}°c</h2> : null}
          </div>
        </div>
        
        <div className="informacoes">
          <h3>Informações do tempo</h3>

          <div className="descricao">
            <FaCloudSun/>
            <div>
              {data.weather ? <p>{data.weather[0].description}</p> : null}
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

          <div className="humidade">  
            <WiHumidity/>
            <div>
              {data.main ? <p>{data.main.humidity.toFixed()}%</p> : null}
              <span>Humidade</span>
            </div>
          </div>
          
          <div className="vento">
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

export default WeatherApp;
