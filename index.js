let MY_NOTE='_my_note';
let eng_month = ['Jan','Feb','Mar','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
let my_notes= localStorage.getItem(MY_NOTE)?JSON.parse(localStorage.getItem(MY_NOTE)):[];
 
window.onload = function(){
    onGetSavedNotes();
};
function onAddNote(){
    let myNote= document.getElementById('note').value;
    let note={};
    note.value=myNote;
    note.date=new Date();
    note.id= new Date().getTime();
    my_notes.push(note);
    localStorage.setItem(MY_NOTE,JSON.stringify(my_notes));
    document.getElementById('note').value=''
    onGetSavedNotes();
}

function onGetSavedNotes() {
    let notes = my_notes;
    let my_notes_html = '';
    my_notes_html = my_notes_html +`<table>
    <tr>
    <th> Date </th>
    <th> Time </th>
    <th> Note </th>
    <th> Action </th>
    </tr>`
    notes.forEach(function (val,index) {
        if (val){
            my_notes_html=my_notes_html+
                `<tr>
                <td>${getUserReadableDate(val.date)}</td>
                <td>${getUserReadableTime(val.date)}</td>
                <td>${val.value}</td>
        <td><button class= "Delete" onclick = "deleteNote(${index})">Delete</button></td>
    </tr>`
    }});
    my_notes_html=my_notes_html+`</table>`
    document.getElementById('myNotes').innerHTML = my_notes_html;
        
}

function getUserReadableDate(date){
    let readableDate = new Date(date);
    return readableDate.getDate()+' '+ eng_month[readableDate.getMonth()] +' '+readableDate.getFullYear();
}

function getUserReadableTime(date){
    let readableTime = new Date(date);
    return  readableTime.getHours()+' '+readableTime.getMinutes();
}

function deleteNote(index){
    delete my_notes[index];
    localStorage.setItem(MY_NOTE,JSON.stringify(my_notes));
    onGetSavedNotes();
}