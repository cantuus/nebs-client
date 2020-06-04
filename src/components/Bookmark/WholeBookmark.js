import React from 'react';
import Context from '../../AppContext';
import Bookmark from './Bookmark';

class WholeBookmark extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = Context;

    render() {
        const bookmarkId = parseInt(this.props.match.params.bookmarkId);
        const { bookmarks = [] } = this.context;
        const bookmark = bookmarks.find(bookmark => bookmark.id === bookmarkId) || {};
        return (
            <>
                <Note id={bookmark.id} name={bookmark.bookmark_name} history={this.props.history} />
                <p>{bookmark.content}</p>
            </>
        );
    }
}

export default WholeBookmark;