import firestore from '@react-native-firebase/firestore';

const getFirestoreBridge = async (userID) => firestore()
    .collection('Services')
    .doc('philips-hue')
    .collection('Bridges')
    .doc(userID)
    .get();

const saveBridgeInFirestore = async (apiAddress, username, userID) => firestore()
    .collection('Services').doc('philips-hue').collection('Bridges')
    .doc(userID)
    .set({
        apiAddress: apiAddress,
        username: username
    });

const deleteBridgeFromFirestore = async (userID) => firestore()
    .collection('Services').doc('philips-hue').collection('Bridges')
    .doc(userID)
    .delete();

module.exports = {
    getFirestoreBridge,
    saveBridgeInFirestore,
    deleteBridgeFromFirestore
};
