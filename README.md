# 🌍 Geopolitical Simulation Game (GSG)

An interactive, browser-based strategy simulation game where players observe and influence nations as they navigate complex geopolitical challenges. This version focuses on a rich frontend experience, simulating nation decisions, world events, and policy impacts directly within the browser.

## ✨ Features

*   **Dynamic AI Nations**: Observe 8 major nations (USA, China, Germany, Japan, Russia, India, Brazil, UK) with simulated AI decision-making based on their characteristics and global events.
*   **World Event Engine**: Experience a dynamic stream of economic, political, environmental, and crisis events that impact nations globally.
*   **Interactive Nation Management**: Select any nation to view its detailed statistics and adjust its policies (Defense, Economy, Environment, Diplomacy) via intuitive sliders.
*   **Real-time Statistics**: Monitor global and individual nation statistics, including GDP, Population, Stability, Military, and Environment.
*   **Turn-Based Simulation**: Advance the simulation turn by turn, witnessing the unfolding consequences of AI decisions and world events.
*   **Intuitive Dashboard**: A clean, modern user interface designed for easy monitoring and interaction with the simulation.

## 🛠️ Tech Stack

This project is built as a modern single-page application, leveraging the following technologies:

*   **Frontend**: React with TypeScript
*   **Styling**: Tailwind CSS for rapid and responsive UI development
*   **Build Tool**: Vite for a fast development experience and optimized builds
*   **Simulation Logic**: Pure JavaScript/TypeScript for the game engine and AI agents, running entirely in the browser.

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository (if applicable):**
    ```bash
    git clone https://github.com/your-username/geopolitical-sim.git
    cd geopolitical-sim
    ```
    *(Note: If you received this project directly, you can skip the clone step.)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    This will start the Vite development server, and you can view the application in your browser, usually at `http://localhost:5173`.

## 📂 Project Structure

The core application logic resides in the `src/` directory:

*   `src/App.tsx`: The main application component, orchestrating the game state and layout.
*   `src/components/`: Contains all reusable React components for the UI (e.g., `GameHeader`, `WorldMap`, `NationCard`, `EventPanel`, `SimulationControls`, `StatsPanel`).
*   `src/engine/`: Houses the core game logic, including `GameEngine.ts` (manages simulation flow) and `AIAgent.ts` (handles AI decision-making and event generation).
*   `src/types/`: TypeScript type definitions for game entities like `Nation.ts` and `WorldEvent.ts`.
*   `src/index.css`: Global Tailwind CSS imports and custom styles.

## 💡 Future Enhancements

This project provides a strong foundation for a complex geopolitical simulation. Potential future enhancements could include:

*   **Persistence**: Integrate a lightweight client-side database (e.g., IndexedDB) or a cloud-based solution (like Supabase) for saving game states.
*   **Expanded AI**: Develop more sophisticated AI behaviors, including inter-nation diplomacy, resource trading, and conflict resolution.
*   **Player Interaction**: Allow players to directly control a nation, making strategic decisions that influence the simulation.
*   **Visualizations**: Add more advanced data visualizations and map overlays.
*   **Backend Integration**: Reintroduce a Node.js/Express backend with PostgreSQL for server-side logic, persistent data storage, and more complex AI computations, as originally envisioned.
