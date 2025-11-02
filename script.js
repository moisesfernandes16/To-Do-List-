let editingIndex = null
let editingValue = ''
const localStoragekey = 'to-do-list-ma'
const input = document.getElementById('inputNewTask')

function validadeIfExistNewTask() {
    let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
    let inputValue = document.getElementById('inputNewTask').value
    let input = document.getElementById('inputNewTask')
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newTask() {
    let input = document.getElementById("inputNewTask")
    input.style.border = ''

    // validação
    if (!input.value) {
        input.style.border = '1px solid red'
        alert("Digite o que você quer adicionar na sua lista")
    }
    else if (validadeIfExistNewTask()) {
        alert("ja existe uma Task com essa descrição")
    }
    else {
        // increment to localStorage
        let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStoragekey, JSON.stringify(values))
        showValues()
    }
    input.value = ''
}
function showValues() {
    let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i].name}<button id="btnOk" onclick='removeItem(${i})'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
</svg></button> <button id="btnEdit" onclick='editValues(${i})'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
</svg></button>
</li>`
    }
}

function editValues(index) {
    let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
    let inputEl = document.getElementById('inputNewTask')

    if (editingIndex !== null) {
        values.splice(editingIndex, 0, { name: editingValue })
    }
    editingIndex = index
    editingValue = values[index].name

    inputEl.value = editingValue
    inputEl.focus()

    values.splice(index, 1)
    localStorage.setItem(localStoragekey, JSON.stringify(values))
    showValues()
}
function removeItem(index) {
    let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
    values.splice(index, 1)
    localStorage.setItem(localStoragekey, JSON.stringify(values))
    showValues()
}
input.addEventListener('keydown', function (event) {

    if (event.key === 'Enter') {
        event.preventDefault()
        newTask()
    }
})



showValues()                    