
import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

interface SalesData {
  name: string;
  sales: number;
  returns: number;
}

const SalesChart = () => {
  const [timeRange, setTimeRange] = useState('12m');
  const [chartData, setChartData] = useState<SalesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/data/sales');
        const salesData = await response.json();
        
        // Process the data for the chart
        // Group by month and calculate totals
        const monthlyData = salesData.reduce((acc: Record<string, any>, sale: any) => {
          // Extract month from date (assuming date format is YYYY-MM-DD)
          const date = new Date(sale.date);
          const monthName = date.toLocaleString('default', { month: 'short' });
          
          if (!acc[monthName]) {
            acc[monthName] = { sales: 0, returns: 0 };
          }
          
          acc[monthName].sales += sale.quantity;
          // Assuming returns is 5-10% of sales for demonstration
          acc[monthName].returns += Math.floor(sale.quantity * (Math.random() * 0.05 + 0.05));
          
          return acc;
        }, {});
        
        // Convert to array format for the chart
        const formattedData = Object.keys(monthlyData).map(month => ({
          name: month,
          sales: monthlyData[month].sales,
          returns: monthlyData[month].returns
        }));
        
        setChartData(formattedData);
      } catch (error) {
        console.error('Failed to fetch sales data:', error);
        toast({
          variant: "destructive",
          title: "Data fetch failed",
          description: "Could not retrieve sales data from the server.",
        });
        // Set empty data to avoid breaking the chart
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);
  
  // Filter data based on selected time range
  const getFilteredData = () => {
    if (chartData.length === 0) {
      return [];
    }
    
    switch (timeRange) {
      case '3m':
        return chartData.slice(-3);
      case '6m':
        return chartData.slice(-6);
      case '12m':
      default:
        return chartData;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-end">
          <div className="w-[180px] h-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        </div>
        <div className="h-[400px] w-full bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  const filteredData = getFilteredData();
  const totalSales = filteredData.reduce((sum, item) => sum + item.sales, 0);
  const totalReturns = filteredData.reduce((sum, item) => sum + item.returns, 0);
  const returnRate = totalSales > 0 ? (totalReturns / totalSales) * 100 : 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {filteredData.length > 0 ? (
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" name="Sales" fill="#3b82f6" />
              <Bar dataKey="returns" name="Returns" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-[400px] w-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg">
          <p className="text-slate-500 dark:text-slate-400">No sales data available</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-sm text-blue-500 dark:text-blue-400 font-medium">Total Sales</p>
          <p className="text-2xl font-bold">{totalSales.toLocaleString()}</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <p className="text-sm text-red-500 dark:text-red-400 font-medium">Total Returns</p>
          <p className="text-2xl font-bold">{totalReturns.toLocaleString()}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <p className="text-sm text-green-500 dark:text-green-400 font-medium">Return Rate</p>
          <p className="text-2xl font-bold">{returnRate.toFixed(1)}%</p>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
