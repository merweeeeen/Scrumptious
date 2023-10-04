class Staff {
    constructor(
        Staff_id, 
        Staff_FName, 
        Staff_LName, 
        Dept, 
        Country, 
        Email, 
        Access_Rights, 
        Skills
        ) {
        this.Staff_id = Staff_id;
        this.Staff_FName = Staff_FName;
        this.Staff_LName = Staff_LName;
        this.Dept = Dept;
        this.Country = Country;
        this.Email = Email;
        this.Access_Rights = Access_Rights;
        this.Skills = Skills;
    }

    getStaff_id() {
        return this.Staff_id;
    }
    getStaff_FName(){
        return this.Staff_FName;
    }
    getStaff_LName(){
        return this.Staff_LName;
    }
    getDept(){
        return this.Dept;
    }
    getCountry(){
        return this.Country;
    }
    getEmail(){
        return this.Email;
    }
    getAccess_Rights(){
        return this.Access_Rights;
    }
    getSkills(){
        return this.Skills;
    }
}