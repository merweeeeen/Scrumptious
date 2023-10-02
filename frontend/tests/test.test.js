import { mount } from "@vue/test-utils";
import Footer from "../src/components/Footer.vue"; // Import the component you need

describe("Testing buttons", () => {
  test("Home button", () => {
    const wrapper = mount(Footer); // Mounting the Footer
    const button = wrapper.find("#Home"); // Finding the id 'Home' in the Footer component

    expect(Object.keys(button).length).toBeGreaterThan(0); // If the id Home is not found, the length would be 0
  });
});
