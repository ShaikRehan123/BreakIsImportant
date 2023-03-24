import { View, Text, StyleSheet } from "react-native";
import { Storage } from "expo-storage";
import { DayPicker } from "react-native-picker-weekday";
import { useState } from "react";

const addNewJob = () => {
  const [workingDays, setWorkingDays] = useState([-1]);

  return (
    <View style={styles.gridContainer}>
      {/* input fields of working days,breaks between jobs like from this time to that time,from and to time,reminders with (title,description,time),n minutes break after m minutes work */}
        <View style={{      width: "100%",
            // height: 50,
            backgroundColor: "white",
            borderRadius: 10,
            marginTop: 10,
            padding: 20,}}>
            <Text style={{fontSize:20}}>
                Working  Days
            </Text>

      <DayPicker
        weekdays={workingDays}
        setWeekdays={setWorkingDays}
        activeColor="green"
        textColor="black"
        inactiveColor="white"
        wrapperStyles={{
          width: "100%",
          height: 50,
          backgroundColor: "skyblue",
          borderRadius: 10,
          marginTop: 10,
          padding: 20,
        }}
      />
        </View>
    </View>
  );
};

export default addNewJob;

const styles = StyleSheet.create({
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    height: "100%",
    padding: 10,
  },
});
