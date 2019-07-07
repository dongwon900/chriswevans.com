import ReactDOM from 'react-dom'
import { Link, Route, Switch } from 'react-router-dom';
import React, { Component, useState, useCallback } from 'react';
import Gallery from 'react-photo-gallery'
import Carousel, { Modal, ModalGateway } from "react-images";
import logo from './logo.svg';
import './App.css';
import {BodyContainer} from './BodyContainer.js'
const ReactMarkdown = require('react-markdown')
const Discord = require('discord.js')


class About extends Component{
  constructor(props){
    super(props)
    // console.log("About constructor: ", this.props)
    // this.data = this.props.data
  }

  render(){
    return (
      <div className="body-column">
        <div class="row about-row row-top justify-content-center">
          <div class="jumbotron jumbotron-fluid about-header">
            <div class="container-fluid">
              <h3 class="display-5">About Me</h3>
              <hr/>
              <p>{this.props.data.description}</p>
            </div>
          </div>
        </div>
        <div class="row about-row bowling-row justify-content-center">
          <div class="d-flex flex-column justify-content-center">
            <h3>Bowling,</h3>
          </div>
        </div>
        <div class="row about-row programming-row justify-content-center">
          <div class="d-flex flex-column justify-content-center">
            <h3>Programming,</h3>
          </div>
        </div>
        <div class="row about-row keyboard-row justify-content-center">
          <div class="d-flex flex-column justify-content-center">
            <h3>Keyboards,</h3>
          </div>
        </div>
        <div class="row about-row painting-row justify-content-center  bottom-row">
          <div class="d-flex flex-column justify-content-center">
            <h3>and Painting</h3>
          </div>
        </div>
      </div>
    )
  }
}

class Projects extends Component{
  constructor(props){
    super(props)
  }

  changeProject(e, url_i){
    e.preventDefault();
    this.props.onProjectChange(this.props.data.projects[url_i].url_readme)
  }

  projectLinks(){
    let ret_html = []
    for(let i=0; i<this.props.data.projects.length;i++){
      ret_html.push(
        <li class="nav-item">
          <a class="nav-link" onClick={(e)=>this.changeProject(e, i)} href= "#">{this.props.data.projects[i].name}</a>
        </li>
      )
    }
    return ret_html
  }

  projectRoutes(){
    let ret_html = []
    for(let i=0; i<this.props.data.projects.length;i++){
      ret_html.push(
        <Route path={"/projects/"+this.props.data.projects[i].name} render = {({ match: { url } }) => (
          <ReactMarkdown source={this.props.data.projects[i].readmedata} escapeHtml={false} />
        )}/>
      )
    }
    return ret_html
  }

  render(){
    return(
      <div class="row justify-content-center">
        <div class="col-md-2 projects-nav-column justify-content-center">
          <ul class="projects-nav nav flex-column faded-border">
            {this.projectLinks()}
          </ul>
        </div>
        <div class="markup-pane col-md-8" id="markdown-holder">
          <ReactMarkdown source={this.props.readmedata} escapeHtml={false} />
        </div>
      </div>
    )
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      'data': {
        'projects':[]
      },
      'open': 'about_me',
      'readme': "https://raw.githubusercontent.com/ChrisWeldon/Beywatch/master/README.md",
      'readmedata':null
    }

    this.handleProjectChange = this.handleProjectChange.bind(this)
  }


  componentDidMount(){
    //TODO separate README file from data get
    console.log("CALL: componentDidMount")
    fetch(this.state.readme)
      .then(response=>response.text())
      .then(function(readmedata){
        fetch('/data.json')
        .then(response=>response.json())
        .then(data=>this.setState({'data':data, "readmedata":readmedata}))
      }.bind(this))

    // fetch('data.json')
    //   .then(response=>response.json())
    //   .then(function(data){
    //     console.log(data)
    //     this.setState({data:data})
    //   }.bind(this))
  }

  componentDidUpdate(){
    console.log("CALL: componentDidUpdate")
    // fetch('/data.json')
    // .then(response=>response.json())
    // .then(data=>this.setState({'data':data}))
  }


  openBodyContainer(e, open){
    e.preventDefault()
    if(this.state.open != open){
      this.setState({'open':open})
    }
  }

  handleProjectChange(url){
    fetch(url)
      .then(response=>response.text())
      .then(function(data){this.setState({'readme':url, 'readmedata': data})}.bind(this))
  }

  state = { modalIsOpen: false};
  toggleModal = () => {
    this.setState(state => ({ modalIsOpen: !state.modalIsOpen }));
  };

  openLightbox = (event, {photo, index}) => {
    this.setState(state => ({modalIsOpen: !state.modalIsOpen , currentImage:index}))
  }

  render() {
    const { modalIsOpen } = this.state;

    return (
      <div className="App">
        <div class="app-top-bar">
        </div>
        <div class="jumbotron jumbotron-fluid masthead">
          <div class=" masthead-container justify-content-center container">
            <div class="row  align-items-center">
              <div class="col-md-5 align-items-center">
                <h1 class="name-head display-4">{this.state.data.name}, {this.state.data.age}</h1>
                <p class="lead">{this.state.data.location}</p>
              </div>
              <div class="col-md-5 profile-pic-column justify-content-center">
                <img src={this.state.data.profile_img} class="rounded-circle profile-pic allign-middle" alt="Chris Evans"/>
              </div>
            </div>
          </div>
          <nav class="custom-nav navbar navbar-expand-lg  flex-lg-row">
            <div class="navbar" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-item nav-link" href="https://github.com/ChrisWeldon"><img src="/web_icons/GitHub-Mark-120px-plus.png" class="social-media" alt="Github"/></a>
                <a class="nav-item nav-link" href="https://www.linkedin.com/in/christopher-e-594b63128/"><img src="/web_icons/In-Black-128px-R.png" class="social-media" alt="Github"/></a>
                <a class="nav-item nav-link" href="https://www.instagram.com/cwevans612/"><img src="/web_icons/instagram.png" class="social-media" alt="Github"/></a>
                <Link class = "nav-item nav-link" to="/about" >About</Link>
                <Link class = "nav-item nav-link" to="/projects" >Projects</Link>
                <Link class = "nav-item nav-link" to="/resume" >Résumé</Link>
                <Link class = "nav-item nav-link" to="/gallery" >Gallery</Link>
              </div>
            </div>
          </nav>
        </div>
        <div class="body container-fluid body-container">
          <Route path="/about" render = {() => (
            <About data={this.state.data}/>
          )}
          />
          <Route path="/projects" render = {({match}) => (
            <Projects path={"/projects"} readmedata={this.state.readmedata} readme={this.state.readme} onProjectChange={this.handleProjectChange} data={this.state.data} path={this.path}/>
          )}/>
          <Route path="/resume" render = {()=>(
            <div>
              <h3 className="row justify-content-center"><a href="./Resume.pdf">www.chriswevans.com/Resume.pdf</a></h3>
              <div className="resume-div row justify-content-center">
                <object className="resume row" data="./Resume.pdf" type="application/pdf">
                  <embed src="./Resume.pdf" type="application/pdf"/>
                </object>
              </div>
            </div>
          )}/>
          <Route path="/gallery" render = {({match})=>(
            <>
            <Link to={match.url + "/NiigataShrine"}>Niigata Shrine</Link>
            <Link to={match.url + "/KiteFighting"}>Kite Fighting</Link>
            <Route path={match.url + "/:album"} render = {function({match}){
              if(this.state.album != match.params.album){
                fetch("/pics/gallery/" + match.params.album + "/ratios.json")
                  .then(response=>response.json())
                  .then(data=>this.setState({album:match.params.album, photos:data}))
                return(
                  <h2>Loading</h2>
                )
              }else{
                return(
                  <>
                  <Gallery photos={this.state.photos} onClick={this.openLightbox}/>
                  <ModalGateway>
                    {modalIsOpen ? (
                      <Modal onClose={this.toggleModal}>
                        <Carousel views={this.state.photos} currentIndex={this.state.currentImage} />
                      </Modal>
                    ) : null}
                  </ModalGateway>
                  </>
                )
              }
            }.bind(this)}/>
            </>
          )}/>
        </div>
        <footer class="app-bot-bar text-center">
          <p>All photos are protected under Copywrite.</p>
          <p>Website designed and built by Chris Evans.
          Code License <a href="https://github.com/twbs/bootstrap/blob/master/LICENSE" target="_blank" rel="license noopener">MIT</a>
          , docs <a href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="license noopener">CC BY 3.0</a>
          </p>
        </footer>
      </div>
    );
  }
}

//NEED TO GET State into this heirarchy

function Albums({match}){
  return(
    <>
    <Link to={match.url + "/NiigataShrine"}>Niigata Shrine</Link>
    <Route path={match.url + "/:album"} component = {Blah}/>
    </>
  )
}

function Blah({match}){
  if(this.state.album != match.params.album){
    //fetch("http://localhost:3000/pics/gallery/" + match.params.album + "/ratios.json").then(response=>response.json()).then(data=>this.setState({album:match.params.album, photos:data}))
    return(
      <h1>{match.params.album}</h1>
    )
  }
  else{
    return(
      <Gallery photos={this.state.photos}/>
    )
  }
}

export default App;
