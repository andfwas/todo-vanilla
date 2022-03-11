const todoform = document.getElementById('todoform')
const todoinput = document.getElementById('todoinput')
const todos = document.getElementById('todos')
const delAllTodos = document.getElementById('deletealltodos')
delAllTodos.style.display = 'none'

const strikeThrough = 'line-through'
const cantDeleteOne = 'You cannot delete an unfinished Todo.'
const cantDeleteAll = 'You have unfinished work! You must complete all Todos in order to complete this action.'
const deleteWarn = 'This will remove all of your todos. Are you sure you want to continue?'

todoform.addEventListener('submit', (e) => {
    e.preventDefault()
    addTodo()
})

todoinput.addEventListener('keyup', (e) => {
    if (e.code == 'Enter') {
        addTodo()
    }
})

delAllTodos.addEventListener('click', (e) => {
    let allDone = true
    if (todos.innerHTML != '') {
        Array.from(todos.children).forEach(todo => {
            if (todo.lastChild.style.textDecoration != strikeThrough) {
                allDone = false
            }
        })
        if (!allDone) {
            alert(cantDeleteAll)
        } else if (confirm(deleteWarn)) {
            todos.innerHTML = ''
            delAllTodos.style.display = 'none'
        }
    }
})

function addTodo() {
    let isEmpty = todoinput.value.trim() === ""
    if (!isEmpty) {
        let todoContainer = document.createElement('div');
        todoContainer.className = 'todorow'
    
        let todo = document.createElement('li')
        todo.innerHTML = todoinput.value
        todo.addEventListener('click', (e) => {
            todo.style.textDecoration = e.target.style.textDecoration == strikeThrough ? 'none' : strikeThrough
        })
    
        let remove = document.createElement('button')
        remove.className = 'remove'
        remove.innerHTML = 'X'
        remove.addEventListener('click', (e) => {
            let strike = e.path[1].lastChild.style.textDecoration
            if (strike == strikeThrough) {
                todos.removeChild(e.path[1])
            } else {
                alert(cantDeleteOne)
            }
            if (Array.from(todos.children).length < 2) {
                delAllTodos.style.display = 'none';  
            }
        })
    
        todoContainer.appendChild(remove)
        todoContainer.appendChild(todo)
        todos.appendChild(todoContainer)
        
        delAllTodos.style.display = todos.children.length > 1 ? 'inline' : 'none'
    } 
    todoinput.value = ''
}