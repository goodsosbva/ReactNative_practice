import client from './client';
import {Article} from "./types.ts";

export async function getArticles({
    limit = 10,
    cursor,
    prevCursor,
}: {
    limit?: number;
    cursor?: number;
    prevCursor?: number;
}) {
    const response = await client.get<Article[]>('/articles', {
        params: {
            _sort: 'id:DESC',
            _limit: limit,
            id_lt: cursor,
            id_gt: prevCursor,
        }
    });
    return response.data;
}

export async function getArticle(id: number) {
    const response = await client.get<Article>(`/articles/${id}`);
    return response.data;
}

export async function writeArticle(params: {title: string, body: string}) {
    const response = await client.post('/articles', params);
    return response.data;
}

export async function modifyArticle(params: {id: number, title: string, body: string}) {
    const {id, title, body} = params;
    const response = await client.put(`/articles/${id}`, {title, body});
    return response.data;
}

export async function deleteArticle(id: number) {
    await client.delete(`/articles/${id}`);
    return null;
}
