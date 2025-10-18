import { Linking } from 'react-native';

export function handleClose(navigation) {
  navigation.goBack();
}

export function handleAgree(navigation) {
  navigation.navigate('NextPage'); // Replace 'NextPage' with your next screen name
}

export function handleDateSafelyLink() {
  Linking.openURL('https://www.gotinder.com/safety');
}