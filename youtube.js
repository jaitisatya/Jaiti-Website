// ===== YOUTUBE API CONFIGURATION =====
const YOUTUBE_API_KEY = 'AIzaSyBJQvSCmSITYveflgAImtmN3WaJ8PN4oFo';
const CHANNEL_ID = 'UCZsnQDzg4IQsHoSBuoLmiDg';

// DOM Elements
const videosGrid = document.getElementById('videosGrid');
const loadingSpinner = document.getElementById('loadingSpinner');
const errorMessage = document.getElementById('errorMessage');
const noVideosMessage = document.getElementById('noVideosMessage');
const videoModal = document.getElementById('videoModal');
const videoPlayer = document.getElementById('videoPlayer');
const modalVideoTitle = document.getElementById('modalVideoTitle');
const modalVideoDescription = document.getElementById('modalVideoDescription');
const modalClose = document.querySelector('.modal-close');

console.log('📺 YouTube Integration Loaded');
console.log('API Key:', YOUTUBE_API_KEY.substring(0, 10) + '...');
console.log('Channel ID:', CHANNEL_ID);

// Close modal on close button click
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Close modal when clicking outside
if (videoModal) {
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeModal();
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeModal();
    }
});

// Fetch YouTube videos
async function fetchYouTubeVideos() {
    try {
        // Reset UI
        videosGrid.innerHTML = '';
        loadingSpinner.style.display = 'flex';
        errorMessage.style.display = 'none';
        noVideosMessage.style.display = 'none';

        console.log('🔄 Fetching videos from YouTube API...');

        // YouTube API endpoint to get uploads from channel
        const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=12&type=video`;

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        console.log('✅ API Response received');
        console.log('Videos found:', data.items ? data.items.length : 0);

        if (!data.items || data.items.length === 0) {
            console.warn('⚠️ No videos found in channel');
            showNoVideos();
            return;
        }

        // Display videos
        displayVideos(data.items);
        loadingSpinner.style.display = 'none';
        console.log('✅ Videos displayed successfully');

    } catch (error) {
        console.error('❌ Error fetching videos:', error);
        showError();
    }
}

// Display videos in grid
function displayVideos(videos) {
    videosGrid.innerHTML = '';

    videos.forEach((video, index) => {
        const videoId = video.id.videoId;
        const title = video.snippet.title;
        const thumbnail = video.snippet.thumbnails.medium.url;
        const publishedAt = new Date(video.snippet.publishedAt);
        const timeAgo = getTimeAgo(publishedAt);

        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.innerHTML = `
            <div class="video-thumbnail">
                <img src="${thumbnail}" alt="${title}" loading="lazy">
                <div class="video-overlay"></div>
                <div class="play-button">
                    <svg viewBox="0 0 24 24" fill="white">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                </div>
            </div>
            <div class="video-info">
                <div class="video-title">${title}</div>
                <div class="video-meta">
                    <span class="video-date">${timeAgo}</span>
                </div>
            </div>
        `;

        videoCard.addEventListener('click', () => {
            openModal(videoId, title, video.snippet.description);
        });

        videosGrid.appendChild(videoCard);
    });

    loadingSpinner.style.display = 'none';
}

// Open video modal
function openModal(videoId, title, description) {
    console.log('🎬 Opening video:', title);
    
    videoPlayer.innerHTML = `
        <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen
            title="${title}">
        </iframe>
    `;
    modalVideoTitle.textContent = title;
    modalVideoDescription.textContent = description || 'Watch this video on our channel.';
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close video modal
function closeModal() {
    console.log('❌ Closing modal');
    videoModal.classList.remove('active');
    videoPlayer.innerHTML = '';
    document.body.style.overflow = 'auto';
}

// Show error message
function showError() {
    loadingSpinner.style.display = 'none';
    errorMessage.style.display = 'block';
    noVideosMessage.style.display = 'none';
    console.error('⚠️ Error message displayed to user');
}

// Show no videos message
function showNoVideos() {
    loadingSpinner.style.display = 'none';
    errorMessage.style.display = 'none';
    noVideosMessage.style.display = 'block';
    console.warn('⚠️ No videos message displayed');
}

// Format time ago
function getTimeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
    if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo ago`;
    return `${Math.floor(seconds / 31536000)}y ago`;
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('📄 Page loaded - Initializing YouTube integration');
    fetchYouTubeVideos();
});

// Optional: Refresh videos function
function refreshVideos() {
    console.log('🔄 Refreshing videos...');
    fetchYouTubeVideos();
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault();
        refreshVideos();
    }
});

console.log('✅ YouTube Integration Ready!');
