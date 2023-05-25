import React, { Component } from 'react';
import ArticleService from '../../services/ArticleService';
import ArticleRow from './ArticleRow';

class ArticleList extends Component {

    constructor(props) {
        super(props);
        this.state = {articleList: []};
    }

    componentDidMount() {
        ArticleService.getArticles().then(response => {
            this.setState({articleList: response.data});
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    tabRow() {
        return this.state.articleList.map(function (object, i) {
            return <ArticleRow obj={object} key={i}/>;
        });
    }

    render() {
        return (
            <div>
                <h3 align="center">Article List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Text</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.tabRow()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ArticleList;