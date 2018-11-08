import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import 'babel-polyfill' // https://medium.com/@andrewzey/google-seo-with-create-react-app-fixing-the-hidden-gotcha-c164063106d

import './App.css';

import {Navbar} from './navbar';
import {Home} from './home';
import {Releases, ReleaseVersion} from './releases';
import {Install} from './install';
import {Docs} from './docs';
import {News, NewsEntry} from './news';
import {Workshop, WorkshopRegistration} from './workshop';
import {Publications} from './publications';
import {Source} from './source';
import {LegacyIntro, LegacyGPL, LegacyDocs, LegacyDownload} from './legacy';
import {HelpDevel, HelpContact, HelpMailingList, HelpFAQ, HelpIPYNB} from './help';
import {NotFound} from './errors';

function parseReadmeChangelog(text) {
  var textChangelog = text.slice(text.indexOf("CHANGELOG")+9, text.indexOf("QUESTIONS?"))
  var textVersions = textChangelog.split("### ")

  var versions = {}
  var splitIndex = null;
  var version_long = null;
  var version_short = null;
  var versionDescription = null;
  for (var textVersion of textVersions.reverse()) {
    if (!textVersion.startsWith("\n")) {
      splitIndex = Math.min(textVersion.indexOf(" "), textVersion.indexOf("\n"))
      version_long = textVersion.slice(0, splitIndex)
      version_short = version_long.slice(0, version_long.lastIndexOf("."))
      versionDescription = textVersion.slice(splitIndex)
      if (Object.keys(versions).indexOf(version_short)==-1) {
        versions[version_short] = Array()
      }
      versions[version_short].push(versionDescription)
    }
  }

  return versions
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      release_changelogs: {},
    };
  }
  componentDidMount() {
    var url = "https://raw.githubusercontent.com/phoebe-project/phoebe2/master/README.md";
    console.log("fetching "+url)

    fetch(url)
      .catch(() => this.setState({versions: null}))
      .then(res => {
        if (res.ok) {
          return res.text();
        } else {
          return null;
        }
      })
      .then(text => this.setState({release_changelogs: parseReadmeChangelog(text)}))
  }
  render() {
    return (
      <Router>
        <div id='main'>
          <Navbar />

          <Switch>
            <Route exact path={process.env.PUBLIC_URL + '/'} component={Home}/>
            <Route exact path={process.env.PUBLIC_URL + '/releases'} render={(props) => <Releases {...props} release_changelogs={this.state.release_changelogs}/>}/>
            <Route exact path={process.env.PUBLIC_URL + '/releases/:version/'} render={(props) => <ReleaseVersion {...props} release_changelogs={this.state.release_changelogs}/>}/>
            <Route exact path={process.env.PUBLIC_URL + '/install'} render={(props) => <Install {...props} release_changelogs={this.state.release_changelogs}/>}/>
            <Route exact path={process.env.PUBLIC_URL + '/install/:version/'} render={(props) => <Install {...props} release_changelogs={this.state.release_changelogs}/>}/>
            <Route exact path={process.env.PUBLIC_URL + '/docs'} component={Docs}/>
            <Route exact path={process.env.PUBLIC_URL + '/docs/:version/'} component={Docs}/>
            <Route exact path={process.env.PUBLIC_URL + '/docs/:version/:slug'} component={Docs}/>
            <Route exact path={process.env.PUBLIC_URL + '/docs/:version/:subdir/:slug'} component={Docs}/>
            <Route exact path={process.env.PUBLIC_URL + '/news'} component={News}/>
            <Route path={process.env.PUBLIC_URL + '/news'} component={NewsEntry}/>
            <Route exact path={process.env.PUBLIC_URL + '/workshop'} component={Workshop}/>
            <Route exact path={process.env.PUBLIC_URL + '/workshop/registration'} component={WorkshopRegistration}/>
            <Route exact path={process.env.PUBLIC_URL + '/workshop/:workshop'} component={Workshop}/>
            <Route exact path={process.env.PUBLIC_URL + '/workshop/:workshop/:slug'} component={Workshop}/>
            <Route exact path={process.env.PUBLIC_URL + '/publications'} component={Publications}/>
            <Route exact path={process.env.PUBLIC_URL + '/source'} component={Source}/>
            <Route exact path={process.env.PUBLIC_URL + '/1.0'} component={LegacyIntro}/>
            <Route exact path={process.env.PUBLIC_URL + '/1.0/gpl'} component={LegacyGPL}/>
            <Route exact path={process.env.PUBLIC_URL + '/1.0/docs'} component={LegacyDocs}/>
            <Route exact path={process.env.PUBLIC_URL + '/1.0/download'} component={LegacyDownload}/>
            <Route exact path={process.env.PUBLIC_URL + '/help/devel'} component={HelpDevel}/>
            <Route exact path={process.env.PUBLIC_URL + '/help/contact'} component={HelpContact}/>
            <Route exact path={process.env.PUBLIC_URL + '/help/contact/:mailinglist'} component={HelpMailingList}/>
            <Route exact path={process.env.PUBLIC_URL + '/help/faq'} component={HelpFAQ}/>
            <Route exact path={process.env.PUBLIC_URL + '/help/ipynb'} component={HelpIPYNB}/>

            <Route path="*" component={NotFound} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;
