import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function Example() {
    
    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    function loadImages(){
        console.log("LOAD IMAGE AGAIN");
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

    if (error) {
        return <div>Error: {error.message}</div>;
    } 
    else if (!isLoaded) {
        return <div>Loading...</div>;
    } 
    else {
        return (
            <div>
                <button onClick={() => loadImages()}>Add</button>
                <ul>
                {
                    images.map((imgSrc, index) => (
                        <img src={imgSrc.url} key={index} width={imgSrc.width} height={imgSrc.height} alt="..."></img>
                    ))
                }
                </ul>
            </div>
        );
    }
    
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Example/>);