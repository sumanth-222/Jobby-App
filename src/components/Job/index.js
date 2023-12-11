import {AiFillStar, AiOutlineShareAlt} from 'react-icons/ai'
import {ImLocation2} from 'react-icons/im'
import {BsFillBagFill} from 'react-icons/bs'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import LifeAtCompany from '../LifeAtCompany'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Job extends Component {
  state = {
    jobData: {},
    status: apiStatusConstants.initial,
    similarJob: {},
    skills: [],
    life: {},
  }

  componentDidMount() {
    this.getJob()
  }

  getJob = async () => {
    this.setState({status: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const updatedData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: data.job_details.life_at_company,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills,
        title: data.job_details.title,
        similarJobs: data.similar_jobs,
        location: data.job_details.location,
      }

      const updatedSkills = updatedData.skills.map(each => ({
        imageUrl: each.image_url,
        name: each.name,
      }))

      const updatedLifeAtCompany = {
        imageUrl: updatedData.lifeAtCompany.image_url,
        description: updatedData.lifeAtCompany.description,
      }

      console.log(updatedLifeAtCompany)
      const updatedSimilarJobs = updatedData.similarJobs.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
        id: each.id,
      }))
      this.setState({
        jobData: updatedData,
        status: apiStatusConstants.success,
        similarJob: updatedSimilarJobs,
        skills: updatedSkills,
        life: updatedLifeAtCompany,
      })
    } else {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="products-details-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="product-details-error-view-container">
      <img
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        className="error-view-image"
      />
      <h1 className="product-not-found-heading">
        Oops! Something Went Wrong!!
      </h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="button">
        Retry
      </button>
    </div>
  )

  renderJobData = () => {
    const {jobData, similarJob, skills, life} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      packagePerAnnum,
      rating,
      companyWebsiteUrl,
      title,

      location,
    } = jobData
    console.log(jobData)

    return (
      <div className="job-container">
        <div className="jobs-container">
          <div className="card1">
            <img src={companyLogoUrl} className="image-logo" alt="a" />
            <div>
              <p className="title">{title}</p>
              <div className="font1">
                <AiFillStar className="rating-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="font-icons">
            <div className="icons">
              <div className="font1">
                <ImLocation2 className="location-icon" />
                <p className="rating">{location}</p>
              </div>
              <div className="font1">
                <BsFillBagFill className="internship-icon" />
                <p className="rating">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="link">
            <p className="des">Description</p>

            <a href={companyWebsiteUrl} className="linkk">
              <AiOutlineShareAlt />
              <p className="visit">Visit</p>
            </a>
          </div>

          <p className="description">{jobDescription}</p>
          <h1 className="skill">Skills</h1>
          <li className="skill-container">
            {skills.map(each => (
              <Skills skills={each} key={each.name} />
            ))}
          </li>
          <LifeAtCompany life={life} key={life.imageUrl} />
        </div>
        <h1 className="skill">Similar Jobs</h1>
        <li className="similar-main-container">
          {similarJob.map(each => (
            <SimilarJobs similarJob={each} key={each.id} />
          ))}
        </li>
      </div>
    )
  }

  renderJobDetails = () => {
    const {status} = this.state
    console.log(status)

    switch (status) {
      case apiStatusConstants.success:
        return this.renderJobData()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderJobDetails()}</>
  }
}

export default Job
