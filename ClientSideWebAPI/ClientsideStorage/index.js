// Create needed constants
const list = document.querySelector('ul');
const titleInput = document.querySelector('#title');
const bodyInput = document.querySelector('#body');
const form = document.querySelector('form');
const submitBtn = document.querySelector('form button');

// database initial setup
let db;

const openRequest = window.indexedDB.open('notes_db', 1);

// error handler signifies that the db didn't open succesffuly
openRequest.addEventListener('error', () => 
    console.error("Databasse failed to open"),
);

// success handler signifies that the database opened successfully
openRequest.addEventListener('success', () => {
    console.log("Database opened successfully");
    
    db = openRequest.result;
    displayData();
});

openRequest.addEventListener('upgradeneeded', () => {
    // Grab a ref to the opened db
    db = e.target.result;

    // Create an obj in our db to store notes and auto-incrementing key
    // an objStore is smiliar to a 'table' in a relational db
    const objectStore = db.createObjectStore('notes_os', { 
        keyPath: 'id', 
        autoIncrement: true 
    });

    // Define what data items the objstore will contain
    objectStore.createIndex('title', 'title', { unique: false });
    objectStore.createIndex('body', 'body', { unique: false });
});

// submit event handler
form.addEventListener('submit', addData);

function addData(e) {
    // prevent default
    e.preventDefault();

    // grab values entered into the form fields and store them in an obj ready for being inserted into the db
    const newItem = { title: titleInput.value, body: bodyInput.value };

    // open a read/write db trasanction, ready for adding the data
    const transaction = db.transaction(['notes_os'], 'readwrite');

    // call an obj store that's already been added to the db
    const objectStore = transaction.objectStore('notes_os');

    // Make a request to add our newItem obj to the obj store
    const addRequest = objectStore.add(newItem);

    addRequest.addEventListener('success', () => {
        titleInput.value = '';
        bodyInput.value = '';
    });

    // Report on the success of the transaction completing, when everythign is done
    transaction.addEventListener('complete', () => {
        console.log('Transaction completed: db modification finished');

        // update the display of data to show the newly added item, by running displayData() again
        displayData();
    });

    transaction.addEventListener('error', () => {
        console.error('Transaction not opened due to error');
    });
}

function displayData() {
    // Here we empty the contents of the list element each time the display is updated
    // If you didn't do this, you'd get duplicates listed each time a new note is added
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }

    // Open our object store and then get a cursor - which iterates through all the different data items in the store
    const objectStore = db.transaction("hotes_os").objectStore("notes_os");
    objectStore.openCursor().addEventListener('success', (e) => {
        // Get a ref to the cursor
        const cursor = e.target.result;

        // If there is still another data item to iterate through, keep running this code
        if (cursor) {
            // Create a list item, h3, and p to put each data item inside when displaying it
            // structure the HTML fragment, and append it inside the list
            const listItem = document.createElement('li');
            const h3 = document.createElement('h3');
            const para = document.createElement('p');

            listItem.appendChild(h3);
            listItem.appendChild(para);
            list.appendChild(listItem);
            
            // Put the data from the cursor inside the h3 and para
            h3.textContent = cursor.value.title;
            para.textContent = cursor.value.body;

            // Store the ID of the data item inside an attribute on the listItem, so we know which item it corresponds to.
            // This will be useful later when we want to delete items
            listItem.setAttribute('data-note-id', cursor.value.id);

            // Create a button and place it inside each listItem
            const deleteBtn = document.createElement('button');
            listItem.appendChild(deleteBtn);
            deleteBtn.textContent = 'Delete';

            // Set an event handler so that when the button is clicked, the deleteItem function is run
            deleteBtn.addEventListener('click', deleteItem);

            // Iterate to the next item in the cursor
            cursor.continue();
        } else {
            // Again, if list item is empty, display a 'No notes stored' message 
            if (!list.firstChild) {
                const listItem = document.createElement('li');
                listItem.textContent = 'No notes stored.';
                list.appendChild(listItem);
            }
            // if there are no more cursor items to iterate through, say so
            console.log("Notes all displayed");
        }
    });
}