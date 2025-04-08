
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data - in a real implementation, this would come from your API
const mockData = [
  { name: 'Jan', sales: 4000, returns: 240 },
  { name: 'Feb', sales: 3000, returns: 198 },
  { name: 'Mar', sales: 5000, returns: 350 },
  { name: 'Apr', sales: 2780, returns: 190 },
  { name: 'May', sales: 1890, returns: 134 },
  { name: 'Jun', sales: 2390, returns: 167 },
  { name: 'Jul', sales: 3490, returns: 212 },
  { name: 'Aug', sales: 4200, returns: 294 },
  { name: 'Sep', sales: 3870, returns: 229 },
  { name: 'Oct', sales: 5140, returns: 315 },
  { name: 'Nov', sales: 6280, returns: 352 },
  { name: 'Dec', sales: 7890, returns: 410 },
];

const SalesChart = () => {
  const [timeRange, setTimeRange] = useState('12m');
  
  // Filter data based on selected time range
  // In a real implementation, you would fetch new data or filter existing data
  const getFilteredData = () => {
    switch (timeRange) {
      case '3m':
        return mockData.slice(-3);
      case '6m':
        return mockData.slice(-6);
      case '12m':
      default:
        return mockData;
    }
  };

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
      
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={getFilteredData()}
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-sm text-blue-500 dark:text-blue-400 font-medium">Total Sales</p>
          <p className="text-2xl font-bold">{getFilteredData().reduce((sum, item) => sum + item.sales, 0).toLocaleString()}</p>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <p className="text-sm text-red-500 dark:text-red-400 font-medium">Total Returns</p>
          <p className="text-2xl font-bold">{getFilteredData().reduce((sum, item) => sum + item.returns, 0).toLocaleString()}</p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <p className="text-sm text-green-500 dark:text-green-400 font-medium">Return Rate</p>
          <p className="text-2xl font-bold">
            {(getFilteredData().reduce((sum, item) => sum + item.returns, 0) / 
              getFilteredData().reduce((sum, item) => sum + item.sales, 0) * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesChart;
