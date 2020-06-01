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
		this.countryBox.addEventListener('click', this.renderItems.bind(this))
		this.itemFormBox.addEventListener('submit', this.createItem.bind(this))
		this.sortButton.addEventListener('click', this.sortTrip.bind(this))
		this.itemsBox.addEventListener('submit', this.handleDelete.bind(this))
		
		
	}


	domElements() {
		this.tripName = document.getElementById('trip-name')
		this.countryName = document.getElementById('trip-country')
		this.countryBox = document.getElementById('trips-container')
		this.tripForm = document.getElementById('trip-form')
		this.itemFormBox = document.getElementById('item-form-box')
		this.itemsBox = document.querySelector('.bottom')
		this.sortButton = document.getElementById('sort-btn')
	}


	

		createTrip(e) {
			e.preventDefault()
			const country = this.tripName.value
			debugger
			this.adapter.create(country)
			.then(trip => { this.trips.push(new Trip(trip))
				this.tripName.value = ''
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
			this.adapter.update(country, id)
		}

		sortTrip() {
		
			const tripIdList = this.trips.map(tripid => tripid.id)
			let sortList = this.trips.map(trip =>   trip.country ).sort()
			this.countryBox.innerHTML = sortList.map(trip => `<li class='trip-name' data-id='${trip.id}' data-name='${trip}'>${trip}</li>`).join('')
		debugger 
				}

		 renderTrips() {
		 	return (
			this.countryBox.innerHTML = this.trips.map(trip => trip.renderTripName()).join('')
			)
		}
	



	

				
	



	

		

		// ITEMS ***********

			renderItemForm(countryId, countryName) {
				return `<form data-countryId="${countryId}" id="item-form">
        <input type="text" id="item-name" placeholder="${countryName}" required>
        <textarea type="text" id="item-quantity" placeholder="Quantity" required></textarea>
        <input type="submit" value="Create">
        </form>`
			}

			renderItems(e) {
			
			const countryName = e.target.dataset.name
		const countryId = e.target.dataset.id
		this.itemFormBox.innerHTML = this.renderItemForm(countryId, countryName)
		const items = this.trips.map(trip => trip.items.map(item => {
			if (countryId == item.trip_id) {
				return `<div class="item-list" data-itemid="${item.id}" data-tripid="${item.trip_id}">
				<h4>${item.name}</h4>${item.quantity}<br><button class="delete-btn">Delete</button></div>`
			}
		}))
		this.itemsBox.innerHTML  = items.join(' ')
		const item = document.querySelector('.bottom')
		item.addEventListener('click', this.handleDelete.bind(this))

			}


			createItem = (e) => {
				e.preventDefault()
				this.tripId = parseInt(e.target.dataset.countryid)
				const name = document.getElementById('item-name').value
				const quantity = document.getElementById('item-quantity').value
				this.adapter.createItems(name, quantity, this.tripId)
				.then(item => {
					this.trips.find((trip) => trip.id === this.tripId).items.push(item)
					debugger
					this.renderNewItem(item)
				})
				document.getElementById('item-name').value = ''
				document.getElementById('item-quantity').value = ''
			}



			renderNewItem(item) {
				debugger	
				return this.itemsBox.innerHTML += `<div class="item-list" data-itemid="${item.id}" data-tripid="${item.trip_id}">
				<h4>${item.name}</h4>${item.quantity}<br><button class="delete-btn">Delete</button></div>`
			}






			handleDelete(e) {
				// debugger
				if(e.target && e.target.matches('button.delete-btn')) {
					this.deleteItem(e)
					// e.stopPropagation()
				}
			}


			deleteItem(e) {
				this.itemId = parseInt(e.target.parentElement.dataset.itemid)
				this.adapter.deleteItem(this.itemId)
				const tripId = parseInt(e.target.parentElement.dataset.tripid)
				const trip = this.trips.find((trip) => trip.id === tripId)
				e.target.parentElement.remove()
				trip.items = trip.items.filter((item) => item.id !== this.itemId)

			}



	
}