import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import NavigationBar from '../NavigationBar'
import FailureView from '../FailureView'
import HomeVideos from '../HomeVideos'

const apiStatusContext = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {homeVideos: [], apiStatus: apiStatusContext.initial, searchInput: ''}

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    const {searchInput} = this.state
    this.setState({apiStatus: apiStatusContext.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchInput}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, option)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = data.videos.map(each => ({
        id: each.id,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
        publishedAt: each.published_at,
        name: each.channel.name,
        profileImageUrl: each.channel.profile_image_url,
      }))
      this.setState({
        apiStatus: apiStatusContext.success,
        homeVideos: updateData,
      })
    } else {
      this.setState({apiStatus: apiStatusContext.failure})
    }
  }

  onChangeInput = e => {
    this.setState({searchInput: e.target.value})
  }

  getSearchResult = () => {
    this.getVideos()
  }

  onRetry = () => {
    this.setState({searchInput: ''}, this.getVideos)
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderVideosView = () => {
    const {homeVideos} = this.state
    return <HomeVideos homeVideos={homeVideos} onRetry={this.onRetry} />
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderHomeVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContext.success:
        return this.renderVideosView()
      case apiStatusContext.failure:
        return this.renderFailureView()
      case apiStatusContext.inprogress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <NavigationBar />
        <div data-testid="home">
          <div data-testid="banner">
            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png"
                alt="nxt watch logo"
              />
              <h1>
                Buy Nxt Watch Premium plans with <br /> UPI{' '}
              </h1>
              <button type="button">GET IT NOW</button>
            </div>
          </div>
        </div>
        <div>
          <input
            type="search"
            placeholder="search"
            value={searchInput}
            onChange={this.onChangeInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            onClick={this.getSearchResult}
          >
            search
          </button>
        </div>
        {this.renderHomeVideos()}
      </>
    )
  }
}
export default Home
