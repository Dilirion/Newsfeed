import React, { useEffect, useRef } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { Page } from '@components/Page/Page';
import { HomePage } from '@features/articlesList/components/HomePage/HomePage';
import { CategoryPage } from '@features/categoryArticles/components/CategoryPage/CategoryPage';
import { ArticlePage } from '@features/articleItem/components/ArticlePage/ArticlePage';
const Admin = React.lazy(() => import('@app/components/Admin'));

export const App = () => {
  const location = useLocation();
  const { pathname } = location;
  const prevPathName = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPathName.current) {
      prevPathName.current = pathname;
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return (
    <div>
      <Switch location={location}>
        <Route path="/admin">
          <React.Suspense fallback={<div>loading</div>}>
            <Admin />
          </React.Suspense>
        </Route>
        <Route path={'/article/:id'}>
          <Page>
            <ArticlePage />
          </Page>
        </Route>
        <Route path={'/:category'}>
          <Page>
            <CategoryPage />
          </Page>
        </Route>
        <Route path={'/'}>
          <Page>
            <HomePage />
          </Page>
        </Route>
      </Switch>
    </div>
  );
};
