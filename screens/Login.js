import React, { Component } from 'react';
import { 
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Image
} from 'react-native';

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import Logo from '../assets/logo.png';

const VALID_EMAIL = "nikolaturbo@filadelfia.com";
const VALID_PASSWORD = "usseldrige";

export default class Login extends Component {
  state = {
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    errors: [],
    loading: false,
  }

  handleLogin() {
    const { navigation } = this.props;
    const { email, password } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    if (email !== VALID_EMAIL) {
      errors.push('email');
    }
    if (password !== VALID_PASSWORD) {
      errors.push('password');
    }

    this.setState({ errors, loading: false });

    if (!errors.length) {
      navigation.navigate("Browse");
    }
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
          <Image
              style={{ marginLeft: '27%', marginTop: '18%' }}
              source={Logo}
          />
          <Block middle>
            <Input
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Button onPress={() => navigation.navigate('Forgot')}>
              <Text gray caption style={{ textDecorationLine: 'none', fontSize: 15 }}>
                Forgot your 
                <Text blue caption style={{ textDecorationLine: 'none', fontSize: 15 }}>
                  {' '} password
                </Text>?
              </Text>
            </Button>
            <Button style="" color="blue" onPress={() => this.handleLogin()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> : 
                <Text bold white center>Log in</Text>
              }
            </Button>
            <Button onPress={() => navigation.navigate('Forgot')}>
              <Text gray caption center style={{ textDecorationLine: 'none', fontSize: 16 }}>
                Don't have an account?
                <Text blue caption center style={{textDecorationLine: 'none', fontSize: 16 }}>
                  {' '} Sign Up
                </Text>
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 5,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  }
})
