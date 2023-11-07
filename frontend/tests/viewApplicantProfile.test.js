import { mount } from "@vue/test-utils";
import { createApp, nextTick } from "vue";
import { createStore } from "vuex";
import LandingPage from "../src/views/LandingPage.vue"; // Importing the page to test the existence of the component=
import ListingPage from "../src/views/ListingPage.vue"; // Importing the page to test the existence of the component=
import StaffProfilePage from "../src/views/StaffProfilePage.vue";
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
let applicationIds = [];
const mockRouterPush = vi.fn();
const mockRouterPush2 = vi.fn();

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



async function mockings(listingDetails, fav = false) {
  const listingId = await createListings(listingDetails);
  const staffId = profile._Staff_id;
  listingIds.push(listingId);
  const staffDetails = {
    id: 9999,
    name: "Testcase",
    email: "test@gmail.com",
    fName: "Test",
    lName: "Case",
    dept: "IT Support",
    country: "SG",
    accessRights: 0,
    password: "testpassword",
    roleName: "Human Resource",
  };
  await axios.post(`http://127.0.0.1:3003/register`, { staffDetails });

  const response = await axios.post(`http://127.0.0.1:3003/staff/skill`, {
    staffId: 9999,
    skillArray: ["Adaptability"],
  });
  console.log(response.data.body);

  const indivListing = await axios.get(
    `http://127.0.0.1:3003/listing/${listingId}`
  );

  const applicationId = await axios.post("http://127.0.0.1:3003/application", {
    listingId: listingId,
    staffId: "9999",
    writeUp: "TestCase",
  });
  applicationIds.push(applicationId.data.body.insertId);

  const getSaved = await axios.get(
    `http://127.0.0.1:3003/favourite/read/${profile._Staff_id}/${listingId}`
  );

  const getRoleSkills = await axios.get(
    `http://127.0.0.1:3003/rs/${listingDetails.roleName}`
  );

  const getRelevantApplicants = await axios.get(
    `http://127.0.0.1:3003/application/getappstaff/${listingId}`
  );

  if (fav) {
    favourite = await axios.post(`http://localhost:3003/favourite/add`, {
      staffid: staffId,
      listingid: listingId,
    });
  }
  const getStaff = await axios.get(
    `http://127.0.0.1:3003/staffid/${staffDetails.id}`
  );

  const getStaffApplication = await axios.get(
    `http://127.0.0.1:3003/application/staff/${staffDetails.id}`
  );

  mock = new MockAdapter(axios);
  mock
    .onGet(`http://localhost:3003/listing`)
    .reply(200, { body: [indivListing.data.body] });

  mock
    .onGet(`http://localhost:3003/listing/${listingId}`)
    .reply(200, { body: indivListing.data.body });

  if (getSaved.data?.body) {
    mock
      .onGet(`http://localhost:3003/favourite/read/${staffId}/${listingId}`)
      .reply(200, { body: getSaved.data.body });
  } else {
    mock
      .onGet(`http://localhost:3003/favourite/read/${staffId}/${listingId}`)
      .reply(200, { body: undefined });
  }
  mock
    .onGet(`http://localhost:3003/rs/${listingDetails.roleName}`)
    .reply(200, { body: getRoleSkills.data.body });

  if (favourite) {
    mock
      .onPost(`http://localhost:3003/favourite/add`, {
        staffid: staffId,
        listingid: listingId,
      })
      .reply(200);
  }

  mock
    .onGet(`http://localhost:3003/application/getappstaff/${listingId}`)
    .reply(200, { body: getRelevantApplicants.data.body });

  mock
    .onGet(`http://localhost:3003/staffid/${staffDetails.id}`)
    .reply(200, { body: getStaff.data.body });

  mock
    .onGet(`http://localhost:3003/application/staff/${staffDetails.id}`)
    .reply(200, { body: getStaffApplication.data.body });

  return { indivListing, listingId: listingId };
}

describe("Testing ST3-6", () => {
  beforeEach(async () => {
    console.log("Start Test");

    profile = {
      _Access_Rights: "1",
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
    mock.restore();
    for (let i = 0; i < listingIds.length; i++) {
      await axios.delete(`http://127.0.0.1:3003/delete/listing/${listingIds[i]}`); //
      await axios.delete(
        `http://127.0.0.1:3003/application/${listingIds[i]}/9999`
      );
      await axios.delete(`http://127.0.0.1:3003/delete/staff/9999`); //
      await axios.delete(`http://127.0.0.1:3003/staff/skill/9999/Adaptability`); //,
    }
    if (favourite) {
      await axios.post("http://localhost:3003/favourite/remove", {
        staffid: profile._Staff_id,
        listingid: listingIds[listingIds.length - 1].toString(),
      });
    }
    listingIds = []

    console.log("End Test");
  });
  test("ST3-6.1.1", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-6.1.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };

    const mock = await mockings(listingDetails);
    const listingId = mock.listingId;
    listings = mock.indivListing;
    wrapper = mount(LandingPage, {
      global: {
        plugins: [store, router, vuetify],
        mocks: {
          $router: {
            push: mockRouterPush,
          },
        },
      },
      data() {
        return {
          listings: [listings.data.body],
        };
      },
    });
    const listing = await wrapper.find(`#${listingId}`);
    expect(listing.exists()).toBe(true);
    await wrapper.find(`#${listingId}`).trigger("click");
    expect(mockRouterPush).toHaveBeenCalledWith({
      name: "ListingPage",
      params: { listing_id: listingId },
    });
    wrapper = mount(ListingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, vuetify],
        mocks: {
          $router: {
            push: mockRouterPush2,
          },
          $route: {
            params: { listing_id: listingId },
          },
        },
      },
    });
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    const listingName = await wrapper.find(`#listingName`);
    await nextTick();
    await wrapper.vm.listing;
    expect(listingName.text()).toBe("ST3-6.1.1");
    const applicant = await wrapper.find(`#9999`);
    await applicant.find("#click").trigger("click");
    expect(mockRouterPush2).toHaveBeenCalledWith({
      name: "StaffProfilePage",
      params: { staff_id: 9999 },
    });
    wrapper = mount(StaffProfilePage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, vuetify],
        mocks: {
          $route: {
            params: { staff_id: 9999 },
          },
        },
      },
    });
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    await nextTick();
    await wrapper.vm;
    expect(await wrapper.find("#staffName").text()).toBe("Test Case");
    expect(await wrapper.find("#roleAndDept").text()).toBe(
      "Human Resource in IT Support Department"
    );
    expect(await wrapper.find("#email").text()).toBe("test@gmail.com");
    expect(await wrapper.find("#country").text()).toBe("Country: SG");
    expect(await wrapper.find("#staffId").text()).toBe("Staff ID: 9999");
    expect(await wrapper.find("#Adaptability").exists()).toBe(true);
    expect(await wrapper.findComponent(`#${listingId}`).exists()).toBe(true);
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
