import {
  View,
  Text,
  Button,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {supabase} from '../lib/supabase';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [invalid, setInvalid] = useState('');
  const handleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email ,
      password: password ,
    }) 
    if(error){
      setInvalid(error.message)
      return ;
    }
    if(data?.user){
      setAuthenticated(true)
      navigation.navigate('Todo')
    }
  }
  return (
    <View className="flex-1 flex-col justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />
      <Text className="text-4xl font-bold text-white">Todo App</Text>

      <View className="flex flex-col items-center justify-around mx-5 space-y-5 w-full">
        <View className='bg-white px-5 rounded-2xl w-4/5'> 
        <TextInput placeholder="Email" placeholderTextColor={'black'} value={email} onChangeText={setEmail} />
        </View>
        <View className='bg-white px-5 rounded-2xl w-4/5'> 
        <TextInput placeholder="Password" secureTextEntry  placeholderTextColor={'black'} value={password} onChangeText={setPassword} />
        </View>
        <TouchableOpacity>
        <Text className='text-red-500 text-lg font-bold' 
        onPress={()=>{
          navigation.navigate('SignUp')
      }}>Don't have an account? </Text>
        </TouchableOpacity>
        
        <TouchableOpacity className="w-2/5 bg-sky-400 p-3 rounded-2xl mb-3" onPress={handleLogin}>
                        <Text className="text-xl font-bold text-white text-center">Login</Text>
                    </TouchableOpacity>
       
      </View>
    </View>
  );
};

export default HomeScreen;
