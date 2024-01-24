import {
  View,
  Text,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import Animated, {FadeIn, FadeInDown, FadeInUp} from 'react-native-reanimated';
import axios from 'axios';
import tw from 'twrnc'; // Import the tw utility
import TokenGenerate, {TokenValidate} from './TokenGenerate';

export default function LoginScreen({route}) {
  const {token, setToken} = route.params;
  const navigation = useNavigation();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [parameterType, setParameterType] = useState(1);
  const [errorText, setErrorText] = useState('');
  const [isSuccess, setisSuccess] = useState(false);

  const login = async () => {
    setUsernameError('');
    const {isValid, generatedToken} = await TokenGenerate(username, password);
    setToken(generatedToken);
    setisSuccess(isValid);
    // console.log(isValid)
    // console.log(generatedToken)
    if (isValid) {
      const validationResponse = await TokenValidate(
        username,
        password,
        generatedToken,
      );
      if (validationResponse) {
        // console.log(validationResponse);
        navigation.push('Home');
        Alert.alert('Login Success', 'You are logged in!');
      } else {
        setUsernameError('Username or password is invalid');
      }
    } else {
      setUsernameError('Username or password is invalid');
    }
  };
  const errorStyle = tw`text-red-500 text-base ml-4`; // Use tw utility to define styles

  return (
    <View style={tw`bg-white flex-1`}>
      <StatusBar barStyle="light-content" translucent={false} />
      <Image
        source={require('../assets/images/background.png')}
        style={tw`absolute flex-1 w-full h-full`}
      />

      {/* lights */}
      <View style={tw`flex-row justify-around absolute w-full`}>
        <Animated.Image
          entering={FadeInUp.delay(200).duration(1000).springify()}
          source={require('../assets/images/light.png')}
          style={tw`h-28 w-10`}
        />
        <Animated.Image
          entering={FadeInUp.delay(400).duration(1000).springify()}
          source={require('../assets/images/light.png')}
          style={tw`h-20 w-6 opacity-75`}
        />
      </View>

      {/* title and form */}
      <View style={tw`flex-1 justify-center pt-30 pb-4`}>
        {/* title */}
        <View style={tw`items-center`}>
          <Animated.Text
            entering={FadeInUp.duration(1000).springify()}
            style={tw`text-white font-bold text-3xl`}>
            Login
          </Animated.Text>
        </View>

        <View style={tw`mx-5 mt-6 pt-30`}>
          {usernameError && (
            <Animated.View
              entering={FadeInDown.delay(400).duration(1000).springify()}
              style={tw`flex-row justify-center pb-5`}>
              <Text style={errorStyle}>{usernameError}</Text>
            </Animated.View>
          )}
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            style={tw`bg-black/5 p-5 rounded-2xl w-full mb-4`}>
            <TextInput
              placeholder="username"
              placeholderTextColor={'gray'}
              value={username}
              onChangeText={text => setusername(text)}
              style={tw`text-black`}
            />
          </Animated.View>
          {/* {usernameError && (
                        <Animated.View
                            entering={FadeInDown.delay(400).duration(1000).springify()}
                            style={tw`flex-row justify-start`}>
                            <Text style={errorStyle}>{usernameError}</Text>
                        </Animated.View>
                    )} */}
          <Animated.View
            entering={FadeInDown.delay(200).duration(1000).springify()}
            style={tw`bg-black/5 p-5 rounded-2xl w-full mb-3`}>
            <TextInput
              placeholder="password"
              placeholderTextColor={'gray'}
              secureTextEntry
              value={password}
              onChangeText={text => setpassword(text)}
              style={tw`text-black`}
            />
          </Animated.View>
          {/* {passwordError && (
                        <Animated.View
                            entering={FadeInDown.delay(600).duration(1000).springify()}
                            style={tw`flex-row justify-start`}>
                            <Text style={errorStyle}>{passwordError}</Text>
                        </Animated.View>
                    )} */}
          <Animated.View
            style={tw`w-full`}
            entering={FadeInDown.delay(400).duration(1000).springify()}>
            <TouchableOpacity
              style={tw`bg-sky-400 p-3 rounded-2xl mb-6`}
              onPress={login}>
              <Text style={tw`text-xl font-bold text-white text-center`}>
                Login
              </Text>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(600).duration(1000).springify()}
            style={tw`flex-row justify-center mt-2`}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity>
              <Text style={tw`text-sky-600`}>SignUp</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </View>
  );
}
