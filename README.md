
# Amazon Data Visualizer

A comprehensive web application for visualizing and analyzing Amazon product data, sales, and costs. This project uses a React frontend with a Python Flask backend, and integrates with MongoDB for data storage and Ollama (Llama 3.2) for AI-powered insights.

## Project Structure

The project consists of two main parts:

### Frontend (React)
- Interactive dashboards with charts and visualizations
- Real-time data updates
- Responsive design for all devices
- Dark mode support
- AI-powered insights integration

### Backend (Python Flask)
- API endpoints for data retrieval
- MongoDB connection for data storage
- Ollama integration for AI analysis using Llama 3.2
- Data processing and transformation

## Setup and Installation

### Frontend
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Backend
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Create a virtual environment:
   ```
   python -m venv venv
   ```
3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```
4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```
5. Run the Flask application:
   ```
   python app.py
   ```

## MongoDB Setup

1. Create a MongoDB Atlas account or use an existing one
2. Create a new cluster or use an existing cluster
3. Create a database named `amazon_data`
4. Create collections: `products`, `sales`, and `costs`
5. Update the connection string in `backend/app.py`

## Ollama and Llama 3.2 Setup

1. Install Ollama: [https://ollama.ai/download](https://ollama.ai/download)
2. Pull the Llama 3.2 model:
   ```
   ollama pull llama3.2
   ```

## Features

- Product inventory overview
- Sales analytics with different time ranges
- Cost breakdown and analysis
- Category-based visualizations
- AI-powered insights and recommendations
- Customizable dashboard
- Real-time data synchronization

## Technologies Used

- **Frontend**:
  - React
  - Tailwind CSS
  - Recharts
  - shadcn UI components

- **Backend**:
  - Python
  - Flask
  - MongoDB
  - Ollama (Llama 3.2)

## Code Organization

### Frontend
- `src/components/`: UI components
- `src/pages/`: Page layouts
- `src/hooks/`: Custom React hooks
- `src/lib/`: Utility functions

### Backend
- `app.py`: Main Flask application
- `mock_data.json`: Sample data for development
- `requirements.txt`: Python dependencies

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
