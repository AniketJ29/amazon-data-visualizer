
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, RefreshCw, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AIInsights = () => {
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const { toast } = useToast();

  const askQuestion = async () => {
    if (!question.trim()) {
      toast({
        variant: "destructive",
        title: "Empty question",
        description: "Please enter a question to analyze.",
      });
      return;
    }

    setIsLoading(true);
    setResponse('');

    // Simulate AI response - in a real implementation, you would call your Flask backend
    // which would then use Ollama to get a response from Llama 3.2
    try {
      // const response = await fetch('http://localhost:5000/api/ask', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ question })
      // });
      // const data = await response.json();
      // setResponse(data.answer);

      // Simulate API call with timeout
      setTimeout(() => {
        const simulatedResponses = [
          "Based on the sales data analysis, your electronics category shows a 15% growth trend over the last quarter. Consider increasing inventory allocation for this category to meet growing demand.",
          "Looking at your product portfolio, I've identified that items priced between $20-$50 have the highest conversion rate. You might want to focus on expanding your offering in this price range.",
          "Your shipping costs appear to be higher than industry average by approximately 12%. Consider negotiating with alternative shipping partners or optimizing your packaging to reduce these costs.",
          "Revenue analysis indicates that weekends generate 35% more sales than weekdays. Consider timing your promotions and inventory restocking to maximize weekend sales potential.",
          "Product return rate analysis shows that detailed product descriptions and additional images reduce return rates by up to 23%. Focus on improving listings for high-return products."
        ];
        
        setResponse(simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)]);
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "AI analysis failed",
        description: "Could not get a response from the AI model. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-start">
        <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
        <p className="text-sm text-slate-700 dark:text-slate-300 ml-2">
          Ask questions about your Amazon product data, and the system will use the Llama 3.2 model via Ollama to generate insights.
        </p>
      </div>
      
      <div className="flex flex-col space-y-2">
        <Textarea
          placeholder="Ask a question about your Amazon product data (e.g., 'Which product category has the highest profit margin?')"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="min-h-[100px] resize-none"
        />
        <Button onClick={askQuestion} disabled={isLoading} className="self-end">
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <MessageSquare className="h-4 w-4 mr-2" />
              Get AI Insights
            </>
          )}
        </Button>
      </div>
      
      {response && (
        <Card className="mt-4 bg-slate-50 dark:bg-slate-800/50 border border-blue-100 dark:border-blue-900/50">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">AI</span>
              </div>
              <div className="ml-4">
                <p className="text-slate-700 dark:text-slate-300">{response}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-6">
        <h3 className="text-sm font-medium mb-2">Example questions:</h3>
        <ul className="space-y-1">
          <li>
            <Button 
              variant="link" 
              className="p-0 h-auto text-blue-500 dark:text-blue-400 text-sm"
              onClick={() => setQuestion("Which products have the highest return rates and why?")}
            >
              Which products have the highest return rates and why?
            </Button>
          </li>
          <li>
            <Button 
              variant="link" 
              className="p-0 h-auto text-blue-500 dark:text-blue-400 text-sm"
              onClick={() => setQuestion("What are the best selling products in the last 30 days?")}
            >
              What are the best selling products in the last 30 days?
            </Button>
          </li>
          <li>
            <Button 
              variant="link" 
              className="p-0 h-auto text-blue-500 dark:text-blue-400 text-sm"
              onClick={() => setQuestion("How can I optimize my pricing strategy based on current data?")}
            >
              How can I optimize my pricing strategy based on current data?
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AIInsights;
