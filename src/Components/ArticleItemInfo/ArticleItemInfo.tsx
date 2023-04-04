import React, { FC } from 'react';
import './ArticleItemInfo.css';

type TProps = {
  categoryName: string;
  date: string;
  sourceLink?: string;
  sourceName?: string;
  author?: string;
};
export const ArticleItemInfo: FC<TProps> = ({ categoryName, date, sourceLink, sourceName, author }) => {
  return (
    <div className="grid">
      <div className="article-item-info__category-container">
        <span className="article-category article-item-info__category">{categoryName}</span>
        {sourceLink && (
          <a className="article-item-info__link" href={sourceLink} target="_blank" rel="noreferrer">
            Источник: {sourceName}
            {author && <span className="article-item-info__author">({author})</span>}
          </a>
        )}
      </div>
      <span className="article-date article-item-info__date">{date}</span>
    </div>
  );
};
