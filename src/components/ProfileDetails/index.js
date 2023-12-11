import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'

class ProfileDetails extends Component {
  state = {profileData: [], status: ''}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedProfileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({profileData: updatedProfileData, status: true})
    } else {
      this.setState({status: false})
    }
  }

  render() {
    const {profileData, status} = this.state
    const {name, profileImageUrl, shortBio} = profileData
    if (status === true) {
      return (
        <div className="profile-card">
          <img src={profileImageUrl} className="profile-logo" alt="profile" />
          <h1 className="name">{name}</h1>
          <p className="bio">{shortBio}</p>
        </div>
      )
    }
    return (
      <button type="button" className="btn">
        Retry
      </button>
    )
  }
}

export default ProfileDetails
