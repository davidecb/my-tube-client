import axios from 'axios';
import { useEffect, useState } from 'react';
import { FaRegThumbsDown, FaRegThumbsUp, FaDownload } from 'react-icons/fa';
import config from '../../common/api/config'
import Loading from '../../components/Loading';
import TrendingBar from '../../components/TrendingBar';
import './Video.scss';

function Video({ videoId, user, setUser }) {
    const [video, setVideo] = useState(undefined);
    const [loadingState, setLoadingState] = useState(true);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    
    useEffect(() => {
        const url = `/api/videos/${videoId}`;
        axios.get(url, config).then(async (res) => {
            const videoData = res.data;            
            videoData.source = await `data:${videoData.videoType}; base64, ${videoData.mediaBuffer}`;
            videoData.mediaBuffer = '';
            setTimeout(() => {
                setLikes(videoData.likes)
                setDislikes(videoData.dislikes)
                setVideo(videoData)
                setLoadingState(false)
            }, 100)
        }).catch(err => console.log(err.message));                    
    }, [])

    const likeClicked = () => {
        const url = `/api/videos/${videoId}/like`;
        axios.patch(url, {}, {
            headers: {
              'Authorization': `Bearer ${user.token}` 
            }
          }).then(async (res) => {            
            setLikes(res.data.likes)
            setDislikes(res.data.dislikes)
        }).catch(err => console.log(err.message)); 
    }

    const dislikeClicked = () => {
        const url = `/api/videos/${videoId}/dislike`;
        axios.patch(url, {}, {
            headers: {
              'Authorization': `Bearer ${user.token}` 
            }
          }).then(async (res) => {
            setLikes(res.data.likes)
            setDislikes(res.data.dislikes)
        }).catch(err => console.log(err.message));
    }

    const downloadVideo = () => {
        const url = `/api/videos/download/${videoId}`;
        axios.get(url, {}, {
            headers: {
              'Authorization': `Bearer ${user.token}` 
            }
          }).then(async (res) => {
            console.log(res)
        }).catch(err => console.log(err.message));
    }

    return (
        <div className="video">
            {
                loadingState && <Loading />
            }
            {video && 
                <div className="pageContainer">
                    <span className="video__title defaultTitle">{video.title}</span>            
                    <div className="video__mediaContainer">
                        <video controls autoPlay width="540" height="405" controlsList="nodownload">
                            <source src={video.source} type={video.videoType} />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <span className="video__description">Description: {video.description}</span>                      
                    <div className="video__options options">            
                        <div className="options__valoration">
                            <FaRegThumbsUp className="options__icon" onClick={likeClicked} />{likes}
                        </div>
                        <div className="options__valoration">
                            <FaRegThumbsDown className="options__icon" onClick={dislikeClicked} />{dislikes}
                        </div>                        
                        <a
                            href={video.source}
                            color="transparent"
                            target="_blank"
                            rel="noreferrer"
                            download={`${video.title.replace(/( )/g, '-')}`} >
                            <div className="options__download">
                                <FaDownload className="options__icon" onClick={downloadVideo} />
                            </div>
                        </a>
                    </div>
                    <div className="video__tagsContainer">
                        <TrendingBar tags={video.tags} />
                    </div>
                </div>
            }
        </div>
    );
}

export default Video;