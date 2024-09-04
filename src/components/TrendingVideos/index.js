import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import NavigationBar from '../NavigationBar'
import FailureView from '../FailureView'
import VideoCard from '../VideoCard'

const apiStatusContext = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class TredingVideos extends Component {
  state = {trendingVidoes: [], apiStatus: apiStatusContext.initial}

  componentDidMount() {
    this.getVideos()
  }

  getVideos = async () => {
    this.setState({apiStatus: apiStatusContext.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
        trendingVidoes: updateData,
      })
    } else {
      this.setState({apiStatus: apiStatusContext.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderVideosView = () => {
    const {trendingVidoes} = this.state
    return (
      <div>
        {trendingVidoes.map(each => (
          <VideoCard key={each.id} videoDetails={each} />
        ))}
      </div>
    )
  }

  onRetry = () => {
    this.getVideos()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderTrendingVideos = () => {
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
    return (
      <div data-testid="trending">
        <Header />
        <NavigationBar />
        <div data-testid="trending">
          <h1>Trending</h1>
        </div>
        {this.renderTrendingVideos()}
      </div>
    )
  }
}

export default TredingVideos
