document.getElementById('videoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const videoLink = document.getElementById('videoLink').value;
    const videoTitle = document.getElementById('videoTitle').value;
    
    if (videoLink && videoTitle) {
        addVideoToList(videoLink, videoTitle);
        saveVideoToLocalStorage(videoLink, videoTitle);
        document.getElementById('videoForm').reset();
    }
});

function addVideoToList(link, title) {
    const videoList = document.getElementById('videoList');
    
    const videoItem = document.createElement('div');
    videoItem.className = 'video-item';
    
    const videoTitle = document.createElement('h3');
    videoTitle.textContent = title;
    
    const videoFrame = document.createElement('iframe');
    videoFrame.src = link.replace("watch?v=", "embed/");
    videoFrame.width = "100%";
    videoFrame.height = "200";
    videoFrame.frameBorder = "0";
    videoFrame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    videoFrame.allowFullscreen = true;
    
    videoItem.appendChild(videoTitle);
    videoItem.appendChild(videoFrame);
    
    videoList.appendChild(videoItem);
}

function saveVideoToLocalStorage(link, title) {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos.push({ link, title });
    localStorage.setItem('videos', JSON.stringify(videos));
}

function loadVideosFromLocalStorage() {
    const videos = JSON.parse(localStorage.getItem('videos')) || [];
    videos.forEach(video => {
        addVideoToList(video.link, video.title);
    });
}

// পেজ লোড হলে সংরক্ষিত ভিডিওগুলি লোড করুন
document.addEventListener('DOMContentLoaded', loadVideosFromLocalStorage);



