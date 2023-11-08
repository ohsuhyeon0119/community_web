import axios from 'axios';
import { apiURL } from '../App';
import type { PostThread } from '../type/type';
export function getThreadList() {
  return axios.get(apiURL + '/board/all').then((res) => res.data);
}
export function getBoards() {
  return axios.get(apiURL + '/boards').then((res) => res.data);
}
export function getThreadById(id: number) {
  return axios.get(apiURL + '/thread/' + id).then((res) => res.data);
}
export function deleteThreadById(id: number) {
  return axios.delete(apiURL + '/thread/' + id).then((res) => {
    res.data;
  });
}
export function writeThread(data: PostThread) {
  return axios.post(`${apiURL}/thread`, data).then((res) => res.data);
}
export function updateThread(data: PostThread, id?: string) {
  return axios.put(`${apiURL}/thread/${id}`, data).then((res) => res.data);
}
