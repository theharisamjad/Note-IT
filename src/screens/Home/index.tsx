import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import {useStore} from '../../store';

const TodoApp: React.FC = () => {
  const [text, setText] = useState<string>('');
  const { todos, loadTodos, addTodo, toggleTodo, deleteTodo } = useStore();

  // Load todos from AsyncStorage on component mount
  
  return (
    <View style={styles.container}>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
 
});

export default TodoApp;