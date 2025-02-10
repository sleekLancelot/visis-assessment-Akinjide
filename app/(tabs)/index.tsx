import { useState } from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TextRecognition from '@react-native-ml-kit/text-recognition';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedButton } from '@/components/ThemedButton';
import { FullPageLoader } from '@/components/FullPageLoader';
// import { PhotoRecognizer } from 'react-native-vision-camera-text-recognition';

export default function HomeScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [recognizedText, setRecognizedText] = useState("");
  const [fetchingBookDetails, setFetchingBookDetails] = useState(false)
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    description: '',
    image: null,
  });

  const onPress = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
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
      processImage(imageResult.assets[0].uri);
    }
  }

  
  // #Extract text using OCR
  const processImage = async (uri: string) => {
    try {
      const ocrResult = await TextRecognition.recognize(uri);

      console.log('ocrResult:', JSON.stringify(ocrResult, null, 3))
      
      if (ocrResult?.text) {
        const extractedText = ocrResult?.text?.replaceAll('\n', ' ')
        console.log('ocrResultText:', JSON.stringify(ocrResult?.text?.replaceAll('\n', ' '), null, 3))
        setRecognizedText(extractedText);
        fetchBookDetails(extractedText ?? "");
      }
    } catch (error) {
      console.error("OCR Error:", error);
    }
  };

  // #Fetch book details from Google books API
  const fetchBookDetails = async (text: string) => {
    try {
      setFetchingBookDetails(true)
      // const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(text)}`);
      const fetchResponse = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(text)}`);

      const res = await fetchResponse?.json()

      console.log('fetched book details from Open Library API:', JSON.stringify(res, null, 3));
      if (res?.totalItems > 0 && Array.isArray(res?.items)) {
        const book = res?.items[0]?.volumeInfo;
        
        setBookDetails({
          title: book?.title ?? 'N/A',
          author: book.authors?.join(',') || 'N/A',
          description: book.description || "N/A",
          image: book.imageLinks?.thumbnail || '',
        });
      } else {
        setBookDetails(null as unknown as any);
      }

      setFetchingBookDetails(false)
    } catch (error) {
      setFetchingBookDetails(false)
      console.error("Error fetching book details:", error);
    }
  }; 

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#494A50' }}
      headerImage={
        <Image
          source={
            bookDetails?.image ?
            {
              uri: bookDetails?.image,
            } :
            require('@/assets/images/henry-be-lc7xcWebECc-unsplash.jpg')
          }
          defaultSource={require('@/assets/images/henry-be-lc7xcWebECc-unsplash.jpg')}
          style={styles.reactLogo}
        />
      }>
        <ThemedButton
          title='scan book'
          lightColor='#000'
          darkColor='#fff'
          onPress={onPress}
        />
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{bookDetails?.title || 'Welcome'}!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        {
          bookDetails?.author ?
          <ThemedText type="subtitle">By: {bookDetails?.author}</ThemedText> : null
        }
        <ThemedText>
          {bookDetails?.description}
        </ThemedText>
      </ThemedView>

      {
        fetchingBookDetails ?
        <FullPageLoader animating={fetchingBookDetails} /> : null
      }
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
