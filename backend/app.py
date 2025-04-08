
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pymongo
from pymongo import MongoClient
import subprocess
import time
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO, 
                   format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB connection
MONGO_URI = os.getenv("MONGO_URI")
try:
    client = MongoClient(MONGO_URI)
    db = client.ecom  # Use actual database name 'ecom'
    logger.info("Connected to MongoDB Cloud")
except Exception as e:
    logger.error(f"MongoDB connection error: {str(e)}")
    client = None
    db = None

@app.route('/api/status', methods=['GET'])
def get_status():
    """Check connection status to MongoDB"""
    try:
        if client:
            # Test MongoDB connection
            client.admin.command('ping')
            return jsonify({"status": "connected", "message": "Successfully connected to MongoDB"})
        else:
            return jsonify({"status": "disconnected", "message": "MongoDB client not initialized"}), 500
    except Exception as e:
        logger.error(f"MongoDB connection error: {str(e)}")
        return jsonify({"status": "disconnected", "message": str(e)}), 500

@app.route('/api/refresh', methods=['GET'])
def refresh_data():
    """Refresh data from MongoDB"""
    try:
        if not db:
            return jsonify({"status": "error", "message": "Database not connected"}), 500
            
        # Fetch latest data from MongoDB using the actual collections
        products = list(db.product.find({}, {'_id': 0}))
        orders = list(db.order.find({}, {'_id': 0}))
        customers = list(db.customer.find({}, {'_id': 0}))
        sales = list(db.sales.find({}, {'_id': 0}))
        
        return jsonify({
            "status": "success", 
            "data": {
                "products": products, 
                "orders": orders,
                "customers": customers,
                "sales": sales
            }
        })
    except Exception as e:
        logger.error(f"Data refresh error: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/ask', methods=['POST'])
def ask_llama():
    """Send a question to Llama 3.2 via Ollama and get a response"""
    try:
        question = request.json.get('question', '')
        if not question:
            return jsonify({"status": "error", "message": "Question is required"}), 400
        
        logger.info(f"Received question: {question}")
        
        # Call Ollama API
        ollama_response = subprocess.run(
            ["ollama", "run", "llama3.2", question],
            capture_output=True,
            text=True,
            check=True
        )
        answer = ollama_response.stdout.strip()
        
        logger.info(f"Generated answer: {answer[:100]}...")
        return jsonify({"status": "success", "answer": answer})
    
    except Exception as e:
        logger.error(f"Error processing question: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/data/products', methods=['GET'])
def get_products():
    """Get product data"""
    try:
        if not db:
            return jsonify({"status": "error", "message": "Database not connected"}), 500
            
        products = list(db.product.find({}, {'_id': 0}))
        return jsonify(products)
    except Exception as e:
        logger.error(f"Error fetching products: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/data/orders', methods=['GET'])
def get_orders():
    """Get order data"""
    try:
        if not db:
            return jsonify({"status": "error", "message": "Database not connected"}), 500
            
        orders = list(db.order.find({}, {'_id': 0}))
        return jsonify(orders)
    except Exception as e:
        logger.error(f"Error fetching orders: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/data/customers', methods=['GET'])
def get_customers():
    """Get customer data"""
    try:
        if not db:
            return jsonify({"status": "error", "message": "Database not connected"}), 500
            
        customers = list(db.customer.find({}, {'_id': 0}))
        return jsonify(customers)
    except Exception as e:
        logger.error(f"Error fetching customers: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/data/sales', methods=['GET'])
def get_sales():
    """Get sales data"""
    try:
        if not db:
            return jsonify({"status": "error", "message": "Database not connected"}), 500
            
        sales = list(db.sales.find({}, {'_id': 0}))
        return jsonify(sales)
    except Exception as e:
        logger.error(f"Error fetching sales: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/data/categories', methods=['GET'])
def get_categories():
    """Get unique product categories"""
    try:
        if not db:
            return jsonify({"status": "error", "message": "Database not connected"}), 500
            
        # Get distinct categories from products collection
        categories = db.product.distinct("category")
        return jsonify(categories)
    except Exception as e:
        logger.error(f"Error fetching categories: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
