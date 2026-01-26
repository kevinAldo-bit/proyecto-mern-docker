import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [theme, setTheme] = useState<'red' | 'purple'>('red')

  return (
    <div className={`app ${theme}`}>
      <h1 className="title">React + Vite</h1>

      <div className="panel">
        <div className="logos">
          <img src={reactLogo} className="logo react" />
          <img src={viteLogo} className="logo vite" />
        </div>

        <button
          className="theme-btn"
          onClick={() =>
            setTheme(theme === 'red' ? 'purple' : 'red')
          }
        >
          Cambiar tema
        </button>

        <p className="info">
          Cambio de tema visual extremo
        </p>
      </div>
    </div>
  )
}

export default App
