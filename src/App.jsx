import Sidebar from './components/Sidebar'
import MainPage from './components/MainPage'
import './styles/components/app.sass'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div id="tracker">
      <style>
          {`
          @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@300;400&family=Staatliches&display=swap');
          `}
        </style>
      <img className="banner" src="src/img/networking (1).svg" alt="Image description" />

        <Sidebar />
        <MainPage />
      </div>
    </Router>
  );
}

export default App;
