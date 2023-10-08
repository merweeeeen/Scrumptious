exports.RoleListing = class {
    constructor(
      listing_id,
      listing_name,
      role_name,
      dept,
      country,
      num_opening,
      expiry_date,
      open,
      desc
    ) {
      this._listing_id = listing_id;
      this._listing_name = listing_name;
      this._role_name = role_name;
      this._dept = dept;
      this._country = country;
      this._num_opneing = num_opening;
      this._expiry_date = expiry_date;
      this._open = open;
      this._desc = desc;
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
  
    get num_opening() {
      return this._num_opening;
    }
  
    get expiry_date() {
      return this._expiry_date;
    }
  
    get open() {
      return this._open;
    }

    get desc() {
      return this._desc
    }
  }
  