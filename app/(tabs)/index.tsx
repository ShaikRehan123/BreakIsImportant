import { StyleSheet, View, Text } from "react-native";
import { Storage } from "expo-storage";
import { useState, useEffect } from "react";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { commonStyles } from "../lib";

export default function TabOneScreen() {
  const [jobs, setJobs] = useState<any>([]);
  useEffect(() => {
    const getJobs = async () => {
      const jobs = (await JSON.parse(await Storage.getItem("jobs"))) || [];
      setJobs(jobs);
    };
    getJobs();
  }, []);
  const navigation: any = useNavigation();

  return (
    <View>
      {jobs.map((job: any, i: number) => (
        <Text key={i}>{job.title}</Text>
      ))}
      <View style={styles.addNewJobButtonContainer}>
        <Button
          style={{ ...commonStyles.button }}
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
});
