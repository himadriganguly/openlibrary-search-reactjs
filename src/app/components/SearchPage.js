import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Update from 'react-addons-update';
import sortBy from 'sort-by';

class SearchPage extends Component {

  constructor(props){
    super(props);
    this.state = {
      docs: [],
      numFound: 0,
      num_found: 0,
      start: 0,
      searchCompleted: false,
      searching: false,
      sorting: 'asc'
    }
    this.renderSearching = this.renderSearching.bind(this);
    this.renderSearchElements = this.renderSearchElements.bind(this);
    this.renderDocs = this.renderDocs.bind(this);
    this.performSearch = this.performSearch.bind(this);
    this.parseJSON = this.parseJSON.bind(this);
    this.updateState = this.updateState.bind(this);
    this.openLibrarySearch = this.openLibrarySearch.bind(this);
    this._sortByTitle = this._sortByTitle.bind(this);
  }

  render() {
    let tabStyles = {paddingTop: '5%'};
    return (
      <div className='container'>
        <div className="row" style={tabStyles}>
          <div className="col-lg-8 col-lg-offset-2">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for Projects..." ref='searchInput'/>
              <span className="input-group-btn">
                <button className="btn btn-default" type="button" onClick={this.performSearch}>Go!</button>
              </span>
            </div>
          </div>
        </div>
        { (() => {
          if (this.state.searching) {
            return this.renderSearching();
          }
          return this.state.searchCompleted ? this.renderSearchElements() : <div/>
        })()}
      </div>
    );
  }

  renderSearching(){
    return (
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2">
          <div className='text-center'><i className="fa fa-spinner fa-pulse fa-5x"></i></div>
        </div>
      </div>
    );
  }

  renderSearchElements(){
    return (
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2">
          <span className='text-center'>Total Results: {this.state.numFound}</span>
          <table className="table table-stripped">
            <thead>
              <tr>
                <th><a href="#" onClick={this._sortByTitle}>Title1</a></th>
                <th>Title suggest</th>
                <th>Author</th>
                <th>Edition</th>
              </tr>
            </thead>
            <tbody>
            {this.renderDocs(this.state.docs)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderDocs(docs){
    return docs.map((doc) => {
      console.log(doc);
      return <tr key={doc.cover_edition_key}>
        <td>{doc.title}</td>
        <td>{doc.title_suggest}</td>
        <td>{(doc.author_name || []).join(', ')}</td>
        <td>{doc.edition_count}</td>
      </tr>
    })
  }

  _sortByTitle() {
    let sortByAttribute = this.state.sorting === 'asc' ? "title" : "-title";
    let newState = Update(this.state,
                          { docs: { $apply: (docs) => { return docs.sort(sortBy(sortByAttribute)) } },
                            sorting: { $apply: (sorting) => { return sorting === 'asc' ? 'desc' : 'asc' } } });
    this.setState(newState);
  }


  performSearch(){
    let searchTerm = $(ReactDOM.findDOMNode(this.refs.searchInput)).val();
    console.log("SearchTerm: " + searchTerm);
    this.openLibrarySearch(searchTerm);
    this.setState({searchCompleted: false, searching: true});
  }

  parseJSON(response) {
    return response.json();
  }

  updateState(json){
    console.log(json);
    this.setState({
      ...json,
      searchCompleted: true,
      searching: false
    });
  }

  openLibrarySearch(searchTerm){
    let openlibraryURI = `https://openlibrary.org/search.json?page=1&q=${searchTerm}}`;
    fetch(openlibraryURI)
      .then(this.parseJSON)
      .then(this.updateState)
      .catch(function (ex) {
        console.log('Parsing failed', ex)
      })
  }

};

export default SearchPage;
