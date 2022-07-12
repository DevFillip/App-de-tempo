import {useState} from 'react'

function App() {
  const [data, setData] = useState({})
  const [location, setlocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c94d80840abbfc5e33bb59cbe38c477b`

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

      <div className='search'>
        <input
        value={location}
        onChange={event => setlocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter location"
        type='text'
        ></input>
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ?  <h1>{data.main.temp.toFixed()}°c</h1> : null}
          </div>
          <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name != undefined && 
          <div className="bottom">
            <div className="feels">
              {data.main ? <p>{data.main.feels_like.toFixed()}</p> : null}
            </div>
            <div className="humidity">
              {data.main ? <p>{data.main.humidity.toFixed()}%</p> : null}
            </div>
            <div className="wind">
              {data.wind ? <p>{data.wind.speed.toFixed()} MPH</p> : null}
            </div>
          </div>
        }
        
      </div>
    </div>
  );
}

export default App;
