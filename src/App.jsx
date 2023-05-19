import Sidebar from './components/Sidebar'
import MainPage from './components/MainPage'
import './styles/components/app.sass'
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div id="tracker">
        <h1>Networking tracker</h1>
        <Sidebar />
        <MainPage />
      </div>
    </Router>
  );
}

export default App;
