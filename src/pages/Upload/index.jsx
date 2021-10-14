import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Upload.scss';

function Upload({ user }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    const [uploadStatus, setUploadStatus] = useState(false);
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();

        const formElement = e.target;
        const formData = new FormData(formElement);
        console.log("@formData:", formData)
        const url = '/api/videos/upload';
        axios({
            method: 'post',
            url,
            data: formData,
            headers: {
                'Authorization': `Bearer ${user.token}`,
                'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            },
        }).then(res => {
            setUploadStatus(true)
            setTimeout(() => {
                history.push("/");                 
            }, 2000)
            console.log(res)
        }).catch(err => console.log(err.message))
    }

    return (
        <div className="uploadMedia">
            {!uploadStatus &&
                <form className="uploadMedia__form" onSubmit={onSubmit}>
                    <label className="uploadMedia__title defaultTitle">Upload new Video!! </label>
                    <label className="uploadMedia__titleLabel" for="title">title:</label>
                    <input 
                        className="uploadMedia__input textInput"
                        type="text"
                        name="title" 
                        placeholder="Enter a title..." 
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="uploadMedia__descriptionLabel" for="description">Description:</label>
                    <textarea 
                        className="uploadMedia__input textInput"
                        name="description"                    
                        type="text"
                        rows="2" 
                        cols="52"
                        maxLength="120"
                        placeholder="Enter a description (optional) (max 120 characters)" 
                        onChange={(e) => setDescription(e.target.value)}
                        />
                    <label className="uploadMedia__fileLabel" for="file">please select a video file:</label>
                    <input 
                        className="uploadMedia__input"
                        name="media"
                        type="file"
                        placeholder="Select a video file" 
                        onChange={(e) => {
                            console.log("@file:", e.target.files[0])
                            setFile(e.target.files[0])}}
                        accept="video/mp4"
                        />
                    <div className="uploadMedia__tagsContainer tagsContainer">                                   
                        <label className="tagsContainer__title"> Tags:</label>
                        <div className="tagsContainer__checkContainer">
                            <input className="tagsContainer__input" type="checkbox" 
                                id="sports" name="sports" value="sports" />
                            <label className="tagsContainer__label" for="sports"> Sports</label>
                        </div>
                        <div className="tagsContainer__checkContainer"> 
                            <input className="tagsContainer__input" type="checkbox" 
                                id="gaming" name="gaming" value="gaming" />
                            <label className="tagsContainer__label" for="gaming"> Gaming</label>
                        </div>
                        <div className="tagsContainer__checkContainer">
                            <input className="tagsContainer__input" type="checkbox" 
                                id="music" name="music" value="music" />
                            <label className="tagsContainer__label" for="music"> Music</label>
                        </div>
                        <div className="tagsContainer__checkContainer">
                            <input className="tagsContainer__input" type="checkbox" 
                                id="travel" name="travel" value="travel" />
                            <label className="tagsContainer__label" for="travel"> Travel</label>
                        </div>
                        <div className="tagsContainer__checkContainer">
                            <input className="tagsContainer__input" type="checkbox" 
                                id="education" name="education" value="education" />
                            <label className="tagsContainer__label" for="education"> Education</label>
                        </div>
                        <div className="tagsContainer__checkContainer">
                            <input className="tagsContainer__input" type="checkbox" 
                                id="science" name="science" value="science" />
                            <label className="tagsContainer__label" for="science"> Science</label>
                        </div>
                        <div className="tagsContainer__checkContainer">
                            <input className="tagsContainer__input" type="checkbox" 
                                id="comedy" name="comedy" value="comedy" />
                            <label className="tagsContainer__label" for="comedy"> Comedy</label>
                        </div>
                        <div className="tagsContainer__checkContainer">
                            <input className="tagsContainer__input" type="checkbox" 
                                id="movies" name="movies" value="movies" />
                            <label className="tagsContainer__label" for="movies"> Movies</label>
                        </div>
                        <div className="tagsContainer__checkContainer">
                            <input className="tagsContainer__input" type="checkbox" 
                                id="entertainment" name="entertainment" value="entertainment" />
                            <label className="tagsContainer__label" for="entertainment"> Entertainment</label>
                        </div>
                        <div className="tagsContainer__checkContainer">
                            <input className="tagsContainer__input" type="checkbox" 
                                id="animals" name="animals" value="animals" />
                            <label className="tagsContainer__label" for="animals"> Animals</label>
                        </div>
                        <div className="tagsContainer__checkContainer">
                            <input className="tagsContainer__input" type="checkbox" 
                                id="other" name="other" value="other" />
                            <label className="tagsContainer__label" for="other"> Other</label>
                        </div>                   
                    </div>
                    <button className="uploadMedia__uploadMediaButton defaultButton"
                        type="submit">Upload</button>
                </form>
            }
            {uploadStatus &&
                <div className="uploadMedia__uploadSuccesfully">               
                        <label className="uploadMedia__title defaultTitle">Your upload has been successfully completed</label>                    
                </div>
            }
        </div>
    );
}

export default Upload;