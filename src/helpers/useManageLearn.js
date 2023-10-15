import React from 'react'
import PropTypes from 'prop-types'
import { useLearn } from '../context/Context';
import { articles } from '../data/articles'

function useManageLearn() {
    const { learnedArticles, dispatchLearnedArticles } = useLearn();

    function addLearnedArticle(article) {
        dispatchLearnedArticles({ type: 'addLearnedArticle', payload: { ...article } });
    }

    function clearAllLearnedArticles() {
        dispatchLearnedArticles({ type: 'clearAllLearnedArticles' });
    }

    function getProgress() {
        return `${learnedArticles.length} / ${articles.length}`
    }

    return { articles, learnedArticles, addLearnedArticle, clearAllLearnedArticles, getProgress };
}

useManageLearn.propTypes = {}

export default useManageLearn
