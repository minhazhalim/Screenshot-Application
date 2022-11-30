const sourcePreview = document.querySelector('.source-preview');
const sourceButton = document.querySelector('#source-button');
const closeButton = sourcePreview.querySelector('#close-button');
const captureScreen = async () => {
     try {
          const stream = await navigator.mediaDevices.getDisplayMedia({preferCurrentTab: true});
          const video = document.createElement('video');
          video.addEventListener('loadedmetadata',() => {
               const canvas = document.createElement('canvas');
               const zim = canvas.getContext('2d');
               canvas.width = video.videoWidth;
               canvas.height = video.videoHeight;
               video.play();
               zim.drawImage(video,0,0,canvas.width,canvas.height);
               stream.getVideoTracks()[0].stop();
               sourcePreview.querySelector('img').src = canvas.toDataURL();
               sourcePreview.classList.add('show');
          });
          video.srcObject = stream;
     }catch(error){
          alert('Failed to Capture Screenshot!!');
     }
};
closeButton.addEventListener('click',() => sourcePreview.classList.toggle('show'));
sourceButton.addEventListener('click',captureScreen);