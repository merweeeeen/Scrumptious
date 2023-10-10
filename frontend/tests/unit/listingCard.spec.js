import { mount } from "@vue/test-utils";
import ListingCard from "../../src/components/Listing.vue"; // Import the component you need
import LandingPage from "../../src/views/LandingPage.vue"; // Importing the page to test the existence of the component


// describe("Testing button", () => {
//   test("Apply button", () => {
//     const wrapper = mount(ListingCard); // Mounting the Footer
//     const button = wrapper.find("#card"); // Finding the id 'apply' in the Listing component
//     expect(Object.keys(button).length).toBeGreaterThan(0); // If the id apply is not found, the length would be 0
//   });
// });

// describe("Testing Listing", () => {
//   test("LandingPage contains the ListingCard component", () => {
//     const wrapper = mount(LandingPage); // Mounting the LandingPage
//     const footer = wrapper.find("#ListingCard");// Finding the id 'ListingCard' in the LandingPage
//     expect(Object.keys(footer).length).toBeGreaterThan(0); // If id ListingCard is not found in the LandingPage, the length would be 0
//   });
// });

describe("Template Describe", () => {
    test('Template Test', () => {
      expect(1+1).toBe(2)
    })
  });
  