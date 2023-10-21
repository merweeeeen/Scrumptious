import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { createStore } from "vuex";
import ProfilePage from "../src/views/PersonalProfile.vue"; // Importing the page to test the existence of the component=
import NavBar from "../src/components/NavBar.vue";
import axios from "axios";
import { createRouter, createMemoryHistory } from "vue-router";

let wrapper;
let response;
let originalAxios;
let listingIds = [];
let store;
let router;
const mockRouterPush = vi.fn();

beforeEach(async () => {
  console.log("Start Test");

  originalAxios = axios.get;
  response = await axios.get("http://127.0.0.1:3003/listing");
  const profile = {
    _Access_Rights: 0,
    _Country: "SG",
    _Dept: "Finance",
    _Email: "johndoe@gmail.com",
    _Password: "imaStaff",
    _Skills: ["Adaptability", "Microsoft Excel"],
    _Staff_id: 1001,
    _Staff_FName: "John",
    _Staff_LName: "Doe",
  };

  store = createStore({
    state() {
      return {
        profile,
      };
    },
  });
});

afterEach(async () => {
  axios.get = originalAxios;
  for (let i = 0; i < listingIds.length; i++) {
    await axios.delete(`http://127.0.0.1:3003/delete/listing/${listingIds[i]}`); //
  }
  console.log("End Test");
});

describe("Integration tests", async () => {
  test("ST3-37.1.1", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-37.1.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    listingIds.push(await createListings(listingDetails));
    wrapper = mount(NavBar, {
      global: {
        plugins: [store],
        mocks: {
          $router: {
            push: mockRouterPush,
          },
        },
      },
    });

    const profileIcon = await wrapper.find("#Account");
    await profileIcon.trigger("click");
    expect(mockRouterPush).toHaveBeenCalledWith({ path: "/profile" });
    await wrapper.vm.$router.push({
      name: "Profile",
    });

    wrapper = mount(ProfilePage, {
      global: {
        plugins: [store],
        mocks: {
          $router: {
            push: mockRouterPush,
          },
        },
      },
    });
    await nextTick();
    expect(await wrapper.find("#staffName").text()).toBe("John Doe");
    expect(await wrapper.find("#dept").text()).toBe("Finance Department");
    expect(await wrapper.find("#email").text()).toBe("johndoe@gmail.com");
    expect(await wrapper.find("#country").text()).toBe("Country: SG");
    expect(await wrapper.find("#staffId").text()).toBe("Staff ID: 1001");
  });

  test("ST3-37.2.1", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-37.2.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    listingIds.push(await createListings(listingDetails));
    wrapper = mount(NavBar, {
      global: {
        plugins: [store],
        mocks: {
          $router: {
            push: mockRouterPush,
          },
        },
      },
    });

    const profileIcon = await wrapper.find("#Account");
    await profileIcon.trigger("click");
    expect(mockRouterPush).toHaveBeenCalledWith({ path: "/profile" });
    await wrapper.vm.$router.push({
      name: "Profile",
    });

    wrapper = mount(ProfilePage, {
      global: {
        plugins: [store],
        mocks: {
          $router: {
            push: mockRouterPush,
          },
        },
      },
    });
    await nextTick();
    const chips = wrapper.findAll("v-chip");
    const skills = chips.map((skill) => {
      return skill.text();
    });
    expect(skills).toStrictEqual(["Adaptability", "Microsoft Excel"]);
  });
});

async function createListings(listingDetails) {
  const bodyInfo = {
    listing_name: listingDetails.listingName,
    role_name: listingDetails.roleName,
    desc: "TestCase",
    dept: listingDetails.dept,
    num_openings: listingDetails.num_openings,
    country: "SG",
    expiry_date: "2024-01-01",
    open: 1,
  };
  const response = await axios.post("http://127.0.0.1:3003/listing", bodyInfo);
  return response.data.body.insertId;
}
