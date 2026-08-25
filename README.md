# SafeRoute

SafeRoute is a local-first, frontend-only community safety mapping application. It allows users to report localized hazards, view community reviews on those hazards, and quickly trigger an SOS call in case of an emergency.

### Technologies Used

- **React 19 & Vite:** We used it as the core framework and build tool for a blazing fast development experience and optimized production build.
- **Tailwind CSS v4:** It is used for rapid, responsive UI styling without writing custom CSS files. We utilize modern CSS variables and a custom dark mode aesthetic.
- **Leaflet & React-Leaflet:** We had to choose over Google Maps to provide a completely free, open-source mapping solution without requiring API keys or credit card billing. The map uses standard OpenStreetMap tiles inverted via CSS to create a sleek dark theme.
- **Lucide React:** It provided clean, scalable SVG icons used throughout the UI (markers, SOS button, close buttons).
- **Browser APIs:**
  - `localStorage`: It is used as the pseudo-database to persist hazard pings and reviews across browser reloads.
  - `Geolocation API`: It is used to fetch the user's real-time latitude and longitude.
  - `tel:` URI: It is used by the SOS button to hand off emergency calls directly to the device's native dialer.

### Important: Dependency Versions
Since `package.json` is not included in this repository, please ensure you install the following exact versions:
- `react`: ^19.2.8
- `react-dom`: ^19.2.8
- `vite`: ^8.2.2
- `@vitejs/plugin-react`: ^6.1.0
- `tailwindcss`: ^4.3.3
- `@tailwindcss/vite`: ^4.3.3
- `leaflet`: ^1.9.4
- `react-leaflet`: ^5.0.0
- `lucide-react`: ^1.34.0

## Data Models

The application relies on two primary data models stored in `localStorage`:

1. **Pings (`saferoute_pings`)**
   - Stores coordinates (`latitude`, `longitude`)
   - `category` (e.g., Accident Prone, Poor Lighting)
   - `severity` (Low, Medium, High, Critical)
   - `title` & `description`
2. **Reviews (`saferoute_reviews`)**
   - Links to a specific ping (`pingId`)
   - Contains community observation text (`text`)

## Setup & Running Locally

1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory (copy from `.env.example`):
   ```env
   VITE_SOS_NUMBER=---, so any number can be added
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Future Scope (What Needs to be Added)

Since this is currently a local-only prototype, the following features are required to make it a fully production-ready application:

1. **Backend Integration:** Replace `localStorage` with a real database (like Firebase Firestore, Supabase, or MongoDB) so that hazard pings are shared globally among all users in real-time.
2. **User Authentication:** Add user accounts so people can track their own reports and prevent spam/abuse.
3. **Map Clustering:** As the number of pings grows, Leaflet Marker Clustering will be needed to prevent the map from becoming cluttered.
4. **Image Uploads:** Allow users to attach photos of the hazard when submitting a ping.
5. **Safe Routing Engine:** Integrate with a routing API (like Mapbox or OSRM) to generate walking/driving paths that actively calculate and avoid areas with high concentrations of critical hazard pings.
