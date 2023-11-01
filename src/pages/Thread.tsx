import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiURL } from '../App';
import type { Thread } from '../App';
import { getThreadById, deleteThreadById } from '../api';
import { useQuery } from '@tanstack/react-query';

interface ThreadBoxProps {
  thread: Thread;
  id: number;
}

function ThreadBox({ thread, id }: ThreadBoxProps) {
  const navi = useNavigate();

  return (
    <div>
      <h1>{thread?.title}</h1>
      <p>{thread?.content}</p>
      <p>{thread?.liked}</p>
      <p>author : {thread?.author}</p>
      <p>date : {thread?.date.toString()}</p>
      <hr />
      <button
        onClick={() => {
          navi('/write/' + id);
        }}
      >
        수정
      </button>
    </div>
  );
}

export function Thread() {
  const { id } = useParams();
  const threadQuery = useQuery({
    queryKey: ['thread', Number(id)],
    queryFn: () => getThreadById(Number(id)),
  });

  const navi = useNavigate();

  return (
    <>
      {!!threadQuery.data && (
        <ThreadBox thread={threadQuery.data} id={Number(id)}></ThreadBox>
      )}

      <button disabled={true}>좋아요</button>
      <button
        onClick={() => {
          navi(-1);
        }}
      >
        뒤로가기
      </button>
      <button
        onClick={() => {
          deleteThreadById(Number(id));
          navi(-1);
        }}
      >
        게시글 삭제
      </button>
    </>
  );
}
