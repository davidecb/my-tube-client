import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import config from '../../common/api/config'
import './MyVideos.scss';

function MyVideos({ user }) {
    const history = useHistory();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        setVideos([]);
        const url = '/api/myvideos';
        axios.get(url, {
            headers: {
              'Authorization': `Bearer ${user.token}` 
            }
          }).then(async (res) => {
            const videosData = res.data;
            console.log(videosData)
            await videosData.map(async (video) => {
                const url = `/api/videos/${video._id}`;
                await axios.get(url, config).then(async (res) => {
                    video.sourc = await `data:${video.videoType}; base64, ${res.data.mediaBuffer}`
                    await setTimeout(async () => {
                        await setVideos(videosData)
                    }, 1000)
                }).catch(err => console.log(err.message));
            })
            
            console.log(videosData);
        }).catch(err => console.log(err.message));
    }, [])

    return (
        <div className="myVideos">
            <div className="myVideos__videosContainer videosContainer">
            {
                videos && videos.map((video, index) => {
                    return(
                        <div key={index} className="videosContainer__singleVideoContainer singleVideoContainer" onClick={() => {
                            const route = `/video/${video._id}`;
                            history.push(route)
                        }}>
                            <div className="singleVideoContainer__media">
                                <video width="180" height="135" >
                                    <source src={video.sourc} type={video.videoType} />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <span className="singleVideoContainer__title">{video.title}</span>
                        </div>
                    )
                })
            }
            </div>
        </div>
    );
}

export default MyVideos;