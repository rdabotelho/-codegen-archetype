import axios from 'axios';

const ARTICLE_API_BASE_URL = "http://localhost:8080/api/articles";

class ArticleService {

    getArticles(){
        return axios.get(ARTICLE_API_BASE_URL);
    }

    createArticle(article){
        return axios.post(ARTICLE_API_BASE_URL, article);
    }

    getArticleById(articleId){
        return axios.get(ARTICLE_API_BASE_URL + '/' + articleId);
    }

    updateArticle(article){
        return axios.put(ARTICLE_API_BASE_URL + '/' + article.id, article);
    }

    deleteArticle(articleId){
        return axios.delete(ARTICLE_API_BASE_URL + '/' + articleId);
    }
}

export default new ArticleService()