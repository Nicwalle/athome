import auth from '@react-native-firebase/auth';

const authenticateUser = async () => auth()
        .signInAnonymously()
        .then((user) => user.user)
        .catch(error => {
            if (error.code === 'auth/operation-not-allowed') {
                console.log('Firebase Error.');
            }
            console.error(error);
        });

const getUser = () => auth().currentUser;

const getOrAuthUser = async () => auth().currentUser ? auth().currentUser : await authenticateUser();

module.exports = {
    authenticateUser,
    getUser,
    getOrAuthUser
};
