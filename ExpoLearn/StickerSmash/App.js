import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, View } from 'react-native';

import ImageViewer from './componentes/ImageViewer';
import Button  from './componentes/Button';

// Os componentes nativos do react-natibe, não permite acessar imagens da blioteca do dispositvo,  porem com uma EXPO SDK Biblioteca,
// chamada expo-image-picker, nos conseguimos acessar a interface do sitstema de seleção de imagens e videos ou tirar uma foto com a camera
import * as ImagePicker from 'expo-image-picker';

import { useState } from 'react';

const PlaceholderImage = require('./assets/images/background-image.png');

export default function App() {

  const [selectedImage, setSelectedImage] = useState(null);

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
    } else {
      alert('Você não selecionou nenhuma imagem.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Escolha uma foto" theme="primary" onPress={pickImageAsync} />
        <Button label="Use esta foto" />
      </View>
      <StatusBar style="auto" />
    </View>
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
});
