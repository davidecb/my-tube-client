import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import config from '../../common/api/config'
import Loading from '../../components/Loading';
import TrendingBar from '../../components/TrendingBar';
import './Home.scss';

function Home({ location }) {
    const history = useHistory();
    const [videos, setVideos] = useState([]);
    const [loadingState, setLoadingState] = useState(true);
    const searchParams = location.search;

    useEffect(() => {
        setVideos([]);
        setLoadingState(true)
        const url = `/api/videos${searchParams}`;
        axios.get(url, config).then(async (res) => {
            const videosData = res.data;
            
            if (videosData.length === 0) {
                await setTimeout(async () => {
                    setVideos(videosData)          
                    setLoadingState('none')
                }, 500)
            }

            await videosData.map(async (video, index) => {
                const url = `/api/videos/${video._id}`;
                await axios.get(url, config).then(async (res) => {
                    video.source = await `data:${res.data.videoType}; base64, ${res.data.mediaBuffer}`
                }).catch(err => console.log(err.message));

                if (index === videosData.length - 1) {
                    await setTimeout(async () => {
                    setVideos(videosData)
                    setLoadingState(false)           
                }, 1000)}
            })
        }).catch(err => console.log(err.message));
    }, [searchParams])

    return (
        <div className="home">
            <TrendingBar tags="all" />
            <div className="home__videosContainer videosContainer">
            {
                loadingState === true && <Loading />
            }
            {
                loadingState === 'none' && 
                <div className="noVideosToShow">
                    No videos to show
                </div>
            }
            {
                videos && videos.map((video, index) => {
                    return(
                        <div key={index} className="videosContainer__singleVideoContainer singleVideoContainer" onClick={() => {
                            const route = `/video/${video._id}`;
                            history.push(route)
                        }}>
                            <div className="singleVideoContainer__media">
                                <video width="180" height="135" >
                                    <source src={video.source} type={video.videoType} />
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

export default Home;