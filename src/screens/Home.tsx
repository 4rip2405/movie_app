import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet } from 'react-native';

export default function Home({ navigation }: any): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Home</Text>
        <Button
          title="Go to Movie Detail"
          onPress={() => navigation.navigate('MovieDetail')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});