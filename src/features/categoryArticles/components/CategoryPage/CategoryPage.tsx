import React, { FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import './CategoryPage.css';
import { CategoryNames } from '@features/categories/types';
import { categoryIds } from '@features/categories/constants';
import { SidebarArticleCard } from '@components/SidebarArticleCard/SidebarArticleCard';
import { Hero } from '@components/Hero/Hero';
import { ArticleCard } from '@components/ArticleCard/ArticleCard';
import { Dispatch } from '@app/store';
import { fetchCategoryArticles } from '@features/categoryArticles/actions';
import { getCategoryNews } from '@features/categoryArticles/selectors';
import { getCategories } from '@features/categories/selectors';
import { getSources } from '@features/sources/selectors';
import { HeroSkeleton } from '@components/Hero/HeroSkeleton';
import { SidebarArticleCardSkeleton } from '@components/SidebarArticleCard/SidebarArticleCardSkeleton';
import { repeat } from '@app/utils';
import { useAdaptive } from '@app/hooks';

export const CategoryPage: FC = () => {
  const { category }: { category: CategoryNames } = useParams();
  const dispatch = useDispatch<Dispatch>();
  const articles = useSelector(getCategoryNews(categoryIds[category]));
  const categories = useSelector(getCategories);
  const sources = useSelector(getSources);
  const [loading, setLoading] = useState(true);
  const { isMobile, isDesktop } = useAdaptive();
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    setLoading(true);
    dispatch(fetchCategoryArticles({ lang: i18n.language, id: categoryIds[category] }))
      .unwrap()
      .then(() => {
        setLoading(false);
      });
  }, [category, i18n.language]);

  if (loading) {
    return (
      <div className="category-page" aria-label={t('loading')}>
        <div aria-hidden>
          <HeroSkeleton title={t(`category_${category}`)} className="category-page__hero" />
          <div className="container grid">
            {isDesktop && (
              <section className="category-page__sidebar">
                {repeat((i) => {
                  return <SidebarArticleCardSkeleton key={i} className="category-page__sidebar-item" />;
                }, 3)}
              </section>
            )}
            <section className="category-page__sidebar">
              {repeat((i) => {
                return <SidebarArticleCardSkeleton key={i} className="category-page__sidebar-item" />;
              }, 3)}
            </section>
          </div>
        </div>
      </div>
    );
  }

  const mainArticles = isMobile ? articles : articles.slice(3);

  return (
    <div className="category-page">
      <Hero
        title={t(`category_${category}`)}
        image={require(`@images/categories/${category}.jpg`)}
        className="category-page__hero"
      />
      <section className="container grid">
        <div className="category-page__content">
          {mainArticles.map((item) => {
            const category = categories.find(({ id }) => item.category_id === id);
            const source = sources.find(({ id }) => item.source_id === id);

            return (
              <ArticleCard
                className="category-page__item"
                id={item.id}
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
                category={category?.name}
                source={source?.name}
              />
            );
          })}
        </div>
        {isDesktop && (
          <aside className="category-page__sidebar">
            {articles.slice(0, 3).map((item) => {
              const source = sources.find(({ id }) => item.source_id === id);

              return (
                <SidebarArticleCard
                  className="category-page__sidebar-item"
                  image={item.image}
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  source={source?.name || ''}
                  date={item.date}
                />
              );
            })}
          </aside>
        )}
      </section>
    </div>
  );
};
