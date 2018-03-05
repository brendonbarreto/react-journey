import React from 'react'
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search'
import _ from 'lodash'
import SearchBar from './components/search_bar'
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'
const API_KEY = 'Cool API Key'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      videos: [],
      selectedVideo: null
    }

    this.videoSearch('rakin')
  }

  videoSearch(term) {
    YTSearch({
      key: API_KEY,
      term: term
    }, (videos) => {
      this.setState({videos: videos, selectedVideo: videos[0]})
    })
  }

  render() {
    return <div>
      <SearchBar onSearchTermChange={_.debounce((term) => this.videoSearch(term), 300) }/>
      <VideoDetail video={this.state.selectedVideo}/>
      <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos}/>
    </div>
  }
}

ReactDOM.render(<App/>, document.querySelector('.container'))
