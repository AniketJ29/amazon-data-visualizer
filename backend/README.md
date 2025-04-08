
# Amazon Data Visualizer - Backend

This is the Python Flask backend for the Amazon Data Visualizer application. It provides APIs to connect to MongoDB Cloud, fetch and process data, and integrate with Ollama for AI-powered analytics using the Llama 3.2 model.

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

4. Configure MongoDB Cloud connection:
   - Create a `.env` file in the backend directory
   - Add your MongoDB connection string:
     ```
     MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/amazon_data
     ```
   - Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB Atlas credentials

5. Run the application:
   ```
   python app.py
   ```

The server will start at http://localhost:5000

## MongoDB Database Structure

The application expects the following collections in your MongoDB database:

1. `products` collection with documents in this format:
   ```json
   {
     "id": "P001",
     "name": "Product Name",
     "category": "Category",
     "price": 49.99,
     "cost": 22.50,
     "inventory": 156,
     "rating": 4.3
   }
   ```

2. `sales` collection with documents in this format:
   ```json
   {
     "date": "2025-03-01",
     "product_id": "P001",
     "quantity": 32,
     "revenue": 1599.68
   }
   ```

3. `costs` collection with documents in this format:
   ```json
   {
     "month": "2025-03",
     "product_cost": 25680.42,
     "shipping": 9865.20,
     "marketing": 12500.00,
     "returns": 6324.15,
     "platform_fees": 9876.35
   }
   ```

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

## Production Deployment

For production, consider:

1. Using a WSGI server like Gunicorn
2. Setting up proper environment variables for secrets
3. Implementing authentication and rate limiting
4. Adding more robust error handling and logging
