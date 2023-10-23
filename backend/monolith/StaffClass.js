const application = require("./application");
const ApplicantClass = require('./ApplicationClass')

exports.Staff = class {
  constructor(
    Staff_id,
    Staff_FName,
    Staff_LName,
    Dept,
    Country,
    Email,
    Access_Rights,
    Skills,
    Password
  ) {
    this._Staff_id = Staff_id;
    this._Staff_FName = Staff_FName;
    this._Staff_LName = Staff_LName;
    this._Dept = Dept;
    this._Country = Country;
    this._Email = Email;
    this._Access_Rights = Access_Rights;
    this._Skills = Skills;
    this._Password = Password;
    this._Applications = []
  }

  get Staff_id() {
    return this._Staff_id;
  }
  get Staff_FName() {
    return this._Staff_FName;
  }
  get Staff_LName() {
    return this._Staff_LName;
  }
  get Dept() {
    return this._Dept;
  }
  get Country() {
    return this._Country;
  }
  get Email() {
    return this._Email;
  }
  get Access_Rights() {
    return this._Access_Rights;
  }
  get Skills() {
    return this._Skills;
  }

  get Password() {
    return this._Password;
  }

  get Applications() {
    return this._Applications
  }

  async updateApplications(){
    const response = await application.getListingsApplied(this._Staff_id)
    for (let applyinfo of response){
      this._Applications.push(
        new ApplicantClass.Applicant(
          applyinfo.staff_id,
          applyinfo.listing_id,
          applyinfo.write_up
        )
      )
    }
  }
};
