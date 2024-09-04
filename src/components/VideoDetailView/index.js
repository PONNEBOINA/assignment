import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import NavigationBar from '../NavigationBar'
import FailureView from '../FailureView'
import PlayVideoView from '../PlayVideoView'

const apiStatusContext = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'IN_PROGRESS',
}

class VideoDetailView extends Component {
  state = {
    videoDetails: [],
    apiStatus: apiStatusContext.initial,
    isLiked: false,
    isDisLiked: false,
  }

  componentDidMount() {
    this.getVideoDetails()
  }

  formattedData = data => ({
    id: data.video_details.id,
    title: data.video_details.title,
    videoUrl: data.video_details.video_url,
    thumbnailUrl: data.video_details.thumbnail_url,
    publishedAt: data.video_details.published_at,
    description: data.video_details.description,
    name: data.video_details.channel.name,
    profileImageUrl: data.video_details.channel.profile_image_url,
    subscriberCount: data.video_details.channel.subscriber_count,
    viewCount: data.video_details.view_count,
  })

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({apiStatus: apiStatusContext.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/${id}`
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, option)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = this.formattedData(data)
      this.setState({
        apiStatus: apiStatusContext.success,
        videoDetails: updateData,
      })
    } else {
      this.setState({apiStatus: apiStatusContext.failure})
    }
  }

  clickLiked = () => {
    this.setState(prevState => ({
      isLiked: !prevState.isLiked,
      isDisLiked: false,
    }))
  }

  clickDisLiked = () => {
    this.setState(prevState => ({
      isDisLiked: !prevState.isDisLiked,
      isLiked: false,
    }))
  }

  onRetry = () => {
    this.getVideoDetails()
  }

  renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderPlayVideoView = () => {
    const {videoDetails, isLiked, isDisLiked} = this.state
    return (
      <div>
        <PlayVideoView
          videoDetails={videoDetails}
          clickLiked={this.clickLiked}
          clickDisLiked={this.clickDisLiked}
          isLiked={isLiked}
          isDisLiked={isDisLiked}
        />
      </div>
    )
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderVideoDetailVideos = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusContext.success:
        return this.renderPlayVideoView()
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
      <>
        <Header />
        <NavigationBar />
        <div data-testid="videoItemDetails">
          {this.renderVideoDetailVideos()}
        </div>
      </>
    )
  }
}
export default VideoDetailView
