<template>
  <div class="booking-form" ref="pickerWrapper">
    <div class="price-raiting-container">
      <!-- Replace with component -->
      <h2 class="price-per-day">298 zł</h2>
      <!--  -->
      <Rating
        class="rating-component"
        :rating="4.5"
        :maxRating="5"
        :totalRatings="123"
        :scale="0.25"
        :textSize="15"
      />
    </div>
    <div class="dates-picker-container">
      <h4>Dates</h4>
      <div class="fields-wrapper" @click="openDatePicker">
        <input v-model="checkInDate" type="text" placeholder="Check In" @blur="validateDates">
        <span class="icon">&#10230;</span>
        <input v-model="checkOutDate" type="text" placeholder="Check Out" @blur="validateDates">
      </div>
    </div>
    <DatePicker
      v-if="isDatePickerDisplayed"
      :checkInDate="checkInDate"
      :checkOutDate="checkOutDate"
      @clearDates="onClearDates"
      @checkInDateChange="onCheckInDateChange"
      @checkOutDateChange="onCheckOutDateChange"
      @close="closeDatePicker"
    />
    <button type="submit">Book</button>
  </div>
</template>

<script>
import Rating from "./BookingForm/Rating";
import DatePicker from "./BookingForm/DatePicker";
import isValidDate from "./../helpers/isValidDate.js";
export default {
  name: "BookingForm",
  components: {
    Rating,
    DatePicker
  },
  data() {
    return {
      isDatePickerDisplayed: false,
      checkInDate: "",
      checkOutDate: ""
    };
  },
  mounted() {
    this.addOutsidePickerListener(this.$refs.pickerWrapper);
  },
  methods: {
    openDatePicker() {
      this.isDatePickerDisplayed = true;
    },
    closeDatePicker() {
      this.isDatePickerDisplayed = false;
    },
    addOutsidePickerListener(el) {
      document.addEventListener("click", event => {
        const isClickInside = el.contains(event.target);
        if (!isClickInside) {
          this.closeDatePicker();
        }
      });
    },
    onClearDates() {
      this.checkInDate = "";
      this.checkOutDate = "";
    },
    onCheckInDateChange(date) {
      this.checkInDate = date;
    },
    onCheckOutDateChange(date) {
      this.checkOutDate = date;
    },
    validateDates() {
      // Simple validation
      const parsedDates = [
        new Date(this.checkInDate),
        new Date(this.checkOutDate)
      ];
      if (this.checkInDate !== "" && !isValidDate(parsedDates[0])) {
        alert("Sorry, your check in date is not valid");
        this.checkInDate = "";
      } else if (this.checkOutDate !== "" && !isValidDate(parsedDates[1])) {
        alert("Sorry, your check out date is not valid");
        this.checkOutDate = "";
      } else if (parsedDates[0] > parsedDates[1]) {
        alert(
          "Sorry, your check out date cannot be earlier than check in date."
        );
        this.checkOutDate = "";
      } else if (
        parsedDates[0] < new Date(Date.now()) ||
        parsedDates[0].toDateString() === new Date(Date.now()).toDateString()
      ) {
        alert("Sorry, your check in date cannot be earlier than tomorrow");
        this.checkInDate = "";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.booking-form {
  width: 400px;
  margin: 0 auto;
  border: 1px solid gray;
  padding: 30px;
}
.price-raiting-container {
  display: flex;
  flex-flow: column wrap;
  text-align: left;
  border-bottom: 1px solid gray;
  .rating-component {
    margin-bottom: 15px;
  }
  h2 {
    margin: 0 0 5px;
  }
}

.dates-picker-container {
  display: block;
  text-align: left;
  h4 {
    margin: 30px 0 5px;
  }
  .fields-wrapper {
    display: flex;
    border: 1px solid gray;
    padding: 10px;
    flex-flow: row wrap;
    justify-content: space-around;
  }
  input {
    width: 40%;
  }
  .icon {
    text-align: center;
    display: inline-block;
    width: 10%;
    font-size: 25px;
    color: gray;
  }
}

button {
  margin: 20px 0 0 auto;
  outline: none;
  cursor: pointer;
  padding: 15px 30px;
  color: #fff;
  background: lightcoral;
  border-radius: 30px;
  border: 0;
  display: block;
  font-size: 18px;
}
</style>
