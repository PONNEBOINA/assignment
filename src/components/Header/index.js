import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'

import {BsMoon, BsBrightnessHigh} from 'react-icons/bs'
import {Navbar} from './styledComponents'
import ThemeContext from '../../context/ThemeContext'

const Header = props => (
  <ThemeContext.Consumer>
    {value => {
      const {isDark, toggleTheme} = value
      const color = isDark ? '#ffffff' : '#00306e'

      const onChangeTheme = () => {
        toggleTheme()
      }

      const onClickLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <Navbar bgcolor={color}>
          <Link to="/">
            <img
              src={
                isDark
                  ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                  : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              }
              alt="website logo"
            />
          </Link>
          <div>
            <button type="button" data-testid="theme" onClick={onChangeTheme}>
              {isDark ? <BsBrightnessHigh /> : <BsMoon />}
            </button>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <Popup modal trigger={<button type="button">Logout</button>}>
              {close => (
                <div>
                  <h1>Are you sure, you want to logout</h1>
                  <button
                    type="button"
                    data-testid="closeButton"
                    onClick={() => close()}
                  >
                    Cancel
                  </button>
                  <button type="button" onClick={onClickLogout}>
                    Confirm
                  </button>
                </div>
              )}
            </Popup>
          </div>
        </Navbar>
      )
    }}
  </ThemeContext.Consumer>
)
export default withRouter(Header)
