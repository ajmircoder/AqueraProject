import { useState } from 'react'
import Planets from './Components/Planets';
import "./index.css";

function App() {
  const [welcome, setWelcome] = useState(true);
  return (
    <>
      <div>
        {welcome ? <div className='background py-2 h-screen flex justify-center items-center'>
          <button className='px-3 rounded-md bg-green-500 py-2 active:bg-green-300' onClick={() => setWelcome(!welcome)}>Welcome To The Galaxy</button>
        </div> : <Planets setWelcome={setWelcome}/>}
      </div>
    </>
  )
}

export default App
