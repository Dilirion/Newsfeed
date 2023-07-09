import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateRoute } from '@features/auth/components/PrivateRoute/PrivateRoute';
import { AdminPage } from '@features/admin/components/AdminPage/AdminPage';
import { AdminArticles } from '@features/admin/components/AdminAricles/AdminArticles';
import { AdminArticleItem } from '@features/admin/components/AdminArticleItem/AdminArticleItem';
import { Page } from '@components/Page/Page';
import { LoginContainer } from '@features/auth/login/LoginContainer';
import { AuthContextProvider } from '@features/auth/AuthContextProvider';
import { initializeAPI } from '@app/api';

const firebaseApp = initializeAPI();

const Admin: FC = () => {
  return (
    <Switch>
      <AuthContextProvider firebaseApp={firebaseApp}>
        <PrivateRoute path={'/admin'} exact>
          <AdminPage>
            <AdminArticles />
          </AdminPage>
        </PrivateRoute>
        <Route path={'/admin/login'} exact>
          <Page>
            <LoginContainer />
          </Page>
        </Route>
        <PrivateRoute path={'/admin/create'}>
          <AdminPage>
            <AdminArticleItem />
          </AdminPage>
        </PrivateRoute>
        <PrivateRoute path={'/admin/edit/:id'}>
          <AdminPage>
            <AdminArticleItem />
          </AdminPage>
        </PrivateRoute>
      </AuthContextProvider>
    </Switch>
  );
};

export default Admin;
