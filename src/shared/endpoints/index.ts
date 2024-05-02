import { api } from '../api';

export const PostData = async (url: string, payload: any) => {
	const { data } = await api.post(url, payload);
	return data;
};

export const GetData = async (url: string) => {
	const { data } = await api.get(url);
	return data;
};
