import { mount } from "@vue/test-utils";
import Footer from "../../src/components/Footer.vue"; // Import the component you need
import LandingPage from "../../src/pages/LandingPage.vue"; // Importing the page to test the existence of the component


describe("Testing buttons", () => {
  test("Home button", () => {
    const wrapper = mount(Footer); // Mounting the Footer
    const button = wrapper.find("#Home"); // Finding the id 'Home' in the Footer component

    expect(Object.keys(button).length).toBeGreaterThan(0); // If the id 'Home' is not found, the length would be 0
  });
  test("Departments button", () => {
    const wrapper = mount(Footer); // Mounting the Footer
    const button = wrapper.find("#Departments"); // Finding the id 'Departments' in the Footer component

    expect(Object.keys(button).length).toBeGreaterThan(0); // If the id 'Departments' is not found, the length would be 0
  });
  test("HRMS button", () => {
    const wrapper = mount(Footer); // Mounting the Footer
    const button = wrapper.find("#HRMS"); // Finding the id 'HHRMSome' in the Footer component

    expect(Object.keys(button).length).toBeGreaterThan(0); // If the id 'HRMS' is not found, the length would be 0
  });
  test("LMS button", () => {
    const wrapper = mount(Footer); // Mounting the Footer
    const button = wrapper.find("#LMS"); // Finding the id 'LMS' in the Footer component

    expect(Object.keys(button).length).toBeGreaterThan(0); // If the id 'LMS' is not found, the length would be 0
  });
  test("LJPS button", () => {
    const wrapper = mount(Footer); // Mounting the Footer
    const button = wrapper.find("#LJPS"); // Finding the id 'LJPS' in the Footer component

    expect(Object.keys(button).length).toBeGreaterThan(0); // If the id 'LJPS' is not found, the length would be 0
  });
  test("Feedback button", () => {
    const wrapper = mount(Footer); // Mounting the Footer
    const button = wrapper.find("#Feedback"); // Finding the id 'Feedback' in the Footer component

    expect(Object.keys(button).length).toBeGreaterThan(0); // If the id 'Feedback' is not found, the length would be 0
  });
});

describe("Testing Footer", () => {
  test("LandingPage contains the Footer component", () => {
    const wrapper = mount(LandingPage); // Mounting the LandingPage
    const footer = wrapper.find("#Footer");// Finding the id 'Footer' in the LandingPage
    expect(Object.keys(footer).length).toBeGreaterThan(0); // If id 'Footer' is not found in the LandingPage, the length would be 0
  });
});
