import { Ionicons } from "@expo/vector-icons";
import Voice from "@react-native-voice/voice";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import IconButton from "../../animations/IconButton";
import { COLORS } from "../../theme/colors";

const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");

  useEffect(() => {
    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);
    Voice.onSpeechResults = (event) => setTranscription(event.value[0]);
    Voice.onSpeechError = async (event) => {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      if (
        event.error.code === "recognition_fail" &&
        event.error.message === "1110/No speech detected"
      ) {
        return Alert.alert(
          "No speech detected",
          "Please try to speak closer to the microphone or verify your permissions.",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => setIsRecording(false),
            },
            {
              text: "Open settings",
              onPress: () => {
                setIsRecording(false);
                Linking.openSettings();
              },
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
              onPress: () => {
                setIsRecording(false);
                Linking.openSettings();
              },
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
      await Promise.all([
        Voice.start("en-US"),
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid),
      ])
    } catch (error) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
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
            onPress: () => {
              setIsRecording(false);
              Linking.openSettings();
            },
          },
        ]
      );
    }
  };

  const stopRecording = async () => {
    await Promise.all([
      Voice.stop(),
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid),
    ]).then(() => setIsRecording(false));
  };

  const clearTranscription = async () => {
    setTranscription("");
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(transcription);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Text style={transcription ? styles.transcription : styles.placeholder}>
            {transcription || "Start recording..."}
          </Text>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        {transcription && !isRecording ? (
          <>
            <TouchableOpacity style={styles.clearButton} onPress={clearTranscription}>
              <Ionicons name="trash" size={36} color={COLORS.gray300} />
            </TouchableOpacity>
            <IconButton icon="copy-outline" onPress={copyToClipboard} />
          </>
        ) : (
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: isRecording ? COLORS.red : COLORS.blue },
            ]}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <Ionicons name={isRecording ? "stop" : "mic"} size={36} color={COLORS.white200} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },
  content: {
    flex: 1,
    width: "90%",
    backgroundColor: COLORS.white100,
    marginTop: 16,
    marginBottom: 48,
    borderRadius: 12,
    shadowColor: COLORS.gray100,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  transcription: {
    fontSize: 20,
    color: COLORS.gray600,
    fontWeight: "bold",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  placeholder: {
    fontSize: 20,
    color: COLORS.gray300,
    fontWeight: "bold",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
    gap: 20,
  },
  button: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 48,
    marginBottom: 20,
  },
  clearButton: {
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    borderWidth: 2.5,
    borderColor: COLORS.gray300,
    borderRadius: 48,
    marginBottom: 20,
  },
});

export default SpeechToText;
