/** @jsxImportSource @emotion/react */
import { VFC, ReactNode, memo } from 'react';
import { css } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

type Props = {
  children: ReactNode;
};

const DefaultLayout: VFC<Props> = memo(({ children }) => (
  <>
    <AppBar position="relative">
      <Toolbar sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Typography variant="h3" color="inherit" noWrap>
          React
        </Typography>
      </Toolbar>
    </AppBar>
    <Container
      component="main"
      maxWidth="sm"
      css={css`
        min-height: calc(100vh - 180px);
      `}
      sx={{ pt: 8, pb: 6 }}
    >
      {children}
    </Container>
    <Box sx={{ p: 6 }} component="footer">
      <Typography variant="body2" color="text.secondary" align="center">
        Copyright © Learn React {new Date().getFullYear()}
      </Typography>
    </Box>
  </>
));

export default DefaultLayout;
