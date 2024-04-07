import {View, Pressable, Text, StyleSheet} from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button({label, theme, onPress}){
    if (theme === "primary") {
        return (
          <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}>
            <Pressable style={[styles.button, { backgroundColor: "#fff" }]} onPress={onPress} >
                {/* Incluido na biblioteca de icones @expo/vector-icons, instalada via npm */}
              <FontAwesome
                name="picture-o"
                size={18}
                color="#25292e"
                style={styles.buttonIcon}
              />
              <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
            </Pressable>
          </View>
        );
    }

    return(
        <View style={styles.buttonContainer}>
            {/* Pressable, componente nativo do react-native, serve para capturar varios interações com botões,
            desde cliques unicos como pressionar */}
            <Pressable style={styles.button} onPress={() => alert("Você pressionou o botão.")}>
                <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
      },
      button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      buttonIcon: {
        paddingRight: 8,
      },
      buttonLabel: {
        color: '#fff',
        fontSize: 16,
      },
});