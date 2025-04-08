
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Stats {
  totalProducts: number;
  totalSales: number;
  revenue: number;
  growthRate: number;
}

const ProductsOverview = () => {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalSales: 0,
    revenue: 0,
    growthRate: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch products data
        const productsResponse = await fetch('http://localhost:5000/api/data/products');
        const productsData = await productsResponse.json();
        
        // Fetch sales data
        const salesResponse = await fetch('http://localhost:5000/api/data/sales');
        const salesData = await salesResponse.json();
        
        // Calculate stats
        const totalProducts = productsData.length;
        const totalSales = salesData.reduce((sum: number, sale: any) => sum + sale.quantity, 0);
        const revenue = salesData.reduce((sum: number, sale: any) => sum + sale.revenue, 0);
        
        // For growth rate, we'll use a random number for now
        // In a real application, you would calculate this based on historical data
        const growthRate = parseFloat((Math.random() * 15 + 5).toFixed(1));
        
        setStats({
          totalProducts,
          totalSales,
          revenue,
          growthRate
        });
      } catch (error) {
        console.error('Failed to fetch data:', error);
        toast({
          variant: "destructive",
          title: "Data fetch failed",
          description: "Could not retrieve product and sales data from the server.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <Card key={index} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProducts}</div>
          <p className="text-xs text-slate-500 mt-1">
            +{Math.floor(Math.random() * 10)}% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          <ShoppingCart className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalSales.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-1">
            +{Math.floor(Math.random() * 15)}% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${stats.revenue.toLocaleString()}</div>
          <p className="text-xs text-slate-500 mt-1">
            +{Math.floor(Math.random() * 20)}% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.growthRate}%</div>
          <p className="text-xs text-slate-500 mt-1">
            +{(Math.random() * 5).toFixed(1)}% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsOverview;
