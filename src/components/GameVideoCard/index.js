import {Link} from 'react-router-dom'

const VideoCard = props => {
  const {videoDetails} = props
  const {id, title, thumbnailUrl, viewCount} = videoDetails
  return (
    <Link to={`/videos/${id}`}>
      <li>
        <img src={thumbnailUrl} alt="video thumbnail" />
        <div>
          <h1>{title}</h1>
          <p>{viewCount} Watching Worldwide</p>
        </div>
      </li>
    </Link>
  )
}
export default VideoCard
