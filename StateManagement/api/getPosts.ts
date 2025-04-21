import axios from 'axios';
import {Post} from './types'

export async function getPost() {
    const response = await axios.get<Post[]>(
        'https://jsonplaceholder.typicode.com/posts',
    );
    return response.data;
}
