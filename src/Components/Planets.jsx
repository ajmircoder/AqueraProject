import React, { useEffect, useState } from 'react'
import '../CSS/planets.css';

export default function Planets() {
  const uri = "https://swapi.dev/api/planets/?page=1";
  const [planets, setPlanets] = useState(null);
  const [allResident, setAllResident] = useState({});
  const getPlanet = (url) => {
    fetch(url, { method: 'GET', })
      .then(res => res.json())
      .then(data => {
        setPlanets(data.results);
      });
  }
  const getResidentDetails = (residentUrl, key) => {
    fetch(residentUrl, { method: 'GET' })
      .then(res => res.json())
      .then(residentData => {
        setAllResident(prevRes => {
          const updatedResidents = prevRes.hasOwnProperty(key) ? [...prevRes[key], residentData] : [residentData];
          return { ...prevRes, [key]: updatedResidents };
        });
      })
      .catch(error => console.error('Error fetching resident details:', error));
  };

  useEffect(() => {
    getPlanet(uri);
  }, []);
  useEffect(() => {
    if (planets) {
      setAllResident({});
      planets.forEach((planet, i) => {
        planet.residents.forEach(residentUrl => {
          getResidentDetails(residentUrl, planet.url);
        });
      });
    }
  }, [planets]);
  return (
    <>
      <div className=''>
        {!planets ? <p className='w-full text-center'>Loding...</p> : ""}
        <div className='border pb-2 border-teal-600 mx-auto xl:w-[70%] md:grid md:grid-cols-2 xl:grid-cols-2 text-center'>
          {planets ? planets.map((p, index) =>
            <div key={index} className="mx-auto mb-4 md:mb-0 sm:w-[80%] md:mt-8 md:w-[80%] xl:w-[70%] transform overflow-hidden md:rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
              <img className="h-48 w-full object-cover object-center" src="https://nypost.com/wp-content/uploads/sites/2/2016/03/548995361.jpg?quality=75&strip=all" alt="Product Image" />
              <div className="p-4">
                <h2 className=" text-lg font-medium dark:text-white text-gray-900">{p.name}</h2>
                <p className=" text-base dark:text-gray-300 text:text-white">{`climate: ${p.climate}`}</p>
                <div className="">
                  <p className=" text-base dark:text-gray-300 text-gray-700">{`population: ${p.population}`}</p>
                  <p className="text-base mb-1 font-semibold text-white">{`terrain: ${p.terrain}`}</p>
                </div>

                {Object.keys(allResident).length && allResident[p.url] && allResident[p.url].length ? (allResident[p.url].map((res, i) => {
                  return (
                    <div key={i} className=' parent
                     border-t-red-700 border-t-[1px] py-1 rounded-t-2xl md:hover:bg-[#b91647ff] md:hover:text-white'>
                      <div>
                        <h1 className='mb-3 text-white text-center font-bold'>{res.name}</h1>
                        <div className='hidden-child'>
                          <p>{`Height: ${res.height}`}</p>
                          <p>{`Mass: ${res.mass}`}</p>
                          <p>{`Gender: ${res.gender}`}</p>
                        </div>
                      </div>
                    </div>
                  )
                })) : <p className='text-white'>No Resident</p>}
              </div>
            </div>
          ) : ""}
        </div>
      </div>
    </>
  )
}
