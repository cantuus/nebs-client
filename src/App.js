import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BookmarkListNav from '../src/components/BookmarkListNav/BookmarkListNav'
import BookmarkPageNav from '../src/components/BookmarkPageNav/BookmarkPageNav'
import BookmarkListMain from '../src/components/BookmarkListMain/BookmarkListMain'
import BookmarkPageMain from '../src/components/BookmarkPageMain/BookmarkPageMain'
import AddFolder from '../src/components/AddFolder/AddFolder'
import AddBookmark from '../src/components/AddBookmark/AddBookmark'
import Context from './Context'
import config from './config'
import './App.css'

class App extends Component {
  state = {
    bookmarks: [],
    folders: [],
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/bookmarks`),
      fetch(`${config.API_ENDPOINT}/folders`)
    ])
      .then(([bookmarksRes, foldersRes]) => {
        if (!bookmarksRes.ok)
          return bookmarksRes.json().then(e => Promise.reject(e))
        if (!foldersRes.ok)
          return foldersRes.json().then(e => Promise.reject(e))

        return Promise.all([
          bookmarksRes.json(),
          foldersRes.json(),
        ])
      })
      .then(([bookmarks, folders]) => {
        this.setState({ bookmarks, folders })
      })
      .catch(error => {
        console.error({ error })
      })
  }

  handleAddFolder = folder => {
    this.setState({
      folders: [
        ...this.state.folders,
        folder
      ]
    })
  }

  handleAddBookmark = bookmark => {
    this.setState({
      bookmarks: [
        ...this.state.bookmarks,
        bookmark
      ]
    })
  }

  handleDeleteBookmark = bookmarkId => {
    this.setState({
      bookmarks: this.state.bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
    })
  }

  renderNavRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={BookmarkListNav}
          />
        )}
        <Route
          path='/bookmark/:bookmarkId'
          component={BookmarkPageNav}
        />
        <Route
          path='/add-folder'
          component={BookmarkPageNav}
        />
        <Route
          path='/add-bookmark'
          component={BookmarkPageNav}
        />
      </>
    )
  }

  renderMainRoutes() {
    return (
      <>
        {['/', '/folder/:folderId'].map(path =>
          <Route
            exact
            key={path}
            path={path}
            component={BookmarkListMain}
          />
        )}
        <Route
          path='/bookmark/:bookmarkId'
          component={BookmarkPageMain}
        />
        <Route
          path='/add-folder'
          component={AddFolder}
        />
        <Route
          path='/add-bookmark'
          component={AddBookmark}
        />
      </>
    )
  }

  render() {
    const value = {
      bookmarks: this.state.bookmarks,
      folders: this.state.folders,
      addFolder: this.handleAddFolder,
      addBookmark: this.handleAddBookmark,
      deleteBookmark: this.handleDeleteBookmark,
    }
    return (
      <Context.Provider value={value}>
        <div className='App'>
          <nav className='App__nav'>
            {this.renderNavRoutes()}
          </nav>
          <header className='App__header'>
            <h1>
              <Link to='/'>Nebs</Link>
              {' '}
              <FontAwesomeIcon icon='check-double' />
            </h1>
          </header>
          <main className='App__main'>
            {this.renderMainRoutes()}
          </main>
        </div>
      </Context.Provider>
    )
  }
}

export default App

