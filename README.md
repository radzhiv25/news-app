# Aconews

A simple and intuitive news application built with ReactJS, TailwindCSS, and Axios. This application allows users to search for news, explore trending topics, and view the latest articles with pagination support. The app is designed to be responsive and provides users with up-to-date information on a wide range of topics.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Demo

Check out the live demo: [Aconews](https://aconews-radzhiv.web.app/)

## Features

- **Search News**: Search for news articles by typing keywords into the search box.
- **Explore Trending Topics**: Quickly access the latest news on trending topics such as technology, environment, and more.
- **View Latest News**: Get the most recent news articles by default.
- **Pagination**: Browse through pages of news articles, with pagination for easy navigation.
- **Responsive Design**: Seamlessly use the application on any device, thanks to TailwindCSS.
- **Skeleton Loaders**: Display loading placeholders while the news content is being fetched.

## Installation

To get a local copy up and running, follow these simple steps:

### Prerequisites

- Node.js (version 12 or higher)
- npm (version 6 or higher) or yarn

### Installation Steps

1. **Clone the repository:**

    ```sh
    git clone https://github.com/your-username/news-app.git
    cd news-app
    ```

2. **Install dependencies:**

    ```sh
    npm install
    # or if you prefer yarn
    yarn install
    ```

## Usage

1. **Start the development server:**

    ```sh
    npm start
    # or if you prefer yarn
    yarn start
    ```

2. **Open your browser and navigate to `http://localhost:5173`**

3. **Use the application to manage your transactions.**

## Technologies Used

- **ReactJS**: A JavaScript library for building user interfaces, especially single-page applications, using a component-based architecture.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Axios**: A promise-based HTTP client for the browser and Node.js used to fetch data from the news API.
- **Firebase Hosting**: For easy deployment of the application.
- **React Icons**: A library of popular icons for React applications.

## Project Structure

```plaintext
├── src
│   ├── components
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── NewsContent.jsx
│   │   ├── Search.jsx
│   │   └── ...
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── .env
│   └── ...
├── tailwind.config.js
├── package.json
└── ...
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.
