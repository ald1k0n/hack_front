import {
	Typography,
	Box,
	Card,
	CardContent,
	Button,
	Paper,
	TextField,
	Snackbar,
	Backdrop,
	CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAtom, atom } from 'jotai';
import { uploadItem } from '../shared/atoms';
import { PostData } from '../shared/endpoints';

import { useNavigate } from 'react-router-dom';

const VisuallyHiddenInput = styled('input')({
	clip: 'rect(0 0 0 0)',
	clipPath: 'inset(50%)',
	height: 1,
	overflow: 'hidden',
	position: 'absolute',
	bottom: 0,
	left: 0,
	whiteSpace: 'nowrap',
	width: 1,
});

const textAtom = atom<string | null>(null);
const responseAtom = atom<{
	message: string;
} | null>(null);
const loadingAtom = atom<boolean>(false);

export default function Create() {
	const [image, setImage] = useAtom(uploadItem);
	const [content, setContent] = useAtom(textAtom);
	const [resp, setResp] = useAtom(responseAtom);
	const [isLoading, setIsLoading] = useAtom(loadingAtom);
	const navigate = useNavigate();
	const uploadImage = async (e: any) => {
		const formData = new FormData();
		formData.append('file', e.target.files[0]);
		const imageUrl = await PostData('/upload', formData);
		setImage(imageUrl);
	};

	const handleCreate = async () => {
		const payload = {
			image: image || null,
			text: content,
		};
		setIsLoading(true);
		const response = await PostData('/create', payload);
		setIsLoading(false);
		if (response?.message) {
			setResp(response?.message);
		} else {
			navigate('/posts', {
				replace: true,
			});
		}
		setContent(null);
		setImage(null);
	};

	return (
		<>
			<Box
				style={{
					width: '100%',
					height: '100vh',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
				component={'div'}>
				<Card
					sx={{
						width: 500,
						height: 700,
						display: 'flex',
						alignItems: 'center',
						padding: '16px',
						flexDirection: 'column',
					}}>
					<CardContent>
						<Typography
							variant='h6'
							sx={{
								textAlign: 'center',
							}}
							color='text.secondary'>
							Создать пост
						</Typography>

						<Paper
							elevation={3}
							style={{
								width: '100%',
								height: '300px',
								marginBottom: 8,
							}}>
							{image && (
								<img
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'contain',
									}}
									src={image}
								/>
							)}
						</Paper>

						<div
							style={{
								width: '100%',
								display: 'flex',
								alignItems: 'center',
								flexDirection: 'column',
								rowGap: 8,
							}}>
							<Button
								component='label'
								variant='contained'
								tabIndex={-1}>
								Загрузить изображение
								<VisuallyHiddenInput
									type='file'
									onChange={uploadImage}
								/>
							</Button>
							<TextField
								multiline
								value={content}
								label='Контент'
								onChange={(e) => setContent(e.target?.value)}
							/>
						</div>
						<div
							style={{
								width: '100%',
								marginTop: 8,
							}}>
							<Button
								onClick={handleCreate}
								disabled={!content}
								style={{ width: '100%' }}
								variant='contained'>
								Создать
							</Button>
						</div>
					</CardContent>
				</Card>
			</Box>

			<Snackbar
				open={!!resp}
				message={
					'Контент является не допустимым для публикации, ваш пост будет проверен администрацией платформы'
				}
				autoHideDuration={3000}
			/>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={isLoading}>
				<CircularProgress color='inherit' />
			</Backdrop>
		</>
	);
}
