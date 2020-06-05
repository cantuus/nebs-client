import React, { Component } from 'react'
import NebsForm from '../NebsForm/NebsForm'
import Context from '../../Context'
import config from '../../config'
import './AddBookmark.css'

export default class AddBookmark extends Component {
    static defaultProps = {
        history: {
            push: () => { }
        },
    }
    static contextType = Context;

    handleSubmit = e => {
        e.preventDefault()
        const newBookmark = {
            name: e.target['bookmark-name'].value,
            content: e.target['bookmark-content'].value,
            folder_id: e.target['bookmark-folder-id'].value,
            modified: new Date(),
        }
        fetch(`${config.API_ENDPOINT}/bookmarks`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBookmark),
        })
            .then(res => {
                if (!res.ok)
                    return res.json().then(e => Promise.reject(e))
                return res.json()
            })
            .then(bookmark => {
                this.context.addBookmark(bookmark)
                this.props.history.push(`/folder/${bookmark.folder_id}`)
            })
            .catch(error => {
                console.error({ error })
            })
    }

    render() {
        const { folders = [] } = this.context
        return (
            <section className='AddBookmark'>
                <h2>Create a bookmark</h2>
                <NebsForm onSubmit={this.handleSubmit}>
                    <div className='field'>
                        <label htmlFor='bookmark-name-input'>
                            Name
            </label>
                        <input type='text' id='bookmark-name-input' name='bookmark-name' />
                    </div>
                    <div className='field'>
                        <label htmlFor='bookmark-content-input'>
                            Content
            </label>
                        <textarea id='bookmark-content-input' name='bookmark-content' />
                    </div>
                    <div className='field'>
                        <label htmlFor='bookmark-folder-select'>
                            Folder
            </label>
                        <select id='bookmark-folder-select' name='bookmark-folder-id'>
                            <option value={null}>...</option>
                            {folders.map(folder =>
                                <option key={folder.id} value={folder.id}>
                                    {folder.name}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className='buttons'>
                        <button type='submit'>
                            Add Bookmark
            </button>
                    </div>
                </NebsForm>
            </section>
        )
    }
}
