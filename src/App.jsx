import { useState } from 'react'
import Planets from './Components/Planets'

function App() {
 const [welcome, setWelcome] = useState(false);
  return (
    <>
    <div>
      {welcome ? 'hi' : <Planets />}
    </div>
    </>
  )
}

export default App
