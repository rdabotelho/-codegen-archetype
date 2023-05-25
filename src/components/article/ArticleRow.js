import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import ArticleService from '../../services/ArticleService';

class ArticleRow extends Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }

    delete() {
        if (!window.confirm("Confirm exclusion?")) return; 
        ArticleService.deleteArticle(this.props.obj.id).then( res => {
            setTimeout(function () {
                window.location.href = "/";
            }, 300);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.id}
                </td>
                <td>
                    {this.props.obj.title}
                </td>
                <td>
                    {this.props.obj.text}
                </td>
                <td>
                    {this.props.obj.author}
                </td>
                <td>
                    {this.props.obj.date}
                </td>
                <td>
                    {this.props.obj.status}
                </td>
                <td>
                    <Link to={"/edit/"+this.props.obj.id} className="btn btn-primary">Edit</Link>
                </td>
                <td>
                    <button onClick={this.delete} className="btn btn-danger">Delete</button>
                </td>
                <NotificationContainer/>
            </tr>
            
        );
    }
}

export default ArticleRow;