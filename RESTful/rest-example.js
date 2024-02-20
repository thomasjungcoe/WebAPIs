fetch('https://jsonplaceholder.typicode.com/todos/1')
.then(response => response.json())
.then(data => {
    console.log(data);
    // Access the values within the response here
})
.catch(error => console.error(error));