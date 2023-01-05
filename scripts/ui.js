// render chat templates to the DOM
// clear list of chat when room changed
class chatUI {
	constructor(list) {
		this.list = list;
	}
	clear() {
		this.list.innerHTML = '';
	}
	render(data) {
		const when = dateFns.distanceInWordsToNow(data.created_at.toDate(), { addSuffix:true })
		const html = `
			<li class="list-group-item p-4 border border-1 border-white mb-3 rounded-4">
				<div class="d-flex justify-content-between align-items-center mb-4">
					<div class="d-flex flex-column">
						<span class="fs-1">${data.username}</span>
						<span class="fs-6">${when}</span>
					</div>
					<span class="bg-light px-4 py-2 text-dark rounded-3">${data.room}</span>
				</div>
				<p>
					${data.message}
				</p>
			</li>
		`

		this.list.insertAdjacentHTML('beforeend', html)
	}
}