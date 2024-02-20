fetch('https://api.example.com/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `
      query {
        user(id: 123) {
          name
          email
          posts {
            title
          }
        }
      }
    `
  })
})
.then(response => response.json())
.then(data => {
  console.log(data);
  // Access the values within the response here
})
.catch(error => console.error(error));