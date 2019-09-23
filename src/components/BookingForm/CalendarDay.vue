<template>
  <div
    class="day-wrapper"
    :class="{
      'in-range': isInSelectedDaysRange,
      checkin: isCheckIn,
      checkout: isCheckOut,
      'disabled-selectable': disabledButSelectable
    }"
  >
    <div
      class="calendar-day"
      :class="{
        current: isCurrentMonth,
        disabled: isDisabled || isDiabledForCheckout,
        today: isToday,
        selected: isSelected
      }"
      @click="
        selectDate(
          `${year}-${prependNullOnSingleDigit(
            month
          )}-${prependNullOnSingleDigit(day)}`
        )
      "
    >
      <span>{{ day }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CalendarDay",
  props: {
    day: {
      type: Number,
      min: 1,
      max: 31,
      required: true
    },
    month: {
      type: Number,
      min: 1,
      max: 12,
      required: true
    },
    year: {
      type: Number,
      required: true
    },
    isCurrentMonth: {
      type: Boolean,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    isSelected: {
      type: Boolean,
      default: false
    },
    isToday: {
      type: Boolean,
      default: false
    },
    isCheckIn: {
      type: Boolean,
      default: false
    },
    isCheckOut: {
      type: Boolean,
      default: false
    },
    isDiabledForCheckout: {
      type: Boolean,
      default: false
    },
    isInSelectedDaysRange: {
      type: Boolean,
      default: false
    },
    checkInAndOutSelected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectDate(date) {
      if (
        (!this.isDisabled && !this.isDiabledForCheckout) ||
        (!this.isDisabled && this.checkInAndOutSelected)
      ) {
        this.$emit("date-selection", date);
      }
    },
    prependNullOnSingleDigit(dayOrMonth) {
      return ("0" + dayOrMonth).slice(-2);
    }
  },
  computed: {
    disabledButSelectable() {
      return this.checkInAndOutSelected && !this.isDisabled;
    }
  }
};
</script>

<style scoped lang="scss">
.day-wrapper {
  margin: 3px 0 0 0;
}
.calendar-day {
  width: 35px;
  height: 35px;
  line-height: 35px;
  padding: 5px;
  border: 2px solid transparent;
  cursor: pointer;
  border-radius: 50%;
  &:hover {
    border: 2px solid lightseagreen;
    span {
      color: lightseagreen;
    }
  }
  span {
    color: lightgray;
  }
  &.current {
    span {
      color: gray;
    }
  }
  &.selected {
    background: lightseagreen;
    span {
      color: #fff;
    }
    &:hover {
      span {
        color: #fff !important;
      }
    }
  }
  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
    &:hover {
      border: 2px solid transparent;
      span {
        color: lightgray;
      }
    }
    &.current:hover {
      border: 2px solid transparent;
      span {
        color: gray;
      }
    }
  }
  &.today {
    &.disabled {
      opacity: 1;
      &:hover {
        border: 2px solid lightseagreen;
        span {
          color: lightseagreen;
        }
      }
    }
    border: 2px solid lightseagreen;
    span {
      color: lightseagreen;
    }
  }
}
span {
  font-weight: 800;
}
.in-range {
  background: rgb(174, 235, 232);
  .disabled:hover,
  .disabled.current:hover {
    span {
      color: #fff;
    }
  }
  .disabled {
    opacity: 1;
  }
  .calendar-day {
    &.selected {
      span {
        color: #fff;
      }
    }
    span {
      color: lightseagreen;
    }
  }
  &.checkin {
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
    .calendar-day {
      opacity: 1;
    }
  }
  &.checkout {
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
  }
}
.checkin {
  .calendar-day {
    opacity: 1;
  }
}
.disabled-selectable {
  .calendar-day {
    cursor: pointer;
  }
}
</style>
