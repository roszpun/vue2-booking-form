<template>
  <div class="date-picker">
    <div class="calendar-heading">
      <button @click="previousMonth">&lt;</button>
      <div class="month-year-indicator">{{ currentMonthName }} {{ currentYear }}</div>
      <button @click="nextMonth">&gt;</button>
    </div>
    <div class="table-wrapper">
      <table>
        <tr>
          <th v-for="(weekday, index) in weekDays" :key="index">{{ weekday }}</th>
        </tr>
        <tr v-for="(row, index) in daysPerRow" :key="index">
          <td v-for="(day, dayIndex) in row" :key="dayIndex">
            <CalendarDay
              :day="day.day"
              :month="day.month"
              :year="day.year"
              :isCurrentMonth="day.current"
              :isDisabled="isDisabledDate(stringifyDate(day))"
              :isSelected="isSelectedDate(stringifyDate(day))"
              :isDiabledForCheckout="isDiabledForCheckout(stringifyDate(day))"
              :isCheckIn="isCheckIn(stringifyDate(day))"
              :isCheckOut="isCheckOut(stringifyDate(day))"
              :isToday="isToday(stringifyDate(day))"
              :isInSelectedDaysRange="isInSelectedRange(stringifyDate(day))"
              :checkInAndOutSelected="bothDatesSelected"
              @date-selection="handleDateSelection"
            />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import daysInMonth from "./../../helpers/daysInMonth.js";
import weekDayByDate from "./../../helpers/weekDayByDate.js";
import isValidDate from "./../../helpers/isValidDate.js";
import CalendarDay from "./CalendarDay";
export default {
  name: "DatePicker",
  components: {
    CalendarDay
  },
  props: {
    checkInDate: {
      type: String
    },
    checkOutDate: {
      type: String
    }
  },
  data() {
    const now = new Date(Date.now());
    return {
      dayRows: 5,
      weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      now
    };
  },
  mounted() {
    const date = new Date(this.checkInDate);
    if (isValidDate(date)) {
      this.now = date;
    }
  },
  computed: {
    currentMonth() {
      return this.now.getMonth() + 1; // JS months start with 0. +1 will solve possible fuckups in thinking later on
    },
    currentMonthName() {
      return this.months[this.currentMonth - 1]; // - 1 since array starts from 0
    },
    currentDayOfTheMonth() {
      return this.now.getDay();
    },
    currentYear() {
      return this.now.getFullYear();
    },
    daysInMonth() {
      return daysInMonth(this.currentMonth, this.currentYear);
    },
    daysInPreviousMonth() {
      return daysInMonth(this.currentMonth - 1, this.currentYear);
    },
    firstDayOfMonth() {
      return weekDayByDate(this.currentYear, this.currentMonth, 1);
    },
    lastDayOfMonth() {
      return weekDayByDate(
        this.currentYear,
        this.currentMonth,
        this.daysInMonth
      );
    },
    daysPerRow() {
      const first = this.createFirstRow();
      const second = this.createRow(first, 1);
      const third = this.createRow(second, 2);
      const fourth = this.createRow(third, 3);
      const fifth = this.createRow(fourth, 4);
      const sixth = this.createRow(fifth, 5);
      return [first, second, third, fourth, fifth, sixth];
    },
    bothDatesSelected() {
      return (
        isValidDate(new Date(this.checkInDate)) &&
        isValidDate(new Date(this.checkOutDate))
      );
    }
  },
  methods: {
    // TODO: Consider refactoring this since it's hard to read. Try to extract conditions into more readable constants
    createFirstRow() {
      const currentMonthFirstDay = this.firstDayOfMonth;
      const prevMonthDays = this.daysInPreviousMonth;
      const row = [];
      let n = 1;
      let x = 1;
      let currentDaysCount = 7 - currentMonthFirstDay + 1;
      let prevDaysCount = 7 - currentDaysCount;
      for (var i = 0; i < 7; i++) {
        const hasFirstDay = row.some(rowDay => rowDay.day === 1);
        const isNotFirstDay = i + 1 !== currentMonthFirstDay;
        if (isNotFirstDay && !hasFirstDay) {
          row.push({
            current: false,
            month: this.calculatePreviousMonth(this.currentMonth),
            year: this.calculatePreviousYear(this.currentMonth),
            day: prevMonthDays - prevDaysCount + x
          });
          x++;
        } else {
          row.push({
            current: true,
            year: this.currentYear,
            month: this.currentMonth,
            day: n++
          });
        }
      }
      return row;
    },
    // TODO: Consider refactoring this since it's hard to read. Try to extract conditions into more readable constants
    createRow(prevRow, rowIndex) {
      let startingDay = prevRow[prevRow.length - 1].day;
      const row = [];
      let n = 1;
      for (var i = 1; i <= 7; i++) {
        const isCurrentMonthDay = startingDay + i <= this.daysInMonth;
        if (isCurrentMonthDay) {
          const notCurrentMonth =
            (prevRow.some(day => day.day === this.daysInMonth) &&
              rowIndex !== 1) ||
            (prevRow.some((day, index) => day.day === 7 && index === 6) &&
              rowIndex !== 1);
          const current = !notCurrentMonth;
          row.push({
            current,
            month: notCurrentMonth
              ? this.calculateNextMonth(this.currentMonth)
              : this.currentMonth,
            year: notCurrentMonth
              ? this.calculateNextYear(this.currentMonth)
              : this.currentYear,
            day: startingDay + i
          });
        } else {
          row.push({
            current: false,
            month: this.calculateNextMonth(this.currentMonth),
            year: this.calculateNextYear(this.currentMonth),
            day: n++
          });
        }
      }
      return row;
    },
    nextMonth() {
      this.now = new Date(this.now.setMonth(this.currentMonth));
    },
    previousMonth() {
      this.now = new Date(this.now.setMonth(this.currentMonth - 2)); // -2 since -1 would be same month
    },
    calculateNextMonth(current) {
      return current === 12 ? 1 : current + 1;
    },
    calculatePreviousMonth(current) {
      return current === 1 ? 12 : current - 1;
    },
    calculateNextYear(currentMonth) {
      return currentMonth === 12 ? this.currentYear + 1 : this.currentYear;
    },
    calculatePreviousYear(currentMonth) {
      return currentMonth === 1 ? this.currentYear - 1 : this.currentYear;
    },
    isSelectedDate(date) {
      return this.isCheckIn(date) || this.isCheckOut(date);
    },
    isDisabledDate(date) {
      return new Date(date) < Date.now();
    },
    isDiabledForCheckout(date) {
      return (
        isValidDate(new Date(this.checkInDate)) &&
        new Date(date) < new Date(this.checkInDate)
      );
    },
    isToday(date) {
      return this.equalDates(date, Date.now());
    },
    isInSelectedRange(date) {
      if (!this.bothDatesSelected) return false;
      return (
        (new Date(date) >= new Date(this.checkInDate) &&
          new Date(date) <= new Date(this.checkOutDate)) ||
        (this.isCheckIn(date) || this.isCheckOut(date))
      );
    },
    handleDateSelection(date) {
      if (
        this.checkInDate === "" ||
        (this.checkInDate !== "" && this.checkOutDate !== "")
      ) {
        this.$emit("clearDates");
        this.$emit("checkInDateChange", date);
      } else {
        this.$emit("checkOutDateChange", date);
      }
    },
    equalDates(date1, date2) {
      if (!isValidDate(new Date(date1) || !isValidDate(new Date(date2))))
        return false;
      return new Date(date1).toDateString() === new Date(date2).toDateString();
    },
    isCheckIn(date) {
      return this.equalDates(date, this.checkInDate);
    },
    isCheckOut(date) {
      return this.equalDates(date, this.checkOutDate);
    },
    stringifyDate({ year, month, day }) {
      return `${year}-${month}-${day}`;
    }
  }
};
</script>

<style scoped lang="scss">
.date-picker {
  position: absolute;
  background: #fff;
  box-shadow: gray 0px 0px 15px;
}
th {
  padding: 5px;
}
table,
td {
  border-collapse: collapse;
  border: 0;
  padding: 0;
}
th {
  color: lightgray;
}

table {
  width: 100%;
}
.table-wrapper {
  padding: 20px;
}
.calendar-heading {
  color: #fff;
  font-weight: 800;
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  justify-content: space-around;
  background: lightseagreen;
  width: 100%;
  padding: 20px 0;
  font-size: 20px;
  button {
    font-size: 25px;
    background: none;
    color: #000;
    outline: none;
    cursor: pointer;
    font-weight: 800;
    border: 0;
  }
}
.month-year-indicator {
  width: 50%;
}
</style>
