import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import Context from '../../Context'
import { findBookmark, findFolder } from '../../bookmarks-helpers'
import './BookmarkPageNav.css'

export default class BookmarkPageNav extends React.Component {
    static defaultProps = {
        history: {
            goBack: () => { }
        },
        match: {
            params: {}
        }
    }
    static contextType = Context;

    render() {
        const { bookmarks, folders, } = this.context
        const { bookmarkId } = this.props.match.params
        const bookmark = findBookmark(bookmarks, bookmarkId) || {}
        const folder = findFolder(folders, bookmark.folder_id);

        return (
            <div className='BookmarkPageNav'>
                <CircleButton
                    tag='button'
                    role='link'
                    onClick={() => this.props.history.goBack()}
                    className='BookmarkPageNav__back-button'
                >
                    <FontAwesomeIcon icon='chevron-left' />
                    <br />
          Back
        </CircleButton>
                {folder && (
                    <h3 className='BookmarkPageNav__folder-name'>
                        {folder.name}
                    </h3>
                )}
            </div>
        )
    }
}