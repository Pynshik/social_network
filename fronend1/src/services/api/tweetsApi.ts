import { axios } from '../../core/axios';
import { TweetInterface } from '../../store/ducks/tweets/contracts/state';

interface Response<T> {
    status: string;
    data: T;
}

export const TweetsApi = {
    async fetchTweets(userId?: string): Promise<TweetInterface[]> {
        const {data} = await axios.get<Response<TweetInterface[]>>(userId ? `http://localhost:8888/tweets/user/${userId}` : 'http://localhost:8888/tweets/');
        return data.data;
    },
    async fetchTweetData(id: string): Promise<TweetInterface> {
        const {data} = await axios.get<Response<TweetInterface>>('http://localhost:8888/tweets/' + id);
        return data.data;
    },
    async addTweet(payload: { text: string, images: string[] }): Promise<TweetInterface> {
        const {data} = await axios.post<Response<TweetInterface>>('http://localhost:8888/tweets', payload);
        return data.data;
    },
    removeTweet: (id: string): Promise<void> => axios.delete('http://localhost:8888/tweets/' + id),
}