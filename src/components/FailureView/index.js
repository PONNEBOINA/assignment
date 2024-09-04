import {Heading} from './styledComponents'
import ThemeContext from '../../context/ThemeContext'

const FailureView = props => {
  const {onRetry} = props
  const onClickRetry = () => {
    onRetry()
  }
  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const headingcolor = isDark ? '#f1f5f9' : '#1e293b'
        const failureimg = isDark
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
        return (
          <div>
            <img src={failureimg} alt="failure view" />
            <Heading heading={headingcolor}>Oops! Something Went Wrong</Heading>
            <p>
              We are having some trouble to complete your request. <br /> Please
              try again later
            </p>
            <button type="button" onClick={onClickRetry}>
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default FailureView
