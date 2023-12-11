import {AiFillStar} from 'react-icons/ai'
import {ImLocation2} from 'react-icons/im'
import {BsFillBagFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const Jobs = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    employmentType,
    id,
  } = jobDetails

  return (
    <Link to={`jobs/${id}`} className="link-item">
      <li className="jobs-container1">
        <div className="card1">
          <img src={companyLogoUrl} className="image-logo" alt="company logo" />
          <div>
            <h1 className="title">{title}</h1>
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
        <h1 className="des">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default Jobs
