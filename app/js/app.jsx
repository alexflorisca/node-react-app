'use strict';

let React =                 require('react'),
    ReactDOM =              require('react-dom'),
    ajax =                  require('./util/ajax');



class InstitutionBooks extends React.Component {
    constructor() {
        super();
        console.log("Main.jsx");
        this.state = {
            institution: '',
            books: []
        };

        this._onInputChange = this._onInputChange.bind(this);
        this._onSearchSubmit= this._onSearchSubmit.bind(this);
    }

    _onInputChange(searchValue) {
        this.setState({
            institution: searchValue
        });
    }

    _onSearchSubmit(searchValue) {
        let url = 'http://institutional-metrics.dev.cf.springer-sbm.com/institution/' + encodeURI(searchValue);

        ajax.get({
            url: url,
            success: (data) => {
                data = JSON.parse(data);
                this.setState({
                    books: data
                });
            },
            error: (error) => {
                console.log("AJAX call failed with " + error);
            }
        });
        // Update the state with the new data
    }

    render() {
        return(
            <div>
                <Search institution={this.state.institution} onInputChange={this._onInputChange} onSearchSubmit={this._onSearchSubmit} />
                <BooksList books={this.state.books} institution={this.state.institution} />
            </div>
        )
    }
}





class Search extends React.Component {

    constructor() {
        super();
        this._searchHandler = this._searchHandler.bind(this);
        this._submitHandler = this._submitHandler.bind(this);
    }

    _searchHandler() {
        this.props.onInputChange(this.refs.search.value);
    }

    _submitHandler(event) {
        event.preventDefault();
        this.props.onSearchSubmit(this.refs.search.value);
    }

    render() {
        return(
            <div className="InstitutionSearch">
                <h1>Search books by institution</h1>
                <form onSubmit={this._submitHandler}>
                    <input
                        type="text"
                        name="InstitutionSearch"
                        ref="search"
                        placeholder="Type institution here"
                        value={this.props.institution}
                        onChange={this._searchHandler} />
                    <button type="submit">Where ma books at?</button>
                </form>
            </div>
        );
    }
}






class BooksList extends React.Component {
    render() {

        let books = [];
        console.log(this.props.books);
        this.props.books.forEach(book => books.push(<Book book={book} key={book.doi} />));

        let display = (this.props.institution) ? 'block' : 'none';

        return(
            <div>
                <h2 style={{display:display}}>{books.length} books found for {this.props.institution}</h2>
                <ul id="Books">
                    {books}
                </ul>
            </div>
        )
    }
}




class Book extends React.Component {
    render() {
        let book = this.props.book;
        return(
            <li className="book">
                <p><strong>Title: </strong>{book.title}</p>
                <p><strong>DOI: </strong>{book.doi}</p>
                <p><strong>Bookmetrix: </strong></p>
                <ul>
                    <li><p><strong>Citation count: </strong> {book.bookmetrix.data_summary.citation_count}</p></li>
                    <li><p><strong>Reader count: </strong> {book.bookmetrix.data_summary.reader_count}</p></li>
                    <li><p><strong>Download count: </strong> {book.bookmetrix.data_summary.download_count}</p></li>
                </ul>
            </li>
        )
    }
}


ReactDOM.render(
    <InstitutionBooks />,
    document.getElementById("books-app")
);