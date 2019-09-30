import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';

import Navigation from './navigation';
import { Block } from './components';

// import all used images
const images = [
  require('./assets/icons/back.png'),
  require('./assets/icons/bell.png'),
  require('./assets/logo-small.png'),
  require('./assets/icons/help.png'),
  require('./assets/your-portfolio.png'),
  require('./assets/recent-values.png'),
  require('./assets/icons/a-normal-small.png'),
  require('./assets/icons/a-selected-small.png'),
  require('./assets/icons/b-normal-small.png'),
  require('./assets/icons/b-selected-small.png'),
  require('./assets/icons/c-normal-small.png'),
  require('./assets/icons/c-selected-small.png'),
  require('./assets/icons/a-normal.png'),
  require('./assets/icons/a-selected.png'),
  require('./assets/icons/b-normal.png'),
  require('./assets/icons/b-selected.png'),
  require('./assets/icons/c-normal.png'),
  require('./assets/icons/c-selected.png'),
  require('./assets/icons/search-normal.png'),
  require('./assets/icons/search-selected.png'),
];

export default class App extends React.Component {
  componentDidMount() {
    Font.loadAsync({
      'Gotham Rounded': require('./assets/fonts/GothamRounded-Bold.otf'),
    });
  }

  state = {
    isLoadingComplete: false,
  }

  handleResourcesAsync = async () => {
    // we're caching all the images
    // for better performance on the app

    const cacheImages = images.map(image => {
      return Asset.fromModule(image).downloadAsync();
    });

    return Promise.all(cacheImages);
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.handleResourcesAsync}
          onError={error => console.warn(error)}
          onFinish={() => this.setState({ isLoadingComplete: true })}
        />
      )
    }

    return (
      <Block white>
        <Navigation />
      </Block>
    );
  }
}

const styles = StyleSheet.create({
});
