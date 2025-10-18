import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#181A20', padding: 24, justifyContent: 'center' },
  closeButton: { position: 'absolute', top: 40, left: 20, zIndex: 1 },
  closeText: { fontSize: 40, color: '#A3A3A3' },
  logo: { width: 60, height: 60, marginBottom: 24, alignSelf: 'flex-start' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  subtitle: { fontSize: 18, color: '#A3A3A3', marginBottom: 32 },
  rulesContainer: { marginBottom: 40 },
  ruleTitle: { fontWeight: 'bold', color: '#fff', fontSize: 20, marginTop: 16 },
  ruleText: { color: '#A3A3A3', fontSize: 16, marginBottom: 4 },
  link: { color: '#3EC6FF', textDecorationLine: 'underline' },
  agreeButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 0,
  },
  agreeText: { color: '#181A20', fontWeight: 'bold', fontSize: 20 },
});