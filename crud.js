//selectors
const todoContainer = document.querySelector(".todo-container")
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");



//event Listeners
todoButton.addEventListener("click", addtodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filtertodo);


//Functions
function addtodo(event) {
    //prevent form from submitting
    event.preventDefault()

    //create todoDiv
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create Li
    const todoLi = document.createElement('li');
    todoLi.classList.add('todo-items');
    todoDiv.appendChild(todoLi);
    todoLi.textContent = todoInput.value;

    //check button inside li 

    const checkBtn = document.createElement('button')
    checkBtn.innerHTML = '<i class="fas fa-check-double"></i>';
    checkBtn.classList.add('check-btn')
    todoDiv.appendChild(checkBtn)

    //delete Btn

    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add('delete-btn')
    todoDiv.appendChild(deleteBtn)

    //edit btn

    const editBtn = document.createElement('button')
    editBtn.innerHTML = '<i class="fas fa-pen-to-square"></i>';
    editBtn.classList.add('edit-btn');
    todoDiv.appendChild(editBtn);

    //append to list

    todoList.appendChild(todoDiv);

    // to do input value clear
    todoInput.value = '';


    const editButton = document.querySelectorAll(".edit-btn");
    editButton.forEach(elem => {
        elem.addEventListener("click", edit)
    });

}

// new function where delete and check are working

function deleteCheck(e) {
    const item = e.target
        //delete

    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        todo.remove()

        // //animation lagaya iske baaad remove jab karege jab animation poora work kar dga
        // todo.addEventListener("transitioned", function() {
        //     todo.remove();
        // });


    }

    //check btn

    if (item.classList[0] === 'check-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

    if (item.classList[0] === 'edit-btn') {
        console.log(item)
        const todo = document.createElement('input');
        todo.classList.add('newInput');
        todo.type = 'text';
        todo.placeholder = todoInput.value
    }
}

function filtertodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex';
                break;

            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;

            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
        }
    })

};

function edit(e) {
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `<input type="text" class="todoInput">
                        <i class="fa-solid fa-arrow-right fa-3x go"></i>`
    newDiv.classList.add("editDiv");
    let mainDiv = e.currentTarget.parentElement;
    mainDiv.style.display = "none";
    mainDiv.after(newDiv)

    let goBtn = document.querySelectorAll(".go");
    goBtn.forEach(elem => elem.addEventListener("click", goFn))

}

function goFn(e) {
    const mainDiv = e.currentTarget.parentElement.previousSibling;
    const mainDivContent = e.currentTarget.parentElement.previousSibling.children[0]
    console.log(mainDivContent);
    const newContent = e.currentTarget.previousSibling.previousSibling.value;
    mainDivContent.textContent = newContent;
    mainDiv.style.display = "flex";
    const newDiv = e.currentTarget.parentElement;
    newDiv.style.display = "none"

}