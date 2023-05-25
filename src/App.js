import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ArticleList from './components/article/ArticleList';
import ArticleCreate from './components/article/ArticleCreate';
import ArticleEdit from './components/article/ArticleEdit';

class App extends Component {
  render() {
      return (
          <Router>
              <div className="container">
                  <nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <div className="collapse navbar-collapse" id="navbarSupportedContent">
                          <ul className="navbar-nav mr-auto">
                              <li className="nav-item">
                                  <Link to={'/'} className="nav-link">Home</Link>
                              </li>
                              <li className="nav-item">
                                  <Link to={'/create'} className="nav-link">Create</Link>
                              </li>
                          </ul>
                      </div>
                  </nav> <br/>             
                  <Routes>
                      <Route path='/' element={ <ArticleList/> } />
                      <Route path='/create' element={ <ArticleCreate/> } />
                      <Route path='/edit/:id' element={ <ArticleEdit/> } />
                  </Routes>
              </div>
          </Router>
      );
  }
}

export default App;
