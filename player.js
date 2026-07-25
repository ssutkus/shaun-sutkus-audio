const tracks=window.SHAUN_MEDIA.videos;
const audioCredits=window.SHAUN_MEDIA.audio;
let audioCurrent=Math.floor(Math.random()*audioCredits.length);
let bandcampSrc="";
let videoMuted=false;
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
  if(audio){
    player?.pauseVideo();
    restoreBandcamp();
  }else{
    stopBandcamp();
  }
  audioPanel.hidden=!audio;
  videoPanel.hidden=audio;
  showAudio.setAttribute("aria-pressed",String(audio));
  showVideo.setAttribute("aria-pressed",String(!audio));
  screenMode.textContent=audio?"Audio":"Video";
  document.querySelector("#bandcamp-player").hidden=!audio;
}
showAudio.addEventListener("click",()=>showMedia("audio"));
showVideo.addEventListener("click",()=>showMedia("video"));
document.querySelector("#media-prev").addEventListener("click",()=>audioPanel.hidden?player?.previousVideo():displayAudio(audioCurrent-1));
document.querySelector("#media-next").addEventListener("click",()=>audioPanel.hidden?player?.nextVideo():displayAudio(audioCurrent+1));
let player,current=0,playing=false;
function display(index){
  current=index<0?0:index;
  const track=tracks[current];
  document.querySelector("#video-title").textContent=`${track[1]} — ${track[2]}`;
  document.querySelector("#video-credit").textContent=`${track[3]} · ${current+1} / ${tracks.length}`;
}
window.onYouTubeIframeAPIReady=()=>{
  const playerVars={playlist:tracks.map(t=>t[0]).join(","),loop:1,playsinline:1,rel:0,modestbranding:1,controls:1};
  if(location.protocol!=="file:")playerVars.origin=location.origin;
  player=new YT.Player("youtube-player",{height:"180",width:"320",videoId:tracks[0][0],playerVars,events:{onReady:event=>{if(videoMuted)event.target.mute()},onStateChange:event=>{playing=event.data===YT.PlayerState.PLAYING;display(event.target.getPlaylistIndex())}}})
  const frame=document.querySelector(".audio-source iframe");
  if(frame&&frame.referrerPolicy!=="strict-origin-when-cross-origin"){frame.referrerPolicy="strict-origin-when-cross-origin";frame.src=frame.src}
};
display(0);
const api=document.createElement("script");api.src="https://www.youtube.com/iframe_api";api.onerror=()=>{document.querySelector("#video-credit").textContent="Player unavailable — check connection"};document.head.append(api);
