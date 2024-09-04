import HomeVideoCard from '../HomeVideoCard'
import {Heading} from './styledComponents'
import ThemeContext from '../../context/ThemeContext'

const HomeVideos = props => {
  const {homeVideos, onRetry} = props
  const videoCount = homeVideos.length

  const onClickRetry = () => {
    onRetry()
  }

  return (
    <ThemeContext.Consumer>
      {value => {
        const {isDark} = value
        const headingcolor = isDark ? '#f1f5f9' : '1e293b'

        return videoCount > 0 ? (
          <ul>
            {homeVideos.map(each => (
              <HomeVideoCard video={each} key={each.id} />
            ))}
          </ul>
        ) : (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <Heading heading={headingcolor}>No Search results found</Heading>
            <p>Try different keywords or remove search filter</p>
            <button type="button" onClick={onClickRetry}>
              Retry
            </button>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default HomeVideos
