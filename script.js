console.log("Let's play some music");

document.getElementById("home").onclick=function(){
    window.location.href="https://github.com/Permanshu"
};

//Initializing variables
let songIndex = 0;
gif.style.opacity = 0;
mastersongname.style.opacity = 0;

let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'))

let songs = [
    {
        SongName: "Saveyourself",
        filePath: "song/1.mp3",
        coverPath: "cover/1.jpg"
    },

    {
        SongName: "Move Your Body",
        filePath: "song/2.mp3",
        coverPath: "cover/2.jpg"
    },

    {
        SongName: "My Darkest Days - Perfect",
        filePath: "song/3.mp3",
        coverPath: "cover/3.jpg"
    },

    {
        SongName: "Still Worth Fighting For",
        filePath: "song/4.mp3",
        coverPath: "cover/4.jpg"
    },

    {
        SongName: "Every lie",
        filePath: "song/5.mp3",
        coverPath: "cover/5.jpg"
    }
]
let audioElement = new Audio(songs[0].filePath);

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].SongName;
    // Assign ID to each song play button
    element.getElementsByClassName('songitemplay')[0].id = i;
});




const audio = document.getElementById("myAudio");

function showDuration() {


    audio.addEventListener('loadedmetadata', () => {
        let duration = audio.duration;
        let mins = Math.floor(duration / 60);
        let secs = Math.floor(duration % 60);
        console.log("Duration:", mins + "minutes", secs + "Seconds");
    });

}




//play/pause click
masterPlay.addEventListener('click', () => {

    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
        mastersongname.style.opacity = 1;

        makeAllPlays();
        // Highlight the currently playing song button
        document.getElementById(songIndex).classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause');


    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
     
         

        makeAllPlays();
        // document.getElementById(songIndex).classList.remove('fa-circle-pause');
        // document.getElementById(songIndex).classList.add('fa-circle-play')


    }

});

//audioElement.play();

//Listen to events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');

    //update seekbar

    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    // console.log(progress);
    myprogressbar.value = progress;

    //progressbar gradient style
    myprogressbar.style.background = `linear-gradient(to right,rgb(180 174 167) 0%, rgb(180 174 167) ${progress}%, white ${progress}%, white 20%)`;


})

myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = myprogressbar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {

    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
         
    })
}



// Individual song play handler
Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clickedIndex = parseInt(e.currentTarget.id);

        if (songIndex === clickedIndex && !audioElement.paused) {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');

            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            gif.style.opacity = 0;

        }
        else {
            makeAllPlays();

            songIndex = clickedIndex;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = songs[songIndex].filePath;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
            //display song name
            mastersongname.innerText = songs[songIndex].SongName;
            

        }

    })
})

document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 4) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    //display song name
    mastersongname.innerText = songs[songIndex].SongName;

    makeAllPlays();
    // Highlight the currently playing song button
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
    gif.style.opacity = 1;

})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    //display song name
    mastersongname.innerText = songs[songIndex].SongName;

    makeAllPlays();
    // Highlight the currently playing song button
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
    gif.style.opacity = 1;

})

//change icon when music ends
audioElement.addEventListener('ended', () => {

    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
    document.getElementById(songIndex).classList.remove('fa-circle-pause');
    document.getElementById(songIndex).classList.add('fa-circle-play');
    gif.style.opacity = 0;
});

//Spacebar to play/pause
document.addEventListener('keydown', function (event) {
    if (event.key === " " || event.key === "Space") {
        event.preventDefault();
        masterPlay.click();
    }
})

