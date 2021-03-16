import React from 'react';
import PropTypes from 'prop-types';

const BookList = (props) => {
    const { bookList, shelf, shelfName, onChangeShelf } = props;

    const shelves = {
        currentlyReading: 'Currently Reading',
        wantToRead: 'Want to Read',
        read: 'Read'
    };

    /*
    When user is moving a book to a different shelf,
    the id of this book and the destination shelf are being passed to App.js
    */
    const handleShelfChange = (bookId, shelfDestination) => {
        if (onChangeShelf) {
            onChangeShelf(bookId, shelfDestination)
        }
    };

    return (
        <div>
            {shelf === Object.keys(shelves)[0] && (
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{shelfName}</h2>
                </div>
            )}
            {shelf === Object.keys(shelves)[1] && (
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{shelfName}</h2>
                </div>
            )}
            {shelf === Object.keys(shelves)[2] && (
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{shelfName}</h2>
                </div>
            )}

            {/*
   			shelf property of each book object is compared with shelf prop 
            to classify books on shelves.
            For each book object the thumbnail, the title and the authors properties are rendered.
            shelf prop is also used as the default option of select element.
            The rest options are derived from shelves array.
            When user is moving a book to a different shelf,
            onChange event calls handleShelfChange passing the book id and the option (shelf) that has been selected.
    		*/}
            <ul className="books-grid">
                {bookList.filter((book) => book.shelf === shelf)
                    .map((book) => (
                        <li key={book.id}>
                            <img alt={book.title} src={book.imageLinks.thumbnail} />
                            <div className="book-shelf-changer">
                                <select onChange={(event) => handleShelfChange(book.id, event.target.value)}>
                                    <option value="move" disabled>Move to...</option>
                                    <option defaultValue value={shelf}>{shelfName} &#10003;</option>
                                    {Object.entries(shelves).filter(([key, value]) => value !== shelfName)
                                        .map(([key, value]) => (
                                            <option value={key}>{value}</option>
                                        ))}
                                </select>
                            </div>
                            <div className="book-title">{book.title}</div>
                            <ul>
                                {book.authors.map((author) => (
                                    <li
                                        className="book-authors"
                                        key={author}>
                                        {author}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
            </ul>
        </div>
    )
}

BookList.propTypes = {
    bookList: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    shelfName: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

export default BookList