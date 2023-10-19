import React from 'react';
import PropTypes from 'prop-types';
import { useLearn } from '../context/Context';
import { articles } from '../data/articles';
import articlesNew from '../data/learn';

function useManageLearn() {
  const totalContentsCount = articlesNew.reduce((acc, currCategory) => {
    return acc + currCategory.content.length;
  }, 0);

  function countContentsByCatId(catId) {
    const category = articlesNew.find(cat => cat.catId === catId);

    if (category && category.content) {
      return category.content.length;
    }

    return 0;
  }

  const { learnedArticles, dispatchLearnedArticles } = useLearn();

  const totalCount = learnedArticles?.reduce((acc, category) => {
    return acc + category.content.length;
  }, 0);

  function countContentByCatId(catId) {
    const category = learnedArticles.find(cat => cat.catId === catId);

    if (category && category.content) {
      return category.content.length;
    }

    return 0;
  }





  function addLearnedArticle(arc, category) {
    // Check if the category exists in the learned articles
    const existingCategory = learnedArticles.find(
      item => item.catId === category,
    );
    // If the category doesn't exist, create a new entry and add the article to the content array
    const newCategory = {
      catId: category,
      content: [arc],
    };
    dispatchLearnedArticles({
      type: 'addNewCategoryAndArticle',
      payload: newCategory,
    });
  }

  function getArticlesByCategory(article) { }

  function clearAllLearnedArticles() {
    dispatchLearnedArticles({ type: 'clearAllLearnedArticles' });
  }

  function getProgress() {
    return `${totalCount} / ${String(totalContentsCount)}`;
  }

  function getProgressEach(catId) {
    return `${countContentByCatId(catId)} / ${String(countContentsByCatId(catId))}`;
  }


  return {
    articles,
    learnedArticles,
    addLearnedArticle,
    clearAllLearnedArticles,
    getProgress,
    getProgressEach,
    totalCount,
    totalContentsCount,
    countContentByCatId,
    countContentsByCatId
  };
}

useManageLearn.propTypes = {};

export default useManageLearn;
