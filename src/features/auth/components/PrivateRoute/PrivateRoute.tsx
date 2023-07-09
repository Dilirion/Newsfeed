import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useAuthContext } from '../../AuthContextProvider';
import { Box, CircularProgress } from '@mui/material';

type Tprops = {
  children?: React.ReactNode;
} & RouteProps;

export const PrivateRoute: FC<Tprops> = ({ children, ...rest }) => {
  const { isAuthenticate } = useAuthContext();
  if (isAuthenticate === null) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <CircularProgress />
      </Box>
    );
  } else {
    return (
      <Route
        {...rest}
        render={(props) => {
          return isAuthenticate ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/admin/login',
                state: { from: props.location },
              }}
            />
          );
        }}
      />
    );
  }
};
