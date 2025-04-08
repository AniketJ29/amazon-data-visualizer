
# Amazon Data Visualizer - Backend

This is the Python Flask backend for the Amazon Data Visualizer application. It provides APIs to connect to MongoDB Atlas, fetch and process data, and integrate with Ollama for AI-powered analytics using the Llama 3.2 model.

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

4. Configure MongoDB Atlas connection:
   - Create a `.env` file in the backend directory
   - Add your MongoDB connection string:
     ```
     MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/ecom
     ```
   - Replace `<username>`, `<password>`, and `<cluster>` with your MongoDB Atlas credentials

5. Run the application:
   ```
   python app.py
   ```

The server will start at http://localhost:5000

## MongoDB Database Structure

The application connects to the "ecom" database in MongoDB Atlas with the following collections:

1. `product` collection with documents containing product details including:
   - name
   - price
   - category
   - description
   - inventory levels
   - etc.

2. `customer` collection with customer information

3. `order` collection with order details

4. `sales` collection with sales data

5. `admins` collection for users who can manage products

## API Endpoints

- `GET /api/status` - Check MongoDB connection status
- `GET /api/refresh` - Refresh data from MongoDB
- `POST /api/ask` - Send a question to Llama 3.2 via Ollama
- `GET /api/data/products` - Get product data
- `GET /api/data/orders` - Get order data
- `GET /api/data/customers` - Get customer data
- `GET /api/data/sales` - Get sales data
- `GET /api/data/categories` - Get unique product categories

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
