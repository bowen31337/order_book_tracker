
# Order Book Tracker

Order Book Tracker is a React application built with Vite that fetches and displays real-time order book data and analyzes the most volatile periods over the last six months using Binance API.

## Features

- Real-time order book data using WebSocket API
- Displays the largest 10 orders above and below the current price
- Calculates and displays the most volatile periods in a statistical way
- Deployed to GitHub Pages

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/your-repository-name.git
   cd your-repository-name
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

### Running the Application

To run the application locally, use the following command:

```sh
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to see the application in action.


## Project Overview

### Components

- **App.tsx**: Main component that handles state and API interactions.
- **OrderBook.tsx**: Displays the order book with the largest 10 orders above and below the current price.
- **VolatilityTable.tsx**: Displays the most volatile periods based on historical data analysis.
- **SearchInput.tsx**: Search input for selecting trading pairs.

### Services

- **binanceApi.ts**: Handles fetching historical data and calculating volatility.

### Utilities

- **formatQuantity.ts**: Utility function to format quantities in a friendly manner (e.g., 2k, 2m).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
