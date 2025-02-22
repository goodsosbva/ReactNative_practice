import React from 'react';
import {Calendar} from 'react-native-calendars';
import {StyleSheet} from 'react-native';

function CalendarView() {
    const markedDates = {
        '2025-02-17': {
            selected: true,
        },
        '2025-03-18': {
            marked: true,
        },
        '2025-05-05': {
            marked: true,
        },
    };
    return (
        <Calendar
            style={styles.calendar}
            markedDates={markedDates}
            theme={{
                selectedDayBackgroundColor: '#009688',
                arrowColor: '#009688',
                dotColor: '#009688',
                todayTextColor: '#009688',
            }}
        />
    );
}

const styles = StyleSheet.create({
    calendar: {
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
});

export default CalendarView;