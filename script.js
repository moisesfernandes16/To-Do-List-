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
    for (let i = 0; i < values.length; i++)
         {
        list.innerHTML += `<li>"${values[i].name}"<button id="btnOk" onclick='removeItem()'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
</svg></button>
</li>`
    }
}
function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index, 1)
    localStorage.setItem(localStoragekey, JSON.stringify(values))
    showValues()
}
input.addEventListener('keydown', function(event) {
   
    if (event.key === 'Enter') {
        event.preventDefault() 
        newTask() 
    }
})
showValues()
