import React, { useEffect, useState } from 'react'
import '../CSS/planets.css';

export default function Planets() {
  const uri = "https://swapi.dev/api/planets/?page=1";
  const [planets, setPlanets] = useState(null);
  const [allResident, setAllResident] = useState({});
  const [imgUrl, setImgUrl] = useState(["https://cdn.mos.cms.futurecdn.net/pjZSD6jXzkTSaqxQ9WM9xY.jpg",
    "https://pbs.twimg.com/media/CEp3NiUWEAAff9Y.jpg:large",
    "https://pbs.twimg.com/media/D7lazvTX4AAucDa.jpg",
    "https://img.itch.zone/aW1nLzg0NzgzNzIucG5n/original/dL4bue.png",
    "https://www.science.org/do/10.1126/science.abc0189/abs/planet_1280p.jpg",
    "https://www.giantbomb.com/a/uploads/scale_medium/1/11187/292723-planet_glow.jpg",
    "https://i.pinimg.com/736x/5c/ab/6e/5cab6edfc06583f563a36adb7285a381.jpg",
    "https://www.texturesforplanets.com/images/rendered/Martian400.png",
    "https://randomtablesrpg.com/wp-content/uploads/2021/10/10-random-science-fiction-planets.jpg",
    "https://www.psd-dude.com/tutorials/resources-images/planet-photoshop-stock-images-and-psd-files/purple-planet-stock.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyC_f7EufZrYXsQ59kMoJn8bvfqR5E-l2W6g&usqp=CAU",
    "https://blogs.agu.org/geospace/files/2016/12/Earth-small.jpg",
    "https://nypost.com/wp-content/uploads/sites/2/2016/03/548995361.jpg?quality=75&strip=all"
  ])
  const [nextApi, setNextApi] = useState('');
  const [pvrApi, setPvrApi] = useState('');
  const getPlanet = (url) => {
    fetch(url, { method: 'GET', })
      .then(res => res.json())
      .then(data => {
        setPlanets(data.results);
        if (data.next) setNextApi(data.next);
        else setNextApi('');
        if (data.previous) setPvrApi(data.previous);
        else setPvrApi('');
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
      <div className='my-2'>
        {!planets ? <p className='w-full text-center text-xl'>Loding...</p> : <div>
          <p className='text-center font-bold text-3xl mb-1 text-teal-400'>
            Planets
          </p>
          <div className='border pb-4 border-teal-600 mx-auto md:w-[90%] xl:w-[70%] md:grid md:grid-cols-2 xl:grid-cols-2 text-center'>
            {planets.map((p, index) =>
              <div key={index} className="mx-auto mb-4 md:mb-0 sm:w-[80%] md:mt-8 md:w-[80%] xl:w-[70%] transform overflow-hidden md:rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                <img className="h-48 w-full object-cover object-center" src={imgUrl[Math.floor(Math.random() * imgUrl.length-1) + 1]} alt="Product Image" />
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
                          <h1 className='mb-2 text-white text-center font-bold'>{res.name}</h1>
                          <div className='hidden-child'>
                            <p>{`Height: ${res.height}`}</p>
                            <p>{`Mass: ${res.mass}`}</p>
                            <p>{`Gender: ${res.gender}`}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })) : Object.keys(allResident).length ? <p className='text-white'>No Recident</p> : <p className='text-white'>Loding...</p>}
                </div>

              </div>
            )}

          </div>
          <div className='w-full flex justify-center'>
            {pvrApi ? <button className="bg-[#1665b9] active:bg-[#6c9bce] mx-1 btn text-white my-3 
            px-10 py-4 rounded-full 
            block md:hover:pl-8 md:hover:pr-12"
              onClick={() => getPlanet(pvrApi)}
            >
              &larr; PREVIOUS</button> : ""}
            {nextApi ? <button className="bg-[#b91647ff] active:bg-[#d57692] btn mx-1 text-white my-3 
            px-10 py-4 rounded-full 
            block md:hover:pr-8 md:hover:pl-12"
              onClick={() => getPlanet(nextApi)}
            >
              NEXT →</button> : ""}
          </div>
        </div>}
        { }
      </div>
    </>
  )
}
