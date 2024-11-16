# Weather Application

A modern, responsive weather application built with React and TypeScript that provides real-time weather information using the OpenWeather API.

## Features

- 🌡️ Real-time weather data display
- 📍 Location-based weather information
- 🔍 Search functionality for any city worldwide
- 🌍 Interactive 3D weather visualization
- 📱 Responsive design for all devices
- 🌓 Dark/Light theme support
- 🎨 Modern UI with Radix UI components

## Technologies Used

- React 18.3
- TypeScript
- Vite
- Three.js
- React Three Fiber
- Radix UI Components
- TanStack Query (React Query)
- OpenWeather API
- Tailwind CSS
- Lucide React Icons

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone [your-repository-url]
cd weather
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your OpenWeather API key and Mapbox access token:

```env
VITE_OPENWEATHER_API_KEY=your_api_key_here
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
```

## Environment Variables

The application requires the following environment variables:

- `VITE_OPENWEATHER_API_KEY`: Your OpenWeather API key for weather data
- `VITE_MAPBOX_ACCESS_TOKEN`: Your Mapbox access token for 3D visualization

You can obtain these API keys from:

- OpenWeather API: [https://openweathermap.org/api](https://openweathermap.org/api)
- Mapbox: [https://www.mapbox.com/](https://www.mapbox.com/)

## Running the Application

To start the development server:

```bash
npm run dev
```

To build for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
weather/
├── src/
│   ├── components/     # Reusable UI components
│   ├── lib/           # Utility functions and configurations
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   └── app.tsx        # Main application component
├── public/            # Static assets
└── ...config files
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Future Enhancements

- [ ] Weather forecasts for multiple days
- [ ] Weather alerts and notifications
- [ ] Multiple location saving
- [ ] Weather maps integration
- [ ] More detailed weather metrics
- [ ] Weather history data

## License

This project is licensed under the MIT License.
