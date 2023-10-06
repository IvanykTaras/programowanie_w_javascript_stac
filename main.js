//variables
const btnPrzelicz = document.querySelector('#przelicz')
const wynikiPojemnik = document.querySelector('#wyniki')
const input_fields = document.querySelector(".input_fields");
const add_button = document.querySelector("#add");
let arr_fields = [];


//functions
function createElement(parent){
    const div = document.createElement("div");
    const input = document.createElement("input")
    const button = document.createElement("button")
    
    div.classList.add("input_field");
    
    input.type = "number";
    
    button.textContent = "-"
    button.addEventListener("click",()=>deleteElement(parent,div))
    
    div.appendChild(button);
    div.appendChild(input);

    arr_fields.push(div)
    parent.appendChild(div);
}

function deleteElement(parent,element) {
    arr_fields = arr_fields.filter(e=>e!=element);
    parent.removeChild(element);
}

function MathTask(numbers) {
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    const sum = numbers.reduce((i,e)=>i+e,0);
    const avg = sum/numbers.length;

    return {
        min: min,
        max: max,
        sum: sum,
        avg: avg
    }
}

function getNumbersArr(arr_fields){
    return arr_fields.map(e=>+e.lastChild.value);
}

function count(){
    const result = MathTask(getNumbersArr(arr_fields));
    console.log(123);
    wynikiPojemnik.innerHTML = `
        min: ${result.min}; <br>
        max: ${result.max}; <br>
        sum: ${result.sum}; <br>
        avg: ${result.avg}; <br>
    `;
}


//create 3 input fields
createElement(input_fields);
createElement(input_fields);
createElement(input_fields);


//add event listener 
btnPrzelicz.addEventListener("click",()=>count());
arr_fields.forEach(e=>e.lastChild.addEventListener('keydown',count));
add_button.addEventListener("click", ()=>createElement(input_fields));