import React from 'react';
import ReactPaginate from 'react-paginate';

import ItemList from './itemList.jsx';

const server_url = "http://localhost:3000";
const POSTS_PER_PAGE = 10;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search_term: '',
      offset: 0,
      data: [],
      pageCount: 0
    }

    this.searchHandler = this.searchHandler.bind(this);
    this.getDataFromServer = this.getDataFromServer.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    console.log(this.state);
  }

  getDataFromServer() {
    fetch(`${server_url}/events?q=${this.state.search_term}&_page=${this.state.offset}&_limit=${POSTS_PER_PAGE}`, {
      method: 'GET',
    })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      this.setState({
        data: result
      });
    });
  }

  searchHandler(event) {
    event.preventDefault();
    var element = document.getElementById('search_term');

    fetch(`${server_url}/events?q=${element.value}`, {
      method: 'GET',
    })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      console.log(result);
      this.setState({
        search_term: element.value,
        pageCount: Math.ceil( result.length / POSTS_PER_PAGE )
      });
    });

    this.getDataFromServer();
  }

  handlePageClick(data) {
    console.log(data.selected);
    this.setState({
      offset: data.selected
    }, () => {
      this.getDataFromServer();
    });
  };

  render() {
    return (
      <div>

        <form>
          <textarea id="search_term" type="text"></textarea>
          <button type="submit" onClick={this.searchHandler}>Search</button>
        </form>

        <ItemList data={this.state.data} />
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />

      </div>
    );
  }
}

export default App;