import {
	Container,
	Card,
	CardContent,
	CardMedia,
	Typography,
	SpeedDial,
	SpeedDialIcon,
	SpeedDialAction,
	Backdrop,
} from '@mui/material';

import AddIcon from '@mui/icons-material/add';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAtom, atom } from 'jotai';
import { GetData } from '../shared/endpoints';

interface IPost {
	id: string;
	text: string;
	image_id: string;
	video_id: string;
	isHarmful: boolean;
}

const postsAtom = atom<IPost[]>([]);

const dialOpen = atom<boolean>(false);

export default function Posts() {
	const [posts, setPosts] = useAtom(postsAtom);
	const [isDialOpen, setIsDialOpen] = useAtom(dialOpen);
	const navigate = useNavigate();
	useEffect(() => {
		GetData('/').then(setPosts);
	}, []);

	return (
		<Container maxWidth='md'>
			{posts?.map((post) => (
				<Card
					key={post?.id}
					sx={{ maxWidth: '100%', marginBottom: 8 }}>
					{post?.image_id && (
						<CardMedia
							sx={{ height: 350 }}
							image={`http://localhost:8080/api/image/${post?.image_id}`}
						/>
					)}
					<CardContent>
						<Typography variant='caption'>{post?.text}</Typography>
					</CardContent>
				</Card>
			))}
			<Backdrop open={isDialOpen} />
			<SpeedDial
				onOpen={() => setIsDialOpen(true)}
				onClose={() => setIsDialOpen(false)}
				ariaLabel='Меню'
				icon={<SpeedDialIcon />}
				sx={{ position: 'absolute', bottom: 16, right: 16 }}>
				<SpeedDialAction
					onClick={() => navigate('/')}
					icon={<AddIcon />}
					tooltipTitle='Создать пост'
				/>
			</SpeedDial>
		</Container>
	);
}
