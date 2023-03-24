import { View, Text, StyleSheet, ScrollView } from "react-native";
// import { Storage } from "expo-storage";
import { DayPicker } from "react-native-picker-weekday";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, IconButton } from "react-native-paper";
import { commonStyles } from "./lib";

interface Break {
  fromTime: string;
  toTime: string;
}

const AddNewJob = () => {
  const [workingDays, setWorkingDays] = useState([-1]);
  const [breaks, setBreaks] = useState<Array<Break>>([]);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);

  return (
    <View style={styles.gridContainer}>
      {/* input fields of working days,breaks between jobs like from this time to that time,from and to time,reminders with (title,description,time),n minutes break after m minutes work */}
      <View
        style={{
          width: "100%",
          // height: 50,
          backgroundColor: "white",
          borderRadius: 10,
          marginTop: 10,
          padding: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        }}
      >
        <Text style={{ fontSize: 20 }}>Working Days</Text>

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
            padding: 2,
          }}
          dayTextStyle={{
            fontSize: 10,
            color: "black",
          }}
        />
      </View>

      <View
        style={{
          width: "100%",
          // height: 50,
          backgroundColor: "white",
          borderRadius: 10,
          marginTop: 10,
          padding: 20,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        }}
      >
        <Text style={{ fontSize: 20 }}>Breaks</Text>
        {breaks?.map((breakItem, i) => (
          <View
            style={{
              shadowColor: "skyblue",
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
              width: "100%",
              backgroundColor: "#ccc",
              marginTop: 25,
              padding: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              position: "relative",
            }}
            key={Math.random() + i}
          >
            <View
              style={{
                width: "48%",
              }}
            >
              <Text>From</Text>
              <View
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.0,
                  elevation: 24,
                  height: 40,
                  width: "100%",
                  backgroundColor: "white",
                  // padding: 10,
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text>
                  {breakItem.fromTime ? breakItem.fromTime : "Select Time"}
                </Text>
                <IconButton
                  icon="clock"
                  size={20}
                  onPress={() => {
                    setShowFromTimePicker(true);
                  }}
                />
              </View>
              {showFromTimePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || new Date();
                    setShowFromTimePicker(false);
                    setBreaks((prev) => {
                      const newBreaks = [...prev];
                      newBreaks[i].fromTime = currentDate.toLocaleTimeString();
                      return newBreaks;
                    });
                  }}
                />
              )}
            </View>
            <View
              style={{
                width: "48%",
              }}
            >
              <Text>To</Text>
              <View
                style={{
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.0,
                  elevation: 24,
                  height: 40,
                  width: "100%",
                  backgroundColor: "white",
                  // padding: 10,
                  display: "flex",
                  alignItems: "center",
                  borderRadius: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <Text>
                  {breakItem.toTime ? breakItem.toTime : "Select Time"}
                </Text>
                <IconButton
                  icon="clock"
                  size={20}
                  onPress={() => {
                    setShowToTimePicker(true);
                  }}
                />
              </View>
              {showToTimePicker && (
                <DateTimePicker
                  testID="dateTimePicker2"
                  value={new Date()}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || new Date();
                    setShowToTimePicker(false);
                    setBreaks((prev) => {
                      const newBreaks = [...prev];
                      newBreaks[i].toTime = currentDate.toLocaleTimeString();
                      return newBreaks;
                    });
                  }}
                />
              )}
            </View>
            <IconButton
              icon="close"
              size={20}
              onPress={() => {
                setBreaks((prev) => {
                  const newBreaks = [...prev];
                  newBreaks.splice(i, 1);
                  return newBreaks;
                });
              }}
              containerColor="red"
              iconColor="white"
              style={{
                position: "absolute",
                top: -25,
                right: -25,
              }}
            />
          </View>
        ))}
        <Button
          onPress={() => {
            setBreaks([...breaks, { fromTime: "", toTime: "" }]);
          }}
          mode="elevated"
          textColor="white"
          style={{ ...commonStyles.button }}
        >
          Add Break
        </Button>
      </View>
    </View>
  );
};

export default AddNewJob;

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
