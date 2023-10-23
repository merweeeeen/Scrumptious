//const { getApplicants, getListingsApplied, apply } = require('./application');

exports.Applicant = class {
  constructor(staffId, listingId, writeUp) {
    this._staff_Id = staffId;
    this._listing_Id = listingId
    this._write_Up = writeUp;
  }

  get listingId() {
    return this._listingId;
  }

  get staffId() {
    return this._staffId;
  }

  get writeUp(){
    return this._writeUp
  }

};
