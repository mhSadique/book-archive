const searchButton = document.getElementById('search-button');
let books;



// const bookUrl = `http://openlibrary.org/search.json?q=${searchText}`;
// const coverImageUrl = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`;

searchButton.addEventListener('click', handleClick);

function handleClick(e) {
    const searchText = document.getElementById('search').value;
    e.preventDefault();
    fetch(`http://openlibrary.org/search.json?q=${searchText}`)
    .then(res => res.json())
    .then(data => {
        books = data.docs;
        showBooks(books);
    })
}

function showBooks(books) {
    books.forEach(book => {
        console.log(book.author_name[0]);
    })
}