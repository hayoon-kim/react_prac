
import styles from './app.module.css';
import React, { useEffect, useState } from 'react';
import VideoList from './components/video_list/video_list';
import SearchHeader from './components/seach_header/search_header';

function App() {

  //처음엔 텅텅 빈 비디오의 목록
  const [videos, setVideos] = useState([]);
  
  const search = query => {
    //query라는 param을 받아오고 이것을 처리해줄 것
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=AIzaSyBlk3LfwMCisJM00G2Hf1_Ffq94kMx9KlM`, requestOptions)
      .then(response => response.json())
      .then(result => result.items.map(item=>({...item, id: item.id.videoId})))
      .then(items => setVideos(items))
      .catch(error => console.log('error', error));
  }

  //마운트가 되어 업데이트가 되면 쓸 수 있음
  useEffect(()=>{
    const requestOptions = {
      method: 'GET',
      redirect: 'follow', //fetch를 써서 request를 할 때 옵션을 전달하는 것
    };
    
    fetch("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyBlk3LfwMCisJM00G2Hf1_Ffq94kMx9KlM", requestOptions)
      .then(response => response.json()) //text로 적혀있을테지만 json으로 변경해서 가져오는게 좋음.
      .then(result => setVideos(result.items))
      .catch(error => console.log('error', error));
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
