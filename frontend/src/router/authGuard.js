import store from "../main.js";
export default (to, from, next) => {
  console.log(store.state.profile);
  if (store.state.profile === "") {
    console.log('redirected')
    next("/login");
  }else{
    next()
  }
};
