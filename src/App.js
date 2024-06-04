import { Outlet } from 'react-router-dom';
import './App.scss';
import Header from './Components/Header/Header';

const App = () => {
  return (
    <div className="app-container">
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='side-nav'>

        </div>
        <div className='app-container'>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
