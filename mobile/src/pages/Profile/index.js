import React from 'react';
import { WebView } from 'react-native-webview';

import styles from './styles';

export default function Profile({ route }) {

  const { github_username } = route.params;

  return (
    <WebView style={styles.container} source={{ uri: `https://github.com/${github_username}` }} />
  );
}
