import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Voice from "@react-native-voice/voice";

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");

  useEffect(() => {
    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);
    Voice.onSpeechResults = (event) => setTranscription(event.value[0]);
    Voice.onSpeechError = (event) => {
      if (
        event.error.code === "recognition_fail" &&
        event.error.message === "1110/No speech detected"
      ) {
        return Alert.alert(
          "No speech detected",
          "Please verify your Microphone permissions.",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => setIsRecording(false),
            },
            {
              text: "Open settings",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
      }

      if (event.error.message === "User denied access to speech recognition") {
        return Alert.alert(
          "Permission Needed",
          "Please allow the app to use Speech Recognition.",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => setIsRecording(false),
            },
            {
              text: "Open settings",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
      }

      Alert.alert("Error", event.error.message);
      setIsRecording(false);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async () => {
    try {
      await Voice.start("en-US");
    } catch (error) {
      Alert.alert(
        "Permission Needed",
        "Please allow the app to record audio using your Microphone and Speech Recognition.",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => setIsRecording(false),
          },
          {
            text: "Open settings",
            onPress: () => Linking.openSettings(),
          },
        ]
      );
    }
  };

  const stopRecording = async () => {
    await Voice.stop();
  };

  const clearTranscription = () => {
    setTranscription("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speech to Text</Text>
      <Text style={styles.transcription}>
        {transcription || "Say something..."}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={isRecording ? stopRecording : startRecording}
      >
        <Ionicons
          name={isRecording ? "mic-off" : "mic"}
          size={32}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.clearButton} onPress={clearTranscription}>
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  transcription: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 50,
    marginBottom: 20,
  },
  clearButton: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
  },
  clearText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default App;
