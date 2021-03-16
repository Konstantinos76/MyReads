import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookList from './BookList';
import BookSearch from './BookSearch';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

class BooksApp extends React.Component {
    state = {
        books: []
    };

    //BooksAPI getAll method is used to fetch the book objects from backend.
    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState(() => ({
                    books
                }))
            })
    }

    /*
    BooksAPI update method is used to update the backend 
    when user moves a book to a different shelf.
    */
    changeShelf = (id, shelf) => {
        BooksAPI.update({ id }, shelf)
            .then((books) => {
                BooksAPI.getAll()
                    .then((books) => {
                        this.setState(() => ({
                            books
                        }))
                    })
            })
    }

    render() {
        return (
            <div>
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <Route exact path='/' render={() => (
                    // Three instances of BookList component (one for each shelf) are rendered.
                    <div>
                        <BookList
                            bookList={this.state.books}
                            shelf="currentlyReading"
                            shelfName="Currently Reading"
                            onChangeShelf={(id, shelf) => {
                                this.changeShelf(id, shelf);
                            }}
                        />
                        <BookList
                            bookList={this.state.books}
                            shelf="wantToRead"
                            shelfName="Want to Read"
                            onChangeShelf={(id, shelf) => {
                                this.changeShelf(id, shelf);
                            }}
                        />
                        <BookList
                            bookList={this.state.books}
                            shelf="read"
                            shelfName="Read"
                            onChangeShelf={(id, shelf) => {
                                this.changeShelf(id, shelf);
                            }}
                        />
                        <div className="open-search">
                            <Link
                                to='/search'>
                                Search
                          </Link>
                        </div>
                    </div>
                )} />
                <Route path='/search' render={() => (
                    <BookSearch
                        bookList={this.state.books}
                        onChangeShelf={(id, shelf) => {
                            this.changeShelf(id, shelf);
                        }}
                    />
                )} />
            </div>
        )
    }
}

export default BooksApp