import {AiFillStar} from 'react-icons/ai'
import {ImLocation2} from 'react-icons/im'
import {BsFillBagFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {similarJob} = props
  console.log(similarJob)
  const {
    companyLogoUrl,
    employmentType,
    title,
    rating,
    location,
    jobDescription,
  } = similarJob
  console.log(similarJob)
  return (
    <li className="similar-job-container">
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
        <h1 className="similar-description">Description</h1>
        <p className="description">{jobDescription}</p>
        <div className="font-icons2">
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
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
