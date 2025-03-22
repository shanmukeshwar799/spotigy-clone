let songIndex=1;
let AudioElement = new Audio('./songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "alan walker faded", filepath:"./songs/1.mp3", coverpath:"./covers/1.jpg"},
    {songName: "shape of you", filepath:"./songs/2.mp3", coverpath:"./covers/2.jpg"},
    {songName: "ramaya-ramaya", filepath:"./songs/3.mp3", coverpath:"./covers/3.jpg"},
    {songName: "hero-hero", filepath:"./songs/4.mp3", coverpath:"./covers/4.jpg"},
    {songName: "ram-ram", filepath:"./songs/5.mp3", coverpath:"./covers/5.jpg"},
    {songName: "villan-villan", filepath:"./songs/6.mp3", coverpath:"./covers/6.jpg"},
    {songName: "super-super", filepath:"./songs/7.mp3", coverpath:"./covers/7.jpg"},
    {songName: "may-maya", filepath:"./songs/8.mp3", coverpath:"./covers/8.jpg"},
    {songName: "ramaya-ramaya", filepath:"./songs/9.mp3", coverpath:"./covers/9.jpg"},
]
//
songItems.forEach((element,i)=> {
    element.getElementsByTagName("img")[0].src = songs[i].coverpath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

//handle paly function
masterPlay.addEventListener('click',()=>{
    if(AudioElement.paused || AudioElement.currentTime<=0){
        AudioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
 }
 else{
     AudioElement.pause();
     masterPlay.classList.remove('fa-pause');
     masterPlay.classList.add('fa-play');
 }
})
//listen to event
AudioElement.addEventListener('timeupdate',()=> {
    console.log('timeupdate');
    //update seekbar
    progress = parseInt((AudioElement.currentTime/AudioElement.duration)*100);
    myProgressBar.value = progress;
}
)
myProgressBar.addEventListener('change',()=>{
    AudioElement.currentTime = myProgressBar.value * AudioElement.duration/100;
}
)

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });

}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
       makeAllPlays();
       songIndex = parseInt(e.target.id);
       e.target.classList.remove('fa-play');
       e.target.classList.add('fa-pause');
       AudioElement.src = `./songs/${songIndex}.mp3`;
       AudioElement.currentTime = 0;
       AudioElement.play();
       masterPlay.classList.remove('fa-play'); // Sync masterPlay button
       masterPlay.classList.add('fa-pause');
    });
});

// Ensure masterPlay updates when AudioElement ends
AudioElement.addEventListener('ended', () => {
    masterPlay.classList.remove('fa-pause');
    masterPlay.classList.add('fa-play');
});

// Next and Previous functionality
document.getElementById('next').addEventListener('click',() => {
    if(songIndex>=9){
        songIndex=1;
    }
    else{
        songIndex+=1;
    }
    AudioElement.src = `./songs/${songIndex}.mp3`;
       AudioElement.currentTime = 0;
       AudioElement.play();
       masterPlay.classList.remove('fa-play'); // Sync masterPlay button
       masterPlay.classList.add('fa-pause');
})
document.getElementById('previous').addEventListener('click',() => {
    if(songIndex<=1){
        songIndex=9;
    }
    else{
        songIndex-=1;
    }
    AudioElement.src = `./songs/${songIndex}.mp3`;
       AudioElement.currentTime = 0;
       AudioElement.play();
       masterPlay.classList.remove('fa-play'); // Sync masterPlay button
       masterPlay.classList.add('fa-pause');
})