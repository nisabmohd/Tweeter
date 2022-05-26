import './App.css';
import Navbar from './components/Navbar';
import Newtweet from './components/Newtweet';
import Post from './components/Post';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="left_container">
          <Newtweet />
          <div className="posts" style={{ marginTop: '39px' }}>
            <Post />
          </div>
        </div>
        <div className="right_container">

        </div>
      </div>
    </div>
  );
}

export default App;
