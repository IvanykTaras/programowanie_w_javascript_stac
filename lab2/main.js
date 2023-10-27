const sliderHtmlElement = document.querySelector(".slider");
const slider_track = document.querySelector(".slider__track");
const slider_items = document.querySelectorAll(".slider__item");
const slider_right_button = document.querySelector(".right_swipe");
const slider_left_button = document.querySelector(".left_swipe");
const dotsContainer = document.querySelector('.slider__dots');


class Slider{
    trackPosion = 0;
    translate = 0;
    dotsArr = [];
    
    constructor(sliderWidth,numberOfSlides,sliderTrack,dotsContainer){
        this.sliderWidth = sliderWidth;
        this.numberOfSlides = numberOfSlides;
        this.sliderTrack = sliderTrack;
        this.dotsContainer = dotsContainer;

        this.generateDots();
        this.makeDotActive(0);
    }
    
    rightSwipe(){
        this.trackPosion = this.trackPosion + 1 > this.numberOfSlides - 1 ? 0 : this.trackPosion + 1;
        this.translate = this.sliderWidth * this.trackPosion;
        this.sliderTrack.style.transform = `translateX(${-this.translate}px)`      

        this.makeDotActive(this.trackPosion);
    }   

    leftSwipe(){
        this.trackPosion = this.trackPosion - 1 < 0 ? this.numberOfSlides - 1 : this.trackPosion - 1;
        this.translate = this.sliderWidth * this.trackPosion;
        this.sliderTrack.style.transform = `translateX(${-this.translate}px)`

        this.makeDotActive(this.trackPosion);
    }

    goToImage(index){
        this.trackPosion = index;
        this.translate = this.sliderWidth * this.trackPosion;
        this.sliderTrack.style.transform = `translateX(${-this.translate}px)`;

        this.makeDotActive(this.trackPosion);
    }

    generateDots(){
        for (let index = 0; index < this.numberOfSlides; index++) {
            const span = document.createElement('span');
            span.addEventListener('click',()=>this.goToImage(index));
            this.dotsContainer.appendChild(span);
            this.dotsArr.push(span);
        }
    }

    makeDotActive(index){
        this.dotsArr.forEach( (e,i) => {
            if(i==index){
                e.classList.add("active");
            }else{
                e.classList.remove("active");
            }
        })
    }
}


const slider = new Slider(
    sliderHtmlElement.clientWidth,
    slider_items.length,
    slider_track,
    dotsContainer
);



slider_left_button.addEventListener('click',()=>slider.leftSwipe());
slider_right_button.addEventListener('click',()=>slider.rightSwipe());