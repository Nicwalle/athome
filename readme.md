# ATHOME app

To run the app on your device, you need to follow the following tutorial to setup your environment (react native CLI not expo):

[https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup) 

Then run ``npx react-native start`` to start the metro server and finally ``npx react-native run-android`` (at the root of the cloned repository) to run the app on your device.

The app is currently tested on Android only.

## Troubleshooting
If you encounter a permission error when running ``npx react-native run-android``, try to move to the android folder and run the following command ``gradlew clean``.

If gradlew cannot be executed, do not forget to add the execution rights ``chmod +x gradlew``
