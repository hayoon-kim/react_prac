import styles from './search_header.module.css';
import React, { useRef } from 'react';

const SearchHeader = ({ onSearch }) => {
  //search 라는 이벤트가 발생하면 전달해주는 콜백 함수를 불러랏!
  
  const inputRef = useRef();

  const handleSearch = () => {
    const value = inputRef.current.value;
    console.log(value);
    onSearch(value);
    //검색한 것을 prop으로 받아와야함.
  }

  const onClick = () => {
    handleSearch();
  };

  const onKeyPress = (event) => {
    if (event.key === 'Enter') {
      //enter 키를 클릭했을때
      handleSearch();
    }
  };

    return (
      <header className={styles.header}>
        <div className={styles.logo}>
          <img className={styles.img} src="/images/logo.png" alt="logo" />
          <h1 className={styles.title}>Youtube</h1>
        </div>
        <input 
          ref={inputRef} 
          className={styles.input} 
          type="search" 
          onKeyPress={onKeyPress} 
          placeholder="Search.."
        />
        <button className={styles.button} onClick={onClick} type="submit">
          <img className={styles.buttonImg} src="/images/search.png" alt="search" />
        </button>
      </header>
    )
};

export default SearchHeader;