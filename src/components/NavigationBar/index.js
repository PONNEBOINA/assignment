import {Component} from 'react'
import {Link} from 'react-router-dom'
import {Heading} from './styledComponents'
import ThemeContext from '../../context/ThemeContext'

class NavigationBar extends Component {
  renderTabItems = () => (
    <ThemeContext.Consumer>
      {value => {
        const {isDark, changeTab} = value

        const color = isDark ? '#231f20' : '#f1f5f9'

        const onClickTabHome = () => {
          changeTab('Home')
        }

        const onClickTabTrending = () => {
          changeTab('Treding')
        }

        const onClickTabGaming = () => {
          changeTab('Gaming')
        }

        const onClickTabSaved = () => {
          changeTab('Saved')
        }

        return (
          <div>
            <Heading bgcolor={color}>
              <ul>
                <Link to="/">
                  <li key="home" onClick={onClickTabHome}>
                    <p>Home</p>
                  </li>
                </Link>
                <Link to="/trending">
                  <li key="trending" onClick={onClickTabTrending}>
                    <p>Trending</p>
                  </li>
                </Link>
                <Link to="/gaming">
                  <li key="gaming" onClick={onClickTabGaming}>
                    Gaming
                  </li>
                </Link>
                <Link to="/saved-videos">
                  <li key="saved" onClick={onClickTabSaved}>
                    <p>Saved videos</p>
                  </li>
                </Link>
              </ul>
              <div>
                <h1>CONTACT US</h1>
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                    alt="facebook logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                    alt="twitter logo"
                  />
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                    alt="linkedin logo"
                  />
                </div>
                <h1>Enjoy! Now to see your channels and recommendations!</h1>
              </div>
            </Heading>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    return <>{this.renderTabItems()}</>
  }
}
export default NavigationBar
