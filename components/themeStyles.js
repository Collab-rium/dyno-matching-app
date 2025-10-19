import { StyleSheet } from 'react-native';

export const lightColors = {
  background: '#fff',
  primaryGradientStart: '#FF5858', // Loving Red
  primaryGradientEnd: '#FFAE42',   // Orange
  text: '#181A20',
  accent: '#FF5858',
  secondary: '#FFAE42',
  card: '#fff',
  border: '#FFAE42',
  link: '#FF5858',
};

export const darkColors = {
  background: '#181A20',
  primaryGradientStart: '#232526', // Blackish
  primaryGradientEnd: '#414345',   // Slightly lighter black
  text: '#fff',
  accent: '#FF5858',
  secondary: '#FFAE42',
  card: '#232526',
  border: '#414345',
  link: '#FFAE42',
};

export const getThemeStyles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    margin: 16,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: colors.primaryGradientStart,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    width: 300,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.secondary,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primaryGradientStart,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 24,
  },
  buttonText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    color: colors.link,
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});
