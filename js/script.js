const searchButton = document.getElementById('search-button');
const container = document.getElementById('container');
const searchResult = document.getElementById('search-result');



// const bookUrl = `http://openlibrary.org/search.json?q=${searchText}`;
// const coverImageUrl = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`;

searchButton.addEventListener('click', handleClick);

function handleClick(e) {
    container.innerHTML = '';
    searchResult.innerHTML = '';
    const searchText = document.getElementById('search').value;
    e.preventDefault();
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => {
            showBooks(data);
        })
}

function setPublisher(publisher) {
    if (Array.isArray(publisher) && publisher.length === 1) {
        return publisher[0];
    } else if (Array.isArray(publisher) && publisher.length > 1) {
        return publisher[0] + ' and Others';
    } else {
        return publisher;
    }
}

function showSearchResult(data) {
    const searchCount = document.createElement('div');
    searchCount.innerHTML = `<p>Total Search Results for "${data.q}": ${data.numFound}</p>`;
    searchResult.appendChild(searchCount);
}

function showBookIndividual(book) {
    const div = document.createElement('div');
    div.innerHTML = `
        <h1>${book.bookName}</h1>
        <h3>Author: ${book.author}</h3>
        <h5>First Published on: ${book.firstPublishedDate}</h5>
        <h6>Published by: ${book.publisher}</h6>
        <img src=${book.coverPhotoId} />
        <hr/>
    `;
    container.appendChild(div);
}

function setCoverPhotoId(id) { // if there is no image provided,
    if(id === undefined) {    //  set a custom image
        return './../image/no-image-placeholder.png';
    } else { // else set the original image
        return `https://covers.openlibrary.org/b/id/${id}-M.jpg`;
    }
}

function setBookInfo(book) {
    const bookInfo = {
        bookName: book.title,
        author: book.author_name,
        firstPublishedDate: book.first_publish_year,
        publisher: setPublisher(book.publisher), // check if an array, 
        coverPhotoId: book.cover_i,             // then return the first element only
        coverPhotoId: setCoverPhotoId(book.cover_i)
    }
    showBookIndividual(bookInfo);
}

function showBooks(data) {
    let books = data.docs;
    showSearchResult(data);
    books.forEach(book => {
        if (book.title.includes(data.q)) { // check for printing only the books
            setBookInfo(book);            // whose name contain the 'search string'
            console.log(book.cover_i);
        }
    })
}