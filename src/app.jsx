
import styles from './app.module.css';
import React, { useEffect, useState } from 'react';
import VideoList from './components/video_list/video_list';
import SearchHeader from './components/seach_header/search_header';

function App({youtube}) {

  //처음엔 텅텅 빈 비디오의 목록
  const [videos, setVideos] = useState([]);
  
  const search = query => {
    //query라는 param을 받아오고 이것을 처리해줄 것
    youtube
      .search(query)
      .then(videos => setVideos(videos));
  }

  //마운트가 되어 업데이트가 되면 쓸 수 있음
  useEffect(()=>{
    youtube
      .mostPopular()
      .then(videos => setVideos(videos));
  }, []);
  // []안적으면 state나 prop이 업데이트 될때마다 반복 호출됨


  return (
    <div className={styles.app}>
    <SearchHeader onSearch={search}/>
    <VideoList videos={videos} />
    
    </div>
  );
}

export default App;
