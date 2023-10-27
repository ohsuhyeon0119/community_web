import { IoIosCreate } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { IoCreateOutline } from 'react-icons/io5';

import styles from '../pages/ScreenLayout.module.css';
import { useNavigate } from 'react-router-dom';

export function CreateButton() {
  const navi = useNavigate();
  return (
    <>
      {' '}
      <IconContext.Provider value={{ size: '30px' }}>
        <div
          onClick={() => {
            navi('/create');
          }}
          className={styles.createButton}
        >
          <IoCreateOutline></IoCreateOutline>
        </div>
      </IconContext.Provider>
    </>
  );
}
