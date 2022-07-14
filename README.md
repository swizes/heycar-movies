# HeyCarMovies - Coding Challenge

## Project Setup

This project is developed on macOS with IntelliJ Webstorm IDE

React Native version 0.68.2

### Tested devices during the development

#### iOS
iPhone 11 (Simulator)

#### Android
Pixel 4 API 28 (Emulator)

## Run

Make sure that the environment setup is correct according to [RN Official Docs]( https://reactnative.dev/docs/environment-setup). The project is generated with React Native CLI

Before running, application dependencies should be installed and linked.

`yarn install && npx react-native link && npx pod-install`

### Run on Android

Start metro-bundler
```
yarn run start
```

Then
```
yarn run android
```

### Run on iOS

Start metro-bundler
```
yarn run start
```

Then
```
yarn run ios // npx react-native run-ios
```

If above command fails, open the Heycarmovies.xcworkspace via Xcode in ios folder and run

### Project Structure

Absolute imports are used via tsconfig.json and babel plugin module-resolver.

Alias of src is @
For example @/redux/store instead of ../../redux/store - This increases the readability and easier to refactor.

#### src folder

```
- assets // fonts, static images
- components // reusable components
- config // .env variables and some static config variables
- context // React.Context related files
- hooks // reusable hooks
- navigation // navigation related codes
- redux // store and slices
- screens // screen files and screen related components
- services // API related service classes
- theme // a.k.a styles contains styling constants 
- types // type definitions
- utils
```

### Navigation

React Navigation v6 is used, which is community standard nowadays.

#### Flow
BottomTab -> TabStacks
Each bottom tab has one native stack
Each bottom tab native stack is accessing the SharedScreens.tsx, which allows the user to access the Detail Screen in each tab.

Every navigation related code is in src/navigation

### State management

The project concept actually supports using React States in the components but to demonstrate some advanced techniques I have used Redux Toolkit.

On top of well known slices, I have implemented the **entityAdapter** to use read and memoize utility of entityAdapter, which increases readability and reduces boilerplate code.

### Styling

I don't use any theme/ui-kit libraries because in my opinion in long term they are causing more harm than benefit. Using vanilla react native components with custom customizations work most of the time.

All styling/theme related files are located in src/theme folder
I am using ThemeColorContext in src/context to access theme based dynamic colors in any component.

metrics.ts allows me to make sizes responsive. (especially the font sizes)

### Networking

I have used axios to manage api calls.

Every axios call is logged via [react-native-logs](https://github.com/onubo/react-native-logs).

src/services contains API Service classes for each model. In this case we have only MoviesService.

MoviesService has two functions in it

searchMovies(searchParam)
getMovieById(id)

Network related error messages are handled/generated in src/utils/errorUtils.ts

### Local storage

[react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) is used to store favorite movies.

### Performance

App is most of the time at 60 FPS and tested if there are any unnecessary re-renders.

React.memo and useCallback prevents unnecessary re-render on state and prop changes.
Redux entityAdapter selectors works like React.memo which memoizes the result.
React-Navigation nativeStackNavigator uses native navigation modules, which increases performance.

console.logs are removed in release mode by babel plugin transform-remove-console
