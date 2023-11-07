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
let writeUp;

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

const mockFunction = vi.fn();
beforeEach(async () => {
  console.log("Start Test");

  originalAxios = axios.get;

  profile = {
    _Access_Rights: "0",
    _Country: "SG",
    _Dept: "Human Resource",
    _Email: "Ding@gmail.com",
    _Password: "imaHR",
    _Skills: ["Computational Problem Solving", "Python"],
    _Staff_id: 1001,
    _Applications: [],
  };

  store = createStore({
    state() {
      return {
        profile,
      };
    },
    mutations: {
      profile(state, profile) {
        state.profile = profile;
      },
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
    console.log(listingIds[i])
    await axios.delete(`http://127.0.0.1:3003/delete/listing/${listingIds[i]}`); //
    await axios.delete(`http://127.0.0.1:3003/application/${listingIds[i]}/1001`); //
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

  const bodyInfo = {
    staffId: profile._Staff_id,
    listingId: listingId,
    writeUp: writeUp,
  };

  const submitApplication = await axios.post(
    "http://127.0.0.1:3003/application",
    bodyInfo
  );

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

  if (favourite) {
    mock
      .onPost(`http://localhost:3003/favourite/add`, {
        staffid: staffId,
        listingid: listingId.toString(),
      })
      .reply(200);
  }

  mock
    .onPost(`http://localhost:3003/application`, bodyInfo)
    .reply(200, { body: submitApplication.data.body });

  mock
    .onGet(`http://localhost:3003/application/getappstaff/${listingId}`)
    .reply(200, { body: [] });

  return { listings, listingId: listingId };
}

describe("Testing ST3-16", () => {
  test("ST3-18.1.1 (LandingPage)", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-18.1.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    writeUp = "I want the job";

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
    const apply = await listing.findComponent(`#ApplyRLPopup`);
    expect(apply.exists()).toBe(true);
    await apply.find("#Apply").trigger("click");
    expect(await apply.find("#popup").exists()).toBe(true);
    await apply.setData({ writeUp: writeUp });
    await apply.find("#submitForm").trigger("click");
    expect(await apply.vm.SuccessDialog).toBe(true);
    const successDialog = await apply.find("#successDialog");
    expect(successDialog.find("#successMsg").text()).toEqual(
      "Application Submitted Successfully!"
    );
    expect(apply.find("#successText").text()).toEqual(
      "Thank you for your application, kindly look out for an update on your application status which will be sent via email"
    );
  });

  test("ST3-18.1.1 (ListingPage)", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-18.1.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    writeUp = "I want the job";

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
    const apply = await wrapper.findComponent(`#ApplyRLPopup`);
    expect(apply.exists()).toBe(true);
    await apply.find("#Apply").trigger("click");
    expect(await apply.find("#popup").exists()).toBe(true);
    await apply.setData({ writeUp: writeUp });
    await apply.find("#submitForm").trigger("click");
    expect(await apply.vm.SuccessDialog).toBe(true);
    const successDialog = await apply.find("#successDialog");
    expect(successDialog.find("#successMsg").text()).toEqual(
      "Application Submitted Successfully!"
    );
    expect(apply.find("#successText").text()).toEqual(
      "Thank you for your application, kindly look out for an update on your application status which will be sent via email"
    );
  });

  test("ST3-18.1.2 (LandingPage)", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-18.1.2",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    writeUp = "";

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
    const apply = await listing.findComponent(`#ApplyRLPopup`);
    expect(apply.exists()).toBe(true);
    await apply.find("#Apply").trigger("click");
    expect(await apply.find("#popup").exists()).toBe(true);
    await apply.setData({ writeUp: writeUp });
    await apply.find("#submitForm").trigger("click");
    expect(await apply.vm.ApplyFailDialog).toBe(true);
    const failDialog = await apply.find("#failDialog");
    expect(failDialog.find("#failedMsg").text()).toEqual("Application Failed!");
  });

  test("ST3-18.1.2 (ListingPage)", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-18.1.2",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    writeUp = "";

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
    const apply = await wrapper.findComponent(`#ApplyRLPopup`);
    expect(apply.exists()).toBe(true);
    await apply.find("#Apply").trigger("click");
    expect(await apply.find("#popup").exists()).toBe(true);
    await apply.setData({ writeUp: writeUp });
    await apply.find("#submitForm").trigger("click");
    expect(await apply.vm.ApplyFailDialog).toBe(true);
    const failDialog = await apply.find("#failDialog");
    expect(failDialog.find("#failedMsg").text()).toEqual("Application Failed!");
  });

  test("ST3-18.2.1 (LandingPage)", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-18.2.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    writeUp = "I want the job";

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
    const apply = await listing.findComponent(`#ApplyRLPopup`);
    expect(apply.exists()).toBe(true);
    await apply.find("#Apply").trigger("click");
    expect(await apply.find("#popup").exists()).toBe(true);
    await apply.setData({ writeUp: writeUp });
    await apply.find("#submitForm").trigger("click");
    expect(await apply.vm.SuccessDialog).toBe(true);
    const successDialog = await apply.find("#successDialog");
    expect(successDialog.find("#successMsg").text()).toEqual(
      "Application Submitted Successfully!"
    );
    expect(apply.find("#successText").text()).toEqual(
      "Thank you for your application, kindly look out for an update on your application status which will be sent via email"
    );
  });

  test("ST3-18.2.1 (ListingPage)", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-18.2.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    writeUp = "I want the job";

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
    const apply = await listing.findComponent(`#ApplyRLPopup`);
    expect(apply.exists()).toBe(true);
    await apply.find("#Apply").trigger("click");
    expect(await apply.find("#popup").exists()).toBe(true);
    await apply.setData({ writeUp: writeUp });
    await apply.find("#submitForm").trigger("click");
    expect(await apply.vm.SuccessDialog).toBe(true);
    const successDialog = await apply.find("#successDialog");
    expect(successDialog.find("#successMsg").text()).toEqual(
      "Application Submitted Successfully!"
    );
    expect(apply.find("#successText").text()).toEqual(
      "Thank you for your application, kindly look out for an update on your application status which will be sent via email"
    );
  });

  test("ST3-18.2.2 (LandingPage)", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-18.2.2",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    writeUp =
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu";

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
    const apply = await listing.findComponent(`#ApplyRLPopup`);
    expect(apply.exists()).toBe(true);
    await apply.find("#Apply").trigger("click");
    expect(await apply.find("#popup").exists()).toBe(true);
    await apply.setData({
      writeUp: writeUp,
    });
    await apply.find("#submitForm").trigger("click");
    expect(await apply.vm.SuccessDialog).toBe(true);
    const successDialog = await apply.find("#successDialog");
    expect(successDialog.find("#successMsg").text()).toEqual(
      "Application Submitted Successfully!"
    );
    expect(apply.find("#successText").text()).toEqual(
      "Thank you for your application, kindly look out for an update on your application status which will be sent via email"
    );
  });

  test("ST3-18.2.2 (ListingPage)", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-18.2.2",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    writeUp =
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu";

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
    const apply = await wrapper.findComponent(`#ApplyRLPopup`);
    expect(apply.exists()).toBe(true);
    await apply.find("#Apply").trigger("click");
    expect(await apply.find("#popup").exists()).toBe(true);
    await apply.setData({
      writeUp: writeUp,
    });
    await apply.find("#submitForm").trigger("click");
    expect(await apply.vm.SuccessDialog).toBe(true);
    const successDialog = await apply.find("#successDialog");
    expect(successDialog.find("#successMsg").text()).toEqual(
      "Application Submitted Successfully!"
    );
    expect(apply.find("#successText").text()).toEqual(
      "Thank you for your application, kindly look out for an update on your application status which will be sent via email"
    );
  });

  test("ST3-18.2.3 (LandingPage)", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-18.2.3",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    writeUp =
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus";

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
    const apply = await listing.findComponent(`#ApplyRLPopup`);
    expect(apply.exists()).toBe(true);
    await apply.find("#Apply").trigger("click");
    expect(await apply.find("#popup").exists()).toBe(true);
    await apply.setData({
      writeUp: writeUp,
    });
    await apply.find("#submitForm").trigger("click");
    expect(await apply.vm.ApplyFailDialog).toBe(true);
    const failDialog = await apply.find("#failDialog");
    expect(failDialog.find("#failedMsg").text()).toEqual("Application Failed!");
  });

  test("ST3-18.2.3 (ListingPage)", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-18.2.3",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    writeUp =
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus";

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
    const apply = await wrapper.findComponent(`#ApplyRLPopup`);
    expect(apply.exists()).toBe(true);
    await apply.find("#Apply").trigger("click");
    expect(await apply.find("#popup").exists()).toBe(true);
    await apply.setData({
      writeUp: writeUp,
    });
    await apply.find("#submitForm").trigger("click");
    expect(await apply.vm.ApplyFailDialog).toBe(true);
    const failDialog = await apply.find("#failDialog");
    expect(failDialog.find("#failedMsg").text()).toEqual("Application Failed!");
  });

  test("ST3-18.3.1 (LandingPage)", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-18.3.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    writeUp = "123";

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
    const apply = await listing.findComponent(`#ApplyRLPopup`);
    expect(apply.exists()).toBe(true);
    await apply.find("#Apply").trigger("click");
    expect(await apply.find("#popup").exists()).toBe(true);
    await apply.find("#close").trigger("click");
    await nextTick();
    expect(await apply.vm.dialog).toBe(false);
  });

  test("ST3-18.3.1 (ListingPage)", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-18.3.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    writeUp = "123";

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
    const apply = await wrapper.findComponent(`#ApplyRLPopup`);
    expect(apply.exists()).toBe(true);
    await apply.find("#Apply").trigger("click");
    expect(await apply.find("#popup").exists()).toBe(true);
    await apply.find("#close").trigger("click");
    await nextTick();
    expect(await apply.vm.dialog).toBe(false);
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
