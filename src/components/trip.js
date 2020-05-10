class Trip {
	constructor(trip) {
	this.id = trip.id 
	this.country = trip.country
	this.items = trip.items ? trip.items : []
	}

	renderTripName() {
		return `<li class='trip-name' data-id='${this.id}'>${this.country}</li>`
	}



}
