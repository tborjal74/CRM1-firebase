const admin = require('firebase-admin');
const db = admin.database();
const salesRef = db.ref('sales');

// Add a new sale
exports.addSale = (saleData) => {
	const newSaleRef = salesRef.push();
	return newSaleRef.set(saleData)
		.then(() => ({ id: newSaleRef.key, ...saleData }))
		.catch((error) => { throw error; });
};

// Get all sales
exports.getAllSales = () => {
	return salesRef.once('value')
		.then(snapshot => {
			const data = snapshot.val() || {};
			return Object.keys(data).map(id => ({ id, ...data[id] }));
		})
		.catch((error) => { throw error; });
};

// Edit a sale
exports.editSale = (id, saleData) => {
	return salesRef.child(id).update(saleData)
		.then(() => ({ id, ...saleData }))
		.catch((error) => { throw error; });
};

// Delete a sale
exports.deleteSale = (id) => {
	return salesRef.child(id).remove()
		.then(() => ({ message: 'Sale deleted', id }))
		.catch((error) => { throw error; });
};
