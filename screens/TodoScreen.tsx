import {View, Text, Button, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {supabase} from '../lib/supabase';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaView} from 'react-native-safe-area-context';
import TodoTab from '../components/TodoTab';
type TodoScreenProps = NativeStackScreenProps<RootStackParamList, 'Todo'>;
const TodoScreen = ({navigation}: TodoScreenProps) => {
  return (
    <View className="flex-1 mt-10  bg-amber-500">
      {/* <StatusBar style="dark" /> */}
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        className="space-y-4">
        <View className="flex-col items-center flex">
          <View className='flex flex-row items-center'>
            <TouchableOpacity className=' bg-red-700 px-2 rounded-xl ' onPress={()=>{
              navigation.navigate("SignUp")
            }}><Text className='text-white font-bold text-xl'>Back</Text></TouchableOpacity>
          <Text className="text-white text-4xl  font-bold">Todos</Text>
          </View>
         
          <View className="flex flex-col items-center ">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
              return (
                <View className="my-2" key={index}>
                  <TodoTab  />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TodoScreen;
