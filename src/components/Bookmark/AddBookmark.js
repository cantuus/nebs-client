import React from 'react';
import config from '../../config';
import Context from '../../AppContext';

class AddBookmark extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookmark_name: '',
            nameValid: false,
            nameValidationMessage: '',
            contentValid: false,
            contentValidationMessage: '',
        }
        this.contentInput = React.createRef();
        this.folderInput = React.createRef();
    }
    static contextType = AppContext;

    populateOptions() {
        const folders = this.context.folders.map(folder => {
            return <option key={folder.id} value={folder.id}>{folder.folder_name}</option>
        });
        return folders;
    }

    updateName(bookmark_name) {
        this.setState({ bookmark_name }, () => { this.validateName(bookmark_name) });
    }

    validateName(name) {
        let errorMessage = this.state.nameValidationMessage;
        let error = this.state.nameValid;

        name = name.trim();
        if (name.length === 0) {
            errorMessage = 'Name must have at least 1 character';
            error = true;
        } else if (name.length > 20) {
            errorMessage = 'Name cannot be longer than 20 characters';
            error = true;
        } else {
            error = false;
            errorMessage = '';
        }

        this.setState({
            nameValid: !error,
            nameValidationMessage: errorMessage,
        });
    }

    validateContent(content) {
        let errorMessage = this.state.contentValidationMessage;
        let error = this.state.contentValid;

        content = content.trim();
        if (content.length === 0) {
            errorMessage = 'Content must have at least 1 character';
            error = true;
        }
        this.setState({
            contentValid: !error,
            contentValidationMessage: errorMessage
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const content = this.contentInput.current.value;
        this.validateContent(content);
        const folder_id = this.folderInput.current.value;
        const { bookmark_name } = this.state;

        const options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            },
            body: JSON.stringify({ bookmark_name, folder_id, content })
        }
        fetch(`${config.API_ENDPOINT}bookmarks`, options)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Something went wrong')
                }
                return res.json();
            })
            .then(bookmark => {
                this.context.addBookmark(bookmark);
                this.props.history.push(`/bookmark/${bookmark.id}`);
            })
            .catch(error => {
                console.log(error.message);
            });
    }


    render() {
        return (
            <section>
                <h2>Add Bookmark</h2>
                <form onSubmit={(event => this.handleSubmit(event))}>
                    <div>
                        <label htmlFor="bookmark-name-input">Name</label><br />
                        <input type="text" placeholder="Bookmark name..." id="bookmark-name-input" name="bookmark-name-input" value={this.state.name} onChange={event => this.updateName(event.target.value)} required />
                        {(!this.state.nameValid && this.state.nameValidationMessage) && <p className="error__message">{this.state.nameValidationMessage}</p>}<br />
                        <label htmlFor="content-input">content</label><br />
                        <textarea type="text" placeholder="content" id="bookmark-content-input" name="bookmark-content-input" ref={this.contentInput} required></textarea>
                        {(!this.state.contentValid && this.state.contentValidationMessage) && <p className="error__message">{this.state.contentValidationMessage}</p>}<br />
                        <select ref={this.folderInput}>{this.populateOptions()}</select>
                    </div>
                    <button type="submit" disabled={!this.state.nameValid && !this.state.contentValid}>Add Bookmark</button>
                </form>
            </section>
        );
    }
}

export default AddBookmark;