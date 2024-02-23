
const audios = {
    boom: document.getElementById("boom"),
    clap: document.getElementById("clap"),
    hihat: document.getElementById("hihat"),
    kick: document.getElementById("kick"),
    openhat: document.getElementById("openhat"),
    ride: document.getElementById("ride"),
    snare: document.getElementById("snare"),
    tink: document.getElementById("tink"),
    tom: document.getElementById("tom")
}

const keys = {
    q: audios.boom,
    w: audios.clap,
    e: audios.hihat,
    a: audios.kick,
    s: audios.openhat,
    d: audios.ride,
    z: audios.snare,
    x: audios.tink,
    c: audios.tom  
}

class Sound{
    constructor(sound,time){
        this.sound = sound;
        this.time = time;
    }

    asyncPlay() {
        this.sound.currentTime = 0;
        this.sound.play();
        return new Promise((res)=>setTimeout(()=>res(true), this.time))    
    }

    pause(){
        this.sound.pause();
        this.sound.currentTime = 0;
    }
}

class Chanel{
    arr = [];

    add(sound){
        this.arr.push(sound);
    }

    async play(){
        for (let index = 0; index < this.arr.length; index++) {
            await this.arr[index].asyncPlay();
            this.arr[index].pause();
        }
    }
}

const chanels = [
    new Chanel(),
    new Chanel(),
    new Chanel(),
    new Chanel()
]

let currentChanel = 0;
let recording = false;

let timeKeyPress = null;

document.addEventListener("keydown",function (e) {
    if(timeKeyPress === null){
        timeKeyPress = performance.now();

        for(let key in keys){
            if(key === e.key){
                keys[e.key].play()
            }
        }
    }

    
})

document.addEventListener("keyup",function (e) {
    if(typeof timeKeyPress === "number"){
        const timeLaps = performance.now() - timeKeyPress;
        
        for(let key in keys){
            if(key === e.key){
                keys[e.key].currentTime = 0;
                keys[e.key].pause()

                const sound = new Sound( keys[e.key] ,timeLaps);
                if(recording) chanels[currentChanel].add(sound)
            }
        }

        
        timeKeyPress = null;   
        
    }
})


const recordButton = document.getElementById("record");
const playButton = document.getElementById("play");
const playAllButton = document.getElementById("playAll");

recordButton.addEventListener("click",record);
playButton.addEventListener("click",playChanel);
playAllButton.addEventListener("click",playAll);

document.getElementsByClassName("chanels")[0].addEventListener("click",()=>{
        currentChanel = [...document.getElementsByName("x")].findIndex(e=>e.checked)
    })

function record() {
    recording = !recording;
    if(recording){
        alert("Start Recording");
    }else{
        alert("Stop recording")
    }
}

function playChanel() {
    if(recording) alert("Stop recording");
    recording = false;
    chanels[currentChanel].play()
}

function playAll() {
    if(recording) alert("Stop recording");
    recording = false;
    chanels.forEach( chanel => chanel.play())
}


