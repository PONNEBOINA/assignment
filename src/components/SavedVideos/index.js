import Header from '../Header'
import NavigationBar from '../NavigationBar'
import VideoCard from '../VideoCard'
import ThemeContext from '../../context/ThemeContext'
import {Container} from './styledComponents'

const SavedVideos = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark, savedVideos} = value
      const bgColor = isDark ? '#0f0f0f0' : '#f9f9f9f9'
      return (
        <>
          <Header />
          <NavigationBar />
          <Container data-testid="savedVideos" bgcolor={bgColor}>
            <div>
              <h1>Saved Videos</h1>
            </div>
            {savedVideos.length > 0 ? (
              <ul>
                {savedVideos.map(each => (
                  <VideoCard key={each.id} videoDetails={each} />
                ))}
              </ul>
            ) : (
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                  alt="no saved videos"
                />
                <p>No saved videos found</p>
                <p>You can save your videos while watching them</p>
              </div>
            )}
          </Container>
        </>
      )
    }}
  </ThemeContext.Consumer>
)
export default SavedVideos
