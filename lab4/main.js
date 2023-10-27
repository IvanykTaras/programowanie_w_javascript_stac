class Sound{
    constructor(sound){
        this.sound = document.querySelector(sound);
    }

    play(){
        this.sound.currentTime = 0;
        this.sound.play();
    }
}

class Channel{
    //list of sounds
    listSounds = [];

    //add sound
    add(sound){
        if(sound instanceof Sound){
            this.listSounds.push(sound);
        }
        else{
            //throw error if sound is other object than instance of class Sound
            throw new Error("try to add not instance of class Sound");
        }
    }

    play(){
        for (let index = 0; index < 6000; index+=1000) {
            setTimeout( ()=> this.listSounds[1].play(), index)
            
        }
    }
}


const firstChanel = new Channel();
firstChanel.add(new Sound("#clap"));
firstChanel.add(new Sound("#hihat"));
firstChanel.add(new Sound("#clap"));
firstChanel.add(new Sound("#hihat"));
firstChanel.add(new Sound("#clap"));
firstChanel.add(new Sound("#hihat"));




// document.addEventListener('keypress', onKeyPress)

const KeyToSound = {
    'a': new Sound("#clap"),
    's': new Sound("#hihat")
}

function onKeyPress(event) {
    const sound = KeyToSound[event.key]
    sound.play();
}

let time = 0;
function startCountSeconds() {
    time = Date.now()
    console.log("press");
}

function endCountSeconds() {
    console.log("up");
    console.log(Date.now() - time, Date.now(), time);
    time = 0;
}

document.addEventListener("keydown", startCountSeconds)
document.addEventListener("keyup", endCountSeconds)
