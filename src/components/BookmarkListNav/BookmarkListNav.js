import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
import Context from '../../Context'
import { countBookmarksForFolder } from '../../bookmarks-helpers'
import './BookmarkListNav.css'

export default class BookmarkListNav extends React.Component {
    static contextType = Context;

    render() {
        const { folders = [], bookmarks = [] } = this.context
        return (
            <div className='BookmarkListNav'>
                <ul className='BookmarkListNav__list'>
                    {folders.map(folder =>
                        <li key={folder.id}>
                            <NavLink
                                className='BookmarkListNav__folder-link'
                                to={`/folder/${folder.id}`}
                            >
                                <span className='BookmarkListNav__num-bookmarks'>
                                    {countBookmarksForFolder(bookmarks, folder.id)}
                                </span>
                                {folder.name}
                            </NavLink>
                        </li>
                    )}
                </ul>
                <div className='BookmarkListNav__button-wrapper'>
                    <CircleButton
                        tag={Link}
                        to='/add-folder'
                        type='button'
                        className='BookmarkListNav__add-folder-button'
                    >
                        <FontAwesomeIcon icon='plus' />
                        <br />
            Folder
          </CircleButton>
                </div>
            </div>
        )
    }
}