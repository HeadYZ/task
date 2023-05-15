'use strict'

const data = [
	{
		title: 'Day of the Dragon',
		author: 'Richard A. Knaak',
		quantity: 10,
		unit_price: 9,
		total_value: null,
	},
	{
		title: 'A Wizard of Earthsea',
		author: 'Ursula K. Le Guin',
		quantity: null,
		unit_price: 10,
		total_value: 40,
	},
	{
		title: 'Homeland',
		author: 'Robert A. Salvatore',
		quantity: 8,
		unit_price: null,
		total_value: 96,
	},
	{
		title: 'Canticle',
		author: 'Robert A. Salvatore',
		quantity: 13,
		unit_price: 23,
		total_value: null,
	},
	{
		title: 'Gamedec. Granica rzeczywistości',
		author: 'Marcin Przybyłek',
		quantity: null,
		unit_price: 25,
		total_value: 50,
	},
	{
		title: 'The Night Has Come',
		author: 'Stephen King',
		quantity: 30,
		unit_price: null,
		total_value: 900,
	},
	{
		title: 'The Sphinx',
		author: 'Graham Masterton',
		quantity: 3,
		unit_price: null,
		total_value: 300,
	},
	{
		title: 'Charnel House',
		author: 'Graham Masterton',
		quantity: null,
		unit_price: 20,
		total_value: 60,
	},
	{
		title: 'The Devils of D-Day',
		author: 'Graham Masterton',
		quantity: 10,
		unit_price: 16,
		total_value: null,
	},
]
const metadata = [
	{
		id: 'title',
		type: 'string',
		label: 'Title',
	},
	{
		id: 'author',
		type: 'string',
		label: 'Author',
	},
	{
		id: 'quantity',
		type: 'number',
		label: 'Quantity',
	},
	{
		id: 'unit_price',
		type: 'number',
		label: 'Unit price',
	},
	{
		id: 'total_value',
		type: 'number',
		label: 'Total (Quantity * Unit price)',
	},
]

const additionalDataFromBooksDB = [
	{
		title: 'Day of the Dragon',
		author: 'Richard A. Knaak',
		genre: 'fantasy',
		pages: 378,
		rating: 3.81,
	},
	{
		title: 'A Wizard of Earthsea',
		author: 'Ursula K. Le Guin',
		genre: 'fantasy',
		pages: 183,
		rating: 4.01,
	},
	{
		title: 'Homeland',
		author: 'Robert A. Salvatore',
		genre: 'fantasy',
		pages: 343,
		rating: 4.26,
	},
	{
		title: 'Canticle',
		author: 'Robert A. Salvatore',
		genre: 'fantasy',
		pages: 320,
		rating: 4.03,
	},
	{
		title: 'Gamedec. Granica rzeczywistości',
		author: 'Marcin Przybyłek',
		genre: 'cyberpunk',
		pages: 364,
		rating: 3.89,
	},
	{
		title: 'The Night Has Come',
		author: 'Stephen King',
		genre: 'post apocalyptic',
		pages: 186,
		rating: 4.55,
	},
	{
		title: 'The Sphinx',
		author: 'Graham Masterton',
		genre: 'horror',
		pages: 207,
		rating: 3.14,
	},
	{
		title: 'Charnel House',
		author: 'Graham Masterton',
		genre: 'horror',
		pages: 123,
		rating: 3.61,
	},
	{
		title: 'The Devils of D-Day',
		author: 'Graham Masterton',
		genre: 'horror',
		pages: 243,
		rating: '3.62',
	},
]
const additionalMetadataFromBooksDB = [
	{
		id: 'title',
		type: 'string',
		label: 'Title',
	},
	{
		id: 'author',
		type: 'string',
		label: 'Author',
	},
	{
		id: 'genre',
		type: 'string',
		label: 'Genre',
	},
	{
		id: 'pages',
		type: 'number',
		label: 'Pages',
	},
	{
		id: 'rating',
		type: 'number',
		label: 'Rating',
	},
]
const dataSummary = []
const metaSummary = [
	{
		id: 'author',
		type: 'string',
		label: 'Author',
	},
	{
		id: 'titles',
		type: 'number',
		label: 'Titles',
	},
	{
		id: 'totalQuantity',
		type: 'number',
		label: 'Total Quantity',
	},
	{
		id: 'totalRevenue',
		type: 'number',
		label: 'Total Revenue',
	},
	{
		id: 'avgQuantity',
		type: 'number',
		label: 'Avg Quantity',
	},
	{
		id: 'avgUnitPrice',
		type: 'number',
		label: 'Avg Unit Price',
	},
]

const updatedData = [...data]

for (let i = 0; i < data.length; i++) {
	if (data[i].title === additionalDataFromBooksDB[i].title && data[i].author === additionalDataFromBooksDB[i].author) {
		updatedData[i] = { ...data[i], ...additionalDataFromBooksDB[i] }
	}
}

const updatedMetaData = [...metadata]

for (let i = 0; i < metadata.length; i++) {
	if (metadata[i].id !== additionalMetadataFromBooksDB[i].id) updatedMetaData.push(additionalMetadataFromBooksDB[i])
}

const searchInputElement = document.body.querySelector('input.search-input')
const searchButtonElement = document.body.querySelector('button.search-go')
const searchResetElement = document.body.querySelector('button.search-reset')

const columnHideElement = document.body.querySelector('button.column-hide')
const columnShowElement = document.body.querySelector('button.column-show')
const columnResetElement = document.body.querySelector('button.column-reset')

const markButtonElement = document.body.querySelector('button.function-mark')
const fillButtonElement = document.body.querySelector('button.function-fill')
const countButtonElement = document.body.querySelector('button.function-count')
const computeTotalsButtonElement = document.body.querySelector('button.function-totals')
const resetFunctionButtonElement = document.body.querySelector('button.function-reset')

class Grid {
	constructor() {
		this.data = updatedData
		this.metadata = updatedMetaData

		// HINT: below map can be useful for view operations ;))
		this.dataViewRef = new Map()

		Object.freeze(this.data)
		Object.freeze(this.metadata)

		this.render()
		this.live()
	}

	render() {
		this.table = document.createElement('table')

		this.head = this.table.createTHead()
		this.head.setAttribute('id', 'thead')
		this.body = this.table.createTBody()
		this.body.setAttribute('id', 'tbody')

		this.renderHead()
		this.renderBody()

		document.body.append(this.table)
	}

	renderHead() {
		const row = this.head.insertRow()

		for (const column of this.metadata) {
			const cell = row.insertCell()
			cell.style.display = 'table-cell'
			cell.innerText = column.label
		}
	}

	renderBody() {
		for (const dataRow of this.data) {
			const row = this.body.insertRow()

			for (const column of this.metadata) {
				const cell = row.insertCell()

				cell.classList.add(column.type)
				cell.style.display = 'table-cell'
				cell.innerText = dataRow[column.id]
			}

			// connect data row reference with view row reference
			this.dataViewRef.set(dataRow, row)
		}
	}

	live() {
		searchButtonElement.addEventListener('click', this.onSearchGo.bind(this))
		searchInputElement.addEventListener('keyup', this.onSearchGo.bind(this))
		searchResetElement.addEventListener('click', this.onSearchReset.bind(this))

		columnHideElement.addEventListener('click', this.onColumnHideClick.bind(this))
		columnShowElement.addEventListener('click', this.onColumnShowClick.bind(this))
		columnResetElement.addEventListener('click', this.onColumnReset.bind(this))

		markButtonElement.addEventListener('click', this.onMarkEmptyClick.bind(this))
		fillButtonElement.addEventListener('click', () => {
			this.onFillTableClick(), this.onMarkEmptyClick()
		})
		countButtonElement.addEventListener('click', this.onCountEmptyClick.bind(this))
		computeTotalsButtonElement.addEventListener('click', this.onComputeTotalsClick.bind(this))
		resetFunctionButtonElement.addEventListener('click', this.onFunctionsResetClick.bind(this))
	}

	onSearchGo(event) {
		const searchValue = searchInputElement.value
		for (const key of this.dataViewRef) {
			const title = key[0].title.toLowerCase()
			const author = key[0].author.toLowerCase()

			if (title.indexOf(searchValue) !== -1 || author.indexOf(searchValue) !== -1) {
				key[1].style.display = 'table-row'
			} else {
				key[1].style.display = 'none'
			}
		}
	}

	onSearchChange(event) {
		// I used the onSearchGo function for the event of a mouse click and a keyboard key click
	}

	onSearchReset(event) {
		searchInputElement.value = ''
		this.onSearchGo()
	}

	onColumnHideClick(event) {
		console.error(`Hiding first visible column from the left...`)
		const headingTable = document.getElementById('thead')
		const headingRow = headingTable.firstChild

		const tableBody = document.getElementById('tbody')
		const tableBodyRow = tableBody.children

		for (let i = 0; i < tableBodyRow.length; i++) {
			const cell = tableBodyRow.item(i).children

			for (let i = 0; i < cell.length; i++) {
				if (cell.item(i).style.display === 'table-cell') {
					cell.item(i).style.display = 'none'
					break
				}
			}
		}

		for (let i = 0; i < headingRow.children.length; i++) {
			if (headingRow.children.item(i).style.display === 'table-cell') {
				headingRow.children.item(i).style.display = 'none'
				break
			}
		}
	}

	onColumnShowClick(event) {
		console.error(`Showing first hidden column from the left...`)

		const headingTable = document.getElementById('thead')
		const headingRow = headingTable.firstChild

		const tableBody = document.getElementById('tbody')
		const tableBodyRow = tableBody.children

		for (let i = 0; i < headingRow.children.length; i++) {
			if (headingRow.children.item(i).style.display === 'none') {
				headingRow.children.item(i).style.display = 'table-cell'
				break
			}
		}
		for (let i = 0; i < tableBodyRow.length; i++) {
			const cell = tableBodyRow.item(i).children

			for (let i = 0; i < cell.length; i++) {
				if (cell.item(i).style.display === 'none') {
					cell.item(i).style.display = 'table-cell'
					break
				}
			}
		}
	}

	onColumnReset(event) {
		console.error(`Resetting column visibility...`)
		const headingTable = document.getElementById('thead')
		const headingRow = headingTable.firstChild

		const tableBody = document.getElementById('tbody')
		const tableBodyRow = tableBody.children

		for (let i = 0; i < headingRow.children.length; i++) {
			headingRow.children.item(i).style.display = 'table-cell'
		}
		for (let i = 0; i < tableBodyRow.length; i++) {
			const cell = tableBodyRow.item(i).children

			for (let i = 0; i < cell.length; i++) {
				cell.item(i).style.display = 'table-cell'
			}
		}
	}

	onMarkEmptyClick(event) {
		console.error(`Marking empty cells...`)
		const tableBody = document.getElementById('tbody')
		const numberCells = tableBody.getElementsByClassName('number')

		for (const cell of numberCells) {
			if (cell.textContent === '') {
				cell.style.borderColor = '#FF0000'
				cell.style.borderStyle = 'solid'
			} else {
				cell.style.borderStyle = 'none'
			}
		}
	}

	onFillTableClick(event) {
		console.error(`Filling empty cells with data...`)
		const tableBody = document.getElementById('tbody')

		for (const row of tableBody.rows) {
			let quantity = +row.children[2].textContent
			let unitPrice = +row.children[3].textContent
			let total = +row.children[4].textContent

			if (quantity !== 0 && unitPrice !== 0) {
				total = quantity * unitPrice
				row.children[4].textContent = total
			} else if (quantity !== 0 && total !== 0) {
				unitPrice = total / quantity
				row.children[3].textContent = unitPrice
			} else if (unitPrice !== 0 && total !== 0) {
				quantity = total / unitPrice
				row.children[2].textContent = quantity
			}
		}
	}

	onCountEmptyClick(event) {
		console.error(`Counting amount of empty cells...`)
		const tableBody = document.getElementById('tbody')
		const numberCells = tableBody.getElementsByClassName('number')

		let count = 0

		for (const cell of numberCells) {
			if (cell.textContent.trim() === '') {
				count++
			}
		}
		alert(`Found ${count} empty cells`)
	}

	onComputeTotalsClick(event) {
		console.error(`Computing summary totals...`)
		const tableBody = document.getElementById('tbody')
		let sum = 0
		for (const row of tableBody.rows) {
			sum += +row.children[4].textContent
		}
		alert(`Sum of "Total (Quantity * Unit price)" equals ${sum}`)
	}

	onFunctionsResetClick(event) {
		console.error(`Resetting all function...`)
		const tableBody = document.getElementById('tbody')
		const headingBody = document.getElementById('thead')
		tableBody.innerHTML = ''
		headingBody.innerHTML = ''
		this.renderHead()
		this.renderBody()
	}
}

class Summary {
	constructor() {
		this.data = updatedData
		this.summaryData = dataSummary
		this.metadata = metaSummary
		this.authors = []

		Object.freeze(this.data)
		Object.freeze(this.metadata)

		this.prepareDataSummary()
		this.calculateDataSummary()
		this.render()
	}

	render() {
		this.table = document.createElement('table')

		this.head = this.table.createTHead()
		this.head.setAttribute('id', 'thead')
		this.body = this.table.createTBody()
		this.body.setAttribute('id', 'tbody')

		this.renderHead()
		this.renderBody()

		document.body.append(this.table)
	}

	renderHead() {
		const row = this.head.insertRow()

		for (const column of this.metadata) {
			const cell = row.insertCell()
			cell.style.display = 'table-cell'
			cell.innerText = column.label
		}
	}

	renderBody() {
		for (const dataRow of this.summaryData) {
			const row = this.body.insertRow()

			for (const column of this.metadata) {
				const cell = row.insertCell()

				cell.classList.add(column.type)
				cell.style.display = 'table-cell'
				cell.innerText = dataRow[column.id]
			}
		}
	}
	prepareDataSummary() {
		for (let itemData = 0; itemData < this.data.length; itemData++) {
			let author = this.data[itemData].author

			for (const searchedAuthor of this.authors) {
				if (searchedAuthor.author.includes(author)) {
					this.authors.pop(author)
				}
			}
			this.authors.push({ author: author })
		}
		for (let itemData = 0; itemData < this.authors.length; itemData++) {
			let author = this.authors[itemData].author
			let titles = 0
			let totalQuantity = 0
			let totalRevenue = 0
			let avgQuantity = 0
			let avgUnitPrice = 0

			dataSummary[itemData] = {
				author: author,
				titles: titles,
				totalQuantity: totalQuantity,
				totalRevenue: totalRevenue,
				avgQuantity: avgQuantity,
				avgUnitPrice: avgUnitPrice,
			}
		}
	}
	calculateDataSummary() {
		for (let itemData = 0; itemData < this.data.length; itemData++) {
			let quantity = this.data[itemData].quantity === null ? 0 : this.data[itemData].quantity
			let unitPrice = this.data[itemData].unit_price === null ? 0 : this.data[itemData].unit_price
			let totalValue = this.data[itemData].total_value === null ? 0 : this.data[itemData].total_value

			let updatedQuantity
			let updatedUnitPrice
			let updatedTotalValue

			if (quantity !== 0 && unitPrice !== 0) {
				updatedTotalValue = quantity * unitPrice
				updatedQuantity = quantity
				updatedUnitPrice = unitPrice
			} else if (quantity !== 0 && totalValue !== 0) {
				updatedUnitPrice = totalValue / quantity
				updatedQuantity = quantity
				updatedTotalValue = quantity * unitPrice
			} else if (unitPrice !== 0 && totalValue !== 0) {
				updatedQuantity = totalValue / unitPrice
				updatedUnitPrice = unitPrice
				updatedTotalValue = quantity * unitPrice
			}

			for (let i = 0; i < this.summaryData.length; i++) {
				if (this.data[itemData].author === this.summaryData[i].author) {
					this.summaryData[i].titles = this.summaryData[i].titles + 1
					this.summaryData[i].totalQuantity = this.summaryData[i].totalQuantity + updatedQuantity
					this.summaryData[i].avgQuantity = (this.summaryData[i].totalQuantity / this.summaryData[i].titles).toFixed(2)

					this.summaryData[i].totalRevenue = this.summaryData[i].totalRevenue + updatedQuantity * updatedUnitPrice
					this.summaryData[i].avgUnitPrice = (
						this.summaryData[i].totalRevenue / this.summaryData[i].totalQuantity
					).toFixed(2)
				}
			}
		}
	}
}

new Grid()
new Summary()
