import logo from '../../assets/loadingIcon.png';
import './Loading.scss';

function Loading() {
    
  return (
    <div className="loading">
        <img src={logo} className="loading__logo" alt="logo" />        
    </div>
    );
}

export default Loading;
