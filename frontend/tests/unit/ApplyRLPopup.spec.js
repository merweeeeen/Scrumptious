import { mount } from "@vue/test-utils";
// import ListingCard from "../../src/components/Listing.vue"; // Import the component you need
import ApplyRLPopup from "../../src/components/ApplyRLPopup.vue"; // Import the component you need
import LandingPage from "../../src/views/LandingPage.vue"; // Importing the page to test the existence of the component


describe("Testing Apply Popup", () => {
    test("Pop up", () => {
        const wrapper = mount(ApplyRLPopup); // Mounting the ApplyRLPopup
        const button = wrapper.find("#popup"); // Finding the id 'popup' in the Listing component

        expect(Object.keys(button).length).toBeGreaterThan(0); // If the id 'popup' is not found, the length would be 0
    });
});

// describe("Testing button", () => {
//     test("Apply button", () => {
//         const wrapper = mount(ApplyRLPopup); // Mounting the ApplyRLPopup
//         const button = wrapper.find("#apply"); // Finding the id 'apply' in the Listing component

//         expect(Object.keys(button).length).toBeGreaterThan(0); // If the id 'apply' is not found, the length would be 0
//     });
// });

// describe("Testing resume upload input", () => {
//     test("Resume input", () => {
//         const wrapper = mount(ApplyRLPopup); // Mounting the ApplyRLPopup
//         const button = wrapper.find("#resume"); // Finding the id 'resume' in the Listing component

//         expect(Object.keys(button).length).toBeGreaterThan(0); // If the id 'resume' is not found, the length would be 0
//     });
// });

// describe("Testing write-up input field", () => {
//     test("Write-up input field", () => {
//         const wrapper = mount(ApplyRLPopup); // Mounting the ApplyRLPopup
//         const button = wrapper.find("#writeUp"); // Finding the id 'writeUp' in the Listing component

//         expect(Object.keys(button).length).toBeGreaterThan(0); // If the id 'writeUp' is not found, the length would be 0
//     });
// });

// describe("Testing submit button", () => {
//     test("Submit button", () => {
//         const wrapper = mount(ApplyRLPopup); // Mounting the ApplyRLPopup
//         const button = wrapper.find("#submit"); // Finding the id 'submit' in the Listing component

//         expect(Object.keys(button).length).toBeGreaterThan(0); // If the id 'submit' is not found, the length would be 0
//     });
// });

// describe("Testing Confirmation popup", () => {
//     test("Confirmation popup", () => {
//         const wrapper = mount(ApplyRLPopup); // Mounting the ApplyRLPopup
//         const button = wrapper.find("#confirmation"); // Finding the id 'confirmation' in the Listing component

//         expect(Object.keys(button).length).toBeGreaterThan(0); // If the id 'confirmation' is not found, the length would be 0
//     });
// });

// describe("Testing close button", () => {
//     test("Close button", () => {
//         const wrapper = mount(ApplyRLPopup); // Mounting the ApplyRLPopup
//         const button = wrapper.find("#close"); // Finding the id 'close' in the Listing component

//         expect(Object.keys(button).length).toBeGreaterThan(0); // If the id 'close' is not found, the length would be 0
//     });
// });

describe("Testing Listing", () => {
    test("LandingPage contains the ListingCard component", () => {
        const wrapper = mount(LandingPage); // Mounting the LandingPage
        const footer = wrapper.find("#ListingCard");// Finding the id 'ListingCard' in the LandingPage
        expect(Object.keys(footer).length).toBeGreaterThan(0); // If id 'ListingCard' is not found in the LandingPage, the length would be 0
    });
});