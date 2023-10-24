import { mount } from "@vue/test-utils";
import { createApp, nextTick } from "vue";
import { createStore } from "vuex";
import LandingPage from "../src/views/LandingPage.vue"; // Importing the page to test the existence of the component=
import ListingPage from "../src/views/ListingPage.vue"; // Importing the page to test the existence of the component=
import Update from "../src/views/UpdateListing.vue"; // Importing the page to test the existence of the component=
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
let updateListing;

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
  {
    path: "/update/:listing_id",
    name: "UpdatePage",
    component: Update,
  },
];

beforeEach(async () => {
  console.log("Start Test");

  originalAxios = axios.get;

  profile = {
    _Access_Rights: '1',
    _Country: "SG",
    _Dept: "Human Resource",
    _Email: "Ding@gmail.com",
    _Password: "imaHR",
    _Skills: ["Computational Problem Solving", "Python"],
    _Staff_id: 5173,
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

async function mockings(listingDetails, bodyInfo = "", fav = "") {
  const listingId = await createListings(listingDetails);
  const staffId = profile._Staff_id;
  listingIds.push(listingId);
  listings = await axios.get("http://127.0.0.1:3003/listing");

  const indivListing = await axios.get(
    `http://127.0.0.1:3003/listing/${listingId}`
  );
  const getSaved = await axios.get(
    `http://127.0.0.1:3003/favourite/read/${profile._Staff_id}/${listingId}`
  );

  const getRoleSkills = await axios.get(
    `http://127.0.0.1:3003/rs/${listingDetails.roleName}`
  );
  const getAllRoleSkills = await axios.get(`http://127.0.0.1:3003/rs`);

  if (bodyInfo !== "") {
    updateListing = await axios.put(
      `http://127.0.0.1:3003/listing/${listingId}`,
      bodyInfo
    );
  }

  if (fav) {
    favourite = await axios.post(`http://localhost:3003/favourite/add`, {
      staffid: staffId,
      listingid: listingId.toString(),
    });
  }

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

  mock
    .onGet(`http://localhost:3003/rs`)
    .reply(200, { body: getAllRoleSkills.data.body });

  if (favourite) {
    mock
      .onPost(`http://localhost:3003/favourite/add`, {
        staffid: staffId,
        listingid: listingId.toString(),
      })
      .reply(200);
  }

  if (updateListing) {
    mock
      .onPut("http://localhost:3003/listing/" + listingId, bodyInfo)
      .reply(200);
    updateListing = undefined;
  }
  return {
    listings,
    listingId: listingId,
    getSaved,
    getRoleSkills,
    getAllRoleSkills,
  };
}

describe("Testing ST3-13", () => {
  test("ST3-13.1.1", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-13.1.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };

    const mock = await mockings(listingDetails);
    const listingId = mock.listingId;
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
    const listing = await wrapper.find(`#${listingId}`);
    expect(listing.exists()).toBe(true);
    await wrapper.find(`#${listingId}`).trigger("click");
    await wrapper.vm.$router.push({
      name: "ListingPage",
      params: { listing_id: listingId },
    });
    await wrapper.vm.$router.isReady();
    await nextTick();
    expect(wrapper.vm.$route.path).toBe("/listing/" + listingId); // Testing whether the Route has been called and parsed

    wrapper = mount(ListingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    console.log(wrapper.html())
    const updateButton = await wrapper.find(`#update`);
    expect(updateButton.exists()).toBe(true);
    await updateButton.trigger("click");

    // Assert that $router.push was called with the expected argument

    await nextTick();
    await wrapper.vm;
    await wrapper.vm.$router.isReady();
    await nextTick();
    await wrapper.vm.$router.push({
      name: "UpdatePage",
      params: { listing_id: listingId },
    });
    expect(wrapper.vm.$route.path).toBe("/update/" + listingId);
  });

  test("ST3-13.2.1", async () => {
    profile._Access_Rights = 0;
    let wrapper;
    const listingDetails = {
      listingName: "ST3-13.1.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };

    const mock = await mockings(listingDetails);
    const listingId = mock.listingId;
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
    const listing = await wrapper.find(`#${listingId}`);
    expect(listing.exists()).toBe(true);
    await wrapper.find(`#${listingId}`).trigger("click");
    await wrapper.vm.$router.push({
      name: "ListingPage",
      params: { listing_id: listingId },
    });
    await wrapper.vm.$router.isReady();
    await nextTick();
    expect(wrapper.vm.$route.path).toBe("/listing/" + listingId); // Testing whether the Route has been called and parsed

    wrapper = mount(ListingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    const updateButton = await wrapper.find(`#update`);
    expect(updateButton.exists()).toBe(false);
  });

  test("ST3-13.3.1", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-13.3.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    const bodyInfo = {
      listing_name: listingDetails.listingName,
      role_name: listingDetails.roleName,
      desc: "We are looking for a software engineer",
      dept: listingDetails.dept,
      num_openings: listingDetails.num_openings,
      country: "SG",
      expiry_date: "2024-01-01",
      open: 1,
    };

    const mock = await mockings(listingDetails, bodyInfo);
    const listingId = mock.listingId;
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
    const listing = await wrapper.find(`#${listingId}`);
    expect(listing.exists()).toBe(true);
    await wrapper.find(`#${listingId}`).trigger("click");
    await wrapper.vm.$router.push({
      name: "ListingPage",
      params: { listing_id: listingId },
    });
    await wrapper.vm.$router.isReady();
    await nextTick();
    expect(wrapper.vm.$route.path).toBe("/listing/" + listingId); // Testing whether the Route has been called and parsed

    wrapper = mount(ListingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    const updateButton = await wrapper.find(`#update`);
    expect(updateButton.exists()).toBe(true);
    await updateButton.trigger("click");

    // Assert that $router.push was called with the expected argument

    await nextTick();
    await wrapper.vm;
    await wrapper.vm.$router.isReady();
    await nextTick();
    await wrapper.vm.$router.push({
      name: "UpdatePage",
      params: { listing_id: listingId },
    });
    expect(wrapper.vm.$route.path).toBe("/update/" + listingId);

    wrapper = mount(Update, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await wrapper.setData({
      jobdescription: "We are looking for a software engineer",
    });
    await nextTick();
    const submit = await wrapper.find("#submit");
    await submit.trigger("click");
    expect(wrapper.vm.jobtitle).toBe("ST3-13.3.1");
    expect(wrapper.vm.jobdescription).toBe(
      "We are looking for a software engineer"
    );
    expect(wrapper.find("#successText").text()).toBe(
      "You have successfully updated the role listing!"
    );
    setTimeout(() => 5000);
    await wrapper.find("#closePrompt").trigger("click");
    await nextTick();
    await remock(mock, listingDetails);
    await wrapper.vm.$router.push({
      name: "LandingPage",
    });
    wrapper = mount(LandingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await wrapper.vm.listings;
    const updatedListing = await wrapper.find(`#${listingId}`);
    await updatedListing.trigger("click");
    await wrapper.vm.$router.push({
      name: "ListingPage",
      params: { listing_id: listingId },
    });
    await wrapper.vm.$router.isReady();
    await nextTick();
    expect(wrapper.vm.$route.path).toBe("/listing/" + listingId); // Testing whether the Route has been called and parsed
    wrapper = mount(ListingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await nextTick();
    await wrapper.vm;
    expect(await wrapper.find("#desc").text()).toBe(
      "We are looking for a software engineer"
    );
  });

  test("ST3-13.4.1", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-13.4.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    const bodyInfo = {
      listing_name: listingDetails.listingName,
      role_name: listingDetails.roleName,
      desc: "We are looking for a software engineer",
      dept: listingDetails.dept,
      num_openings: listingDetails.num_openings,
      country: "SG",
      expiry_date: "2024-01-01",
      open: 1,
    };

    const mock = await mockings(listingDetails, bodyInfo);
    const listingId = mock.listingId;
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
    const listing = await wrapper.find(`#${listingId}`);
    expect(listing.exists()).toBe(true);
    await wrapper.find(`#${listingId}`).trigger("click");
    await wrapper.vm.$router.push({
      name: "ListingPage",
      params: { listing_id: listingId },
    });
    await wrapper.vm.$router.isReady();
    await nextTick();
    expect(wrapper.vm.$route.path).toBe("/listing/" + listingId); // Testing whether the Route has been called and parsed

    wrapper = mount(ListingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    const updateButton = await wrapper.find(`#update`);
    expect(updateButton.exists()).toBe(true);
    await updateButton.trigger("click");

    // Assert that $router.push was called with the expected argument

    await nextTick();
    await wrapper.vm;
    await wrapper.vm.$router.isReady();
    await nextTick();
    await wrapper.vm.$router.push({
      name: "UpdatePage",
      params: { listing_id: listingId },
    });
    expect(wrapper.vm.$route.path).toBe("/update/" + listingId);

    wrapper = mount(Update, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await wrapper.setData({
      jobdescription: "We are looking for a software engineer",
    });
    await nextTick();
    const submit = await wrapper.find("#submit");
    await submit.trigger("click");
    expect(wrapper.vm.jobtitle).toBe("ST3-13.4.1");
    expect(wrapper.vm.jobdescription).toBe(
      "We are looking for a software engineer"
    );
    expect(wrapper.find("#successText").text()).toBe(
      "You have successfully updated the role listing!"
    );
  });

  test("ST3-13.5.1", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-13.5.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    const bodyInfo = {
      listing_name: listingDetails.listingName,
      role_name: listingDetails.roleName,
      desc: "TestCase",
      dept: listingDetails.dept,
      num_openings: listingDetails.num_openings,
      country: "MY",
      expiry_date: "2024-01-01",
      open: 1,
    };

    const mock = await mockings(listingDetails, bodyInfo);
    const listingId = mock.listingId;
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
    const listing = await wrapper.find(`#${listingId}`);
    expect(listing.exists()).toBe(true);
    await wrapper.find(`#${listingId}`).trigger("click");
    await wrapper.vm.$router.push({
      name: "ListingPage",
      params: { listing_id: listingId },
    });
    await wrapper.vm.$router.isReady();
    await nextTick();
    expect(wrapper.vm.$route.path).toBe("/listing/" + listingId); // Testing whether the Route has been called and parsed

    wrapper = mount(ListingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    const updateButton = await wrapper.find(`#update`);
    expect(updateButton.exists()).toBe(true);
    await updateButton.trigger("click");

    // Assert that $router.push was called with the expected argument

    await nextTick();
    await wrapper.vm;
    await wrapper.vm.$router.isReady();
    await nextTick();
    await wrapper.vm.$router.push({
      name: "UpdatePage",
      params: { listing_id: listingId },
    });
    expect(wrapper.vm.$route.path).toBe("/update/" + listingId);

    wrapper = mount(Update, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await wrapper.setData({
      country: "MY",
    });
    await nextTick();
    const submit = await wrapper.find("#submit");
    await submit.trigger("click");
    expect(await wrapper.vm.jobtitle).toBe("ST3-13.5.1");
    expect(await wrapper.vm.country).toBe("MY");
    expect(await wrapper.find("#successText").text()).toBe(
      "You have successfully updated the role listing!"
    );
    await wrapper.find("#closePrompt").trigger("click");
    await nextTick();
    await remock(mock, listingDetails);
    await wrapper.vm.$router.push({
      name: "LandingPage",
    });
    wrapper = mount(LandingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await wrapper.vm.listings;
    const updatedListing = await wrapper.find(`#${listingId}`);
    await updatedListing.trigger("click");
    await wrapper.vm.$router.push({
      name: "ListingPage",
      params: { listing_id: listingId },
    });
    await wrapper.vm.$router.isReady();
    await nextTick();
    expect(wrapper.vm.$route.path).toBe("/listing/" + listingId); // Testing whether the Route has been called and parsed
    wrapper = mount(ListingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await nextTick();
    await wrapper.vm;
    expect(await wrapper.find("#country").text()).toBe("Country: MY");
  });

  test("ST3-13.6.1", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-13.6.1",
      roleName: "Accountant",
      dept: "Finance",
      num_openings: 1,
    };
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

    const mock = await mockings(listingDetails, bodyInfo);
    const listingId = mock.listingId;
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
    const listing = await wrapper.find(`#${listingId}`);
    expect(listing.exists()).toBe(true);
    await wrapper.find(`#${listingId}`).trigger("click");
    await wrapper.vm.$router.push({
      name: "ListingPage",
      params: { listing_id: listingId },
    });
    await wrapper.vm.$router.isReady();
    await nextTick();
    expect(wrapper.vm.$route.path).toBe("/listing/" + listingId); // Testing whether the Route has been called and parsed

    wrapper = mount(ListingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    const updateButton = await wrapper.find(`#update`);
    expect(updateButton.exists()).toBe(true);
    await updateButton.trigger("click");

    // Assert that $router.push was called with the expected argument

    await nextTick();
    await wrapper.vm;
    await wrapper.vm.$router.isReady();
    await nextTick();
    await wrapper.vm.$router.push({
      name: "UpdatePage",
      params: { listing_id: listingId },
    });
    expect(wrapper.vm.$route.path).toBe("/update/" + listingId);

    wrapper = mount(Update, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await wrapper.setData({
      rolename: "Accountant",
    });
    await nextTick();
    const submit = await wrapper.find("#submit");
    await submit.trigger("click");
    expect(wrapper.vm.jobtitle).toBe("ST3-13.6.1");
    expect(wrapper.vm.rolename).toBe("Accountant");
    expect(wrapper.find("#successText").text()).toBe(
      "You have successfully updated the role listing!"
    );
    await wrapper.find("#closePrompt").trigger("click");
    await nextTick();
    await remock(mock, listingDetails);
    await wrapper.vm.$router.push({
      name: "LandingPage",
    });
    wrapper = mount(LandingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await wrapper.vm.listings;
    const updatedListing = await wrapper.find(`#${listingId}`);
    await updatedListing.trigger("click");
    await wrapper.vm.$router.push({
      name: "ListingPage",
      params: { listing_id: listingId },
    });
    await wrapper.vm.$router.isReady();
    await nextTick();
    expect(wrapper.vm.$route.path).toBe("/listing/" + listingId); // Testing whether the Route has been called and parsed
    wrapper = mount(ListingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await nextTick();
    await wrapper.vm;
    expect(await wrapper.find("#roleNameAndDepartment").text()).toBe(
      "Accountant in Finance"
    );
  });

  test("ST3-13.7.1", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-13.7.1",
      roleName: "Software Engineer",
      dept: "IT Support",
      num_openings: 2,
    };
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

    const mock = await mockings(listingDetails, bodyInfo);
    const listingId = mock.listingId;
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
    const listing = await wrapper.find(`#${listingId}`);
    expect(listing.exists()).toBe(true);
    await wrapper.find(`#${listingId}`).trigger("click");
    await wrapper.vm.$router.push({
      name: "ListingPage",
      params: { listing_id: listingId },
    });
    await wrapper.vm.$router.isReady();
    await nextTick();
    expect(wrapper.vm.$route.path).toBe("/listing/" + listingId); // Testing whether the Route has been called and parsed

    wrapper = mount(ListingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    const updateButton = await wrapper.find(`#update`);
    expect(updateButton.exists()).toBe(true);
    await updateButton.trigger("click");

    // Assert that $router.push was called with the expected argument

    await nextTick();
    await wrapper.vm;
    await wrapper.vm.$router.isReady();
    await nextTick();
    await wrapper.vm.$router.push({
      name: "UpdatePage",
      params: { listing_id: listingId },
    });
    expect(wrapper.vm.$route.path).toBe("/update/" + listingId);

    wrapper = mount(Update, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await wrapper.setData({
      vacancies: 2,
    });
    await nextTick();
    const submit = await wrapper.find("#submit");
    await submit.trigger("click");
    expect(wrapper.vm.jobtitle).toBe("ST3-13.7.1");
    expect(wrapper.vm.vacancies).toBe(2);
    expect(wrapper.find("#successText").text()).toBe(
      "You have successfully updated the role listing!"
    );
    await wrapper.find("#closePrompt").trigger("click");
    await nextTick();
    await remock(mock, listingDetails);
    await wrapper.vm.$router.push({
      name: "LandingPage",
    });
    wrapper = mount(LandingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await wrapper.vm.listings;
    const updatedListing = await wrapper.find(`#${listingId}`);
    await updatedListing.trigger("click");
    await wrapper.vm.$router.push({
      name: "ListingPage",
      params: { listing_id: listingId },
    });
    await wrapper.vm.$router.isReady();
    await nextTick();
    expect(wrapper.vm.$route.path).toBe("/listing/" + listingId); // Testing whether the Route has been called and parsed
    wrapper = mount(ListingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await nextTick();
    await wrapper.vm;
    expect(await wrapper.find("#vacancyAndApplicants").text()).toBe(
      "2 Openings | 0 Applicant(s)"
    );
  });

  test("ST3-13.8.1", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-13.8.1",
      roleName: "Software Engineer",
      dept: "IT Support",
      num_openings: 2,
    };
    const bodyInfo = {
      listing_name: listingDetails.listingName,
      role_name: listingDetails.roleName,
      desc: "TestCase",
      dept: listingDetails.dept,
      num_openings: listingDetails.num_openings,
      country: "SG",
      expiry_date: "2024-01-05",
      open: 1,
    };

    const mock = await mockings(listingDetails, bodyInfo);
    const listingId = mock.listingId;
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
    const listing = await wrapper.find(`#${listingId}`);
    expect(listing.exists()).toBe(true);
    await wrapper.find(`#${listingId}`).trigger("click");
    await wrapper.vm.$router.push({
      name: "ListingPage",
      params: { listing_id: listingId },
    });
    await wrapper.vm.$router.isReady();
    await nextTick();
    expect(wrapper.vm.$route.path).toBe("/listing/" + listingId); // Testing whether the Route has been called and parsed

    wrapper = mount(ListingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    const updateButton = await wrapper.find(`#update`);
    expect(updateButton.exists()).toBe(true);
    await updateButton.trigger("click");

    // Assert that $router.push was called with the expected argument

    await nextTick();
    await wrapper.vm;
    await wrapper.vm.$router.isReady();
    await nextTick();
    await wrapper.vm.$router.push({
      name: "UpdatePage",
      params: { listing_id: listingId },
    });
    expect(wrapper.vm.$route.path).toBe("/update/" + listingId);

    wrapper = mount(Update, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await wrapper.setData({
      expiry_date: "2024-01-05",
    });
    await nextTick();
    const submit = await wrapper.find("#submit");
    await submit.trigger("click");
    expect(wrapper.vm.jobtitle).toBe("ST3-13.8.1");
    expect(wrapper.vm.expiry_date).toBe("2024-01-05");
    expect(wrapper.find("#successText").text()).toBe(
      "You have successfully updated the role listing!"
    );
    await wrapper.find("#closePrompt").trigger("click");
    await nextTick();
    await remock(mock, listingDetails);
    await wrapper.vm.$router.push({
      name: "LandingPage",
    });
    wrapper = mount(LandingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await wrapper.vm.listings;
    const updatedListing = await wrapper.find(`#${listingId}`);
    await updatedListing.trigger("click");
    await wrapper.vm.$router.push({
      name: "ListingPage",
      params: { listing_id: listingId },
    });
    await wrapper.vm.$router.isReady();
    await nextTick();
    expect(wrapper.vm.$route.path).toBe("/listing/" + listingId); // Testing whether the Route has been called and parsed
    wrapper = mount(ListingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await nextTick();
    await wrapper.vm;
    expect(await wrapper.find("#expiryDate").text()).toBe(
      "Closing on: 2024-01-05"
    );
  });

  test("ST3-13.9.1", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-13.9.1",
      roleName: "Software Engineer",
      dept: "IT Support",
      num_openings: 2,
    };
    const bodyInfo = {
      listing_name: listingDetails.listingName,
      role_name: listingDetails.roleName,
      desc: "TestCase",
      dept: listingDetails.dept,
      num_openings: listingDetails.num_openings,
      country: "SG",
      expiry_date: "2024-01-05",
      open: 1,
    };

    const mock = await mockings(listingDetails, bodyInfo);
    const listingId = mock.listingId;
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
    const listing = await wrapper.find(`#${listingId}`);
    expect(listing.exists()).toBe(true);
    await wrapper.find(`#${listingId}`).trigger("click");
    await wrapper.vm.$router.push({
      name: "ListingPage",
      params: { listing_id: listingId },
    });
    await wrapper.vm.$router.isReady();
    await nextTick();
    expect(wrapper.vm.$route.path).toBe("/listing/" + listingId); // Testing whether the Route has been called and parsed

    wrapper = mount(ListingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    const updateButton = await wrapper.find(`#update`);
    expect(updateButton.exists()).toBe(true);
    await updateButton.trigger("click");

    // Assert that $router.push was called with the expected argument

    await nextTick();
    await wrapper.vm;
    await wrapper.vm.$router.isReady();
    await nextTick();
    await wrapper.vm.$router.push({
      name: "UpdatePage",
      params: { listing_id: listingId },
    });
    expect(wrapper.vm.$route.path).toBe("/update/" + listingId);

    wrapper = mount(Update, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await wrapper.setData({
      open: "Unavailable",
    });
    await nextTick();
    const submit = await wrapper.find("#submit");
    await submit.trigger("click");
    expect(wrapper.vm.jobtitle).toBe("ST3-13.9.1");
    expect(wrapper.vm.open).toBe("Unavailable");
    expect(wrapper.find("#successText").text()).toBe(
      "You have successfully updated the role listing!"
    );
    await wrapper.find("#closePrompt").trigger("click");
    profile._Access_Rights = 0;
    await nextTick();
    await remock(mock, listingDetails);
    await wrapper.vm.$router.push({
      name: "LandingPage",
    });
    wrapper = mount(LandingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await wrapper.vm.listings;
    const updatedListing = await wrapper.find(`#${listingId}`);
    expect(updatedListing.find("#ST3-13.9.1").exists()).toBe(false);
  });

  test("ST3-13.10.1", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-13.10.1",
      roleName: "Software Engineer",
      dept: "IT Support",
      num_openings: 2,
    };
    const bodyInfo = {
      listing_name: listingDetails.listingName,
      role_name: listingDetails.roleName,
      desc: "TestCase",
      dept: listingDetails.dept,
      num_openings: listingDetails.num_openings,
      country: "SG",
      expiry_date: "2024-01-05",
      open: 1,
    };

    const mock = await mockings(listingDetails, bodyInfo);
    const listingId = mock.listingId;
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
    const listing = await wrapper.find(`#${listingId}`);
    expect(listing.exists()).toBe(true);
    await wrapper.find(`#${listingId}`).trigger("click");
    await wrapper.vm.$router.push({
      name: "ListingPage",
      params: { listing_id: listingId },
    });
    await wrapper.vm.$router.isReady();
    await nextTick();
    expect(wrapper.vm.$route.path).toBe("/listing/" + listingId); // Testing whether the Route has been called and parsed

    wrapper = mount(ListingPage, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    const updateButton = await wrapper.find(`#update`);
    expect(updateButton.exists()).toBe(true);
    await updateButton.trigger("click");

    // Assert that $router.push was called with the expected argument

    await nextTick();
    await wrapper.vm;
    await wrapper.vm.$router.isReady();
    await nextTick();
    await wrapper.vm.$router.push({
      name: "UpdatePage",
      params: { listing_id: listingId },
    });
    expect(wrapper.vm.$route.path).toBe("/update/" + listingId);

    wrapper = mount(Update, {
      // Mounting the new ListingPage
      global: {
        plugins: [store, router, vuetify],
      },
    });
    await nextTick();
    await wrapper.setData({
      jobdescription: "",
    });
    await nextTick();
    const submit = await wrapper.find("#submit");
    await submit.trigger("click");
    expect(wrapper.vm.jobtitle).toBe("ST3-13.10.1");
    expect(wrapper.vm.jobdescription).toBe("");
    const errorMsg = wrapper.find("#errorMsg");
    expect(errorMsg.exists()).toBe(true);
    expect(errorMsg.text()).toBe("Please fill in all the fields");
  });
});

async function createListings(listingDetails) {
  const bodyInfo = {
    listing_name: listingDetails.listingName,
    role_name: listingDetails.roleName,
    desc: "",
    dept: listingDetails.dept,
    num_openings: listingDetails.num_openings,
    country: "SG",
    expiry_date: listingDetails.expiry_date || "2024-01-01",
    open: 1,
  };
  const response = await axios.post("http://127.0.0.1:3003/listing", bodyInfo);
  return response.data.body.insertId;
}

async function remock(mocked, listingDetails) {
  mock.restore();
  const staffId = profile._Staff_id;
  const indivListing = await axios.get(
    `http://127.0.0.1:3003/listing/${mocked.listingId}`
  );
  const getSaved = mocked.getSaved;
  const getRoleSkills = mocked.getRoleSkills;
  const getAllRoleSkills = mocked.getAllRoleSkills;

  mock = new MockAdapter(axios);
  mock
    .onGet(`http://localhost:3003/listing`)
    .reply(200, { body: [indivListing.data.body] });

  mock
    .onGet(`http://localhost:3003/listing/${mocked.listingId}`)
    .reply(200, { body: indivListing.data.body });

  if (getSaved.data?.body) {
    mock
      .onGet(
        `http://localhost:3003/favourite/read/${staffId}/${mocked.listingId}`
      )
      .reply(200, { body: getSaved.data.body });
  } else {
    mock
      .onGet(
        `http://localhost:3003/favourite/read/${staffId}/${mocked.listingId}`
      )
      .reply(200, { body: undefined });
  }
  mock
    .onGet(`http://localhost:3003/rs/${listingDetails.roleName}`)
    .reply(200, { body: getRoleSkills.data.body });

  mock
    .onGet(`http://localhost:3003/rs`)
    .reply(200, { body: getAllRoleSkills.data.body });

  if (favourite) {
    mock
      .onPost(`http://localhost:3003/favourite/add`, {
        staffid: staffId,
        listingid: mocked.listingId.toString(),
      })
      .reply(200);
  }
}
