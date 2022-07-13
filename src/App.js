import {useState} from 'react'
import './styles.css'

function App() {
  const [data, setData] = useState({})
  const [location, setlocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c94d80840abbfc5e33bb59cbe38c477b&lang=pt_br`

  const searchLocation = (event) => {
    if(event.key === 'Enter'){
        fetch(url)
        .then(resp => resp.json())
        .then((data) => {
          setData(data)
        })
      setlocation('')
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
      </div>

      {data.name != undefined && 
      <div className="container">
        <div className="top">
          <div className="localizacao">
            <h2>{data.name}</h2>
          </div>
          <div className="temp">
            {data.main ?  <h1>{data.main.temp.toFixed()}°c</h1> : null}
          </div>
        </div>
        
          <div className="informacoes">
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
              <h3>Tempo</h3>
            </div>
            <div className="feels">
              {data.main ? <p>{data.main.feels_like.toFixed()}</p> : null}
              <h3>Sensação</h3>
            </div>
            <div className="humidity">
              {data.main ? <p>{data.main.humidity.toFixed()}%</p> : null}
              <h3>Humidade</h3>
            </div>
            <div className="wind">
              {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
              <h3>Vento</h3>
            </div>
          </div>
      </div>
      }
    </div>
  );
}

export default App;
