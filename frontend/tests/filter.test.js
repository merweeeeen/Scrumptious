import { mount } from "@vue/test-utils";
import { createApp } from "vue";
import { createStore } from "vuex";
import LandingPage from "../src/views/LandingPage.vue"; // Importing the page to test the existence of the component=
import axios from "axios";

let wrapper;
let response;
let originalAxios;
let listingId;

beforeEach(async () => {
  console.log("Start Test");

  originalAxios = axios.get;
  response = await axios.get("http://127.0.0.1:3003/listing");
  const profile = {
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
  console.log(listingId);
  await axios.delete(`http://127.0.0.1:3003/delete/listing/${listingId}`);
  console.log("End Test");
});

describe("Integration tests", async () => {
  test("ST3-8.1.1", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-8.1.1",
      roleName: "Software Developer",
      dept: "IT Support",
      num_openings: 1,
    };
    listingId = await createListings(listingDetails);

    const filter = { skills: "Python" };
    const filterResponse = await axios.get(
      `http://127.0.0.1:3003/listing/filter/${JSON.stringify(filter)}`
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
    await filterComponent.find("#checkSkill").setChecked();
    await filterComponent.setData({ skill: [true] });
    const skill = await wrapper.find("#skill");
    expect(skill.exists()).toBe(true);
    await filterComponent.setData({ selectedSkill: "Python" });

    mockAxios = {
      get: async () => ({
        data: {
          body: filterResponse.data.body,
        },
      }),
    };
    axios.get = mockAxios.get;
    await filterComponent.find("#filter").trigger("click");
    expect(filterComponent.emitted().filter[0][0].skills).toBe("Python");

    const allListingCards = await wrapper.findAllComponents({
      name: "ListingCard",
    });
    // console.log(allListingCards);
    let output;
    for (let card of allListingCards) {
      if (card.vm.identified === "ST3-8.1.1") {
        output = "ST3-8.1.1";
      }
    }
    expect(output).toBe("ST3-8.1.1");
  });

  test("ST3-8.2.1", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-8.2.1",
      roleName: "Accountant",
      dept: "Finance",
      num_openings: 1,
    };
    listingId = await createListings(listingDetails);

    const filter = { role_name: "Accountant" };
    const filterResponse = await axios.get(
      `http://127.0.0.1:3003/listing/filter/${JSON.stringify(filter)}`
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
    await filterComponent.find("#checkRole").setChecked();
    await filterComponent.setData({ role: [true] });
    const skill = await wrapper.find("#role");
    expect(skill.exists()).toBe(true);
    await filterComponent.setData({ selectedRole: "Accountant" });

    mockAxios = {
      get: async () => ({
        data: {
          body: filterResponse.data.body,
        },
      }),
    };
    axios.get = mockAxios.get;
    await filterComponent.find("#filter").trigger("click");
    expect(filterComponent.emitted().filter[0][0].role_name).toBe("Accountant");

    const allListingCards = await wrapper.findAllComponents({
      name: "ListingCard",
    });
    // console.log(allListingCards);
    let output;
    for (let card of allListingCards) {
      if (card.vm.identified === "ST3-8.2.1") {
        output = "ST3-8.2.1";
      }
    }
    expect(output).toBe("ST3-8.2.1");
  });

  test("ST3-8.3.1", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-8.3.1",
      roleName: "Customer Service",
      dept: "Management",
      num_openings: 1,
    };
    listingId = await createListings(listingDetails);

    const filter = { dept: "Management" };
    const filterResponse = await axios.get(
      `http://127.0.0.1:3003/listing/filter/${JSON.stringify(filter)}`
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
    await filterComponent.find("#checkDept").setChecked();
    await filterComponent.setData({ dept: [true] });
    const skill = await wrapper.find("#dept");
    expect(skill.exists()).toBe(true);
    await filterComponent.setData({ selectedDept: "Management" });

    mockAxios = {
      get: async () => ({
        data: {
          body: filterResponse.data.body,
        },
      }),
    };
    axios.get = mockAxios.get;
    await filterComponent.find("#filter").trigger("click");
    expect(filterComponent.emitted().filter[0][0].dept).toBe("Management");

    const allListingCards = await wrapper.findAllComponents({
      name: "ListingCard",
    });
    // console.log(allListingCards);
    let output;
    for (let card of allListingCards) {
      if (card.vm.identified === "ST3-8.3.1") {
        output = "ST3-8.3.1";
      }
    }
    expect(output).toBe("ST3-8.3.1");
  });

  test("ST3-8.4.1", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-8.4.1",
      roleName: "Software Developer",
      dept: "Marketing",
      num_openings: 1,
    };
    listingId = await createListings(listingDetails);

    const filter = { num_openings: 1 };
    const filterResponse = await axios.get(
      `http://127.0.0.1:3003/listing/filter/${JSON.stringify(filter)}`
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
    await filterComponent.find("#checkVacancy").setChecked();
    await filterComponent.setData({ vacancy: [true] });
    const skill = await wrapper.find("#vacancy");
    expect(skill.exists()).toBe(true);
    await filterComponent.setData({ selectedVacancy: "1" });

    mockAxios = {
      get: async () => ({
        data: {
          body: filterResponse.data.body,
        },
      }),
    };
    axios.get = mockAxios.get;
    await filterComponent.find("#filter").trigger("click");
    expect(filterComponent.emitted().filter[0][0].num_openings).toBe("1");

    const allListingCards = await wrapper.findAllComponents({
      name: "ListingCard",
    });
    // console.log(allListingCards);
    let output;
    for (let card of allListingCards) {
      if (card.vm.identified === "ST3-8.4.1") {
        output = "ST3-8.4.1";
      }
    }
    expect(output).toBe("ST3-8.4.1");
  });

  test("ST3-8.5.1", async () => {
    // Call the filtered Axios call first since the data is already expected
    const listingDetails = {
      listingName: "ST3-8.5.1",
      roleName: "Software Developer",
      dept: "Management",
      num_openings: 1,
    };
    listingId = await createListings(listingDetails);

    const filter = { skills: "Python", num_openings: 1 };
    const filterResponse = await axios.get(
      `http://127.0.0.1:3003/listing/filter/${JSON.stringify(filter)}`
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
    await filterComponent.find("#checkSkill").setChecked();
    await filterComponent.setData({ skill: [true] });
    const skill = await wrapper.find("#skill");
    expect(skill.exists()).toBe(true);
    await filterComponent.setData({ selectedSkill: "Python" });

    await filterComponent.find("#checkVacancy").setChecked();
    await filterComponent.setData({ vacancy: [true] });
    const vacancy = await wrapper.find("#vacancy");
    expect(vacancy.exists()).toBe(true);
    await filterComponent.setData({ selectedVacancy: "1" });

    mockAxios = {
      get: async () => ({
        data: {
          body: filterResponse.data.body,
        },
      }),
    };
    axios.get = mockAxios.get;
    await filterComponent.find("#filter").trigger("click");
    expect(filterComponent.emitted().filter[0][0].num_openings).toBe("1");
    expect(filterComponent.emitted().filter[0][0].skills).toBe("Python");

    const allListingCards = await wrapper.findAllComponents({
      name: "ListingCard",
    });
    // console.log(allListingCards);
    let output;
    for (let card of allListingCards) {
      if (card.vm.identified === "ST3-8.5.1") {
        output = "ST3-8.5.1";
      }
    }
    expect(output).toBe("ST3-8.5.1");
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
