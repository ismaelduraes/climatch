# Climatch

Simple React Native app built to fetch real-time weather data based on your location. Also provides functionality to search weather by city search.
Integrates the OpenWeather API (real-time weather data) with the geodb API (city name and data search tool).

# Build it yourself

- Make sure you have the [expo-cli](https://docs.expo.dev/get-started/installation/) and [eas-cli](https://github.com/expo/eas-cli) installed in order to execute these commands.
- Clone this repo:
`git clone https://github.com/ismaelduraes/climatch`
- cd into it's directory:
`cd climatch`
- install dependencies:
`npm install`
- Optional: test app on your phone or in an emulator through Expo Go:
`expo start` (Follow output instructions)
- If all is well, you can build the app through EAS (Android) with `eas build --profile preview`, or just `eas build` if you want an android bundle.
> If you're building through EAS, you will need an Expo account, and your build will be run on their own cloud servers. This has its own [benefits](https://expo.dev/eas), but you can use [turtle-cli](https://docs.expo.dev/classic/turtle-cli/) to build locally.
# Important
- The EAS Build process requires a git repository to be initialized in your directory. Since we're using `git clone`, that in itself won't be a problem. However, this means that, while building an app, EAS will only upload the files that aren't ignored by git. By default, our `app.json` file is included in .gitignore, so you don't accidentaly leak your keys when pushing to github. [There are other ways to manage keys in Expo](https://docs.expo.dev/build-reference/variables/) which you may be interested in if you plan on pushing this code yourself. For now, you can just comment out `app.json` from your .gitignore file before running `eas build`.

- Please note that this app was only made for practice and study purposes only. You can do with this code whatever you will; but I don't plan on keeping it updated long term, nor do I guarantee that I will support it in the future.

- Some older commits include API keys that were included for testing while this repository wasn't made public. They have since been replaced and won't work anymore. You will need your own Google Maps and OpenWeather API keys, which can be put in the app.json.TEMPLATE file (don't forget to rename the file to app.json).
See [Expo MapView](https://docs.expo.dev/versions/latest/sdk/map-view/) and [OpenWeather](https://openweathermap.org/api).

- Although the app probably won't be getting any new features, it is likely that I will update it's code to be more reliable and less repetitive.

- Feel free to make it your own, re-release it or do whatever; I truly do not mind. Whatever changes you make to it, though, don't market them as if they were made by me. I am not responsible for anything that is made beyond the code in this repository.
