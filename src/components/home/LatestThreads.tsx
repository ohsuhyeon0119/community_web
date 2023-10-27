import { ThreadItem } from '../ThreadItem';
import { useState, useEffect } from 'react';
import styles from './../../pages/Home.module.css';

export default function LatestThreads() {
  return (
    <>
      <h1 style={{ textAlign: 'center', fontSize: '50px' }}>LATEST THREADS</h1>
      <div className={styles['home-threadItem-Container']}>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
        <ThreadItem></ThreadItem>
      </div>
    </>
  );
}
