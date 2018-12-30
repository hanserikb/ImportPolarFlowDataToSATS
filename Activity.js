function Activity(params) {
  this.id = params.id,
  this.date = params.date,
  this.duration = params.duration,
  this.type = params.type,
  this.description = params.description
}

module.exports = Activity;