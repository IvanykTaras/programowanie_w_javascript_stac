const btnPrzelicz = document.querySelector('#przelicz')
const wynikiPojemnik = document.querySelector('#wyniki')

const input_fields = document.querySelector(".input_fields");
const add_button = document.querySelector("#add");
const arr_fields = [];

createElement(input_fields);
createElement(input_fields);
createElement(input_fields);

function createElement(parent){
    const div = document.createElement("div");
    const input = document.createElement("input")
    const button = document.createElement("button")
    
    
    input.type = "number";
    
    button.textContent = "-"
    button.addEventListener("click",()=>deleteElement(parent,div))
    
    div.classList.add("input_field");
    div.appendChild(button);
    div.appendChild(input);

    arr_fields.push(div)
    parent.appendChild(div);
}

function deleteElement(parent,element) {
    parent.removeChild(element);
}




btnPrzelicz.addEventListener("click",()=>MathTask());
add_button.addEventListener("click", ()=>createElement(input_fields))