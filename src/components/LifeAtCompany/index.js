import './index.css'

const LifeAtCompany = props => {
  const {life} = props
  const {imageUrl, description} = life

  return (
    <div className="life-container">
      <div>
        <h1 className="head">Life At Company</h1>
        <p className="life-para">{description}</p>
      </div>
      <img src={imageUrl} alt="vhg" className="lifeImage" />
    </div>
  )
}

export default LifeAtCompany
