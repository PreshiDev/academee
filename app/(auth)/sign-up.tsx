import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { SafeAreaView, ScrollView, View, Text, Image, Alert, Button, TextInput } from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios';
import { Dimensions } from 'react-native';
import academeeTwo from "../../assets/images/academeeTwo.png";

interface SignUpFormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const LOCAL_IP_ADDRESS = 'd314-102-88-33-65.ngrok-free.app'; // Replace with your actual IP address
  const { control, handleSubmit, formState: { errors } } = useForm<SignUpFormData>();
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = async (data: SignUpFormData) => {
    setSubmitting(true);

    try {
      const response = await axios.post(`https://${LOCAL_IP_ADDRESS}/api/register/`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        const responseData = response.data;
        console.log("Registration successful:", responseData);
        Alert.alert("Success", "Registration successful!");
      } else {
        Alert.alert("Error", "Registration failed. Please check your details.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response);
        Alert.alert("Error", "Registration failed. Please check your details.");
      } else if (error.request) {
        console.error("Error request:", error.request);
        Alert.alert("Error", "Network error occurred. Please try again later.");
      } else {
        console.error("Error message:", error.message);
        Alert.alert("Error", "An error occurred. Please try again later.");
      }
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{ minHeight: Dimensions.get("window").height - 100 }}
        >
          <Image source={academeeTwo} resizeMode="contain" className="w-80" />

          <Text className="text-2xl text-center font-semibold text-[#3F00FF] mt-10 font-psemibold">
            Sign Up to Academee
          </Text>

          <View>
            <Text className="text-base font-medium mb-2">Username</Text>
            <Controller
              control={control}
              name="username"
              rules={{ required: "username name is required", maxLength: 30 }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your username"
                  style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}
                />
              )}
            />
            {errors.username && <Text>{errors.username.message}</Text>}
          </View>

          <View>
            <Text className="text-base font-medium mb-2">First Name</Text>
            <Controller
              control={control}
              name="firstName"
              rules={{ required: "First name is required", maxLength: 30 }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your first name"
                  style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}
                />
              )}
            />
            {errors.firstName && <Text>{errors.firstName.message}</Text>}
          </View>

          <View>
            <Text className="text-base font-medium mb-2">Last Name</Text>
            <Controller
              control={control}
              name="lastName"
              rules={{ required: "Last name is required", maxLength: 30 }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your last name"
                  style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}
                />
              )}
            />
            {errors.lastName && <Text>{errors.lastName.message}</Text>}
          </View>

          <View>
            <Text className="text-base font-medium mb-2">Email</Text>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email format"
                }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your email"
                  style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}
                  keyboardType="email-address"
                />
              )}
            />
            {errors.email && <Text>{errors.email.message}</Text>}
          </View>

          <View>
            <Text className="text-base font-medium mb-2">Password</Text>
            <Controller
              control={control}
              name="password"
              rules={{
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your password"
                  style={{ borderWidth: 1, padding: 10, borderRadius: 5 }}
                  secureTextEntry={true}
                />
              )}
            />
            {errors.password && <Text>{errors.password.message}</Text>}
          </View>

          <View style={{ marginTop: 20 }}>
            <Button
              title={isSubmitting ? 'Loading...' : 'Sign Up'}
              disabled={isSubmitting}
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-gray-500">Already have an account?</Text>
            <Link href="/sign-in">
              <Text className="text-[#3F00FF] font-medium">Sign In</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
