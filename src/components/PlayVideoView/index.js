import ReactPlayer from 'react-player'
import ThemeContext from '../../context/ThemeContext'
import {Button} from './styledComponents'

const PlayVideoView = props => {
  const {videoDetails, clickLiked, clickDisLiked, isLiked, isDisLiked} = props

  const onClickLike = () => {
    clickLiked()
  }

  const onClickDisLiked = () => {
    clickDisLiked()
  }
  return (
    <ThemeContext.Consumer>
      {value => {
        const {addVideo, savedVideos} = value

        let isSaved
        const index = savedVideos.findIndex(each => each.id === videoDetails.id)

        if (index === -1) {
          isSaved = false
        } else {
          isSaved = true
        }

        const onClickSave = () => {
          addVideo(videoDetails)
        }
        return (
          <div>
            <ReactPlayer url={videoDetails.videoUrl} controls width="100%" />
            <h1>{videoDetails.title}</h1>
            <div>
              <p>{videoDetails.viewCount} Views</p>
              <p>{videoDetails.publishedAt}</p>
              <div>
                <Button
                  type="button"
                  color={isLiked ? '#2563eb' : '#64748b'}
                  onClick={onClickLike}
                >
                  Like
                </Button>
                <Button
                  type="button"
                  color={isDisLiked ? '#2563eb' : '#64748b'}
                  onClick={onClickDisLiked}
                >
                  Dislike
                </Button>
              </div>
              <div>
                <button type="button" onClick={onClickSave}>
                  <p>{isSaved ? 'Saved' : 'Save'}</p>
                </button>
              </div>
            </div>
            <hr />
            <div>
              <img src={videoDetails.prifileImageUrl} alt="channel logo" />
              <div>
                <h1>{videoDetails.name}</h1>
                <p>{videoDetails.subscriberCount} Subscribers</p>
              </div>
              <p>{videoDetails.description}</p>
            </div>
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )
}
export default PlayVideoView
