
import styles from './app.module.css';
import React, { useEffect, useState } from 'react';
import VideoList from './components/video_list/video_list';
import SearchHeader from './components/seach_header/search_header';
import VideoDetail from './components/video_detail/video_detail';

function App({youtube}) {

  //처음엔 텅텅 빈 비디오의 목록
  const [videos, setVideos] = useState([]);
  
  const [selectedVideo, setSelectedVideo] = useState(null);

  const selectVideo = (video) => {
    setSelectedVideo(video);
  }

  const search = query => {
    //query라는 param을 받아오고 이것을 처리해줄 것
    setSelectedVideo(null);
    youtube
      .search(query)
      .then(videos => {
        setVideos(videos);
      });
  }

  //마운트가 되어 업데이트가 되면 쓸 수 있음
  useEffect(()=>{
    youtube
      .mostPopular()
      .then(videos => setVideos(videos));
  }, [youtube]);
  // []안적으면 state나 prop이 업데이트 될때마다 반복 호출됨


  return (
    <div className={styles.app}>
    <SearchHeader onSearch={search}/>
    <section className={styles.content}>
      {selectedVideo && <div className={styles.detail}>
        <VideoDetail video={selectedVideo} />
      </div> }
      <div className={styles.list}>
        <VideoList 
          videos={videos} 
          onVideoClick={selectVideo} 
          display={ selectedVideo? 'list' : 'grid' }
        />
      </div>
    </section>
    
    </div>
  );
}

export default App;
