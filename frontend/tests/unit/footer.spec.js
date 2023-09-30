import { mount } from "@vue/test-utils";
import Footer from "../../src/components/Footer.vue";
import LandingPage from '../../src/pages/LandingPage.vue';

const wrapper = mount(Footer);

describe("Testing buttons", () => {
  test("Home button", () => {
    const button = wrapper.find("Home");

    expect(button).toBeTruthy();
  });
});

describe("Testing Footer", () => {
  test('LandingPage contains the Footer component', () => {
    const wrapper = mount(LandingPage);
  
    const footer = wrapper.find('#Footer');
  
    expect(footer.find('#Home')).toBeTruthy();
  });
})