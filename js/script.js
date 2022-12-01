const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const editForm = document.querySelector("#edit-form")
const editInput = document.querySelector("#edit-input")
const cancelBtn = document.querySelector("#cancel-btn")
const btnAdd = document.querySelector("#btn-add")
const firstStep = document.querySelector("#first-step")
const secondStep = document.querySelector("#second-step")
let oldInputValue

const saveTodo = (titleTodo, done = 0, save = 1) => {

    const todoDiv = document.createElement("div")
    todoDiv.classList.add("todo")

    const todoTitle = document.createElement("h3")
    todoTitle.innerText = titleTodo
    todoDiv.appendChild(todoTitle)

    const todoFinishBtn = document.createElement("button")
    todoFinishBtn.classList.add("finish-todo")
    todoFinishBtn.classList.add("btns-todo")
    todoFinishBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    todoDiv.appendChild(todoFinishBtn)

    const todoEditBtn = document.createElement("button")
    todoEditBtn.classList.add("edit-todo")
    todoEditBtn.classList.add("btns-todo")
    todoEditBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    todoDiv.appendChild(todoEditBtn)

    const todoRemoveBtn = document.createElement("button")
    todoRemoveBtn.classList.add("remove-todo")
    todoRemoveBtn.classList.add("btns-todo")
    todoRemoveBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
    todoDiv.appendChild(todoRemoveBtn)

    todoList.appendChild(todoDiv)

    todoInput.value = ""
    todoInput.focus()

    if (save) {
        saveTodoLocalStorage({ titleTodo, done: 0 });
    }

    if (done) {
        todoDiv.classList.add("done")
    }
}

const changeForms = () => {
    todoForm.classList.toggle("hide")
    editForm.classList.toggle("hide")
    todoList.classList.toggle("hide")
}

const updateTodo = (titleSelected) => {

    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let titleTodo = todo.querySelector("h3")

        if(titleTodo.innerText === oldInputValue) {
            titleTodo.innerText = titleSelected
        }

        updateTodoLocalStorage(oldInputValue, titleSelected)
    })
}

btnAdd.addEventListener("submit", (e) => {
    e.preventDefault()

   firstStep.classList.toggle("hide")
   secondStep.classList.toggle("hide")
})


todoForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const titleTodo = todoInput.value

   if(titleTodo){
      saveTodo(titleTodo)
   }
})

document.addEventListener("click", (e) => {
    const targetElement = e.target
    const parentElement = targetElement.closest("div")
    let titleSelected

    if(parentElement && parentElement.querySelector("h3")){
        titleSelected = parentElement.querySelector("h3").innerText
    }

    if(targetElement.classList.contains("finish-todo")){
        parentElement.classList.toggle("done")

        updateTodoStatusLocalStorage(titleSelected)
    }

    if(targetElement.classList.contains("remove-todo")){
        parentElement.remove()

        removeTodoLocalStorage(titleSelected)
    }

    if(targetElement.classList.contains("edit-todo")){
        editInput.value = titleSelected
        oldInputValue = titleSelected

        changeForms()
    }
})

cancelBtn.addEventListener("click", (e) => {
    e.preventDefault()

    changeForms()
})

editForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const titleSelected = editInput.value

    if(titleSelected){
        updateTodo(titleSelected)
    }
    
    changeForms()
})



//localStorage


const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || []

    return todos
}

const loadTodos = () => {
    const todos = getTodosLocalStorage()

    todos.forEach((todo) => {
        saveTodo(todo.titleTodo, todo.done, 0)
    })

    if(todos.length > 0){
        firstStep.classList.toggle("hide")
        secondStep.classList.toggle("hide")
    }

}

const saveTodoLocalStorage = (todo) => {

    const todos = getTodosLocalStorage()

    todos.push(todo)

    localStorage.setItem("todos", JSON.stringify(todos))
}

const removeTodoLocalStorage = (titleSelected) => {
    const todos = getTodosLocalStorage()

    const removedTodo = todos.filter((todo) => todo.titleTodo != titleSelected )

    localStorage.setItem("todos", JSON.stringify(removedTodo))
}

const updateTodoStatusLocalStorage = (titleSelected) => {
    const todos = getTodosLocalStorage()

    todos.map((todo) => 
        todo.titleTodo === titleSelected ? todo.done = !todo.done : null
    )

    localStorage.setItem("todos", JSON.stringify(todos))
}

const updateTodoLocalStorage = (oldInputValue, newTitle) => {
    const todos = getTodosLocalStorage()

    todos.map((todo) => 
        todo.titleTodo === oldInputValue ? todo.titleTodo = newTitle : null
    )

    localStorage.setItem("todos", JSON.stringify(todos))
}

loadTodos()

