import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-loader-spinner'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showPassword: false,
    showError: false,
  }

  onChangeHandler = e => {
    this.setState({username: e.target.value})
  }

  onChangepassword = e => {
    this.setState({password: e.target.value})
  }

  onShowPass = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showError: true, errorMsg})
  }

  submitForm = async e => {
    e.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, option)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="user">USERNAME</label>
        <input
          type="text"
          id="user"
          value={username}
          onChange={this.onChangeHandler}
          placeholder="username"
          name="username"
        />
      </>
    )
  }

  renderPassField = () => {
    const {password, showPassword} = this.state
    const inputType = showPassword ? 'text' : 'password'
    return (
      <>
        <label htmlFor="user">PASSWORD</label>
        <input
          type={inputType}
          name="password"
          id="user"
          value={password}
          onChange={this.onChangepassword}
          placeholder="password"
        />
        <div>
          <input type="checkbox" id="check" onChange={this.onShowPass} />
          <lable htmlFor="check">Show Password</lable>
        </div>
      </>
    )
  }

  render() {
    const {errorMsg, showError} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
          />
          <div>{this.renderUserField()}</div>
          <div>{this.renderPassField()}</div>
          <button type="submit">Login</button>
          {showError && <p>*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default LoginForm
