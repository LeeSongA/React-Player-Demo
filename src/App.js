import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { hot } from 'react-hot-loader'
import screenfull from 'screenfull'

import './reset.css'
import './defaults.css'
import './range.css'
import './App.css'

import { version } from '../package.json'
import ReactPlayer from 'react-player'
import Duration from './Duration'
import Switch from './Switch';

class App extends Component {
  state = {
    url: 'https://firebasestorage.googleapis.com/v0/b/medflix3.appspot.com/o/SubtotalGastrectomy(60%25).mp4?alt=media&token=5ad2535b-4b06-430c-852f-1828f9f1f86c',
    pip: false,
    playing: false,
    controls: true,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false
  }

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0,
      pip: false
    })
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handleStop = () => {
    this.setState({ url: null, playing: false })
  }

  handleToggleControls = () => {
    const url = this.state.url
    this.setState({
      controls: !this.state.controls,
      url: null
    }, () => this.load(url))
  }

  handleToggleLight = () => {
    this.setState({ light: !this.state.light })
  }

  handleToggleLoop = () => {
    this.setState({ loop: !this.state.loop })
  }

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  handleToggleMuted = () => {
    this.setState({ muted: !this.state.muted })
  }

  handleSetPlaybackRate = e => {
    this.setState({ playbackRate: parseFloat(e.target.value) })
  }

  handleTogglePIP = () => {
    this.setState({ pip: !this.state.pip })
  }

  handlePlay = () => {
    console.log('onPlay')
    this.setState({ playing: true })
  }

  handleEnablePIP = () => {
    console.log('onEnablePIP')
    this.setState({ pip: true })
  }

  handleDisablePIP = () => {
    console.log('onDisablePIP')
    this.setState({ pip: false })
  }

  handlePause = () => {
    console.log('onPause')
    this.setState({ playing: false })
  }

  handleSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }

  handleSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }

  handleProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }

  handleEnded = () => {
    console.log('onEnded')
    this.setState({ playing: this.state.loop })
  }

  handleDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }

  handleClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }

  renderLoadButton = (url, label) => {
    return (
      <button onClick={() => this.load(url)}>
        {label}
      </button>
    )
  }

  ref = player => {
    this.player = player
  }

  render () {
    const { url, playing, controls, light, volume, muted, loop, played, loaded, duration, playbackRate, pip } = this.state
    const SEPARATOR = ' · '

    return (
      <div className='app'>
        <section className='section'>
          <div className='section-left'>
            <h1>ReactPlayer Demo</h1>
            <div className='player-wrapper'>
              <ReactPlayer
                ref={this.ref}
                className='react-player'
                width='100%'
                height='100%'
                url={url}
                pip={pip}
                playing={playing}
                controls={controls}
                light={light}
                loop={loop}
                playbackRate={playbackRate}
                volume={volume}
                muted={muted}
                onReady={() => console.log('onReady')}
                onStart={() => console.log('onStart')}
                onPlay={this.handlePlay}
                onEnablePIP={this.handleEnablePIP}
                onDisablePIP={this.handleDisablePIP}
                onPause={this.handlePause}
                onBuffer={() => console.log('onBuffer')}
                onSeek={e => console.log('onSeek', e)}
                onEnded={this.handleEnded}
                onError={e => console.log('onError', e)}
                onProgress={this.handleProgress}
                onDuration={this.handleDuration}
              />
            </div>

            <div className="highlighter">
              <Switch />
            </div>
            
            <div className="progress-bar">
              <div className="progressT">
                <p>Progress</p>
                <p>Phase</p>
                <p>Event</p>
                <p>Action</p>
              </div>
              <div>
              <svg width="560">
                <g className="progress-containerT">
                  <line
                    x1="0"
                    y1="50%"
                    x2="100%"
                    y2="50%"
                    strokeWidth="110"
                  />
                </g>
                <g className="progress-content">
                  <a className="c-link c-link--github" href='https://github.com/hutom-io' aria-label="Github">
                  <line
                    className="progress-phase1"
                    x1="10%"
                    y1="40%"
                    x2="20%"
                    y2="40%"
                    fill="transparent"
                    strokeWidth="20"
                  />
                  </a>
                  <line
                    className="progress-phase2"
                    x1="40%"
                    y1="40%"
                    x2="45%"
                    y2="40%"
                    fill="transparent"
                    strokeWidth="20"
                  />
                  <line
                    className="progress-phase3"
                    x1="75%"
                    y1="40%"
                    x2="83%"
                    y2="40%"
                    fill="transparent"
                    strokeWidth="20"
                  />
                  <line
                    className="progress-phase4"
                    x1="72%"
                    y1="40%"
                    x2="73%"
                    y2="40%"
                    fill="transparent"
                    strokeWidth="20"
                  />
                  <line
                    className="progress-loaded"
                    x1="0"
                    y1="20%"
                    x2={loaded*560}
                    y2="20%"
                    fill="transparent"
                    strokeWidth="20"
                  />
                  <line
                    className="progress-gap"
                    x1="0"
                    y1="30%"
                    x2="100%"
                    y2="30%"
                    fill="transparent"
                    strokeWidth="10"
                  />
                  <line
                    className="progress-gap"
                    x1="0"
                    y1="50%"
                    x2="100%"
                    y2="50%"
                    fill="transparent"
                    strokeWidth="10"
                  />
                  <line
                    className="progress-gap"
                    x1="0"
                    y1="70%"
                    x2="100%"
                    y2="70%"
                    fill="transparent"
                    strokeWidth="10"
                  />
                  <line
                    className="progress-played"
                    x1={played*560-1}
                    y1="50%"
                    x2={played*560}
                    y2="50%"
                    fill="transparent"
                    strokeWidth="150"
                  />
                </g>
              </svg>

              </div>
              
            </div>

            <div className="Seek">
              <input
                type='range' min={0} max={1} step='any'
                value={played}
                onMouseDown={this.handleSeekMouseDown}
                onChange={this.handleSeekChange}
                onMouseUp={this.handleSeekMouseUp}
              />
            </div>


            <table className='progress-bar'>
              <tbody>             
                <tr>
                  <th>Played</th>
                  <td><progress clss="progressTag" max={1} value={played} /></td>
                </tr>
                <tr>
                  <th>Loaded</th>
                  <td><progress clss="progressTag" max={1} value={loaded} /></td>
                </tr>

                <tr>
                  <th>Progress</th>
                  <td>
                    <svg className="progressSvg" height="10" width="560">
                      <g className="progress-container">
                        <line
                          x1="0"
                          y1="50%"
                          x2="100%"
                          y2="50%"
                          strokeWidth="10"
                        />
                      </g>
                      <g className="progress-content">
                        <line
                          className="progress-loaded"
                          x1="0"
                          y1="50%"
                          x2={loaded*560}
                          y2="50%"
                          fill="transparent"
                          strokeWidth="10"
                        />
                        <line
                          className="progress-played"
                          x1={played*560-1}
                          y1="50%"
                          x2={played*560}
                          y2="50%"
                          fill="transparent"
                          strokeWidth="500"
                        />
                      </g>
                    </svg>
                  </td>
                </tr>

                <tr>
                  <th>Marked</th>
                  <td>
                    <svg className="progressSvg" height="10" width="560">
                      <g className="progress-container">
                        <line
                          x1="0"
                          y1="50%"
                          x2="100%"
                          y2="50%"
                          strokeWidth="10"
                        />
                      </g>
                      <g className="progress-content">
                        <line
                          className="progress-phase1"
                          x1="10%"
                          y1="50%"
                          x2="20%"
                          y2="50%"
                          fill="transparent"
                          strokeWidth="10"
                        />
                        <line
                          className="progress-phase2"
                          x1="40%"
                          y1="50%"
                          x2="45%"
                          y2="50%"
                          fill="transparent"
                          strokeWidth="10"
                        />
                        <line
                          className="progress-phase3"
                          x1="75%"
                          y1="50%"
                          x2="83%"
                          y2="50%"
                          fill="transparent"
                          strokeWidth="10"
                        />
                        <line
                          className="progress-phase4"
                          x1="72%"
                          y1="50%"
                          x2="73%"
                          y2="50%"
                          fill="transparent"
                          strokeWidth="10"
                        />
                      </g>
                    </svg>
                  </td>
                </tr>

                <tr>
                  <th>Test</th>
                  <td>
                    <svg className="progressSvg" height="25" width="560">
                      <g className="progress-container">
                        <line
                          x1="0"
                          y1="50%"
                          x2="100%"
                          y2="50%"
                          strokeWidth="25"
                        />
                      </g>
                      <g className="progress-content">
                        <a className="c-link c-link--github" href='https://github.com/hutom-io' aria-label="Github">
                          <line
                            className="progress-phase1"
                            x1="10%"
                            y1="50%"
                            x2="20%"
                            y2="50%"
                            fill="transparent"
                            strokeWidth="25"
                          />
                        </a>
                        <line
                          className="progress-phase2"
                          x1="40%"
                          y1="50%"
                          x2="45%"
                          y2="50%"
                          fill="transparent"
                          strokeWidth="25"
                        />
                        <line
                          className="progress-phase3"
                          x1="75%"
                          y1="50%"
                          x2="83%"
                          y2="50%"
                          fill="transparent"
                          strokeWidth="25"
                        />
                        <line
                          className="progress-phase4"
                          x1="72%"
                          y1="50%"
                          x2="73%"
                          y2="50%"
                          fill="transparent"
                          strokeWidth="25"
                        />
                        <line
                          className="progress-loaded"
                          x1="0"
                          y1="20%"
                          x2={loaded*560}
                          y2="20%"
                          fill="transparent"
                          strokeWidth="13"
                        />
                        <line
                          className="progress-gap"
                          x1="0"
                          y1="50%"
                          x2="100%"
                          y2="50%"
                          fill="transparent"
                          strokeWidth="3"
                        />
                        <line
                          className="progress-played"
                          x1={played*560-1}
                          y1="50%"
                          x2={played*560}
                          y2="50%"
                          fill="transparent"
                          strokeWidth="25"
                        />
                      </g>
                    </svg>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className='section'>
          <div className='section-right'>
            <table>
              <tbody>
                <tr>
                  <th>Custom URL</th>
                  <td>
                    <input ref={input => { this.urlInput = input }} type='text' placeholder='Enter URL' />
                    <button onClick={() => this.setState({ url: this.urlInput.value })}>Load</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <table>
              <tbody>
              <tr>
                  <th>
                    <label htmlFor='controls'>Controls</label>
                  </th>
                  <td>
                    <input id='controls' type='checkbox' checked={controls} onChange={this.handleToggleControls} />
                    <em>&nbsp; Requires player reload</em>
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor='muted'>Muted</label>
                  </th>
                  <td>
                    <input id='muted' type='checkbox' checked={muted} onChange={this.handleToggleMuted} />
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor='loop'>Loop</label>
                  </th>
                  <td>
                    <input id='loop' type='checkbox' checked={loop} onChange={this.handleToggleLoop} />
                  </td>
                </tr>
                <tr>
                  <th>
                    <label htmlFor='light'>Light mode</label>
                  </th>
                  <td>
                    <input id='light' type='checkbox' checked={light} onChange={this.handleToggleLight} />
                  </td>
                </tr>
                <tr>
                  <th>Controls</th>
                  <td>
                    <button onClick={this.handleStop}>Stop</button>
                    <button onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
                    <button onClick={this.handleClickFullscreen}>Fullscreen</button>
                    {light &&
                      <button onClick={() => this.player.showPreview()}>Show preview</button>}
                    {ReactPlayer.canEnablePIP(url) &&
                      <button onClick={this.handleTogglePIP}>{pip ? 'Disable PiP' : 'Enable PiP'}</button>}
                  </td>
                </tr>
                <tr>
                  <th>Speed</th>
                  <td>
                    <button onClick={this.handleSetPlaybackRate} value={1}>1x</button>
                    <button onClick={this.handleSetPlaybackRate} value={2}>2x</button>
                    <button onClick={this.handleSetPlaybackRate} value={3}>3x</button>
                    <button onClick={this.handleSetPlaybackRate} value={4}>4x</button>
                    <button onClick={this.handleSetPlaybackRate} value={5}>5x</button>
                    <button onClick={this.handleSetPlaybackRate} value={6}>6x</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <h2>State</h2>

            <table>
              <tbody>
                <tr>
                  <th>url</th>
                  <td className={!url ? 'faded' : ''}>
                    {(url instanceof Array ? 'Multiple' : url) || 'null'}
                  </td>
                </tr>
                <tr>
                  <th>playing</th>
                  <td>{playing ? 'true' : 'false'}</td>
                </tr>
                <tr>
                  <th>volume</th>
                  <td>{volume.toFixed(3)}</td>
                </tr>
                <tr>
                  <th>played</th>
                  <td>{played.toFixed(3)}</td>
                </tr>
                <tr>
                  <th>loaded</th>
                  <td>{loaded.toFixed(3)}</td>
                </tr>
                <tr>
                  <th>duration</th>
                  <td><Duration seconds={duration} /></td>
                </tr>
                <tr>
                  <th>elapsed</th>
                  <td><Duration seconds={duration * played} /></td>
                </tr>
                <tr>
                  <th>remaining</th>
                  <td><Duration seconds={duration * (1 - played)} /></td>
                </tr>
                <tr>
                  <th>playbackRate</th>
                  <td><Duration seconds={duration * (1 - played)} /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <footer className='footer'>
          Version <strong>{version}</strong>
          {SEPARATOR}
          <a className="c-link c-link--github" href='https://github.com/hutom-io' aria-label="Github">
            <svg viewBox="0 0 24 24">
              <path d="m12 2a10 10 0 0 0 -10 10c0 4.42 2.87 8.17 6.84 9.5 0.5 0.08 0.66-0.23 0.66-0.5v-1.69c-2.77 0.6-3.36-1.34-3.36-1.34-0.46-1.16-1.11-1.47-1.11-1.47-0.91-0.62 0.07-0.6 0.07-0.6 1 0.07 1.53 1.03 1.53 1.03 0.87 1.52 2.34 1.07 2.91 0.83 0.09-0.65 0.35-1.09 0.63-1.34-2.22-0.25-4.55-1.11-4.55-4.92 0-1.11 0.38-2 1.03-2.71-0.1-0.25-0.45-1.29 0.1-2.64 0 0 0.84-0.27 2.75 1.02 0.79-0.22 1.65-0.33 2.5-0.33s1.71 0.11 2.5 0.33c1.91-1.29 2.75-1.02 2.75-1.02 0.55 1.35 0.2 2.39 0.1 2.64 0.65 0.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91 0.36 0.31 0.69 0.92 0.69 1.85v2.74c0 0.27 0.16 0.59 0.67 0.5 3.97-1.34 6.83-5.08 6.83-9.5a10 10 0 0 0 -10 -10z"/>
            </svg>
          </a>
          {SEPARATOR}
          <a href='https://www.npmjs.com/package/react-player'>npm</a>
        </footer>
      </div>
    )
  }
}

export default hot(module)(App)