import { mount } from "@vue/test-utils";
import { createApp, nextTick } from "vue";
import { createStore } from "vuex";
import LandingPage from "../src/views/LandingPage.vue"; // Importing the page to test the existence of the component=
import ListingPage from "../src/views/ListingPage.vue"; // Importing the page to test the existence of the component=
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
let favourite;

const routes = [
  {
    path: "/:skills?/:vacancy?/:dept?/:roleName?",
    name: "LandingPage",
    component: LandingPage,
  },
  {
    path: "/listing/:listing_id",
    name: "ListingPage",
    component: ListingPage,
  },
];

beforeEach(async () => {
  console.log("Start Test");

  originalAxios = axios.get;

  profile = {
    _Access_Rights: "0",
    _Country: "SG",
    _Dept: "Finance",
    _Email: "johndoe@gmail.com",
    _Password: "imaStaff",
    _Skills: ["Adaptability", "Microsoft Excel"],
    _Staff_id: 1001,
    _Applications: []
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
  for (let i = 0; i < listingIds.length; i++) {
    await axios.delete(`http://127.0.0.1:3003/delete/listing/${listingIds[i]}`); //
  }
  if (favourite) {
    await axios.post("http://localhost:3003/favourite/remove", {
      staffid: profile._Staff_id,
      listingid: listingIds[listingIds.length - 1].toString(),
    });
  }
  console.log("End Test");
});

async function mockings(listingDetails, fav = "") {
  const listingId1 = await createListings(listingDetails[0]);
  const listingId2 = await createListings(listingDetails[1]);
  listingIds.push(listingId1, listingId2);
  listings = await axios.get("http://127.0.0.1:3003/listing");

  const indivListing1 = await axios.get(
    `http://127.0.0.1:3003/listing/${listingId1}`
  );

  const indivListing2 = await axios.get(
    `http://127.0.0.1:3003/listing/${listingId2}`
  );

  mock = new MockAdapter(axios);
  mock
    .onGet(`http://localhost:3003/listing`)
    .reply(200, { body: [indivListing1.data.body, indivListing2.data.body] });

  return { listings, listingId: [listingId1, listingId2] };
}

describe("Testing ST3-39", () => {
  test("ST3-39.1.1", async () => {
    let wrapper;
    const listingDetails = [
      {
        listingName: "ST3-39.1.1",
        roleName: "Software Developer",
        dept: "IT Support",
        num_openings: 1,
      },
      {
        listingName: "ST3-39.2.1",
        roleName: "Accountant",
        dept: "Finance",
        num_openings: 1,
      },
    ];

    const mock = await mockings(listingDetails);
    const listingId1 = mock.listingId[0];
    const listingId2 = mock.listingId[1];
    listings = mock.listings;
    wrapper = mount(LandingPage, {
      global: {
        plugins: [store, router, vuetify],
      },
      data() {
        return {
          listings: listings.data.body,
        };
      },
    });
    const listing1 = await wrapper.find(`#${listingId1}`);
    expect(listing1.exists()).toBe(true);
    expect(await listing1.find("#Python").attributes('color')).toEqual("default");

    const listing2 = await wrapper.find(`#${listingId2}`);
    expect(listing2.exists()).toBe(true);
    expect(await listing2.find("[id=Microsoft Excel]").attributes('color')).toEqual("green-darken-3");  });

  test("ST3-39.3.1", async () => {
    let wrapper;
    const listingDetails = [
      {
        listingName: "ST3-39.3.1(1)",
        roleName: "Software Developer",
        dept: "IT Support",
        num_openings: 1,
      },
      {
        listingName: "ST3-39.3.1(2)",
        roleName: "Accountant",
        dept: "Finance",
        num_openings: 1,
      },
    ];

    const mock = await mockings(listingDetails);
    const listingId1 = mock.listingId[0];
    const listingId2 = mock.listingId[1];
    listings = mock.listings;
    wrapper = mount(LandingPage, {
      global: {
        plugins: [store, router, vuetify],
      },
      data() {
        return {
          listings: listings.data.body,
        };
      },
    });
    const listing1 = await wrapper.find(`#${listingId1}`);
    expect(listing1.exists()).toBe(true);
    expect(await listing1.find("#skillsMatchPct").text()).toEqual("0%");

    const listing2 = await wrapper.find(`#${listingId2}`);
    expect(listing2.exists()).toBe(true);
    expect(await listing2.find("#skillsMatchPct").text()).toEqual("33%");
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
