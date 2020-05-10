class App {
	constructor(){
		this.trips = []
		this.adapter = new TripsAdapter()
		this.fetchAndLoadTrips()
		this.domElements()
		this.initListeners()
	}

	fetchAndLoadTrips() {
		this.adapter.getTrips()
		.then( trips => { 
			trips.forEach(trip => this.trips.push(new Trip(trip)))
		})
		.then( () => {this.renderTrips()
		})
	}

	initListeners() {
		this.tripForm.addEventListener('submit', this.createTrip.bind(this))
		
	}


	domElements() {
		this.countryName = document.getElementById('trip-name')
		this.countryBox = document.getElementById('trips-container')
		this.tripForm = document.getElementById('trip-form')
	}


	

		createTrip(e) {
			e.preventDefault()
			const country = this.countryName.value
			this.adapter.create(country)
			.then(trip => { this.trips.push(new Trip(trip))
				this.countryName.value = ''
				this.renderTrips()
			})
		}
	
		renderTrips() {
			this.countryBox.innerHTML = this.trips.map(trip => trip.renderTripName()).join('')
		}



	
}