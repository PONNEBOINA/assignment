import {Link} from 'react-router-dom'

const HomeVideoCard = props => {
  const {video} = props
  const {
    id,
    title,
    thumbnailUrl,
    viewCount,
    publishedAt,
    name,
    profileImageUrl,
  } = video
  return (
    <Link to={`/videos/${id}`}>
      <li>
        <img src={thumbnailUrl} alt="video thumbnail" />
        <div>
          <img src={profileImageUrl} alt="channel logo" />
          <div>
            <h1>{title}</h1>
            <p>{name}</p>
            <p>{viewCount}</p>
            <p>{publishedAt}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default HomeVideoCard
