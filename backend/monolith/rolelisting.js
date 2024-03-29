const application = require("./application");
const ApplicantClass = require('./ApplicationClass')

exports.RoleListing = class {
  constructor(
    listing_id,
    listing_name,
    role_name,
    dept,
    country,
    num_openings,
    expiry_date,
    open,
    desc,
    created_date,
    skills
  ) {
    this._listing_id = listing_id;
    this._listing_name = listing_name;
    this._role_name = role_name;
    this._dept = dept;
    this._country = country;
    this._num_openings = num_openings;
    this._expiry_date = expiry_date;
    this._open = open;
    this._desc = desc;
    this._created_date = created_date;
    this._applicants = [];
    this._skills = skills;
  }

  get listingId() {
    return this._listing_id;
  }

  get listingName() {
    return this._listing_name;
  }

  get roleName() {
    return this._role_name;
  }

  get dept_name() {
    return this._dept_name;
  }

  get country() {
    return this._country;
  }

  get num_openings() {
    return this._num_openings;
  }

  get expiry_date() {
    return this._expiry_date;
  }

  get open() {
    return this._open;
  }

  get desc() {
    return this._desc;
  }

  get created_date() {
    return this._created_date;
  }

  get applicants() {
    return this._applicants;
  }

  get skills() {
    return this._skills;
  }
  
  set listingName(newname) {
    this._listing_name = newname;
  }

  set roleName(newname) {
    this._role_name = newname;
  }

  set dept_name(deptname) {
    this._dept = deptname;
  }

  set num_opening(openings) {
    this._num_opening = openings;
  }

  set expiry_date(date) {
    this._expiry_date = date;
  }

  set open(newopen) {
    this._open = newopen;
  }

  set desc(new_desc) {
    this._desc = new_desc;
  }

  async updateApplicants(){
    const response = await application.getApplicants(this._listing_id)
    for (let applyinfo of response){
      this._applicants.push(
        new ApplicantClass.Applicant(
          applyinfo.staff_id,
          applyinfo.listing_id,
          applyinfo.write_up
        )
      )
    }
  }
};
