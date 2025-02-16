import { Camera, CameraView } from "expo-camera";
import { Stack } from "expo-router";
import { useRef, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Dimensions,
  View,
  Alert
} from "react-native";
import { Canvas, DiffRect, rect, rrect } from "@shopify/react-native-skia";

const { width, height } = Dimensions.get("window");

const innerDimension = 300;

const outer = rrect(rect(0, 0, width, height), 0, 0);
const inner = rrect(
  rect(
    width / 2 - innerDimension / 2,
    height / 2 - innerDimension / 2,
    innerDimension,
    innerDimension
  ),
  50,
  50
);

export default function Home() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const [cameraView, setCameraView] = useState<CameraView | null>(null);
  const router = useRouter(); // Initialize router

  const [scanMessage, setScanMessage] = useState("Scanning...");


  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFillObject}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
              qrLock.current = true;
              setScanMessage("QR Code Scanned!");

              setTimeout(async () => {
                  console.log("data", data);
                  try {
                      // 1. Alert the user:
                      Alert.alert("QR Code Result", data, [
                          {
                              text: "OK",
                              onPress: () => {
                                  // 2. Close the scanner screen:
                                  router.back(); // Use router.back() to navigate back
                              },
                          },
                      ]);
                  } catch (error) {
                      console.error("Error opening URL or displaying alert:", error);
                      Alert.alert("Error", "Could not process the QR code."); // Alert for error
                  }
                  setScanMessage("Scanning...");
              }, 500);
          }
      }}
      />
      <Canvas
        style={
          Platform.OS === "android"
            ? { flex: 1 }
            : StyleSheet.absoluteFillObject
        }
      >
        <DiffRect inner={inner} outer={outer} color="black" opacity={0.5} />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Important: Use flex: 1 for the main container
  },
});
