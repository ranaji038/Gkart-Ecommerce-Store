class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  //Search Feature
  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, //Regex Mongodb feature
            $options: "i", // Making case insensetive i.e ABC == abc
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });

    return this;
  }
  // Pagination part

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1); //how many object to be skipped count

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
