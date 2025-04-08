
from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
import pymongo
from pymongo import MongoClient
import subprocess
import time
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, 
                   format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB connection (replace with your actual connection string)
# MONGO_URI = "mongodb+srv://your-username:your-password@your-cluster.mongodb.net/amazon_data"
# client = MongoClient(MONGO_URI)
# db = client.amazon_data

# Initialize mock data (for demonstration purposes)
with open(os.path.join(os.path.dirname(__file__), 'mock_data.json'), 'r') as f:
    mock_data = json.load(f)

@app.route('/api/status', methods=['GET'])
def get_status():
    """Check connection status to MongoDB"""
    try:
        # In a real implementation, check MongoDB connection
        # client.admin.command('ping')
        return jsonify({"status": "connected", "message": "Successfully connected to MongoDB"})
    except Exception as e:
        logger.error(f"MongoDB connection error: {str(e)}")
        return jsonify({"status": "disconnected", "message": str(e)}), 500

@app.route('/api/refresh', methods=['GET'])
def refresh_data():
    """Refresh data from MongoDB"""
    try:
        # In a real implementation, fetch latest data from MongoDB
        # products = list(db.products.find({}, {'_id': 0}))
        # sales = list(db.sales.find({}, {'_id': 0}))
        # costs = list(db.costs.find({}, {'_id': 0}))
        # return jsonify({"products": products, "sales": sales, "costs": costs})
        
        # For demonstration, just return mock data
        time.sleep(1)  # Simulate database query time
        return jsonify({"status": "success", "data": mock_data})
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
        
        # In a real implementation, you would call Ollama API
        # ollama_response = subprocess.run(
        #     ["ollama", "run", "llama3.2", question],
        #     capture_output=True,
        #     text=True,
        #     check=True
        # )
        # answer = ollama_response.stdout.strip()
        
        # For demonstration, simulate a response with static analysis
        time.sleep(2)  # Simulate processing time
        
        # Create a contextual response based on the question
        if "product" in question.lower() and "highest" in question.lower() and "return" in question.lower():
            answer = "Based on the analysis of your return data, electronic accessories have the highest return rate at 12.3%. The primary reasons cited by customers are 'not as described' and 'quality issues'. Consider improving product descriptions and quality control for this category."
        elif "best selling" in question.lower():
            answer = "In the last 30 days, your best selling products are: 1. Wireless Earbuds (328 units), 2. Kitchen Knife Set (245 units), and 3. Yoga Mat (198 units). The Wireless Earbuds have seen a 15% increase in sales compared to the previous month."
        elif "pricing" in question.lower():
            answer = "Your pricing strategy could be optimized by implementing dynamic pricing for your top 20% products. The data shows a potential 8-12% revenue increase by adjusting prices based on demand patterns, competitive pricing, and inventory levels."
        else:
            answer = "Based on your Amazon sales data, I recommend focusing on improving inventory turnover for slow-moving products. The data indicates that 15% of your inventory has been in stock for over 90 days, which increases storage costs and affects your overall profitability."
        
        logger.info(f"Generated answer: {answer[:100]}...")
        return jsonify({"status": "success", "answer": answer})
    
    except Exception as e:
        logger.error(f"Error processing question: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/data/products', methods=['GET'])
def get_products():
    """Get product data"""
    try:
        # In a real implementation, fetch from MongoDB
        # products = list(db.products.find({}, {'_id': 0}))
        # return jsonify(products)
        
        # For demonstration, return mock data
        return jsonify(mock_data["products"])
    except Exception as e:
        logger.error(f"Error fetching products: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/data/sales', methods=['GET'])
def get_sales():
    """Get sales data"""
    try:
        # In a real implementation, fetch from MongoDB
        # sales = list(db.sales.find({}, {'_id': 0}))
        # return jsonify(sales)
        
        # For demonstration, return mock data
        return jsonify(mock_data["sales"])
    except Exception as e:
        logger.error(f"Error fetching sales: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/data/costs', methods=['GET'])
def get_costs():
    """Get cost data"""
    try:
        # In a real implementation, fetch from MongoDB
        # costs = list(db.costs.find({}, {'_id': 0}))
        # return jsonify(costs)
        
        # For demonstration, return mock data
        return jsonify(mock_data["costs"])
    except Exception as e:
        logger.error(f"Error fetching costs: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
