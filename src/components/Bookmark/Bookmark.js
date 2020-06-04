import React from 'react';
import { Link } from 'react-router-dom';
import Context from '../../Context';
import PropTypes from 'prop-types';
import config from '../../config';

class Note extends React.Component {
    static contextType = Context;
    static propTypes = {
        id: PropTypes.number,
        name: PropTypes.string,
        modified: PropTypes.string
    }

    handleDeleteBookmark = () => {
        fetch(`${config.API_ENDPOINT}bookmarks/${this.props.id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${config.API_KEY}`
            }
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error('Something went wrong!')
                }
            })
            .then(() => {
                if (this.props.history) { this.props.history.push('/') };
                this.context.handleDeleteBookmark(this.props.id);
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    render() {
        return (
            <div className="bookmark">
                <h3><Link to={`/bookmark/${this.props.id}`} >{this.props.name}</Link></h3>
                <button className="delete" onClick={() => this.handleDeleteBookmark()}>Delete</button>
            </div>
        );
    }
}

export default Bookmark;