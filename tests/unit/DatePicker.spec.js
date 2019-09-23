import { shallowMount } from "@vue/test-utils";
import DatePicker from "@/components/DatePicker.vue";

const mapDaysfromRows = vm => {
  return vm.daysPerRow.map(row => row.map(day => day.day));
  // returns 2 lvl array of day numbers [[1,2,3,4,5,6,7], [...], ...] instead of 2 lvl array of day date object [{day,month,year,current/not_current}, {...}, ...],[{...}, ...]]
};

describe("DatePicker.vue", () => {
  const { vm } = shallowMount(DatePicker);
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  months.forEach(month => {
    it(`computes current month correctely - month: ${month} `, () => {
      vm.now = new Date(`2019-${month}-01`);
      expect(vm.currentMonth).toBe(month);
    });
  });

  // TODO use some Date calculation library to automate those test and test the range of months instead of hardcoding.
  it("creates corrent days table for September 2019", () => {
    const table = [
      [26, 27, 28, 29, 30, 31, 1],
      [2, 3, 4, 5, 6, 7, 8],
      [9, 10, 11, 12, 13, 14, 15],
      [16, 17, 18, 19, 20, 21, 22],
      [23, 24, 25, 26, 27, 28, 29],
      [30, 1, 2, 3, 4, 5, 6]
    ];
    vm.now = new Date("2019-09-01");
    expect(mapDaysfromRows(vm)).toEqual(table);
  });

  it("creates corrent days table for January 2020", () => {
    const table = [
      [30, 31, 1, 2, 3, 4, 5],
      [6, 7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24, 25, 26],
      [27, 28, 29, 30, 31, 1, 2],
      [3, 4, 5, 6, 7, 8, 9]
    ];
    vm.now = new Date("2020-01-01");
    expect(mapDaysfromRows(vm)).toEqual(table);
  });

  it("renders next month and year after clicking on next button", () => {
    vm.now = new Date("2019-12-01");
    vm.nextMonth();
    expect(vm.currentMonth).toBe(1);
    expect(vm.currentYear).toBe(2020);
  });

  it("renders previous month and year after clicking on previous button", () => {
    vm.now = new Date("2020-01-01");
    vm.previousMonth();
    expect(vm.currentMonth).toBe(12);
    expect(vm.currentYear).toBe(2019);
  });
});
