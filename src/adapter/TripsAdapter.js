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


	update(country, id) {
		const trip = {
		 country: country,
		}
		return fetch(`${this.baseURL}/${id}`, {
			method: 'PATCH', 
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(trip)
		})
			.then(res => res.json())
	}


	// delete() {
	// 	return fetch(`${this.baseURL}/${id}`, {
	// 		method: 'DELETE',
	// 		headers: {
	// 			'content-type' : 'application/json'
	// 		}
	// 	})
	// }




	// ITEMS ************



	createItems(name, quantity, id) {
		const itemName = {
			id: id,
			name: name,
			quantity: quantity
		}
		return fetch(`${this.baseURL}/${id}/items`, {
			method: 'POST',
			headers: {
				'content-type' : 'application/json'
			},
			body: JSON.stringify(itemName)
		})
		.then(res => res.json())
		.then(item => new Item(item))
	}



	deleteItem(id) {
		return fetch(`http://localhost:3000/items/${id}`, {
			method: 'DELETE',
			headers: {
				'content-type' : 'application/json'
			}
		})
	}


}