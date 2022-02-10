import { Route, Switch } from 'react-router';
import Auth from './Auth/Auth';
import Weather from './components/Weather/Weather';
import AvailableCities from './components/AvailableCities/AvailableCities';
import './App.css';
import './styles/container.css';

function App() {
  return (
    <section className="App">
      <div className="container">
        <Switch>
            <Route path="/" render={() => <Auth />} exact/>
            <Route path="/weather" render={() => <Weather />} exact/>
            <Route path="/cities" render={() => <AvailableCities />} exact/>
        </Switch>
      </div>
    </section>
  );
}

export default App;