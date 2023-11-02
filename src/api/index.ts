import axios from 'axios';
import { apiURL } from '../App';

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

//usemutation과 연결
