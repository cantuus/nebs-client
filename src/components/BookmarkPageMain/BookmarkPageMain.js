import React from 'react'
import Bookmark from '../Bookmark/Bookmark'
import Context from '../Context'
import { findBookmark } from '../bookmarks-helpers'
import './BookmarkPageMain.css'

export default class BookmarkPageMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = ApiContext

    handleDeleteBookmark = bookmarkId => {
        this.props.history.push(`/`)
    }

    render() {
        const { bookmarks = [] } = this.context
        const { bookmarkId } = this.props.match.params
        const bookmark = findBookmark(bookmarks, bookmarkId) || { content: '' }
        return (
            <section className='BookmarkPageMain'>
                <Bookmark
                    id={bookmark.id}
                    name={bookmark.name}
                    modified={bookmark.modified}
                    onDeleteBookmark={this.handleDeleteBookmark}
                />
                <div className='BookmarkPageMain__content'>
                    {bookmark.content.split(/\n \r|\n/).map((para, i) =>
                        <p key={i}>{para}</p>
                    )}
                </div>
            </section>
        )
    }
}