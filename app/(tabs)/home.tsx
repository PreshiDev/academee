import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";
import YoutubePlayer from "react-native-youtube-iframe";
import { SearchInput } from "../../components";
import bell from "../../assets/images/bell.png";
import profileImg from "../../assets/images/profile.png";

const YOUTUBE_API_KEY = 'AIzaSyD1yit1OS-mA5ME-4MZeLQ_wfVVjK9Jnl0'; // Replace with your YouTube API key
const CHANNEL_ID = 'UCG30_s37zvEu7FNsLptASjQ'; // Replace with your YouTube channel ID
const NEWS_API_URL = 'https://newsapi.org/v2/top-headlines?country=us&apiKey=700b3e00ee2144d88b84ff598f1644ad'; // Replace with your News API key

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [news, setNews] = useState([]);

  const fetchVideos = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20`
      );
      const videoData = response.data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
      }));
      setVideos(videoData);
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await axios.get(NEWS_API_URL);
      const newsData = response.data.articles.slice(0, 4).map((article, index) => ({
        id: index.toString(),
        title: article.title,
      }));
      setNews(newsData);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
    fetchNews();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconContainer}>
          <Image source={bell} style={styles.icon} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Academee</Text>
          <Text style={styles.headerSubText}>Educators App</Text>
        </View>
        <TouchableOpacity style={styles.iconContainer}>
          <Image source={profileImg} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <SearchInput />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => console.log('Button 1 pressed')}>
          <Text style={styles.buttonText}>Button 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => console.log('Button 2 pressed')}>
          <Text style={styles.buttonText}>Button 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => console.log('Button 3 pressed')}>
          <Text style={styles.buttonText}>Button 3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => console.log('Button 4 pressed')}>
          <Text style={styles.buttonText}>Button 4</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.videoContainer}>
        <Text style={styles.videoTitle}>Latest Videos</Text>
        <FlatList
          data={videos}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.videoCard}>
              <Text style={styles.videoTitle}>{item.title}</Text>
              <YoutubePlayer
                height={200}
                play={false}
                videoId={item.id}
              />
            </View>
          )}
        />
      </View>

      <View style={styles.newsContainer}>
        <Text style={styles.newsTitle}>Latest News</Text>
        <FlatList
          data={news}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text style={styles.newsHeadline}>{item.title}</Text>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  iconContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  headerText: {
    fontSize: 18,
    color: '#1E3A8A',
    textAlign: 'center',
  },
  headerSubText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  navButton: {
    padding: 10,
    backgroundColor: '#1E3A8A',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  videoContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  videoTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  videoCard: {
    marginRight: 16,
    width: 300,
  },
  newsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  newsTitle: {
    fontSize: 18,
    marginBottom: 8,
  },
  newsHeadline: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default Home;
