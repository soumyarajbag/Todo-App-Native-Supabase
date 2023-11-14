import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {StatusBar} from 'expo-status-bar';
import {supabase} from '../lib/supabase';

type SignUpScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUp'>;
const SignUpScreen = ({navigation}: SignUpScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [invalid, setInvalid] = useState('');
  const [put , setPut] = useState('')
  const [authenticated, setAuthenticated] = useState(false);
  const handleSignUp = async () => {
    const {data, error} = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
        },
      },
    });
    if (error) {
      setInvalid(error.message);
    } else if (data?.user) {
      await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      await supabase.from('users').insert({id: data?.user.id, name: name , email: email})
      
      const person = await supabase.auth.getUser();
      console.log(person);
      navigation.navigate('Todo');
      setAuthenticated(true);
    }
  };
  return (
    <View className="flex-1 flex-col justify-center items-center space-y-10 bg-amber-500">
      <StatusBar style="light" />
      <Text className="text-4xl font-bold text-white">Todo App</Text>

      {authenticated ? 
      <View>
        <Text>Authenticated</Text>
        <TouchableOpacity className="w-2/5 bg-sky-400 p-3 rounded-2xl mb-3" onPress={()=>{
            supabase.auth.signOut();
            setAuthenticated(false);
        }}>
          <Text className="text-xl font-bold text-white text-center">
            Sign Out
          </Text>
        </TouchableOpacity>
        </View>
      : <View className="flex flex-col items-center justify-around mx-5 space-y-5 w-full">
        <View className="bg-white px-5 rounded-2xl w-4/5">
          <TextInput placeholder="Name" placeholderTextColor={'black'} value={name} onChangeText={setName} />
        </View>
        <View className="bg-white px-5 rounded-2xl w-4/5">
          <TextInput placeholder="Email" placeholderTextColor={'black'} value={email} onChangeText={setEmail} />
        </View>
        <View className="bg-white px-5 rounded-2xl w-4/5">
          <TextInput
            placeholder="Password"
            secureTextEntry
            placeholderTextColor={'black'}
            value={password} onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Home');
          }}>
          <Text className="text-red-500 text-lg font-bold">
            Already Have An Account ?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-2/5 bg-sky-400 p-3 rounded-2xl mb-3" onPress={handleSignUp}>
          <Text className="text-xl font-bold text-white text-center">
            Sign Up
          </Text>
        </TouchableOpacity>
        {
            invalid && <Text className="text-red-500 text-lg font-bold">{invalid}</Text>
        }
      </View>}
    </View>
  );
};

export default SignUpScreen;
