import Sidebar from './components/Sidebar'
import MainPage from './components/MainPage'
import './styles/components/app.sass'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div id="tracker">
      <img className="banner" src="src/img/banner2.jpg" alt="Image description" />

        <Sidebar />
        <MainPage />
      </div>
    </Router>
  );
}

export default App;
