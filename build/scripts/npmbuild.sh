yarn clear
gulp build
yarn cook
cross-env NODE_ENV=production webpack --config build/webpack.config.js --progress --hide-modules