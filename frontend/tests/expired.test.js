import { mount } from "@vue/test-utils";
import Vuex from "vuex";
import { nextTick } from "vue";
import LandingPage from "../src/views/LandingPage.vue"; // Importing the page to test the existence of the component=
import Login from "../src/views/Login.vue"; // Importing the page to test the existence of the component=
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "vuetify/styles";

// let response;
let listingIds = [];
let profile;
let mock;
let listings;
let favourite;
let store;

const mockRouterPush = vi.fn();
const mockAlertPush = vi.fn();
const mockCommit = vi.fn();
vi.spyOn(window, "alert").mockImplementation(mockAlertPush);

beforeEach(async () => {
  console.log("Start Test");

  store = new Vuex.Store({
    mutations: {
      profile: mockCommit,
    },
  });
});

afterEach(async () => {
  mock.restore();
  console.log(listingIds);
  for (let i = 0; i < listingIds.length; i++) {
    console.log(listingIds[i]);
    await axios.delete(`http://127.0.0.1:3003/delete/listing/${listingIds[i]}`); //
    await axios.delete(`http://127.0.0.1:3003/delete/staff/9999`); //
  }
  if (favourite) {
    await axios.post("http://localhost:3003/favourite/remove", {
      staffid: profile._Staff_id,
      listingid: listingIds[listingIds.length - 1].toString(),
    });
  }
  console.log("End Test");
});

async function mockings(listingDetails, access = 0) {
  const listingId = await createListings(listingDetails);
  const staffDetails = {
    id: 9999,
    name: "Testcase",
    email: "test@gamil.com",
    fName: "Test",
    lName: "Case",
    dept: "IT Support",
    country: "SG",
    accessRights: access,
    password: "testpassword",
    roleName: "Human Resource",
  };
  await axios.post(`http://127.0.0.1:3003/register`, { staffDetails });

  listingIds.push(listingId);
  listings = await axios.get("http://127.0.0.1:3003/listing");

  const login = await axios.get(
    `http://127.0.0.1:3003/login/${staffDetails.id}/${staffDetails.password}/${staffDetails.accessRights}`
  );

  const updateExpired = await axios.put("http://localhost:3003/updateExpired");

  const indivListing = await axios.get(
    `http://127.0.0.1:3003/listing/${listingId}`
  );

  mock = new MockAdapter(axios);
  mock
    .onGet(
      `http://localhost:3003/login/${staffDetails.id}/${staffDetails.password}/${staffDetails.accessRights}`
    )
    .reply(200, { body: login.data.body });

  mock
    .onGet(`http://localhost:3003/listing`)
    .reply(200, { body: [indivListing.data.body] });

  mock
    .onGet(`http://localhost:3003/listing/${listingId}`)
    .reply(200, { body: indivListing.data.body });

  mock
    .onPut(`http://localhost:3003/updateExpired`)
    .reply(200, { body: updateExpired.data.body });

  return { indivListing, listingId: listingId };
}

describe("Testing ST3-93", () => {
  test("ST3-93.1.1", async () => {
    let wrapper;
    const listingDetails = {
      listingName: "ST3-93.1.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    const mocked = await mockings(listingDetails, 1);
    const listingId = mocked.listingId;
    listings = mocked.indivListing;

    wrapper = mount(Login, {
      global: {
        plugins: [store],
        mocks: {
          $router: { push: mockRouterPush },
        },
      },
    });

    await wrapper.setData({
      staffId: 9999,
      password: "testpassword",
      selected: "HR",
    });
    await wrapper.find("#login").trigger("click");
    await nextTick();
    await nextTick();

    expect(mockRouterPush).toHaveBeenCalledWith("/");
    expect(mockCommit).toHaveBeenCalled();
    expect(mockCommit).toHaveBeenCalledWith(
      {},
      {
        _Access_Rights: "1",
        _Applications: [],
        _Country: "SG",
        _Dept: "IT Support",
        _Email: "test@gamil.com",
        _Password: "testpassword",
        _Role_Name: "Human Resource",
        _Skills: [],
        _Staff_FName: "Test",
        _Staff_LName: "Case",
        _Staff_id: 9999,
      }
    );
    store = new Vuex.Store({
      state() {
        return {
          profile: {
            _Access_Rights: "1",
            _Applications: [],
            _Country: "SG",
            _Dept: "IT Support",
            _Email: "test@gamil.com",
            _Password: "testpassword",
            _Role_Name: "Human Resource",
            _Skills: [],
            _Staff_FName: "Test",
            _Staff_LName: "Case",
            _Staff_id: 9999,
          },
        };
      },
    });
    wrapper = mount(LandingPage, {
      global: {
        plugins: [store],
        mocks: {
          $router: { push: mockRouterPush },
        },
      },
    });
    await nextTick()
    await wrapper.vm
    const listing = await wrapper.find(`#${listingId}`);
    expect(listing.exists()).toBe(true);
    expect(
      listing.find(`[id="${listingDetails.listingName}"]`).attributes("color")
    ).toBe("red");
  });

    test("ST3-93.2.1", async () => {
      let wrapper;
      const listingDetails = {
        listingName: "ST3-93.2.1",
        roleName: "Software Developer",
        dept: "IT Support",
        num_openings: 1,
      };
      const mocked = await mockings(listingDetails, 0);
      const listingId = mocked.listingId;
      listings = mocked.indivListing;

      wrapper = mount(Login, {
        global: {
          plugins: [store],
          mocks: {
            $router: { push: mockRouterPush },
          },
        },
      });

      await wrapper.setData({
        staffId: 9999,
        password: "testpassword",
        selected: "Staff",
      });
      await wrapper.find("#login").trigger("click");
      await nextTick();
      await nextTick();

      expect(mockRouterPush).toHaveBeenCalledWith("/");
      expect(mockCommit).toHaveBeenCalled();
      expect(mockCommit).toHaveBeenCalledWith(
        {},
        {
          _Access_Rights: "0",
          _Applications: [],
          _Country: "SG",
          _Dept: "IT Support",
          _Email: "test@gamil.com",
          _Password: "testpassword",
          _Role_Name: "Human Resource",
          _Skills: [],
          _Staff_FName: "Test",
          _Staff_LName: "Case",
          _Staff_id: 9999,
        }
      );
      store = new Vuex.Store({
        state() {
          return {
            profile: {
              _Access_Rights: "0",
              _Applications: [],
              _Country: "SG",
              _Dept: "IT Support",
              _Email: "test@gamil.com",
              _Password: "testpassword",
              _Role_Name: "Human Resource",
              _Skills: [],
              _Staff_FName: "Test",
              _Staff_LName: "Case",
              _Staff_id: 9999,
            },
          };
        },
      });
      wrapper = mount(LandingPage, {
        global: {
          plugins: [store],
          mocks: {
            $router: { push: mockRouterPush },
          },
        },
      });
      const listing = await wrapper.find(`#${listingId}`);
      expect(listing.exists()).toBe(false);
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
    expiry_date: "2023-10-01",
    open: 1,
  };
  const response = await axios.post("http://127.0.0.1:3003/listing", bodyInfo);
  return response.data.body.insertId;
}
