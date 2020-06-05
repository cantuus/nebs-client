import React from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Context from '../../Context'
import config from '../../config'
import './Bookmark.css'

export default class Bookmark extends React.Component {
    static defaultProps = {
        onDeleteBookmark: () => { },
    }
    static contextType = Context;

    handleClickDelete = e => {
        e.preventDefault()
        const bookmarkId = this.props.id

        fetch(`${config.API_ENDPOINT}/bookmarks/${bookmarkId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(() => {
                this.context.deleteBookmark(bookmarkId)
                // allow parent to perform extra behaviour
                this.props.onDeleteBookmark(bookmarkId)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        const { name, id, modified } = this.props
        return (
            <div className='Bookmark'>
                <h2 className='Bookmark__title'>
                    <Link to={`/bookmark/${id}`}>
                        {name}
                    </Link>
                </h2>
                <button
                    className='Bookmark__delete'
                    type='button'
                    onClick={this.handleClickDelete}
                >
                    <FontAwesomeIcon icon='trash-alt' />
                    {' '}
          remove
        </button>
                <div className='Bookmark__dates'>
                    <div className='Bookmark__dates-modified'>
                        Modified
            {' '}
                        <span className='Date'>
                            {format(modified, 'Do MMM YYYY')}
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}