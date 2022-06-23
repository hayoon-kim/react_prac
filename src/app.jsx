
import './app.css';
import React, { useEffect, useState } from 'react';
import VideoList from './components/video_list/video_list';

function App() {

  //처음엔 텅텅 빈 비디오의 목록
  const [videos, setVideos] = useState([]);

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
    <VideoList videos={videos} />
  );
}

export default App;
