import trendingOptions from './trendingOptions';
import { useHistory } from 'react-router-dom';
import './TrendingBar.scss';

function TrendingBar({ tags }) {
    const history = useHistory();
    const optionsArray = 
        tags === 'all' 
        ? trendingOptions 
        : tags.map((option) => trendingOptions.filter(opt => opt.name.toLowerCase() === option)[0])
    
    return (
        <div className="trendingBar">
            <label className="trendingBar__title">Tags</label>
            {
                optionsArray.map((option, index) => {
                    return(
                        <div key={index} className="trendingBar__tag" onClick={() => {
                            const route = `/home?tag=${option.name.toLowerCase()}`
                            history.push(route)
                        }} >{option.name}</div>
                    )
                })
            }
        </div>
    );
}

export default TrendingBar;


