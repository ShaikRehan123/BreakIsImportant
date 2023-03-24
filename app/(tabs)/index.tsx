import { StyleSheet, View, Text } from "react-native";
import { Storage } from "expo-storage";
import { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function TabOneScreen() {
  const [jobs, setJobs] = useState<any>([]);
  useEffect(() => {
    const getJobs = async () => {
      const jobs = (await JSON.parse(await Storage.getItem("jobs"))) || [];
      setJobs(jobs);
    };
    getJobs();
  }, []);
  const navigation = useNavigation();

  return (
    <View>
      {jobs.map((job: any) => (
        <Text>{job.title}</Text>
      ))}
      <View style={styles.addNewJobButtonContainer}>
        <Button
          style={styles.addNewJobButton}
          mode="elevated"
          textColor="white"
          onPress={() => {
            console.log("Pressed");
            navigation.navigate("Add New Job");
          }}
        >
          Add New Job
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addNewJobButtonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addNewJobButton: {
    width: "100%",
    backgroundColor: "#2f95dc",
    color: "white",
    marginTop: 20,
  },
});
