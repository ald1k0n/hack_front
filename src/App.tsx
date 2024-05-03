import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const CreatePage = lazy(() => import('./pages/Create'));
const PostsPage = lazy(() => import('./pages/Posts'));

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Backdrop, CircularProgress, Typography } from '@mui/material';

const darkTheme = createTheme({
	palette: {
		mode: 'dark',
	},
});

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<Suspense
					fallback={
						<Backdrop open>
							<CircularProgress color='inherit' />
						</Backdrop>
					}>
					<Typography
						variant='h4'
						sx={{
							textAlign: 'center',
						}}>
						ABAS
					</Typography>
					<Routes>
						<Route
							path='/'
							element={<CreatePage />}
						/>
						<Route
							path='/posts'
							element={<PostsPage />}
						/>
					</Routes>
				</Suspense>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
