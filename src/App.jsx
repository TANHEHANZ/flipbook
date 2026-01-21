import Flipbook from './components/Flipbook'
import './App.css'
import corazon from '../src/assets/identity/corazon.png'
import background from '../src/assets/identity/background.png'

function App() {
  return (
    <div className="app-container">
      <img src={corazon} alt="corazon" className='corazon' />
      <img src={background} alt="background" className='background' />
      <Flipbook />
    </div>
  )
}

export default App
