const slider = document.querySelector(".slider");
const slider_track = document.querySelector(".slider__track");

let count  = 0;

slider.addEventListener('mousedown',(e)=>{
    if(e.button == 0) {
        count -= 300;
        slider_track.style.transform = `translateX(${count}px)`
    }
    else if(e.button == 1){
        count += 300;
        slider_track.style.transform = `translateX(${count}px)`
    }
})