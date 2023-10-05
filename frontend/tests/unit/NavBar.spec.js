import { mount } from "@vue/test-utils";
import NavBar from "../../src/components/NavBar.vue"; // Import the component you need
import LandingPage from "../../src/pages/LandingPage.vue"; // Importing the page to test the existence of the component


describe("Testing buttons", () => {
    test("Hamburger menu", () => {
        const wrapper = mount(NavBar); // Mounting the NavBar
        const button = wrapper.find("#Menu"); // Finding the id 'Menu' in the NavBar component

        expect(Object.keys(button).length).toBeGreaterThan(0); // If the id 'Menu' is not found, the length would be 0
    });
    test("title button", () => {
        const wrapper = mount(NavBar); // Mounting the Navbar
        const button = wrapper.find("#Title"); // Finding the id 'Title' in the Navbar component

        expect(Object.keys(button).length).toBeGreaterThan(0); // If the id 'Title' is not found, the length would be 0
    });
    test("link button", () => {
        const wrapper = mount(NavBar); // Mounting the Navbar
        const button = wrapper.find("#Link"); // Finding the id 'Link' in the Navbar component

        expect(Object.keys(button).length).toBeGreaterThan(0); // If the id 'Link' is not found, the length would be 0
    });
    test("account button", () => {
        const wrapper = mount(NavBar); // Mounting the Navbar
        const button = wrapper.find("#Account"); // Finding the id 'Account' in the Navbar component

        expect(Object.keys(button).length).toBeGreaterThan(0); // If the id 'Account' is not found, the length would be 0
    });
    });

    describe("Testing NavBar", () => {
    test("LandingPage contains the NavBar component", () => {
        const wrapper = mount(LandingPage); // Mounting the LandingPage
        const NavBar = wrapper.find("#NavBar");// Finding the id 'NavBar' in the LandingPage
        expect(Object.keys(NavBar).length).toBeGreaterThan(0); // If id NavBar is not found in the LandingPage, the length would be 0
    });
    });
