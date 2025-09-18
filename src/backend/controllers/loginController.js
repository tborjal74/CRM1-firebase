const admin = require('firebase-admin');

exports.login = async (req, res) => {
  const idToken = req.body.idToken;
  if (!idToken) {
    return res.status(400).json({ error: 'ID token required' });
  }
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // You can fetch more user info if needed
    res.json({
      uid: decodedToken.uid,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture
    });
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired ID token' });
  }
};
