
import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';

interface CostData {
  name: string;
  value: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

const CostAnalysisChart = () => {
  const [viewType, setViewType] = useState('breakdown');
  const [costBreakdown, setCostBreakdown] = useState<CostData[]>([]);
  const [costByCategory, setCostByCategory] = useState<CostData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch costs data
        const costsResponse = await fetch('http://localhost:5000/api/data/costs');
        const costsData = await costsResponse.json();
        
        // Fetch products data for category analysis
        const productsResponse = await fetch('http://localhost:5000/api/data/products');
        const productsData = await productsResponse.json();
        
        // Process costs breakdown data
        if (costsData.length > 0) {
          // Get the most recent month's data
          const latestCost = costsData.sort((a: any, b: any) => 
            new Date(b.month).getTime() - new Date(a.month).getTime()
          )[0];
          
          const totalCost = Object.entries(latestCost)
            .filter(([key]) => key !== 'month')
            .reduce((sum, [, value]) => sum + (value as number), 0);
          
          const breakdownData = Object.entries(latestCost)
            .filter(([key]) => key !== 'month')
            .map(([key, value]) => ({
              name: key.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase()),
              value: Math.round((value as number) / totalCost * 100)
            }));
          
          setCostBreakdown(breakdownData);
        }
        
        // Process category cost data
        if (productsData.length > 0) {
          // Group products by category and calculate costs
          const categoryCosts = productsData.reduce((acc: Record<string, number>, product: any) => {
            const category = product.category;
            if (!acc[category]) {
              acc[category] = 0;
            }
            
            acc[category] += product.cost;
            return acc;
          }, {});
          
          // Calculate total cost
          const totalCategoryCost = Object.values(categoryCosts).reduce((sum, cost) => sum + (cost as number), 0);
          
          // Format data for chart
          const categoryData = Object.entries(categoryCosts).map(([category, cost]) => ({
            name: category,
            value: Math.round((cost as number) / totalCategoryCost * 100)
          }));
          
          setCostByCategory(categoryData);
        }
      } catch (error) {
        console.error('Failed to fetch cost data:', error);
        toast({
          variant: "destructive",
          title: "Data fetch failed",
          description: "Could not retrieve cost data from the server.",
        });
        // Set empty data to avoid breaking the charts
        setCostBreakdown([]);
        setCostByCategory([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
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

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="w-[400px] h-10 bg-slate-200 dark:bg-slate-700 rounded animate-pulse mb-4"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="h-[300px] bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          <div className="space-y-4">
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/3"></div>
            <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2"></div>
            <div className="h-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="breakdown" onValueChange={setViewType}>
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="breakdown">Cost Breakdown</TabsTrigger>
          <TabsTrigger value="category">By Category</TabsTrigger>
        </TabsList>
        
        <TabsContent value="breakdown" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {costBreakdown.length > 0 ? (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {costBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg">
                <p className="text-slate-500 dark:text-slate-400">No cost breakdown data available</p>
              </div>
            )}
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Cost Analysis</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                The chart shows the breakdown of costs associated with your Amazon products. 
                {costBreakdown.length > 0 && (
                  <>
                    {' '}{costBreakdown[0].name} makes up the largest portion at {costBreakdown[0].value}%, 
                    followed by {costBreakdown[1]?.name || 'other expenses'} at {costBreakdown[1]?.value || 0}%.
                  </>
                )}
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
            {costByCategory.length > 0 ? (
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {costByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend layout="vertical" verticalAlign="middle" align="right" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg">
                <p className="text-slate-500 dark:text-slate-400">No category cost data available</p>
              </div>
            )}
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Category Analysis</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {costByCategory.length > 0 ? (
                  <>
                    {costByCategory[0].name} products account for the highest proportion of your costs at {costByCategory[0].value}%, 
                    followed by {costByCategory[1]?.name || 'other categories'} at {costByCategory[1]?.value || 0}%. This aligns with the higher inventory 
                    investment typically required for these categories.
                  </>
                ) : (
                  'No category data is available to display cost distribution across product categories.'
                )}
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
