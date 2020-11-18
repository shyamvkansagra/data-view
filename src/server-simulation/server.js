const localApis = {
	setLocal: (key, value) => window.localStorage.setItem(key, JSON.stringify(value)),
	getLocal: (key) => JSON.parse(window.localStorage.getItem(key))
};

const DataApis = {
	loadAll: (scb) => {
		const albumData = localApis.getLocal("albumData");
		if (!albumData) {
			fetch('https://jsonplaceholder.typicode.com/photos')
				.then(response => response.json())
				.then(data => {
					localApis.setLocal("albumData", data);
					scb();
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		} else {
			scb();
		}
	},
	getData: (limit, offset) => {
		const albumData = localApis.getLocal("albumData") || [];
		return albumData.splice(offset, limit);
	}
};

export default DataApis;