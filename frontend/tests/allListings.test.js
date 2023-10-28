import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import LandingPage from "../src/views/LandingPage.vue"; 
import NavBar from "../src/components/NavBar.vue"; 
import Footer from "../src/components/Footer.vue"; 
import axios from "axios";
import { createRouter, createMemoryHistory } from "vue-router";
import MockAdapter from "axios-mock-adapter";
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
});

// let response;
let originalAxios;
let listingIds = [];
let profile;
let router;
let store;
let mock;
let listings;

const routes = [
  {
    path: "/:skills?/:vacancy?/:dept?/:roleName?",
    name: "LandingPage",
    component: LandingPage,
  }
];

beforeEach(async () => {
  console.log("Start Test");

  originalAxios = axios.get;

  profile = {
    _Access_Rights: 0,
    _Country: "SG",
    _Dept: "Human Resource",
    _Email: "Ding@gmail.com",
    _Password: "imaHR",
    _Skills: ["Computational Problem Solving", "Python"],
    _Staff_id: 5173,
    _Applications: [],
  };

  store = createStore({
    state() {
      return {
        profile,
      };
    },
  });

  router = createRouter({
    history: createMemoryHistory(),
    routes,
  });
});

afterEach(async () => {
  axios.get = originalAxios;
  mock.restore();
  console.log(listingIds);
  for (let i = 0; i < listingIds.length; i++) {
    console.log(listingIds[i]);
    await axios.delete(`http://127.0.0.1:3003/delete/listing/${listingIds[i]}`); //
  }
  console.log("End Test");
});

async function mockings(listingDetails, fav = "") {
  const listingId = await createListings(listingDetails);
  const staffId = profile._Staff_id;
  listingIds.push(listingId);

  const indivListing = await axios.get(
    `http://127.0.0.1:3003/listing/${listingId}`
  );
  const getRoleSkills = await axios.get(
    `http://127.0.0.1:3003/rs/${listingDetails.roleName}`
  );

  mock = new MockAdapter(axios);
  mock
    .onGet(`http://localhost:3003/listing`)
    .reply(200, { body: [indivListing.data.body] });

  mock
    .onGet(`http://localhost:3003/rs/${listingDetails.roleName}`)
    .reply(200, { body: getRoleSkills.data.body });

  return { indivListing, listingId: listingId };
}

describe("Testing ST3-12", () => {
  test("ST3-12.1.1", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-12.1.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };

    const mock = await mockings(listingDetails);
    listings = mock.indivListing;
    wrapper = mount(NavBar, {
      global: {
        plugins: [store, router, vuetify],
      },
    });
    // const navBar = await wrapper.findComponent(NavBar)
    expect(wrapper.find("#home").exists()).toBe(true);   
    expect(wrapper.find("#Account").exists()).toBe(true);
    expect(wrapper.find("#logout").exists()).toBe(true);
  });

  test("ST3-12.2.1", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-12.2.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };

    const mock = await mockings(listingDetails);
    listings = mock.indivListing;
    wrapper = mount(Footer, {
      global: {
        plugins: [store, router, vuetify],
      },
    });
    // const navBar = await wrapper.findComponent(NavBar)
    expect(wrapper.find("#Home").exists()).toBe(true);   
    expect(wrapper.find("#HRMS").exists()).toBe(true);
    expect(wrapper.find("#LMS").exists()).toBe(true);
    expect(wrapper.find("#LJPS").exists()).toBe(true);
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
