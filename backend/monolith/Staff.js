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

    get Staff_id() {
        return this.Staff_id;
    }
    get Staff_FName(){
        return this.Staff_FName;
    }
    get Staff_LName(){
        return this.Staff_LName;
    }
    get Dept(){
        return this.Dept;
    }
    get Country(){
        return this.Country;
    }
    get Email(){
        return this.Email;
    }
    get Access_Rights(){
        return this.Access_Rights;
    }
    get Skills(){
        return this.Skills;
    }
}