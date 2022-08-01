const submit_btn = document.querySelector('#submit');
const todos_div = document.querySelector('.todos');

function outputToDos(data) {
    todos_div.innerHTML = '';

    if (!data.length) {
        todos_div.innerHTML = '<p>No To Dos Added Yet.</p>';
    }
    
    data.forEach((obj) => {
        const html = `
            <div class='todo' >
                <h3>${obj.text}</h3>
                <button data-id="${obj.id}">Delete</button>
            </div>
        `;

        todos_div.insertAdjacentHTML('beforeend', html);
    });
};

// make a get request to our server and do our to dos.

function getToDos() {
    fetch('/api/todos')
        .then(res => res.json())
        .then(todos =>{
            outputToDos(todos);
        });
};

function addToDo(event) {
    const input = document.querySelector('input[name="somethin"]')
    const value = input.value;
    const data = {
        text: value
    }

    event.preventDefault();

    fetch('/api/todos', {
        method: 'post',
        headers: { // we found this by searching fetch send post request and went to the first stackoverflow result to get the headers code.
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }).then(res => res.json())
      .then(todos =>{
        input.value = '';
        outputToDos(todos);
    });
}

function deleteTodo (event) {
    const el = event.target;
    
    if(el.tagName === 'BUTTON') {
        const id = el.dataset.id;
        const data = {
            id: id
        };

        fetch('/api/todos', {
            method: 'delete',
            headers: { // we found this by searching fetch send post request and went to the first stackoverflow result to get the headers code.
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(todos => outputToDos(todos));
    }
}

getToDos();
submit_btn.addEventListener('click', addToDo);
todos_div.addEventListener('click', deleteTodo);
