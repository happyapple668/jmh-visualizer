# JMH Visualizer

Visualize [JMH](http://openjdk.java.net/projects/code-tools/jmh/) Benchmarks! Online version at http://jmh.morethan.io!

## Features

- Vizualize the benchmarks of a single JSON result grouped by benchmark class
  - Vertical bar-chart with score and score error 
  - Link to the original JSON
  - Show individual runs as tooltip

## Major Changes

- **Okt 2016** - Initial Release

## Tips & Tricks

While this app will visualize any valid JMH JSON you throw at it, you can write your benchmarks in a way that make the visualization much more enjoyable...

- Put those benchmarks in a single class which you most likely wanne compare to each other
- On the other hand, don't put to much stuff in a single class/chart (since readability will suffer) - deconstruct
- Sensibly design your package structure, your class name and you methods names, those are reflected in the auto-generated charts
- Keep method names short but meaningful


## Contribute

Use the [issue tracker](https://github.com/jzillmann/jmh-visualizer/issues) and/or open [pull requests](https://github.com/jzillmann/jmh-visualizer/pulls)!

#### Useful Commands

- ```npm install``` Download all necessary npm packages
- ```npm run lint``` Lint the javascript files
- ```npm run watch``` Continuously build the project
- ```open build/index.html``` Open the build project in your default browser


## Credits

http://www.favicon.cc/ - Created the favicon with

Babel, webpack, react, recharts,... and many more for an enjoyable webstack!