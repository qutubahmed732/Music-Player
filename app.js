console.log('Welcome to spotify');


let songIndex = 0;
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSong = document.getElementById('masterSong');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songName = document.querySelectorAll('.songName');



let songs = [{
    songName: 'Beleiver',
    filePath: 'songs/Imagine Dragons - Believer (Lyrics)',
    cover: 'covers/beleiver.jfif'
},
{
    songName: 'atif',
    filePath: 'songs/Woh Lamhe Woh Baatein (Lyrics Video) Atif Aslam _ Emraan Hashmi _ Zeher (2005) _ WorldFamousLyrics',
    cover: 'covers/atif aslam.jfif'
},
{
    songName: 'Coolie',
    filePath: 'songs/Coolio - Gangstas Paradise',
    cover: 'covers/gangster paradise.jfif'
},
{
    songName: 'abida',
    filePath: 'songs/mai hoo mashhoor',
    cover: 'covers/abida.jfif'
},
{
    songName: 'kalesh',
    filePath: 'songs/teri dewaani',
    cover: 'covers/teridewaani.jfif'
}];

songName.forEach((element, i) => {
    element.textContent = songs[i].songName;
});


songItems.forEach((element, i) => {
    element.querySelectorAll('img')[0].src = songs[i].cover;
})

let audio = new Audio()
masterPlay.addEventListener('click', () => {
    if (audio.paused || audio.currentTime <= 0) {
        audio.play()
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause')
        gif.style.opacity = '1'
    } else {
        audio.pause()
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play')
        gif.style.opacity = '0'

    }
})

audio.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    progress = parseInt((audio.currentTime / audio.duration) * 100);
    console.log(progress);
    myProgressBar.value = progress
})

myProgressBar.addEventListener('change', () => {
    audio.currentTime = myProgressBar.value * audio.duration / 100;
})

const makeAllPLays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause')
        element.classList.add('fa-play');

    })
}



Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPLays();
        console.log(e.target);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        songIndex = parseInt(e.target.id);
        audio.currentTime = 0;
        audio.src = `songs/${songIndex}.mp4`;
        audio.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause')
        masterSong.innerHTML = songs[songIndex-1].songName

    })
})


document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 4) {
        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audio.src = `songs/${songIndex}.mp4`;
    audio.currentTime = 0
    audio.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause')
    masterSong.innerHTML = songs[songIndex].songName
})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audio.src = `songs/${songIndex}.mp4`;
    audio.currentTime = 0
    audio.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause')
    masterSong.innerHTML = songs[songIndex].songName
})
