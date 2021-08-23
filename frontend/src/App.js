import Navbar from './components/Navbar'
import Employee from './components/Employee';
import Department from './components/Department';
import { BrowserRouter, Switch, Route } from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <div className="container">
          <h3 className = "m-3 d-flex justify-content-center">Employee/Department App</h3>  
          <Navbar />
          <Switch>
          <Route path = "/department" component = {Department}/>
          <Route exact path = "/" component = {Employee}/>
          </Switch>
      </div>
    </BrowserRouter>                            
  );
}
  
export default App;
