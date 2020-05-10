class TripsAdapter {
	constructor() {
		this.baseURL = 'http://localhost:3000/trips'
	
	}

	getTrips() {
		return fetch(this.baseURL)
		.then(res => res.json())
	}

	create(country) { 
		const tripName = { 
			country: country 
		}
		return fetch(this.baseURL, {
			method: "POST",
			headers: {
				'content-type' : 'application/json',
			},
			body: JSON.stringify(tripName)
		})
		.then(res => res.json())
	}


}