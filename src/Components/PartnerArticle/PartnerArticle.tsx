import React, { useEffect, useState } from 'react';
import './PartnerArticle.css';
import { getMainPartnerArticle } from '../../api';
import { IPartnerArticle } from '../../Types';

export const PartnerArticle = () => {
  const [article, serArticle] = useState<IPartnerArticle | null>(null);
  useEffect(() => {
    (async () => {
      const article = await getMainPartnerArticle();

      serArticle(article);
    })();
  }, []);

  if (!article) {
    return null;
  }

  return (
    <section className="partner-article">
      <div className="container grid">
        <div className="partner-article__image-container">
          <img src={article.image} alt={article.title} className="partner-article__image" />
        </div>
        <div className="partner-article__content">
          <span className="partner-article__caption">Партнерский материал от {article['company-name']}</span>
          <h2 className="partner-article__title">{article.title}</h2>
          <p className="partner-article__text">{article.description}</p>
        </div>
      </div>
    </section>
  );
};
