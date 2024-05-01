const express = require('express');
const crypto = require('crypto');

const app = express();
const PORT = 3002;

const baseUrl = 'www.google.com/';
const urlLength = 6;
const urlMap = {};

// Function to generate a random short URL
function generateShortURL() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let shortURL = '';

    for (let i = 0; i < urlLength; i++) {
        const index = Math.floor(Math.random() * characters.length);
        shortURL += characters.charAt(index);
    }

    return shortURL;
}

// Function to shorten a long URL
function shortenURL(longURL) {
    const shortURL = generateShortURL();
    urlMap[shortURL] = longURL;
    return baseUrl + shortURL;
}

// Function to redirect to original URL
function redirectToOriginalURL(shortURL) {
    if (!urlMap[shortURL.substring(baseUrl.length)]) {
        return 'Short URL not found';
    }
    const longURL = urlMap[shortURL.substring(baseUrl.length)];
    return longURL;
}

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Tiny URL Service');
});

app.get('/shorten', (req, res) => {
    const longURL = req.query.longURL;
    if (!longURL) {
        res.status(400).send('Long URL parameter is required');
        return;
    }

    const shortURL = shortenURL(longURL);
    res.send('Shortened URL: ' + shortURL);
});

app.get('/unshorten', (req, res) => {
    const shortURL = req.query.shortURL;
    const longURL = redirectToOriginalURL(shortURL);
    if (longURL === 'Short URL not found') {
        res.status(404).send('Short URL not found');
        return;
    }
    res.redirect(301, longURL);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});