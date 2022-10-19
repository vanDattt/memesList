import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function Example() {
    
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    function loadImages(){
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(
                (result) => {
                    const gallery = [];
                    for(let i = 0; i < result.data.memes.length; i++){
                        gallery.push(result.data.memes[i]);
                    }
                    setIsLoaded(true);
                    setImages(gallery);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }

    useEffect(() => {
        loadImages();
    },[]);

    const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };

    const gallery = {
        float: "left",
        width: "300px",
        padding: "2px",
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) {
        return <div>Loading...</div>;
    } 
    else {
        return (
            <div>
                <p style={style}>Click to reload images</p>
                <ul style={style}>
                    <button onClick={() => loadImages()}>Reload</button>
                </ul>
                <ul>
                    <div style={gallery}>
                    {
                        images.map((imgSrc, index) => (
                            <img src={imgSrc.url} key={index} alt="..."></img>
                        ))
                    }
                    </div>
                </ul>
            </div>
        );
    }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Example/>);