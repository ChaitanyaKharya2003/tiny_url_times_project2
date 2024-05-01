import React, { useState } from 'react';
import axios from 'axios';

const URLShortenerForm = () => {
    const [longURL, setLongURL] = useState('');
    const [shortenedURL, setShortenedURL] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:3005/shorten?longURL=${longURL}`);
            console.log(longURL);
            setShortenedURL(response.data);
        } catch (error) {
            console.error(error);
            setError('Error shortening URL');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter URL"
                    value={longURL}
                    onChange={(e) => setLongURL(e.target.value)}
                />
                <button type="submit">Shorten</button>
            </form>
            {shortenedURL && (
                <div>
                    <p>Shortened URL: <a href={shortenedURL}>{shortenedURL}</a></p>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default URLShortenerForm;
