
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';

// Mock data - in a real implementation, this would come from your API
const mockStats = {
  totalProducts: 267,
  totalSales: 18942,
  revenue: 543789.54,
  growthRate: 12.7
};

const ProductsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          <Package className="h-4 w-4 text-slate-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockStats.totalProducts}</div>
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
          <div className="text-2xl font-bold">{mockStats.totalSales.toLocaleString()}</div>
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
          <div className="text-2xl font-bold">${mockStats.revenue.toLocaleString()}</div>
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
          <div className="text-2xl font-bold">{mockStats.growthRate}%</div>
          <p className="text-xs text-slate-500 mt-1">
            +{(Math.random() * 5).toFixed(1)}% from last month
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsOverview;
