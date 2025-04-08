
# Amazon Data Visualizer - Backend

This is the Python Flask backend for the Amazon Data Visualizer application. It provides APIs to connect to MongoDB, fetch and process data, and integrate with Ollama for AI-powered analytics using the Llama 3.2 model.

## Setup

1. Create a virtual environment:
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Configure MongoDB connection:
   - Open `app.py` and update the `MONGO_URI` variable with your MongoDB connection string
   - Uncomment the MongoDB connection code

5. Run the application:
   ```
   python app.py
   ```

The server will start at http://localhost:5000

## API Endpoints

- `GET /api/status` - Check MongoDB connection status
- `GET /api/refresh` - Refresh data from MongoDB
- `POST /api/ask` - Send a question to Llama 3.2 via Ollama
- `GET /api/data/products` - Get product data
- `GET /api/data/sales` - Get sales data
- `GET /api/data/costs` - Get cost data

## Ollama Integration

Make sure Ollama is installed and the Llama 3.2 model is downloaded:

```
ollama pull llama3.2
```

The application uses subprocess to call Ollama with user questions and return the responses.

## MongoDB Integration

To connect to your MongoDB Atlas cloud:

1. Get your connection string from MongoDB Atlas
2. Replace the `MONGO_URI` in `app.py` with your connection string
3. Create collections for products, sales, and costs

## Production Deployment

For production, consider:

1. Using a WSGI server like Gunicorn
2. Setting up proper environment variables for secrets
3. Implementing authentication and rate limiting
4. Adding more robust error handling and logging
