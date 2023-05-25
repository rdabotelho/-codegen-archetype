import React, {Component} from 'react';
import ArticleService from '../../services/ArticleService';
import { NotificationContainer, NotificationManager } from 'react-notifications';

class ArticleEdit extends Component {

    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeText = this.onChangeText.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { 
            id: 0,
            title: '',
            text: '',
            author: '',
            date: '',
            status: ''
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeText(e) {
        this.setState({
            text: e.target.value
        });
    }

    onChangeAuthor(e) {
        this.setState({
            author: e.target.value
        });
    }

    onChangeDate(e) {
        this.setState({
            date: e.target.value
        });
    }

    onChangeStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    componentDidMount() {
        const id = window.location.pathname.match(/\/([0-9]+)$/)[1];
        ArticleService.getArticleById(id).then(response => {
            this.setState({
                id: response.data.id,
                title: response.data.title,
                text: response.data.text,
                author: response.data.author,
                date: response.data.date,
                status: response.data.status
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const obj = { 
            id: this.state.id,
            title: this.state.title,
            text: this.state.text,
            author: this.state.author,
            date: this.state.date,
            status: this.state.status
        };

        console.log(obj);

        ArticleService.updateArticle(obj).then(response => {
            NotificationManager.success("Article updated successfully", 'Success')
        })
        .catch(function (error) {
            console.log(error);
        });
        setTimeout(function () {
            window.location.href = "/";
        }, 500);
    }

    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Edit Article</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input type="text" className="form-control" value={this.state.title} onChange={this.onChangeTitle}/>
                    </div>
                    <div className="form-group">
                        <label>Text: </label>
                        <input type="text" className="form-control" value={this.state.text} onChange={this.onChangeText}/>
                    </div>
                    <div className="form-group">
                        <label>Author: </label>
                        <input type="text" className="form-control" value={this.state.author} onChange={this.onChangeAuthor}/>
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <input type="date" className="form-control" value={this.state.date} onChange={this.onChangeDate}/>
                    </div>
                    <div className="form-group">
                        <label>Status: </label>
                        <select className="form-control" value={this.state.status} onChange={this.onChangeStatus}>
                            <option value="CREATED">CREATED</option>
                            <option value="EVALUATED">EVALUATED</option>
                            <option value="PUBLISHED">PUBLISHED</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Save" className="btn btn-primary"/>
                    </div>
                </form>
                <NotificationContainer/>
            </div> 
        )
    }
}

export default ArticleEdit;