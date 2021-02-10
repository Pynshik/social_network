import axios from 'axios';
import { TagsStateInterface } from '../../store/ducks/tags/contracts/state';

export const TagsApi = {
    fetchTags(): Promise<TagsStateInterface['items']> {
        return axios.get('http://localhost:3001/tags').then(({data}) => data);
    }
}