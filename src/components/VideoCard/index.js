import {Link} from 'react-router-dom'

const VideoCard = props => {
  const {videoDetails} = props
  const {
    id,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
    name,
    profileImageUrl,
  } = videoDetails
  return (
    <Link to={`/videos/${id}`}>
      <li>
        <img src={thumbnailUrl} alt="video thumbnail" />
        <div>
          <img src={profileImageUrl} alt="channel logo" />
          <div>
            <h1>{title}</h1>
            <p>{name}</p>
          </div>
          <p>
            {viewCount} Views<span>{publishedAt}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}
export default VideoCard
