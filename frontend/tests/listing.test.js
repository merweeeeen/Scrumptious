import { mount } from "@vue/test-utils";
import { createApp, nextTick } from "vue";
import { createStore } from "vuex";
import LandingPage from "../src/views/LandingPage.vue"; // Importing the page to test the existence of the component=
import ListingPage from "../src/views/ListingPage.vue"; // Importing the page to test the existence of the component=
import axios from "axios";
import { routes } from "../src/router/router";
import { createRouter, createMemoryHistory } from "vue-router";
import MockAdapter from "axios-mock-adapter";

// let response;
let originalAxios;
let listingIds = [];
let profile;
let router;
let store;
let mock;
let listings;
let favourite;

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
  await router.push("/");
  await router.isReady();
});

afterEach(async () => {
  axios.get = originalAxios;
  mock.restore();
  console.log(listingIds);
  for (let i = 0; i < listingIds.length; i++) {
    console.log(listingIds[i]);
    await axios.delete(`http://127.0.0.1:3003/delete/listing/${listingIds[i]}`); //
  }
  if (favourite) {
    await axios.post("http://localhost:3003/favourite/remove", {
      staffid: profile._Staff_id,
      listingid: listingIds[listingIds.length - 1].toString()
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
  // console.log(indivListing);
  const getSaved = await axios.get(
    `http://127.0.0.1:3003/favourite/read/${profile._Staff_id}/${listingId}`
  );

  const getRoleSkills = await axios.get(
    `http://127.0.0.1:3003/rs/${listingDetails.roleName}`
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

  return { listings, listingId: listingId };
}

describe("Testing ST3-16", () => {
  test("ST3-16.1.1", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-16.1.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };

    const mock = await mockings(listingDetails);
    const listingId = mock.listingId;
    listings = mock.listings;
    wrapper = mount(LandingPage, {
      global: {
        plugins: [store, router],
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
        plugins: [store, router],
      },
    });
    const listingName = await wrapper.find(`#listingName`);
    await nextTick();
    await wrapper.vm.listing;
    expect(listingName.text()).toBe("ST3-16.1.1");

    const description = await wrapper.find(`#desc`);
    expect(description.text()).toBe("TestCase");

    const dept = await wrapper.find("#roleNameAndDepartment");
    expect(dept.text()).toBe("Software Developer in IT Support");

    const vacancy = await wrapper.find(`#vacancyAndApplicants`);
    expect(vacancy.text()).toBe("1 Openings | 0 Applicant(s)");

    const country = await wrapper.find(`#country`);
    expect(country.text()).toBe("Country: SG");

    const expiryDate = await wrapper.find(`#expiryDate`);
    expect(expiryDate.text()).toBe("Closing on: 2024-01-01");

    const createdDate = await wrapper.find(`#createdDate`);
    expect(createdDate.text()).toContain("Posted today");
  });

  test("ST3-16.2.1", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-16.2.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };

    const mock = await mockings(listingDetails);
    const listingId = mock.listingId;
    listings = mock.listings;
    wrapper = mount(LandingPage, {
      global: {
        plugins: [store, router],
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
        plugins: [store, router],
      },
    });
    await nextTick();
    await wrapper.vm.listing;
    await wrapper.vm.listingSkills;
    await nextTick();
    await nextTick();
    await nextTick();
    const js = await wrapper.find(`#JavaScript`);
    expect(js.attributes("color")).toBe("default");

    const python = await wrapper.find(`#Python`);
    expect(python.attributes("color")).toBe("green-darken-3");
  });

  test("ST3-16.3.1", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-16.3.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };

    const mock = await mockings(listingDetails);
    const listingId = mock.listingId;
    listings = mock.listings;
    wrapper = mount(LandingPage, {
      global: {
        plugins: [store, router],
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
        plugins: [store, router],
      },
    });
    await nextTick();
    await wrapper.vm.listing;
    await wrapper.vm.listingSkills;
    await nextTick();
    await nextTick();
    await nextTick();
    const js = await wrapper.find(`#JavaScript`);
    expect(js.exists()).toBe(true);

    const compThinking = await wrapper.find(
      `[id="Computational Problem Solving"]`
    );
    expect(compThinking.exists()).toBe(true);

    const uiux = await wrapper.find(`[id="UI/UX skills"]`);
    expect(uiux.exists()).toBe(true);

    const python = await wrapper.find(`#Python`);
    expect(python.exists()).toBe(true);
  });

  test("ST3-16.4.1", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-16.4.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };

    const mock = await mockings(listingDetails, true);
    const listingId = mock.listingId;
    listings = mock.listings;
    wrapper = mount(LandingPage, {
      global: {
        plugins: [store, router],
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
        plugins: [store, router],
      },
    });
    await nextTick();
    await wrapper.vm.listing;
    await wrapper.vm.listingSkills;
    await nextTick();
    await nextTick();
    await nextTick();
    await wrapper.find(`#notSaved`).trigger("click");
    await wrapper.setData({ saved: true });
    await nextTick();
    const saved = await wrapper.find(`#saved`);
    expect(saved.exists()).toBe(true);
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
