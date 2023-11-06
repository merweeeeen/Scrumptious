import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { createStore } from "vuex";
import ProfilePage from "../src/views/PersonalProfile.vue"; // Importing the page to test the existence of the component=
import NavBar from "../src/components/NavBar.vue";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

let wrapper;
let originalAxios;
let listingIds = [];
let store;
let profile;
let mock;
const mockRouterPush = vi.fn();

beforeEach(async () => {
  console.log("Start Test");

  originalAxios = axios.get;
  profile = {
    _Access_Rights: 0,
    _Country: "SG",
    _Dept: "Finance",
    _Email: "johndoe@gmail.com",
    _Password: "imaStaff",
    _Skills: ["Adaptability", "Microsoft Excel"],
    _Staff_id: 1001,
    _Staff_FName: "John",
    _Staff_LName: "Doe",
    _Role_Name: "Accountant",
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
    const mock = await mockings(listingDetails);
    const listingId = mock.listingId;
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
    expect(await wrapper.find("#roleAndDept").text()).toBe(
      "Accountant in Finance Department"
    );
    expect(await wrapper.find("#email").text()).toBe("johndoe@gmail.com");
    expect(await wrapper.find("#country").text()).toBe("Country: SG");
    expect(await wrapper.find("#staffId").text()).toBe("Staff ID: 1001");
  });

  test("ST3-41.1.1", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-41.1.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    const mock = await mockings(listingDetails);
    const listingId = mock.listingId;
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
      data() {
        return {
          appliedListings: mock.appliedListings.data.body,
        };
      },
    });
    await nextTick();
    const listingCard = await wrapper.find(`#${listingId}`);
    expect(listingCard.exists()).toBe(true);
    expect(listingCard.find("#roleName").text()).toBe("Software Developer");

    const deptAndOpenings = await listingCard.find(`#deptAndOpenings`);
    expect(deptAndOpenings.text()).toBe("IT Support | 1 Opening(s)");

    const daysPosted = await listingCard.find(`#daysPosted`);
    expect(daysPosted.text()).toBe("Posted today");
  });

  test("ST3-41.2.1", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-41.2.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    const mock = await mockings(listingDetails, false);
    const listingId = mock.listingId;
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
      data() {
        return {
          appliedListings: mock.appliedListings.data.body,
        };
      },
    });
    await nextTick();
    const listingCard = await wrapper.find(`#${listingId}`);
    expect(listingCard.exists()).toBe(false);
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

async function mockings(listingDetails, apply = true) {
  const listingId = await createListings(listingDetails);
  const staffId = profile._Staff_id;
  listingIds.push(listingId);

  let submitApplication;
  let bodyInfo;
  if (apply) {
    bodyInfo = {
      staffId: staffId,
      listingId: listingId,
      writeUp: "TestCase",
    };

    submitApplication = await axios.post(
      "http://127.0.0.1:3003/application",
      bodyInfo
    );
  }

  const indivListing = await axios.get(
    `http://127.0.0.1:3003/application/staff/${staffId}`
  );
  // console.log(indivListing);
  const getSaved = await axios.get(
    `http://127.0.0.1:3003/favourite/read/${profile._Staff_id}/${listingId}`
  );

  const getRoleSkills = await axios.get(
    `http://127.0.0.1:3003/rs/${listingDetails.roleName}`
  );

  const appliedListings = await axios.get(
    `http://127.0.0.1:3003/application/staff/${staffId}`
  );

  mock = new MockAdapter(axios);
  mock
    .onGet(`http://localhost:3003/listing`)
    .reply(200, { body: [indivListing.data.body] });

  mock
    .onGet(`http://localhost:3003/application/staff/${staffId}`)
    .reply(200, { body: appliedListings.data.body });

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

  if (apply) {
    mock
      .onPost(`http://localhost:3003/application`, bodyInfo)
      .reply(200, { body: submitApplication.data.body });
  }

  return { appliedListings, listingId: listingId };
}
