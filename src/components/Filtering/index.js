import {BsSearch} from 'react-icons/bs'
import './index.css'

const Filtering = props => {
  const renderWorkingTypeList = () => {
    const {employmentTypesList} = props
    return employmentTypesList.map(each => {
      const {sortByEmployment} = props
      const onChangeEmployment = () => sortByEmployment(each.employmentTypeId)

      return (
        <li className="card">
          <input
            type="checkbox"
            key={each.employeeTypeId}
            id={each.employmentTypeId}
            onClick={onChangeEmployment}
          />
          <label htmlFor={each.employeeTypeId}>{each.label}</label>
        </li>
      )
    })
  }

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <button
        className="search-input-container"
        data-testid="searchButton"
        type="button"
      >
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="search-icon" />
      </button>
    )
  }

  const renderBySalary = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(salary => {
      const {sortBySalary} = props
      const onChangeRating = () => sortBySalary(salary.salaryRangeId)

      return (
        <li className="card" key={salary.salaryRangeId}>
          <input
            type="radio"
            key={salary.salaryRangeId}
            id={salary.salaryRangeId}
            value={salary.label}
            onClick={onChangeRating}
          />
          <label htmlFor={salary.salaryRangeId}>{salary.label}</label>
        </li>
      )
    })
  }

  return (
    <div className="filtering-container">
      {renderSearchInput()}
      <h1 className="head1">Type of Employment</h1>
      <ul>{renderBySalary()}</ul>
      <hr />
      <h1 className="head1">Salary Range</h1>
      <ul>{renderWorkingTypeList()}</ul>
    </div>
  )
}

export default Filtering
