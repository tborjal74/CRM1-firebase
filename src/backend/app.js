const express = require('express');
const admin = require('firebase-admin');
const path = require('path');

// Path to your service account key JSON file
const serviceAccount = require(path.join(__dirname, '../../crm1-e85dc-firebase-adminsdk-fbsvc-1a9ad4e13e.json'));

// Initialize Firebase Admin SDK
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());

// Sample route
app.get('/api/test', (req, res) => {
	res.json({ message: 'Backend is working and connected to Firebase!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const customerRoutes = require('./routes/customerRoutes');
const admin = require('firebase-admin');
const serviceAccount = require('')

app.use(express.json());
app.use('/api/customers', customerRoutes);