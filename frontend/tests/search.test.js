import { mount } from "@vue/test-utils";
import { createApp, nextTick } from "vue";
import { createStore } from "vuex";
import LandingPage from "../src/views/LandingPage.vue"; // Importing the page to test the existence of the component=
import axios from "axios";

let wrapper;
let response;
let originalAxios;
let listingIds = [];



describe("Integration tests", async () => {
  beforeEach(async () => {
    console.log("Start Test");

    originalAxios = axios.get;
    response = await axios.get("http://127.0.0.1:3003/listing");
    const profile = {
      _Access_Rights: 1,
      _Country: "SG",
      _Dept: "Finance",
      _Email: "staff@gmail.com",
      _Password: "imaStaff",
      _Skills: ["Adaptability", "Microsoft Excel"],
      _Staff_id: 1001,
      _Applications: []
    };

    const store = createStore({
      state() {
        return {
          profile,
        };
      },
    });

    const app = createApp(LandingPage);
    app.use(store);
    wrapper = mount(LandingPage, {
      global: {
        plugins: [store],
      },
    });
  });

  afterEach(async () => {
    axios.get = originalAxios;
    for (let i = 0; i < listingIds.length; i++) {
      await axios.delete(`http://127.0.0.1:3003/delete/listing/${listingIds[i]}`); //
    }
    listingIds = []

    console.log("End Test");
  });
  test("ST3-17.1.1", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-17.1.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    listingIds.push(await createListings(listingDetails));
    const searchResponse = await axios.get(
      `http://127.0.0.1:3003/search/${listingDetails.listingName}`
    );
    let mockAxios = {
      get: async () => ({
        data: {
          body: response.data.body,
        },
      }),
    };

    axios.get = mockAxios.get;
    const filterComponent = wrapper.findComponent("#Filter");
    const searchBar = await filterComponent.find("#searchBar");
    await nextTick();
    mockAxios = {
      get: async () => ({
        data: {
          body: searchResponse.data.body,
        },
      }),
    };
    axios.get = mockAxios.get;
    await filterComponent.setData({ listing_name: "ST3-17.1.1" });
    expect(await searchBar.element.value).toBe("ST3-17.1.1");
    await filterComponent.vm.searchListing();
    await searchBar.trigger("searchListing");
    expect(filterComponent.emitted().searchListing[0][0]).toBe("ST3-17.1.1");

    const allListingCards = await wrapper.findAllComponents({
      name: "ListingCard",
    });
    // console.log(allListingCards);
    let output;
    for (let card of allListingCards) {
      if (card.vm.identified === "ST3-17.1.1") {
        output = "ST3-17.1.1";
      }
    }
    expect(output).toBe("ST3-17.1.1");
  });

  test("ST3-17.1.2", async () => {
    // Call the filtered Axios call first since the data is already expected
    const searchedName = "ST3-17.1.2s";
    const listingDetails = {
      listingName: "ST3-17.1.2",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    listingIds.push(await createListings(listingDetails));
    const searchResponse = await axios.get(
      `http://127.0.0.1:3003/search/${searchedName}`
    );
    let mockAxios = {
      get: async () => ({
        data: {
          body: response.data.body,
        },
      }),
    };

    axios.get = mockAxios.get;

    const filterComponent = wrapper.findComponent("#Filter");
    const searchBar = await filterComponent.find("#searchBar");
    await nextTick();
    mockAxios = {
      get: async () => ({
        data: {
          body: searchResponse.data.body,
        },
      }),
    };
    axios.get = mockAxios.get;
    await filterComponent.setData({ listing_name: searchedName });
    expect(await searchBar.element.value).toBe("ST3-17.1.2s");
    await filterComponent.vm.searchListing();
    await searchBar.trigger("searchListing");
    expect(filterComponent.emitted().searchListing[0][0]).toBe(searchedName);

    const allListingCards = await wrapper.findAllComponents({
      name: "ListingCard",
    });
    // console.log(allListingCards);
    let output;
    for (let card of allListingCards) {
      if (card.vm.identified === "ST3-17.1.2") {
        output = false;
      }
    }
    expect(output).toBe(undefined);
  });

  test("ST3-17.1.3", async () => {
    // Call the filtered Axios call first since the data is already expected
    const searchedName = "ST3-17.1.";
    const listingDetails = {
      listingName: "ST3-17.1.3",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    listingIds.push(await createListings(listingDetails));
    const searchResponse = await axios.get(
      `http://127.0.0.1:3003/search/${searchedName}`
    );
    let mockAxios = {
      get: async () => ({
        data: {
          body: response.data.body,
        },
      }),
    };

    axios.get = mockAxios.get;

    const filterComponent = wrapper.findComponent("#Filter");
    const searchBar = await filterComponent.find("#searchBar");
    await nextTick();
    mockAxios = {
      get: async () => ({
        data: {
          body: searchResponse.data.body,
        },
      }),
    };
    axios.get = mockAxios.get;
    await filterComponent.setData({ listing_name: searchedName });
    expect(await searchBar.element.value).toBe("ST3-17.1.");
    await filterComponent.vm.searchListing();
    await searchBar.trigger("searchListing");
    expect(filterComponent.emitted().searchListing[0][0]).toBe(searchedName);

    const allListingCards = await wrapper.findAllComponents({
      name: "ListingCard",
    });
    // console.log(allListingCards);
    let output;
    for (let card of allListingCards) {
      if (card.vm.identified === "ST3-17.1.3") {
        output = true;
      }
    }
    expect(output).toBe(true);
  });

  test("ST3-17.2.1", async () => {
    // Call the filtered Axios call first since the data is already expected
    const searchedName = "ST3-17.2.1";
    const listingDetails = {
      listingName: "ST3-17.2.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
      open: 0,
    };
    listingIds.push(await createListings(listingDetails));
    const searchResponse = await axios.get(
      `http://127.0.0.1:3003/search/${searchedName}`
    );
    let mockAxios = {
      get: async () => ({
        data: {
          body: response.data.body,
        },
      }),
    };

    axios.get = mockAxios.get;
    const filterComponent = wrapper.findComponent("#Filter");
    const searchBar = await filterComponent.find("#searchBar");
    await nextTick();
    mockAxios = {
      get: async () => ({
        data: {
          body: searchResponse.data.body,
        },
      }),
    };
    axios.get = mockAxios.get;
    await filterComponent.setData({ listing_name: searchedName });
    expect(await searchBar.element.value).toBe("ST3-17.2.1");
    await filterComponent.vm.searchListing();
    await searchBar.trigger("searchListing");
    expect(filterComponent.emitted().searchListing[0][0]).toBe(searchedName);

    const allListingCards = await wrapper.findAllComponents({
      name: "ListingCard",
    });
    let output;
    for (let card of allListingCards) {
      if (card.vm.identified === "ST3-17.2.1") {
        output = true;
      }
    }
    expect(output).toBe(undefined);
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
    open: listingDetails?.open >= 0 ? listingDetails.open : 1,
  };
  const response = await axios.post("http://127.0.0.1:3003/listing", bodyInfo);
  return response.data.body.insertId;
}
