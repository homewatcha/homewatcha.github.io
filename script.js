async function fetchLastFmTrack() {
    const USERNAME = 'Smotry993';
    const API_KEY = 'a8b311fd965e7325a95e48eaecd721b9';
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=1`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const track = data.recenttracks.track[0];
        
        if (!track) return;

        const artist = track.artist['#text'];
        const trackName = track.name;
        const albumArt = track.image[2]['#text'] || 'https://via.placeholder.com/150';
        const trackUrl = track.url;

        const mainContainer = document.querySelector('.surface-container');
        const bioCard = document.querySelector('.bio-card');

        const lastFmCard = document.createElement('section');
        lastFmCard.className = 'lastfm-card'; /* Simplified class */
        lastFmCard.innerHTML = `
            <h2 class="label-large">NOW_PLAYING</h2>
            <div class="lastfm-content">
                <img src="${albumArt}" alt="Album Art" class="lastfm-art">
                <div class="lastfm-info">
                    <p class="body-large track-name">${trackName}</p>
                    <p class="title-medium artist-name">${artist}</p>
                </div>
                <a href="${trackUrl}" target="_blank" class="lastfm-link">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M18 11l-5 5-5-5h3v7h2v-7h3zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                    </svg>
                </a>
            </div>
        `;

        bioCard.after(lastFmCard);

    } catch (error) {
        console.error('Error fetching Last.fm track:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchLastFmTrack);
