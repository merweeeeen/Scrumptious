import { mount } from "@vue/test-utils";
import { createApp } from "vue";
import { createStore } from "vuex";
import LandingPage from "../src/views/LandingPage.vue"; // Importing the page to test the existence of the component=
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

let wrapper;
let response;
let originalAxios;
let listingIds = [];
let favourite;
let profile;
let mock;
let store;



describe("Integration tests", async () => {
  beforeEach(async () => {
    console.log("Start Test");

    originalAxios = axios.get;
    response = await axios.get("http://127.0.0.1:3003/listing");
    profile = {
      _Access_Rights: 1,
      _Country: "SG",
      _Dept: "Human Resource",
      _Email: "Ding@gmail.com",
      _Password: "imaHR",
      _Skills: [
        "Computational Problem Solving",
        "JavaScript",
        "Python",
        "UI/UX skills",
      ],
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
    listingIds = [];

    console.log("End Test");
  });
  test("ST3-8.1.1", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-8.1.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    const filter = { skills: "Python" };
    const mock = await mockings(listingDetails, filter);
    listingIds.push(mock.listingId);
    let wrapper = mount(LandingPage, {
      global: {
        plugins: [store],
      },
      data() {
        return {
          listings: mock.indivListing.data.body,
        };
      },
    });

    const filterComponent = wrapper.findComponent("#Filter");
    await filterComponent.find("#checkSkill").setChecked();
    await filterComponent.setData({ skill: [true] });
    const skill = await wrapper.find("#skill");
    expect(skill.exists()).toBe(true);
    await filterComponent.setData({ selectedSkill: "Python" });
    await filterComponent.find("#filter").trigger("click");
    expect(filterComponent.emitted().filter[0][0].skills).toBe("Python");

    const listing = await wrapper.find(`#${mock.listingId}`);
    //
    expect(listing.exists()).toBe(true);
  });

  test("ST3-8.1.2", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails1 = {
      listingName: "ST3-8.1.2_1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    const listingId1 = await createListings(listingDetails1);
    listingIds.push(listingId1);

    const listingDetails2 = {
      listingName: "ST3-8.1.2_2",
      roleName: "Accountant",
      dept: "Finance",
      num_openings: 1,
    };
    const filter = { skills: "Python" };
    const mock = await mockings(listingDetails2, filter);
    listingIds.push(mock.listingId);

    let wrapper = mount(LandingPage, {
      global: {
        plugins: [store],
      },
      data() {
        return {
          listings: mock.listings.data.body,
        };
      },
    });

    const filterComponent = wrapper.findComponent("#Filter");
    await filterComponent.find("#checkSkill").setChecked();
    await filterComponent.setData({ skill: [true] });
    const skill = await wrapper.find("#skill");
    expect(skill.exists()).toBe(true);
    await filterComponent.setData({ selectedSkill: "Python" });
    await filterComponent.find("#filter").trigger("click");
    expect(filterComponent.emitted().filter[0][0].skills).toBe("Python");
    const listing = await wrapper.find(`#${listingId1}`);
    //
    expect(listing.exists()).toBe(true);
  });

  test("ST3-8.2.1", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-8.2.1",
      roleName: "Accountant",
      dept: "Finance",
      num_openings: 1,
    };
    const filter = { role_name: "Accountant" };
    const mock = await mockings(listingDetails, filter);
    listingIds.push(mock.listingId);
    let wrapper = mount(LandingPage, {
      global: {
        plugins: [store],
      },
      data() {
        return {
          listings: mock.indivListing.data.body,
        };
      },
    });

    const filterComponent = wrapper.findComponent("#Filter");
    await filterComponent.find("#checkRole").setChecked();
    await filterComponent.setData({ role: [true] });
    const skill = await wrapper.find("#role");
    expect(skill.exists()).toBe(true);
    await filterComponent.setData({ selectedRole: "Accountant" });
    await filterComponent.find("#filter").trigger("click");
    expect(filterComponent.emitted().filter[0][0].role_name).toBe("Accountant");

    const listing = await wrapper.find(`#${mock.listingId}`);
    //
    expect(listing.exists()).toBe(true);
  });

  test("ST3-8.2.2", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-8.2.2_1",
      roleName: "Accountant",
      dept: "Finance",
      num_openings: 1,
    };
    const listingId1 = await createListings(listingDetails);
    listingIds.push(listingId1);

    const listingDetails2 = {
      listingName: "ST3-8.2.2_2",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    const filter = { role_name: "Accountant" };
    const mock = await mockings(listingDetails2, filter);
    listingIds.push(mock.listingId);

    let wrapper = mount(LandingPage, {
      global: {
        plugins: [store],
      },
      data() {
        return {
          listings: mock.listings.data.body,
        };
      },
    });

    const filterComponent = wrapper.findComponent("#Filter");
    await filterComponent.find("#checkRole").setChecked();
    await filterComponent.setData({ role: [true] });
    const skill = await wrapper.find("#role");
    expect(skill.exists()).toBe(true);
    await filterComponent.setData({ selectedRole: "Accountant" });
    await filterComponent.find("#filter").trigger("click");
    expect(filterComponent.emitted().filter[0][0].role_name).toBe("Accountant");
    const listing = await wrapper.find(`#${listingId1}`);
    //
    expect(listing.exists()).toBe(true);
  });

  test("ST3-8.3.1", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-8.3.1",
      roleName: "Customer Service",
      dept: "Management",
      num_openings: 1,
    };
    const filter = { dept: "Management" };
    const mock = await mockings(listingDetails, filter);
    listingIds.push(mock.listingId);
    let wrapper = mount(LandingPage, {
      global: {
        plugins: [store],
      },
      data() {
        return {
          listings: mock.indivListing.data.body,
        };
      },
    });

    const filterComponent = wrapper.findComponent("#Filter");
    await filterComponent.find("#checkDept").setChecked();
    await filterComponent.setData({ dept: [true] });
    const skill = await wrapper.find("#dept");
    expect(skill.exists()).toBe(true);
    await filterComponent.setData({ selectedDept: "Management" });
    await filterComponent.find("#filter").trigger("click");
    expect(filterComponent.emitted().filter[0][0].dept).toBe("Management");

    const listing = await wrapper.find(`#${mock.listingId}`);
    //
    expect(listing.exists()).toBe(true);
  });

  test("ST3-8.3.2", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-8.3.2_1",
      roleName: "Customer Service",
      dept: "Management",
      num_openings: 1,
    };
    const listingId1 = await createListings(listingDetails);
    listingIds.push(listingId1);

    const listingDetails2 = {
      listingName: "ST3-8.3.2_2",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    const filter = { dept: "Management" };
    const mock = await mockings(listingDetails2, filter);
    listingIds.push(mock.listingId);

    let wrapper = mount(LandingPage, {
      global: {
        plugins: [store],
      },
      data() {
        return {
          listings: mock.listings.data.body,
        };
      },
    });

    const filterComponent = wrapper.findComponent("#Filter");
    await filterComponent.find("#checkDept").setChecked();
    await filterComponent.setData({ dept: [true] });
    const skill = await wrapper.find("#dept");
    expect(skill.exists()).toBe(true);
    await filterComponent.setData({ selectedDept: "Management" });
    await filterComponent.find("#filter").trigger("click");
    expect(filterComponent.emitted().filter[0][0].dept).toBe("Management");
    const listing = await wrapper.find(`#${listingId1}`);
    //
    expect(listing.exists()).toBe(true);
  });

  test("ST3-8.4.1", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-8.4.1",
      roleName: "Software Developer",
      dept: "Marketing",
      num_openings: 1,
    };
    const filter = { num_openings: 1 };
    const mock = await mockings(listingDetails, filter);
    listingIds.push(mock.listingId);
    let wrapper = mount(LandingPage, {
      global: {
        plugins: [store],
      },
      data() {
        return {
          listings: mock.indivListing.data.body,
        };
      },
    });

    const filterComponent = wrapper.findComponent("#Filter");
    await filterComponent.find("#checkVacancy").setChecked();
    await filterComponent.setData({ vacancy: [true] });
    const vacancy = await wrapper.find("#vacancy");
    expect(vacancy.exists()).toBe(true);
    await filterComponent.setData({ selectedVacancy: 1 });
    await filterComponent.find("#filter").trigger("click");
    expect(filterComponent.emitted().filter[0][0].num_openings).toBe(1);
    const listing = await wrapper.find(`#${mock.listingId}`);
    expect(listing.exists()).toBe(true);
  });

  test("ST3-8.4.2", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-8.4.2_1",
      roleName: "Software Developer",
      dept: "Marketing",
      num_openings: 1,
    };
    const listingId1 = await createListings(listingDetails);
    listingIds.push(listingId1);

    const listingDetails2 = {
      listingName: "ST3-8.4.2_2",
      roleName: "Accountant",
      dept: "Finance",
      num_openings: 2,
    };
    const filter = { num_openings: 1 };
    const mock = await mockings(listingDetails2, filter);
    listingIds.push(mock.listingId);

    let wrapper = mount(LandingPage, {
      global: {
        plugins: [store],
      },
      data() {
        return {
          listings: mock.listings.data.body,
        };
      },
    });

    const filterComponent = wrapper.findComponent("#Filter");
    await filterComponent.find("#checkVacancy").setChecked();
    await filterComponent.setData({ vacancy: [true] });
    const vacancy = await wrapper.find("#vacancy");
    expect(vacancy.exists()).toBe(true);
    await filterComponent.setData({ selectedVacancy: 1 });
    await filterComponent.find("#filter").trigger("click");
    expect(filterComponent.emitted().filter[0][0].num_openings).toBe(1);
    const listing = await wrapper.find(`#${listingId1}`);
    //
    expect(listing.exists()).toBe(true);
  });

  test("ST3-8.5.1", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-8.5.1",
      roleName: "Software Developer",
      dept: "Management",
      num_openings: 1,
    };
    const filter = { skills: "Python", num_openings: 1 };
    const mock = await mockings(listingDetails, filter);
    listingIds.push(mock.listingId);
    let wrapper = mount(LandingPage, {
      global: {
        plugins: [store],
      },
      data() {
        return {
          listings: mock.indivListing.data.body,
        };
      },
    });

    const filterComponent = wrapper.findComponent("#Filter");
    await filterComponent.find("#checkSkill").setChecked();
    await filterComponent.setData({ skill: [true] });
    const skill = await wrapper.find("#skill");
    expect(skill.exists()).toBe(true);
    await filterComponent.setData({ selectedSkill: "Python" });
    await filterComponent.find("#checkVacancy").setChecked();
    await filterComponent.setData({ vacancy: [true] });
    const vacancy = await wrapper.find("#vacancy");
    expect(vacancy.exists()).toBe(true);
    await filterComponent.setData({ selectedVacancy: 1 });

    await filterComponent.find("#filter").trigger("click");
    expect(filterComponent.emitted().filter[0][0].num_openings).toBe(1);
    expect(filterComponent.emitted().filter[0][0].skills).toBe("Python");

    const listing = await wrapper.find(`#${mock.listingId}`);
    //
    expect(listing.exists()).toBe(true);
  });

  test("ST3-8.5.2", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-8.5.2_1",
      roleName: "Software Developer",
      dept: "Management",
      num_openings: 2,
    };
    const filter = { skills: "Python", num_openings: 1 };
    const mock = await mockings(listingDetails, filter);
    listingIds.push(mock.listingId);
    let wrapper = mount(LandingPage, {
      global: {
        plugins: [store],
      },
      data() {
        return {
          listings: mock.indivListing.data.body,
        };
      },
    });

    const filterComponent = wrapper.findComponent("#Filter");
    await filterComponent.find("#checkSkill").setChecked();
    await filterComponent.setData({ skill: [true] });
    const skill = await wrapper.find("#skill");
    expect(skill.exists()).toBe(true);
    await filterComponent.setData({ selectedSkill: "Python" });
    await filterComponent.find("#checkVacancy").setChecked();
    await filterComponent.setData({ vacancy: [true] });
    const vacancy = await wrapper.find("#vacancy");
    expect(vacancy.exists()).toBe(true);
    await filterComponent.setData({ selectedVacancy: 1 });

    await filterComponent.find("#filter").trigger("click");
    expect(filterComponent.emitted().filter[0][0].num_openings).toBe(1);
    expect(filterComponent.emitted().filter[0][0].skills).toBe("Python");

    const listing = await wrapper.find(`#${mock.listingId}`);
    //
    expect(listing.exists()).toBe(false);
  });

  test("ST3-8.6.1", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-8.6.1",
      roleName: "Software Developer",
      dept: "Management",
      num_openings: 1,
    };

    const listingDetails2 = {
      listingName: "ST3-8.6.2",
      roleName: "Software Developer",
      dept: "Management",
      num_openings: 1,
    };
    const listingId2 = await createListings(listingDetails2);
    const mock = await mockings(listingDetails, null, true);
    listingIds.push(listingId2);
    wrapper = mount(LandingPage, {
      global: {
        plugins: [store],
      },
      data() {
        return {
          listings: mock.indivListing.data.body,
        };
      },
    });
    const favourites = await wrapper.find("#favourites");
    await favourites.trigger("click");
    const favouritedListing = await wrapper.find(`#${mock.listingId}`);
    expect(favouritedListing.exists()).toBe(true);
    const favouritedListing2 = await wrapper.find(`#${listingId2}`);
    expect(favouritedListing2.exists()).toBe(false);
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

async function mockings(listingDetails, filter, fav = false) {
  let filterResponse;
  const listingId = await createListings(listingDetails);
  const staffId = profile._Staff_id;
  listingIds.push(listingId);
  const listings = await axios.get("http://localhost:3003/listing");
  const indivListing = await axios.get(
    `http://127.0.0.1:3003/listing/${listingId}`
  );

  const getRoleSkills = await axios.get(
    `http://127.0.0.1:3003/rs/${listingDetails.roleName}`
  );

  if (fav) {
    favourite = await axios.post(`http://127.0.0.1:3003/favourite/add`, {
      staffid: staffId,
      listingid: listingId,
    });
  }

  if (filter !== null) {
    filterResponse = await axios.get(
      `http://127.0.0.1:3003/listing/filter/${JSON.stringify(filter)}`
    );
  }

  const getFavourite = await axios.get(
    `http://127.0.0.1:3003/favourite/staff/${staffId}`
  );

  mock = new MockAdapter(axios);
  mock
    .onGet(`http://localhost:3003/listing`)
    .reply(200, { body: [listings.data.body] });

  mock
    .onGet(`http://localhost:3003/rs/${listingDetails.roleName}`)
    .reply(200, { body: getRoleSkills.data.body });

  if (filterResponse) {
    console.log('filtering')
    mock
      .onGet(`http://localhost:3003/listing/filter/${JSON.stringify(filter)}`)
      .reply(200, { body: filterResponse.data.body });
  }

  if (fav) {
    mock
      .onPost(`http://localhost:3003/favourite/add`, {
        staffid: staffId,
        listingid: listingId,
      })
      .reply(200);

    mock
      .onGet(`http://localhost:3003/favourite/staff/${staffId}`)
      .reply(200, { body: getFavourite.data.body });
  }

  return { indivListing, listings, listingId: listingId };
}
