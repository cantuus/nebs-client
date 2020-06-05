import React from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import config from './config'
import Context from './Context'
import BookmarkList from './components/MainScreen/Bookmarklist'
import WholeBookmark from './components/Bookmark/WholeBookmark'
import FolderList from './components/NavBar/Folderlist'
import BookmarkNav from './components/NavBar/BookmarkNav'
import AddFolder from './components/Folder/AddFolder'
import AddBookmark from './components/Bookmark/AddBookmark'
import ErrorPage from './components/MainScreen/Errorpage'
import LoadingScreen from './components/MainScreen/Loadingscreen'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: [],
      bookmarks: [],
      loading: true,
      error: null
    }
  }

  componentDidMount() {
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      }
    }
    Promise.all([
      fetch(`${config.API_ENDPOINT}folders`, options),
      fetch(`${config.API_ENDPOINT}bookmarks`, options)
    ])
      .then(([folders, bookmarks]) => {
        if (!folders.ok) {
          return folders.json().then(event => Promise.reject(event));
        }
        if (!bookmarks.ok) {
          return bookmarks.json().then(event => Promise.reject(event));
        }
        return Promise.all([
          folders.json(),
          bookmarks.json()
        ])
      })
      .then(([foldersJson, bookmarksJson]) => {
        this.setState({
          folders: foldersJson,
          bookmarks: bookmarksJson,
          loading: false
        })
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  }

  renderMainComponent = () => {
    return (
      <>
        {this.state.error ? <ErrorPage error={this.state.error} /> : !this.state.loading ? (this.renderMainRoutes()) : <LoadingScreen />}
      </>
    );
  }


  renderMainRoutes = () => {
    return (<Switch>
      <Route
        exact path="/"
        component={BookmarkList}
      />
      <Route
        path="/folder/:folderId"
        component={BookmarkList}
      />
      <Route
        path="/bookmark/:bookmarkId"
        component={WholeBookmark}
      />
      <Route
        path="/AddBookmark"
        component={AddBookmark}
      />
      <Route
        path="/AddFolder"
        component={AddFolder}
      />
      <Route render={() => <div>Something went wrong!</div>} />
    </Switch>);
  }




  renderNavigationComponent = () => {
    return (
      <>
        {!this.state.loading && <Switch>
          <Route
            path="/bookmark/:bookmarkId"
            component={BookmarkNav}
          />
          <Route
            path="/folder/:folderId"
            component={FolderList}
          />
          <Route
            exact path="/"
            component={FolderList}
          />
          <Route
            path="/AddFolder"
            component={BookmarkNav}
          />
          <Route
            path="/AddBookmark"
            component={BookmarkNav}
          />
          <Route component={BookmarkNav} />
        </Switch>}
      </>
    );
  }

  handleDeleteBookmark = (bookmarkId) => {
    this.setState({
      bookmarks: this.state.bookmarks.filter(bookmark => bookmark.id !== bookmarkId)
    });
  }

  handleDeleteFolder = (folderId) => {
    this.setState({
      folders: this.state.folders.filter(folder => folder.id !== folderId),
      bookmarks: this.state.bookmarks.filter(bookmark => bookmark.folder_id !== folderId)
    });
  }

  handleUpdateFolder = (updatedFolder) => {
    console.log(updatedFolder, this.state.folders);
    this.setState({
      folders: this.state.folders.map(folder => {
        return (folder.id !== updatedFolder.id) ? folder : updatedFolder;
      })
    });
  }

  addFolder = (folder) => {
    const folders = [...this.state.folders, folder]
    this.setState({
      folders
    })
  }

  addBookmark = (bookmark) => {
    const bookmarks = [...this.state.bookmarks, bookmark]
    this.setState({
      bookmarks
    })
  }


  render() {
    return (
      <Context.Provider value={{
        ...this.state,
        handleDeleteBookmark: this.handleDeleteBookmark,
        handleDeleteFolder: this.handleDeleteFolder,
        addFolder: this.addFolder,
        addBookmark: this.addBookmark,
        handleUpdateFolder: this.handleUpdateFolder
      }}>
        <header id="SiteTitle" role="banner">
          <Link to='/'>Nebs</Link>
        </header>
        <ErrorPage>
          <nav role="navigation">
            {this.renderNavigationComponent()}
          </nav>
          <main role="main">
            {this.renderMainComponent()}
          </main>
        </ErrorPage>
      </Context.Provider>
    );
  }
}

export default App;
