import Landing from './Pages/Landing/Landing';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Explore from './Pages/Explore/Explore';
import PlayList from './Pages/PlayList/PlayList';
import WatchLater from './Pages/WatchLater/WatchLater';
import SingleVideo from './Pages/SingleVideo/SingleVideo';
import Navbar from './Components/Navbar/Navbar';
import Topbar from './Components/Topbar/Topbar';
import VideosList from './Pages/VideosList/VideosList';
import SinglePlayList from './Pages/SinglePlayList/SinglePlayList';
import { useEffect } from 'react';

function App() {



  return (
    <div className="App">
      <Topbar />
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/playlist' element={<PlayList />} />
        <Route path='/watchlater' element={<WatchLater />} />
        <Route path='/videos/:videoID' element={<SingleVideo />} />
        <Route path='/videos' element={<VideosList />} />
        <Route path='/playlist/:playlistName' element={<SinglePlayList />} />



      </Routes>

    </div>
  );
}

export default App;
