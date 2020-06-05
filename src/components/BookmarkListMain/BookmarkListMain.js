import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Bookmark from '../Bookmark/Bookmark'
import CircleButton from '../CircleButton/CircleButton'
import Context from '../../Context'
import { getBookmarksForFolder } from '../../bookmarks-helpers'
import './BookmarkListMain.css'

export default class BookmarkListMain extends React.Component {
    static defaultProps = {
        match: {
            params: {}
        }
    }
    static contextType = Context;

    render() {
        const { folderId } = this.props.match.params
        const { bookmarks = [] } = this.context
        const bookmarksForFolder = getBookmarksForFolder(bookmarks, folderId)
        return (
            <section className='BookmarkListMain'>
                <ul>
                    {bookmarksForFolder.map(bookmark =>
                        <li key={bookmark.id}>
                            <Bookmark
                                id={bookmark.id}
                                name={bookmark.name}
                                modified={bookmark.modified}
                                onDeleteBookmark={this.handleDeleteBookmark}
                            />
                        </li>
                    )}
                </ul>
                <div className='BookmarkListMain__button-container'>
                    <CircleButton
                        tag={Link}
                        to='/add-bookmark'
                        type='button'
                        className='BookmarkListMain__add-bookmark-button'
                    >
                        <FontAwesomeIcon icon='plus' />
                        <br />
            Bookmark
          </CircleButton>
                </div>
            </section>
        )
    }
}