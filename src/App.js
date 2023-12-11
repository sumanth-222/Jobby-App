import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom'
import JobSection from './components/JobSection'
import './App.css'
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import Job from './components/Job'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={JobSection} />
      <ProtectedRoute exact path="/jobs/:id" component={Job} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App
