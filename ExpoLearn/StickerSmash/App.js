import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View } from 'react-native';

import ImageViewer from './componentes/ImageViewer';
import Button from './componentes/Button';

// Os componentes nativos do react-natibe, não permite acessar imagens da blioteca do dispositvo,  porem com uma EXPO SDK Biblioteca,
// chamada expo-image-picker, nos conseguimos acessar a interface do sitstema de seleção de imagens e videos ou tirar uma foto com a camera
import * as ImagePicker from 'expo-image-picker';

import { useState } from 'react';

import CircleButton from './componentes/CircleButton';
import IconButton from './componentes/IconButton'

import EmojiPicker from "./componentes/EmojiPicker";

import EmojiList from './componentes/EmojiList';

import EmojiSticker from './componentes/EmojiSticker';

import { GestureHandlerRootView } from "react-native-gesture-handler";
//A biblioteca React Native Gesture Handler é uma biblioteca que capta interações relacionada ao toque na tela
//Para que as interações seja captadas se usa o elemento <GestureHandlerRootView> no top level/ como elemento raiz/Pai

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {

  const [selectedImage, setSelectedImage] = useState(null);

  const [showAppOptions, setShowAppOptions] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [pickedEmoji, setPickedEmoji] = useState(null);

  const pickImageAsync = async () => {
    //Abre a seleção de imagem
    let result = await ImagePicker.launchImageLibraryAsync({
      //true habilita o recorte da imagem
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      //console.log(result);
      //Retorna algo como:
      // {
      //   "assets": [
      //     {
      //       "assetId": null,
      //       "base64": null,
      //       "duration": null,
      //       "exif": null,
      //       "height": 4800,
      //       "rotation": null,
      //       "type": "image",
      //       "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%username%252Fsticker-smash-47-beta/ImagePicker/77c4e56f-4ccc-4c83-8634-fc376597b6fb.jpeg",
      //       "width": 3200
      //     }
      //   ],
      //   "canceled": false
      // }
      //Uri é a nossa imagem
      //Abaixo acessamos assets, pegamos o primeiro elemento, e acessamos o uri
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('Você não selecionou nenhuma imagem.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>
      {showAppOptions ?
        (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
            </View>
          </View>
        ) :
        (
          <View style={styles.footerContainer}>
            <Button label="Escolha uma foto" theme="primary" onPress={pickImageAsync} />
            <Button label="Use esta foto" onPress={() => setShowAppOptions(true)} />
          </View>
        )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
