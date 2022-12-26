## Installation

We recommend switching to Node.js version 10 to make sure common crypto dependencies work.

Then, in your project, run:

```bash
npm install
```

To start this project, run:

```bash
npm start
```

## Configuration

Copy _.env_ file.

```bash
cp -R .env.example .env
```

Fill in _.env_ file.

```bash
PORT =
USERNAME_DB = 
PASSWORD_DB = 
NAME_DB = 
RINKEBY_NET =
ETHER_MAINNET =
BSC_MAINNET =
BSC_TESTNET =
AVALANCHE_MAINNET =
AVALANCHE_TESTNET =
MATIC_MAINNET =
MATIC_TESTNET =
ALCHEMY_APIKEY =
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the local development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the services for production to the `build` folder.<br>

The build is minified and the filenames include the hashes.<br>
Your service is ready to be deployed!

See the section about [deployment](#deployment) for more information.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

_[MIT](https://spdx.org/licenses/MIT.html)_
