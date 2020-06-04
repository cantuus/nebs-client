import React from 'react';
import Bookmark from '../Bookmark/Bookmark';
import Context from '../../Context';
import { Link } from 'react-router-dom';

class BookmarkList extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = Context;

    getFolderBookmarks = (bookmarks, folderId) => {
        if (!folderId) {
            return bookmarks;
        } else {
            return this.context.bookmarks.filter(bookmark => bookmark.folder_id === parseInt(folderId));
        }
    }

    renderBookmarks = (bookmarks) => {
        return bookmarks.map((bookmark) => {
            return (
                <li key={bookmark.id} id={bookmark.id}>
                    <bookmark id={bookmark.id} name={bookmark.bookmark_name} />
                </li>
            );
        });
    };

    render() {
        const folderId = this.props.match.params.folderId;
        const { bookmarks = [] } = this.context;
        const bookmarksToShow = this.getFolderBookmarks(bookmarks, folderId);
        return (
            <>
                <ul>
                    {this.renderBookmarks(bookmarksToShow)}
                </ul>
                <Link to='/AddBookmark'><button>Add Bookmark</button></Link>
            </>
        );
    }
}

export default BookmarkList;