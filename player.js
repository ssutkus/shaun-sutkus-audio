const tracks=window.SHAUN_MEDIA.videos;
const audioCredits=window.SHAUN_MEDIA.audio;
let audioCurrent=Math.floor(Math.random()*audioCredits.length);
let bandcampSrc="";
let current=0;
let videoLoaded=false;
function displayAudio(index){
  audioCurrent=(index+audioCredits.length)%audioCredits.length;
  const credit=audioCredits[audioCurrent];
  document.querySelector("#audio-title").textContent=`${credit[1]} — ${credit[2]}`;
  document.querySelector("#audio-credit").textContent=`${credit[3]} by Shaun Sutkus · ${audioCurrent+1} / ${audioCredits.length}`;
  const frame=document.querySelector("#bandcamp-player");
  const art=document.querySelector("#audio-art");
  art.src=credit[4];
  art.alt=`${credit[2]} cover`;
  frame.title=`${credit[1]} — ${credit[2]}`;
  const bandcampItem=credit[5]?`track=${credit[5]}`:`album=${credit[0]}`;
  bandcampSrc=`https://bandcamp.com/EmbeddedPlayer/${bandcampItem}/size=small/bgcol=ffffff/linkcol=000080/tracklist=false/transparent=true/`;
  frame.src=bandcampSrc;
}
displayAudio(audioCurrent);
const audioPanel=document.querySelector("#audio-panel");
const videoPanel=document.querySelector("#video-panel");
const showAudio=document.querySelector("#show-audio");
const showVideo=document.querySelector("#show-video");
const screenMode=document.querySelector("#screen-mode");
const videoFrame=document.querySelector("#youtube-player");
function displayVideo(index){
  current=(index+tracks.length)%tracks.length;
  const track=tracks[current];
  document.querySelector("#video-title").textContent=`${track[1]} — ${track[2]}`;
  document.querySelector("#video-credit").textContent=`${track[3]} · ${current+1} / ${tracks.length}`;
  videoFrame.title=`${track[1]} — ${track[2]}`;
}
function loadVideo(index,autoplay=false){
  displayVideo(index);
  const track=tracks[current];
  const auto=autoplay?"&autoplay=1":"";
  videoFrame.src=`https://www.youtube-nocookie.com/embed/${track[0]}?playsinline=1&rel=0&modestbranding=1${auto}`;
  videoLoaded=true;
}
function stopVideo(){
  if(videoFrame.src!=="about:blank")videoFrame.src="about:blank";
  videoLoaded=false;
}
function stopBandcamp(){
  const frame=document.querySelector("#bandcamp-player");
  if(frame.src!=="about:blank")frame.src="about:blank";
}
function restoreBandcamp(){
  const frame=document.querySelector("#bandcamp-player");
  if(frame.src!==bandcampSrc)frame.src=bandcampSrc;
}
function showMedia(mode){
  const audio=mode==="audio";
  audioPanel.hidden=!audio;
  videoPanel.hidden=audio;
  if(audio){
    stopVideo();
    restoreBandcamp();
  }else{
    stopBandcamp();
    if(!videoLoaded)loadVideo(current);
  }
  showAudio.setAttribute("aria-pressed",String(audio));
  showVideo.setAttribute("aria-pressed",String(!audio));
  screenMode.textContent=audio?"Audio":"Video";
  document.querySelector("#bandcamp-player").hidden=!audio;
}
showAudio.addEventListener("click",()=>showMedia("audio"));
showVideo.addEventListener("click",()=>showMedia("video"));
document.querySelector("#media-prev").addEventListener("click",()=>audioPanel.hidden?loadVideo(current-1,true):displayAudio(audioCurrent-1));
document.querySelector("#media-next").addEventListener("click",()=>audioPanel.hidden?loadVideo(current+1,true):displayAudio(audioCurrent+1));
displayVideo(0);
