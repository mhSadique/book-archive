const searchButton = document.getElementById('search-button');
const container = document.getElementById('container');
const searchResult = document.getElementById('search-result');
const loader = document.getElementById('loader');


searchButton.addEventListener('click', handleClick);
document.body.addEventListener('click', (e) => { e.preventDefault() });

function handleClick(e) {
    loader.hidden = false;
    container.innerHTML = '';
    searchResult.innerHTML = '';
    const searchText = document.getElementById('search').value;
    e.preventDefault();
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => {
            showBooks(data);
            console.log(data);
        })
}

function setPublisher(publisher) {
    if (Array.isArray(publisher) && publisher.length === 1) {
        return publisher[0];
    } else if (Array.isArray(publisher) && publisher.length > 1) {
        return publisher[0] + ' and Others';
    } else if (publisher === undefined) {
        return 'Publisher Unknown';
    } else {
        return publisher;
    }
}

function showSearchResult(data) {
    const p = document.createElement('p');
    p.classList.add('search-string')
    if (data.numFound === 0) {
        p.innerText = `No results for: ${data.q}`;
        searchResult.appendChild(p);
    } else {
        p.innerHTML = `<i>${data.numFound} matching results for '${data.q}'.</i>`;
        searchResult.appendChild(p);
    }
}

function showBookIndividual(book) {
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="book-card">
            <div class="book-image">
                <img src=${book.coverPhotoId} />
            </div>
            <div class="book-info">
                <h1>${book.bookName}</h1>
                <h2><i>Author:</i> ${book.author}</h2>
                <h5><i>First Published:</i> ${book.firstPublishedDate}</h5>
                <h5><i>Published by:</i> ${book.publisher}</h5>
            </div>
        </div>
    `;
    container.appendChild(div);
}

function setCoverPhotoId(id) {  // if there is no image provided,
    if (id === undefined) {    //  set a custom image
        return './../image/no-image-placeholder.png';
    } else { // else set the original image
        return `https://covers.openlibrary.org/b/id/${id}-M.jpg`;
    }
}

function setAuthorName(authorName) {
    if (authorName === undefined) {
        return 'Unknown';
    } else {
        return authorName;
    }
}

function setFirstPublishedDate(year) {
    if (year === undefined) {
        return 'Year Unknown';
    } else {
        return year;
    }
}

function setBookInfo(book) {
    const bookInfo = {
        bookName: book.title,
        author: setAuthorName(book.author_name),
        firstPublishedDate: setFirstPublishedDate(book.first_publish_year),
        publisher: setPublisher(book.publisher), // check if an array, then return only the first one 
        coverPhotoId: setCoverPhotoId(book.cover_i)
    }
    showBookIndividual(bookInfo);
}

function showBooks(data) {
    document.getElementById('search').value = '';
    loader.hidden = true;
    let books = data.docs;
    showSearchResult(data);
    books.forEach(book => {
        setBookInfo(book); 
    })
}

function showSampleBooksOnFirstLoad() {
    loader.hidden = false;
    const sampleText = 'JavaScript';
    fetch(`https://openlibrary.org/search.json?q=${sampleText}`)
        .then(res => res.json())
        .then(data => {
            showBooks(data);
        })
}

// Load some books 'on load' for the first time
showSampleBooksOnFirstLoad();