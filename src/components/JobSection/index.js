import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Jobs from '../Jobs'
import ProfileDetails from '../ProfileDetails'
import Filtering from '../Filtering'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobSection extends Component {
  state = {
    jobsData: [],
    status: apiStatusConstants.initial,
    employmentId: '',
    salaryId: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getjobs()
  }

  getjobs = async () => {
    const {employmentId, salaryId, searchInput} = this.state
    console.log(searchInput)
    this.setState({status: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${
      (employmentId, employmentId)
    }&minimum_package=${salaryId}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(url)
    if (response.ok) {
      const data = await response.json()
      const updatedJobsData = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))

      this.setState({
        jobsData: updatedJobsData,
        status: apiStatusConstants.success,
      })
    } else {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  sortByEmployment = employId => {
    this.setState({employmentId: employId}, this.getjobs)
  }

  sortBySalary = salId => {
    this.setState({salaryId: salId}, this.getjobs)
  }

  renderJobsData = () => {
    const {jobsData} = this.state
    if (jobsData.length === 0) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs"
          />
          <h1>No Jobs Found</h1>
          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }
    return (
      <ul className="ul">
        {jobsData.map(each => (
          <Jobs jobDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  enterSearchInput = () => {
    this.getjobs()
  }

  changeSearchInput = searchInput => {
    this.setState({searchInput})
  }

  renderLoader = () => (
    <ul className="products-loader-container">
      <Loader
        type="ThreeDots"
        color="#0b69ff"
        height="50"
        width="50"
        data-testid="loader"
      />
    </ul>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <h1>Oops! Something Went Wrong</h1>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="fail-image"
      />
      <p>We are sorry, the page you requested could not be found</p>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button">Retry</button>
    </div>
  )

  renderAllJobs = () => {
    const {status} = this.state
    console.log(status)
    switch (status) {
      case apiStatusConstants.success:
        return this.renderJobsData()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    const {employmentId, searchInput, salaryId} = this.state
    return (
      <div className="job-section-container">
        <Header />
        <ProfileDetails />
        <div className="filtering-card">
          <Filtering
            searchInput={searchInput}
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            sortByEmployment={this.sortByEmployment}
            sortBySalary={this.sortBySalary}
            employmentId={employmentId}
            salaryId={salaryId}
            enterSearchInput={this.enterSearchInput}
            changeSearchInput={this.changeSearchInput}
          />
          {this.renderAllJobs()}
        </div>
      </div>
    )
  }
}

export default JobSection
