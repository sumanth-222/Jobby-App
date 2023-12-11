import {Link, withRouter} from 'react-router-dom'
import Cookie from 'js-cookie'
import './index.css'

const Header = props => {
  const removeCookie = () => {
    const {history} = props
    Cookie.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo"
        />
      </Link>
      <ul className="headers-card">
        <Link to="/">
          <li className="headers">Home</li>{' '}
        </Link>
        <Link to="/jobs">
          <li className="headers">Jobs</li>{' '}
        </Link>
      </ul>
      <li className="li">
        <button className="btn" type="button" onClick={removeCookie}>
          Logout
        </button>
      </li>
    </div>
  )
}

export default withRouter(Header)
