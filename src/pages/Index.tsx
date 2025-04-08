
import React, { useState, useEffect } from 'react';
import DashboardHeader from '@/components/DashboardHeader';
import ProductsOverview from '@/components/ProductsOverview';
import SalesChart from '@/components/SalesChart';
import CostAnalysisChart from '@/components/CostAnalysisChart';
import AIInsights from '@/components/AIInsights';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check connection to backend
    const checkConnection = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/status');
        const data = await response.json();
        setIsConnected(data.status === 'connected');
        
        if (data.status === 'connected') {
          toast({
            title: "Connection established",
            description: "Successfully connected to MongoDB Cloud",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Connection failed",
            description: data.message || "Could not connect to MongoDB Cloud",
          });
        }
      } catch (error) {
        console.error('Failed to connect to backend:', error);
        setIsConnected(false);
        toast({
          variant: "destructive",
          title: "Connection failed",
          description: "Could not connect to the backend server. Please check if Flask server is running.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkConnection();
  }, [toast]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <DashboardHeader />
      
      <main className="container mx-auto py-6 px-4">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : !isConnected ? (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Connection Error</AlertTitle>
            <AlertDescription>
              Unable to connect to MongoDB Cloud. Please check your backend server and database connection.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <ProductsOverview />
            
            <Tabs defaultValue="sales" className="mt-8">
              <TabsList className="grid w-full md:w-auto grid-cols-3">
                <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
                <TabsTrigger value="costs">Cost Analysis</TabsTrigger>
                <TabsTrigger value="ai">AI Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sales" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Sales Performance</CardTitle>
                    <CardDescription>
                      Analyze your product sales trends over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SalesChart />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="costs" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Cost Breakdown</CardTitle>
                    <CardDescription>
                      View the distribution of costs across your products
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CostAnalysisChart />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="ai" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>AI-Powered Insights</CardTitle>
                    <CardDescription>
                      Intelligent analysis using Llama 3.2 model via Ollama
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AIInsights />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
      
      <footer className="bg-slate-100 dark:bg-slate-800 py-4 mt-8">
        <div className="container mx-auto text-center text-slate-500 dark:text-slate-400 text-sm">
          Amazon Data Visualizer © 2025 - Powered by MongoDB, Ollama, and Llama 3.2
        </div>
      </footer>
    </div>
  );
};

export default Index;
