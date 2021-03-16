import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';

class BookSearch extends Component {
    static propTypes = {
        bookList: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    };

    state = {
        searchResults: [],
        noResults: true
    };

    whiteList = [
        'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate',
        'Virtual Reality', 'Web Development', 'iOS'
    ];

    shelves = [
        'currentlyReading',
        'wantToRead',
        'read'
    ];

    shelfName = (shelf) => {
        switch (shelf) {
            case 'currentlyReading':
                return 'Currently Reading';
            case 'wantToRead':
                return 'Want to Read';
            case 'read':
                return 'Read';
            default:
                return 'None';
        }
    };

    /*
    When user is moving a book to a different shelf,
    the id of this book and the destination shelf are being passed to App.js
    */
    handleShelfChange = (bookId, shelfDestination) => {
        if (this.props.onChangeShelf) {
            this.props.onChangeShelf(bookId, shelfDestination)
        }
    };

    /*
    This function valiidates the search input 
    comparing user's query against the search terms of white list array.
    search function won't be invoked if input is not in the white list.
    */
    validateSearchTerm = (query) => {
        this.whiteList.forEach((term) => {
            (term.toLowerCase() === query.toLowerCase() || query === '') &&
                this.search(query)
        })
    };

    /*
    This function uses BooksAPI search method to fetch the search results from the backend server.
    These raw results are compared against the bookList prop which is a classified list of books.
    If there is a match, the search result-book is placed on its corresponding shelf.
    */
    search = (query) => {
        query.length === 0 &&
            this.setState({ noResults: true })
        if (query.length > 0) {
            this.setState({ noResults: false })
            BooksAPI.search(query, 20)
                .then((results) => {
                    results.forEach((result) => (
                        this.props.bookList.forEach((book) => (
                            result.id && result.id === book.id && (
                                result.shelf = book.shelf
                            )
                        ))
                    ))
                    this.setState(() => ({
                        searchResults: results
                    }))
                })
        }
    };


    render() {
        return (
            <div>
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to='/'>
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            onChange={(event) => {
                                this.validateSearchTerm(event.target.value);
                            }}
                        />
                    </div>
                </div>
                {/*
   				For each search result object the thumbnail, the title and the authors properties are rendered.
                Results that don't have a thumbnail are filtered out.
                The default select option is "None" if a book has not been assigned to a shelf.
                If a book has been assigned to a shelf, this shelf is its default select option.
    			*/}
                <div className="search-books-results">
                    {this.state.searchResults && this.state.searchResults.length > 0 && (
                        <ul className="books-grid">
                            {this.state.searchResults.filter((result) => (result.imageLinks !== undefined))
                                .map((result) => (
                                    this.state.noResults === false && (
                                        <li key={result.id}>
                                            <img alt={result.title} src={result.imageLinks.thumbnail} />
                                            <div className="book-shelf-changer">
                                                <select onChange={(event) => this.handleShelfChange(result.id, event.target.value)}>
                                                    <option value="move" disabled>Move to...</option>
                                                    {!result.shelf || result.shelf === undefined
                                                        ? <option defaultValue value="none">{this.shelfName('none')} &#10003;</option>
                                                        : <option defaultValue value={result.shelf}>{this.shelfName(result.shelf)} &#10003;</option>
                                                    }
                                                    {this.shelves.filter(shelf => shelf !== result.shelf)
                                                        .map(shelf => <option value={shelf}>{this.shelfName(shelf)}</option>)}
                                                </select>
                                            </div>
                                            <div className="book-title">{result.title}</div>
                                            <ul>
                                                {result.authors &&
                                                    result.authors.map((author) => (
                                                        <li
                                                            className="book-authors"
                                                            key={author}>
                                                            {author}
                                                        </li>
                                                    ))}
                                            </ul>
                                        </li>
                                    )))}
                        </ul>
                    )}
                </div>
            </div>
        )
    }
}

export default BookSearch