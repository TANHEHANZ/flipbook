import Flipbook from './components/Flipbook'
import './App.css'
import corazon from '../src/assets/identity/corazon.png'

function App() {
  return (
    <div className="app-container">
      <img src={corazon} alt="corazon" className='corazon' />
      <Flipbook />
    </div>
  )
}

export default App
