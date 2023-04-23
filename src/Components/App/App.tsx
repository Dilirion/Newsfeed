import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Articles } from '../Articles/Articles';
import { ArticleItem } from '../ArticleItem/ArticleItem';
import { Page } from '../Page/Page';
import { AdminPage } from '../AdminPage/AdminPage';
import { AdminArticles } from '../AdminAricles/AdminArticles';
import { AdminArticleItem } from '../AdminArticleItem/AdminArticleItem';

export const App = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Switch>
      <Route path={'/admin'} exact>
        <AdminPage>
          <AdminArticles />
        </AdminPage>
      </Route>
      <Route path={'/admin/create'}>
        <AdminPage>
          <AdminArticleItem />
        </AdminPage>
      </Route>
      <Route path={'/admin/edit/:id'}>
        <AdminPage>
          <AdminArticleItem />
        </AdminPage>
      </Route>
      <Route path={'/article/:id'}>
        <Page>
          <ArticleItem />
        </Page>
      </Route>
      <Route path={'/:categoryId'}>
        <Page>
          <Articles />
        </Page>
      </Route>
      <Route path={'/'}>
        <Page>
          <Articles />
        </Page>
      </Route>
    </Switch>
  );
};
