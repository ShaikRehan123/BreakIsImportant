import { View, Text, StyleSheet, ScrollView } from "react-native";
// import { Storage } from "expo-storage";
import { DayPicker } from "react-native-picker-weekday";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, IconButton, TextInput } from "react-native-paper";
import { commonStyles } from "./lib";

interface Break {
  fromTime: Date;
  toTime: Date;
}

interface Reminder {
  time: Date;
  message: string;
}

const AddNewJob = () => {
  const [workingDays, setWorkingDays] = useState([-1]);
  const [breaks, setBreaks] = useState<Array<Break>>([]);
  const [showFromTimePicker, setShowFromTimePicker] = useState(false);
  const [showToTimePicker, setShowToTimePicker] = useState(false);
  const [showTimePickerBreakId, setShowTimePickerBreakId] = useState(-1);
  const [showWorkingHoursFromTimePicker, setShowWorkingHoursFromTimePicker] =
    useState(false);
  const [showWorkingHoursToTimePicker, setShowWorkingHoursToTimePicker] =
    useState(false);

  const [workingHoursFromTime, setWorkingHoursFromTime] = useState<Date>(
    new Date()
  );
  const [workingHoursToTime, setWorkingHoursToTime] = useState<Date>(
    new Date()
  );
  const [reminders, setReminders] = useState<Array<Reminder>>([]);
  const [showReminderTimePicker, setShowReminderTimePicker] = useState(false);
  const [showReminderTimePickerId, setShowReminderTimePickerId] = useState(-1);
  const [temp, setTemp] = useState({
    editingIndex: -1,
    message: "",
  });

  return (
    <ScrollView
      style={styles.gridContainer}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View
        style={{
          ...styles.card,
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
          ...styles.card,
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
                  {breakItem.fromTime
                    ? new Date(breakItem.fromTime).toLocaleTimeString()
                    : "Select Time"}
                </Text>
                <IconButton
                  icon="clock"
                  size={20}
                  onPress={() => {
                    setShowFromTimePicker(true);
                    setShowTimePickerBreakId(i);
                  }}
                />
              </View>
              {showFromTimePicker && showTimePickerBreakId === i && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode="time"
                  is24Hour={false}
                  display="default"
                  onChange={(event, selectedDate) => {
                    const currentDate = selectedDate || new Date();
                    setShowFromTimePicker(false);
                    setShowTimePickerBreakId(-1);
                    setBreaks((prev) => {
                      const newBreaks = [...prev];
                      newBreaks[i].fromTime = currentDate;
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
                  {breakItem.toTime
                    ? new Date(breakItem.toTime).toLocaleTimeString()
                    : "Select Time"}
                </Text>
                <IconButton
                  icon="clock"
                  size={20}
                  onPress={() => {
                    setShowToTimePicker(true);
                    setShowTimePickerBreakId(i);
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
                    setShowTimePickerBreakId(-1);
                    setBreaks((prev) => {
                      const newBreaks = [...prev];
                      newBreaks[i].toTime = currentDate;
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
            // setBreaks([...breaks, { fromTime: "", toTime: "" }]);
            setBreaks([
              ...breaks,
              { fromTime: new Date(), toTime: new Date() },
            ]);
          }}
          mode="elevated"
          textColor="white"
          style={{ ...commonStyles.button }}
        >
          Add Break
        </Button>
      </View>

      <View
        style={{
          ...styles.card,
        }}
      >
        <Text style={{ fontSize: 20 }}>Working Hours</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
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
                {workingHoursFromTime
                  ? new Date(workingHoursFromTime).toLocaleTimeString()
                  : "Select Time"}
              </Text>
              <IconButton
                icon="clock"
                size={20}
                onPress={() => {
                  setShowWorkingHoursFromTimePicker(true);
                }}
              />
            </View>
            {showWorkingHoursFromTimePicker && (
              <DateTimePicker
                testID="dateTimePicker3"
                value={new Date()}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || new Date();
                  setShowWorkingHoursFromTimePicker(false);
                  setWorkingHoursFromTime(currentDate);
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
                {workingHoursToTime
                  ? new Date(workingHoursToTime).toLocaleTimeString()
                  : "Select Time"}
              </Text>
              <IconButton
                icon="clock"
                size={20}
                onPress={() => {
                  setShowWorkingHoursToTimePicker(true);
                }}
              />
            </View>
            {showWorkingHoursToTimePicker && (
              <DateTimePicker
                testID="dateTimePicker4"
                value={new Date()}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || new Date();
                  setShowWorkingHoursToTimePicker(false);
                  setWorkingHoursToTime(currentDate);
                }}
              />
            )}
          </View>
        </View>
      </View>

      <View
        style={{
          ...styles.card,
        }}
      >
        <Text style={{ fontSize: 20 }}>Reminders</Text>
        {reminders.map((reminder, i) => (
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
              <Text>Time</Text>
            </View>
            <View
              style={{
                width: "48%",
              }}
            >
              <Text>Message</Text>
              <TextInput
                mode="outlined"
                value={
                  temp.editingIndex === i ? temp.message : reminder.message
                }
                onFocus={() => {
                  setTemp({
                    editingIndex: i,
                    message: reminder.message,
                  });
                }}
                onChangeText={(text) => {
                  setTemp({
                    editingIndex: i,

                    message: text,
                  });
                }}
                onBlur={() => {
                  const newReminders = [...reminders];
                  newReminders[i].message = temp.message;
                  setReminders(newReminders);
                  setTemp({
                    editingIndex: -1,
                    message: "",
                  });
                }}
              />
            </View>
          </View>
        ))}
        <Button
          onPress={() => {
            setReminders([...reminders, { time: new Date(), message: "" }]);
          }}
          mode="elevated"
          textColor="white"
          style={{ ...commonStyles.button }}
        >
          Add Reminder
        </Button>
      </View>
    </ScrollView>
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
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 10,
    padding: 20,
  },
});
