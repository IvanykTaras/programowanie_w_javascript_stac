const root = document.querySelector(".root");

class Note{
    
    constructor(title,body,tag,noteList){
        this.title = title;
        this.body = body;
        this.color = "#d3d3d3"
        this.pin = false;
        this.date_of_creation = new Date().toLocaleString();
        this.tag = tag;
        this.noteList = noteList;
    }

    changePin(){
        this.pin = !this.pin;
        this.noteList.render();
    }

    changeContext(cb){
        const input = prompt("Write here new content")
        if(input){
            cb(input);
        }
        this.noteList.render();
        
    }

    getHtml(){

        const note = document.createElement("div");
        note.classList.add("note");
              
            const note__header = document.createElement("header");
            note__header.classList.add("note__header");
            note__header.style.backgroundColor = this.color;
            note.appendChild(note__header)

                const note__title = document.createElement("span");
                note__title.classList.add("note__title");
                note__title.textContent = this.title
                note__title.addEventListener("click",()=>this.changeContext((input)=>{this.title = input}))
                note__header.appendChild(note__title)

                const note__color = document.createElement("input");
                note__color.classList.add("note__color");
                note__color.type = "color"
                note__color.value = this.color
                note__color.addEventListener("change", ()=>{this.color = note__color.value;noteList.render()})
                note__header.appendChild(note__color)

                const note__pin = document.createElement("button");
                note__pin.classList.add("note__pin");
                note__pin.textContent = this.pin ? "unpin" : "pin"
                note__pin.addEventListener("click", ()=>this.changePin())
                note__header.appendChild(note__pin)

                const note__delet = document.createElement("button");
                note__delet.classList.add("note__delet");
                note__delet.textContent = "delet"
                note__delet.addEventListener("click",()=>this.noteList.remove(this))
                note__header.appendChild(note__delet)

            
            const note__body = document.createElement("p");
            note__body.classList.add("note__body");
            note__body.style.backgroundColor = this.color;
            note__body.textContent = this.body
            note__body.addEventListener("click",()=>this.changeContext((input)=>{this.body = input}))
            note.appendChild(note__body)

            const note__footer = document.createElement("footer");
            note__footer.classList.add("note__footer");
            note__footer.style.backgroundColor = this.color;
            note.appendChild(note__footer)

                const note__date = document.createElement("span");
                note__date.classList.add("note__date");
                note__date.textContent = this.date_of_creation
                note__footer.appendChild(note__date)

                const note__tag = document.createElement("span");
                note__tag.classList.add("note__tag");
                note__tag.textContent = this.tag
                note__tag.addEventListener("click",()=>this.changeContext((input)=>{this.tag = input}))
                note__footer.appendChild(note__tag)

            
        

        return note;
        
    }

    getJson(){
        return {
            title: this.title,
            body: this.body,
            color: this.color,
            pin: this.pin,
            date_of_creation: this.date_of_creation,
            tag: this.tag,
        }
    }
}

class NoteList{

    listOfNotes = [];

    constructor(parent){
        this.parent = parent;
    }

    add(note){
        this.listOfNotes.push(note)
        this.render();
    }

    remove(note){
        const index = this.listOfNotes.indexOf(note);
        this.listOfNotes.splice(index,1)
        this.render();
    }

    filter(content,tag){

        
        const newListOfNote = this.listOfNotes.filter( note => content ? note.title.includes(content) || note.body.includes(content) : true).filter(note => tag ? note.tag.includes(tag) : true)
        const oldListOfNote = this.listOfNotes
        this.listOfNotes = newListOfNote;
        
        this.render()

        this.listOfNotes = oldListOfNote;
    }

    render(){
        
        while (this.parent.firstChild) {
            this.parent.removeChild(this.parent.lastChild);
        }

        this.listOfNotes.sort((a,b)=>Number(b.pin)-Number(a.pin));
        

        this.listOfNotes.forEach( note => {
            this.parent.appendChild(note.getHtml())
        })
        
        localStorage.setItem("noteList", JSON.stringify([...this.listOfNotes.map(note => note.getJson())]))
    }
}



const noteList = new NoteList(root);

window.onload = ()=>{
    const listFromStorage = JSON.parse(localStorage.getItem("noteList"));
    if(listFromStorage){
        for (let note of listFromStorage) {
            const newNote = new Note(note.title,note.body,note.tag,noteList);
            newNote.pin = note.pin;
            newNote.color = note.color;
            newNote.date_of_creation = note.date_of_creation;

            noteList.add(newNote);
            
        }
    }
}

function addNote(title,body,tag,noteList){
    const newNote = new Note(title,body,tag,noteList);
    noteList.add(newNote)
}




function createNoteByForm() {
    const title = document.querySelector("#title").value;
    const body = document.querySelector("#body").value;
    const tag = document.querySelector("#tag").value;
    if(title === "" || body === "" || tag === "" ){
        alert("pls fill all inputs")
    }else{
        addNote(title, body, tag,noteList);
        
    }
}

function search() {
    const contentSearch = document.querySelector("#contentSearch").value;
    const tagSearch = document.querySelector("#tagSearch").value;

    noteList.filter(contentSearch, tagSearch);
}


document.querySelector("#create").addEventListener("click",createNoteByForm)
document.querySelector("#search").addEventListener("click", search)

// localStorage.setItem("some",JSON.stringify([...noteList.listOfNotes.map(e=>e.getJson())]))
// console.log(JSON.parse(localStorage.getItem("some")))

// Tytuł
// Treść
// Kolor notatki
// Pin (boolean) - możliwość przypięcia na początku listy notatek
// Datę utworzenia 