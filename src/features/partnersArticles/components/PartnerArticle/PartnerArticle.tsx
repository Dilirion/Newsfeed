import React, { useEffect, useState } from 'react';
import './PartnerArticle.css';
import { IPartnerArticle } from '@features/partnersArticles/types';
import { useTranslation } from 'react-i18next';
import { apiFetchMainPartnerArticle } from '@app/publicApi';

export const PartnerArticle = () => {
  const { t } = useTranslation();
  const [article, serArticle] = useState<Record<keyof IPartnerArticle, { stringValue: string }> | null>(null);
  useEffect(() => {
    (async () => {
      const article = await apiFetchMainPartnerArticle();

      serArticle(article);
    })();
  }, []);

  if (!article) {
    return null;
  }

  return (
    <article className="partner-article">
      <div className="partner-article__container container grid">
        <div className="partner-article__image-container">
          <img src={article.image.stringValue} alt={article.title.stringValue} className="partner-article__image" />
        </div>
        <div className="partner-article__content">
          <span className="partner-article__caption">
            {t('partner_article_caption', { name: article['company-name'].stringValue })}
          </span>
          <h2 className="partner-article__title">{article.title.stringValue}</h2>
          <p className="partner-article__text">{article.description.stringValue}</p>
        </div>
      </div>
    </article>
  );
};
