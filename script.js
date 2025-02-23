let videos = JSON.parse(localStorage.getItem('videos')) || [];

document.getElementById('videoForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const videoLink = document.getElementById('videoLink').value;
    const videoTitle = document.getElementById('videoTitle').value;
    
    if (videoLink && videoTitle) {
        const video = { link: videoLink, title: videoTitle };
        videos.push(video);
        saveVideos();
        addVideoToList(video);
        document.getElementById('videoForm').reset();
    }
});

function addVideoToList(video) {
    const videoList = document.getElementById('videoList');
    
    const videoItem = document.createElement('div');
    videoItem.className = 'video-item';
    
    const videoTitle = document.createElement('h3');
    videoTitle.textContent = video.title;
    
    const videoFrame = document.createElement('iframe');
    videoFrame.src = video.link.replace("watch?v=", "embed/");
    videoFrame.width = "100%";
    videoFrame.height = "200";
    videoFrame.frameBorder = "0";
    videoFrame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    videoFrame.allowFullscreen = true;
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'ডিলিট করুন';
    deleteButton.addEventListener('click', function() {
        videos = videos.filter(v => v.link !== video.link);
        saveVideos();
        videoItem.remove();
    });
    
    videoItem.appendChild(videoTitle);
    videoItem.appendChild(videoFrame);
    videoItem.appendChild(deleteButton);
    
    videoList.appendChild(videoItem);
}

function saveVideos() {
    localStorage.setItem('videos', JSON.stringify(videos));
}

function loadVideos() {
    videos.forEach(video => {
        addVideoToList(video);
    });
}

// পেজ লোড হলে সংরক্ষিত ভিডিওগুলি লোড করুন
document.addEventListener('DOMContentLoaded', loadVideos);
