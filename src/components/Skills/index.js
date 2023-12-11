import './index.css'

const Skills = props => {
  const {skills} = props
  const {imageUrl, name} = skills
  console.log(skills)
  return (
    <div className="skill-card">
      <img src={imageUrl} className="skill-image" alt={name} />
      <h1 className="skill-head">{name}</h1>
    </div>
  )
}

export default Skills
