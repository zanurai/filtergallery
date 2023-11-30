import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {

  const [query, setQuery] = useState('dog')
  const [loading, setLoading] = useState(true);//these there are variable query initial value 'dog' loading initial value true data initial empty array
  const [data, setData] = useState([]);
  //the query state variable is set to 'dog' by default, loading state variable is set to true by default, and data state variable is an empty array by default.

  const getPhotes = async () => {
    setLoading(true);
    const APIKEY = "5e3MZLBvfldnRwUKInrHw139IqldMC79KGp6SMytxcGfnBsryMoBdO8g" //process.eve.REACT_APP_PEXELS_API
    await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
      headers: {
        Authorization: APIKEY,

      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((res) => {
        setLoading(false)
        setData(res.photos)
      })
  };

  useEffect(() => {//getphotos will call using useEffect
    getPhotes()
  }, []);//it is only get call when the component mount

  const onKeyDownHandler = (e) => {
    if (e.keyCode === 13) {
      getPhotes()
    }
  };

  return (
    <>
      <div className="filter">
        <h2>Filter-Gallery</h2>
        <input className='inputSearch' onKeyDown={onKeyDownHandler} placeholder='search for free photo' onChange={(e) => setQuery(e.target.value)} value={query} />{/*this represent the current value of input element onChange={(e) => setQuery(e.target.value)*/}
        {loading && <h3>Fetching....</h3>}

        <div className="container">
          {data?.map((item, index) => {//map; maping api vitra bata purai map gare cat gare cat matra dog vaya do matra nikalxa
            return (
              <div className="box" key={index}> {/* the function of key to keep track of list and it will keep save */}
                <img src={item.src.medium} alt={item.id}></img>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}

export default App;
