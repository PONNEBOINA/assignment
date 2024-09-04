import Header from '../Header'
import NavigationBar from '../NavigationBar'
import ThemeContext from '../../context/ThemeContext'

const NotFound = () => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark} = value
      const notfindimg = isDark
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'

      return (
        <>
          <Header />
          <NavigationBar />
          <div>
            <div>
              <img src={notfindimg} alt="not found" />
              <h1>Page Not Found</h1>
              <p>We are sorry, the page you requested could not be found.</p>
            </div>
          </div>
        </>
      )
    }}
  </ThemeContext.Consumer>
)
export default NotFound
