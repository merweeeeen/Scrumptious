class RoleListing {
    constructor(
      listing_id,
      listing_name,
      role_name,
      dept,
      country,
      num_opneing,
      skills_required,
      expiry_date,
      open,
      desc
    ) {
      this.listing_id = listing_id;
      this.listing_name = listing_name;
      this.role_name = role_name;
      this.dept = dept;
      this.country = country;
      this.num_opneing = num_opneing;
      this.skills_required = skills_required;
      this.expiry_date = expiry_date;
      this.open = open;
      this.desc = desc;
    }
  
    get listingId() {
      return this.listing_id;
    }
  
    get listingName() {
      return this.listing_name;
    }
  
    get roleName() {
      return this.role_name;
    }
  
    get dept() {
      return this.dept;
    }
  
    get country() {
      return this.country;
    }
  
    get num_opneing() {
      return this.num_opneing;
    }
  
    get skills_required() {
      return this.skills_required;
    }
  
    get expiry_date() {
      return this.expiry_date;
    }
  
    get open() {
      return this.open;
    }
  }
  