import { shallowMount } from "@vue/test-utils";
import BookingForm from "@/components/BookingForm.vue";

describe("BookingForm.vue", () => {
  const wrapper = shallowMount(BookingForm);
  it("Date picker is hidden by default", () => {
    expect(wrapper.vm.isDatePickerDisplayed).toBe(false);
  });

  it("Date picker is shown after clicking on inputs or theirs wrapper", () => {
    wrapper.find(".fields-wrapper").trigger("click");
    expect(wrapper.vm.isDatePickerDisplayed).toBe(true);
  });
});
