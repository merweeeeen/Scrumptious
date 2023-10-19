const { postFavourite, removeFavourite } = require('./role');

exports.Favourite = class {
  constructor(staffId, listingId) {
    this._staffId = staffId;
    this._listingId = listingId;
  }

  get listingId() {
    return this._listingId;
  }

  get staffId() {
    return this._staffId;
  }

  async addFavourite() {
    try{
        const response = await postFavourite(this._staffId, this._listingId)
        return { status: 200, response: response };
    } catch (error){
        console.log(error.code)
        return { status: 400, error: error.code };
    }
  }

  async deleteFavourite() {
    try{
        const response = await removeFavourite(this._staffId, this._listingId)
        return { status: 200, response: response };
    } catch (error){
        return { status: 400, error: error.code };
    }  }
};
