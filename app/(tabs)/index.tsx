import { useState } from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { IconSymbol } from '@/components/ui/IconSymbol';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedButton } from '@/components/ThemedButton';
// import { PhotoRecognizer } from 'react-native-vision-camera-text-recognition';

export default function HomeScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [recognizedText, setRecognizedText] = useState("");
  const [bookDetails, setBookDetails] = useState(null);

  const onPress = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    console.log(status)
    if (status !== "granted") {
      alert("Permission to access camera is required!");
      return;
    }

    const imageResult = await ImagePicker.launchCameraAsync({
      allowsMultipleSelection: false,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });
    console.log('imageResult', JSON.stringify(imageResult, null, 3));

    if (!imageResult.canceled) {
      setImage(imageResult.assets[0].uri);
      // processImage(imageResult.assets[0].uri);
    }
  }

  
  // #Extract text using OCR
  // const processImage = async (uri: string) => {
  //   try {
  //     const ocrResult = await PhotoRecognizer({uri});

  //     console.log('ocrResult:', JSON.stringify(ocrResult, null, 3))
  //     // const extractedText = result.blocks.map((block) => block.value).join(" ");
  //     // setRecognizedText(extractedText);
  //     // fetchBookDetails(result.blocks[0]?.value || "");
  //   } catch (error) {
  //     console.error("OCR Error:", error);
  //   }
  // };

  // Fetch book details from Open Library API
  const fetchBookDetails = async (title: string) => {
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(title)}`);

      console.log('fetched book details from Open Library API:', JSON.stringify(response, null, 3));
      // if (response.data.numFound > 0) {
      //   const book = response?.data?.docs[0];
      //   setBookDetails({
      //     title: book.title,
      //     author: book.author_name?.[0] || "Unknown",
      //     published: book.first_publish_year || "N/A",
      //     isbn: book.isbn?.[0] || "N/A",
      //   });
      // } else {
      //   setBookDetails(null);
      // }
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  }; 

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#494A50' }}
      headerImage={
        <Image
          source={require('@/assets/images/henry-be-lc7xcWebECc-unsplash.jpg')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
        <ThemedButton
          title='scan book'
          lightColor='#000'
          darkColor='#fff'
          onPress={onPress}
        />
      <ThemedView style={styles.stepContainer}>
      {/* <CameraView style={styles.camera} facing={'back'} /> */}
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#000',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    position: 'absolute',
  },
  bookLogo: {
    marginHorizontal: 'auto',
    marginVertical: 'auto',
    backgroundColor: 'transparent',
  }
});
