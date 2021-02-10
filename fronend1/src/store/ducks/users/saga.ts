import { call, put, takeLatest } from 'redux-saga/effects'
import {TagsApi} from '../../../services/api/tagsApi';
import { LoadingStatus } from '../../types';
import { UsersActionsType } from './actionCreators';

export function* fetchUsersRequest() {
    // try {
    //     const users = yield call(TagsApi.fetchTags);
    //     yield put(setTags(tags));
    // } catch (error) {
    //     yield put(setUsersLoadingStatus(LoadingStatus.ERROR))
    // }
}

export function* usersSaga() {
//   yield takeLatest(UsersActionsType.FETCH_ITEMS, fetchUsersRequest);
}