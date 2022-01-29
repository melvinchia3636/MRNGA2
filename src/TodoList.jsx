/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-unstable-nested-components */

import React, { useState, useEffect } from 'react';
import {
  View, TextInput, ScrollView, Text,
} from 'react-native';
import { FAB, Checkbox } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import Swipeout from 'react-native-swipeout';

function TodoList() {
  const [task, setTask] = useState({});

  useEffect(() => {
    console.log(task);
  }, [task]);

  return (
    <View style={{
      flex: 1,
    }}
    >
      <ScrollView style={{
        margin: 16,
      }}
      >
        {Object.keys(task).map((id) => (
          <Swipeout
            style={{
              marginBottom: 8,
              borderWidth: 1,
              borderColor: '#E2E8F0',
              borderRadius: 6,
            }}
            backgroundColor="transparent"
            autoClose
            right={(() => [
              {
                text: (
                  <Text
                    numberOfLines={1}
                    style={{
                      fontWeight: 'bold',
                      color: 'white',
                    }}
                  >
                    Delete
                  </Text>
                ),
                backgroundColor: '#F43F5E',
                onPress: () => {
                  delete task[id];
                  setTask({ ...task });
                },
              },
            ])()}
          >
            <View
              key={id}
              style={{
                padding: 16,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <TextInput
                style={{
                  fontSize: 16,
                  flex: 1,
                  textDecorationStyle: 'solid',
                  textDecorationLine: task[id].completed ? 'line-through' : 'none',
                }}
                value={task[id].name}
                editable={!task[id].completed}
                onChangeText={(e) => {
                  task[id].name = e;
                  setTask({ ...task });
                }}
                placeholder="Type your task here"
              />
              <Checkbox
                status={task[id].completed ? 'checked' : 'unchecked'}
                onPress={() => {
                  task[id].completed = !task[id].completed;
                  setTask({ ...task });
                }}
                color="#F43F5E"
              />
            </View>
          </Swipeout>
        ))}
      </ScrollView>
      <FAB
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          margin: 16,
          backgroundColor: '#F43F5E',
        }}
        onPress={() => {
          const newTask = {};
          newTask[Date.now()] = {
            name: '',
            completed: false,
          };
          setTask({ ...newTask, ...task });
        }}
        icon={() => <Feather name="plus" size={24} color="white" />}
      />
    </View>
  );
}

export default TodoList;
