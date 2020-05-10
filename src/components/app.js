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
		this.countryBox.addEventListener('dblclick', this.editTrip.bind(this))
		this.countryBox.addEventListener('blur', this.updateTrip.bind(this), true)
		
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

		
		editTrip(e) {
			const trip = e.target 
			trip.contentEditable = true 
			trip.focus()
		}

		updateTrip(e) {
			const trip = e.target
			trip.contentEditable = false 
			const country = trip.innerHTML
			const id = trip.dataset.id
			debugger
			this.adapter.update(country, id)
		}


	
		renderTrips() {
			this.countryBox.innerHTML = this.trips.map(trip => trip.renderTripName()).join('')
		}



	
}