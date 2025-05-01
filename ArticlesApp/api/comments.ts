import client from "./client.ts";
import {Comment} from "./types.ts";

export async function getComments(articleId: number) {
    const response = await client.get<Comment[]>(
        `/articles/${articleId}/comments`,
    );
    return response.data;
}
