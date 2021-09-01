const searchButton = document.getElementById('search-button');
const container = document.getElementById('container');
let books;



// const bookUrl = `http://openlibrary.org/search.json?q=${searchText}`;
// const coverImageUrl = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`;

searchButton.addEventListener('click', handleClick);

function handleClick(e) {
    const searchText = document.getElementById('search').value;
    e.preventDefault();
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
    .then(res => res.json())
    .then(data => {
        books = data.docs;
        showBooks(books);
    })
}

function showBooks(books) {
    books.forEach(book => {
        console.log(book);
        const div = document.createElement('div');
        div.innerHTML = `
            <h1>Book Name: ${book.title}</h1>
            <h3>Author: ${book.author_name}</h3>
            <h5>Published on: ${book.first_publish_year}</h5>
            <h6>Published by: ${book.publisher}</h6>
            <img src='https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg' />
            <hr/>
        `;
        container.appendChild(div);
    })
}