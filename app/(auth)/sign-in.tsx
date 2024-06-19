import React, { useState, useEffect } from "react";
import { Link, router } from "expo-router";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import academeeTwo from "../../assets/images/academeeTwo.png";
import { CustomButton, FormField } from "../../components";

const SignIn = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get("https://d314-102-88-33-65.ngrok-free.app/api/csrf-token/");
        console.log("Fetched CSRF Token:", response.data.csrfToken);
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error("Error fetching CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, []);

  const submit = async () => {
    if (!csrfToken) {
      Alert.alert("Error", "CSRF token not available. Please try again.");
      return;
    }

    if (form.username === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://d314-102-88-33-65.ngrok-free.app/api/login/",
        form,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken,
          },
        }
      );

      const data = response.data;
      const token = data.token;

      Alert.alert("Success", "User signed in successfully");
      router.replace("/home");
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Server response error data:", error.response.data);
        Alert.alert("Error", JSON.stringify(error.response.data));
      } else {
        Alert.alert("Error", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={academeeTwo}
            resizeMode="contain"
            className="w-80"
          />

          <Text className="text-3xl font-semibold text-center text-blue-900 mt-10 font-psemibold">
            Sign In
          </Text>

          <FormField
            title="username"
            value={form.username}
            placeholder="username"
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-0.5"
          />

          <FormField
            title="Password"
            value={form.password}
            placeholder="password"
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-0.5"
          />

          <CustomButton
            title={isLoading ? "Loading..." : "Sign In"}
            handlePress={submit}
            containerStyles="mt-6"
            disabled={isLoading}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-black font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-[#0818A8]"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
