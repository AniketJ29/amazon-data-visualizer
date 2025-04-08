
import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data - in a real implementation, this would come from your API
const mockCostData = [
  { name: 'Product Cost', value: 40 },
  { name: 'Shipping', value: 15 },
  { name: 'Marketing', value: 20 },
  { name: 'Returns', value: 10 },
  { name: 'Platform Fees', value: 15 },
];

const mockCostByCategory = [
  { name: 'Electronics', value: 45 },
  { name: 'Home & Kitchen', value: 25 },
  { name: 'Clothing', value: 15 },
  { name: 'Books', value: 8 },
  { name: 'Other', value: 7 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const CostAnalysisChart = () => {
  const [viewType, setViewType] = useState('breakdown');

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="breakdown" onValueChange={setViewType}>
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="category">By Category</TabsTrigger>
        </TabsList>
        
        <TabsContent value="breakdown" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockCostData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockCostData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Cost Analysis</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                The chart shows the breakdown of costs associated with your Amazon products. 
                Product costs make up the largest portion at 40%, followed by marketing expenses at 20%.
              </p>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Optimization Opportunities:</h4>
                <ul className="list-disc list-inside text-sm text-slate-500 dark:text-slate-400">
                  <li>Consider negotiating better rates with suppliers to reduce product costs</li>
                  <li>Optimize marketing campaigns to improve ROI</li>
                  <li>Review shipping strategies to reduce associated costs</li>
                  <li>Implement strategies to minimize returns</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="category" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockCostByCategory}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockCostByCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${value}%`} />
                  <Legend layout="vertical" verticalAlign="middle" align="right" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Category Analysis</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Electronics products account for the highest proportion of your costs at 45%, 
                followed by Home & Kitchen products at 25%. This aligns with the higher inventory 
                investment typically required for these categories.
              </p>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Category Insights:</h4>
                <ul className="list-disc list-inside text-sm text-slate-500 dark:text-slate-400">
                  <li>Electronics: High cost, but typically higher margins</li>
                  <li>Home & Kitchen: Moderate costs with stable demand</li>
                  <li>Clothing: Lower investment with seasonal variations</li>
                  <li>Books: Low cost inventory with consistent sales</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CostAnalysisChart;
