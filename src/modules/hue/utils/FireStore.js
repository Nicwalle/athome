import firestore from '@react-native-firebase/firestore';

const getFirestoreBridges = async (userID) => firestore()
    .collection('Users')
    .doc(userID)
    .collection('Services')
    .doc('philips-hue')
    .collection('Bridges')
    .get()
    .then(querySnapshot => querySnapshot.docs)
    .catch(error => {
        console.log(error);
        return []
    });

const saveBridgeInFirestore = async (apiAddress, username, userID) => firestore()
    .collection('Users').doc(userID)
    .collection('Services').doc('philips-hue')
    .collection('Bridges')
    .add({
        apiAddress: apiAddress,
        username: username
    })
    .catch(err=>console.log(err));

const deleteBridgeFromFirestore = async (userID, bridgeID) => firestore()
    .collection('Users').doc(userID)
    .collection('Services').doc('philips-hue')
    .collection('Bridges').doc(bridgeID)
    .delete()
    .then(_=> console.log("Deleted invalid bridge", userID, bridgeID))
    .catch(err=> console.log(err));


module.exports = {
    getFirestoreBridges,
    saveBridgeInFirestore,
    deleteBridgeFromFirestore
};
