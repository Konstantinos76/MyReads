# Project files/folders to install, launch and review

    The following files and folders are required to install, launch and review this project:

    public
        favicon.ico
        index.html
    src
        icons
            add.svg
            arrow-back.svg
            arrow-drop-down.svg
        App.css
        App.js
        App.test.js
        BookList.js
        BookSearch.js
        BooksAPI.js
        index.css
        index.js
    package-lock.json
    package.json
    SEARCH_TERMS.md
    updated-README.md

    Once you have these in place: 
    `npm install` will install project dependencies.
    `npm start` will start the development server and launch the app.

# Brief on project's components

    App.js
    It holds the `books` state. This is essentially how books are classified on 'Currently Reading', 'Want to Read' and 'Read' shelves.
    BooksAPI `getAll` method is used to fetch the book objects from backend.
    BooksAPI `update` method is used to update the backend when user moves a book to a different shelf.
    It renders three instances of `BookList` component (one for each shelf) and the `BookSearch` component.
    It's also responsible for routing.

    BookList.js
    This is a functional component since it doesn't handle any state.
    Each instance represents one of the 'Currently Reading', 'Want to Read' and 'Read' shelves.
    It is passed four props: 
    `bookList` - list of classified books.
    `shelf` - books for each shelf will be filtered based on this prop.
    `shelfName` - each shelf's corresponding name.
    `onChangeShelf` - when user is moving a book to a different shelf, this function will pass the necessary data up to App.js 

    BookSearch.js
    BooksAPI `search` method is used to fetch the search results, which are book objects, from the backend server.
    Raw search results are classified before being placed into `searchResults` state property.
    The component also tracks the presence or absence of search results using `noResults` state property.
    It is passed two props:
    `bookList` - list of classified books. Raw search results will be compared against this list. If there is a match, the search result-book is placed on its corresponding shelf.
    `onChangeShelf` - when user is moving a book to a different shelf, this function will pass the necessary data up to App.js


    