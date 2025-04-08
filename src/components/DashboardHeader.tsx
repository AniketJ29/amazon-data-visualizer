
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoonIcon, SunIcon, SettingsIcon, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const DashboardHeader = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const refreshData = async () => {
    setIsRefreshing(true);
    // Simulate data refresh
    try {
      // In a real implementation, fetch from your Flask backend
      // await fetch('http://localhost:5000/api/refresh');
      setTimeout(() => {
        setIsRefreshing(false);
        toast({
          title: "Data refreshed",
          description: "The dashboard has been updated with the latest data",
        });
      }, 2000);
    } catch (error) {
      console.error('Failed to refresh data:', error);
      setIsRefreshing(false);
      toast({
        variant: "destructive",
        title: "Refresh failed",
        description: "Could not refresh the data. Please try again.",
      });
    }
  };

  return (
    <header className="bg-white dark:bg-slate-800 shadow-sm">
      <div className="container mx-auto py-4 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Amazon Data Visualizer</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={refreshData}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={toggleTheme}
            >
              {darkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </Button>
            
            <Button variant="outline" size="icon">
              <SettingsIcon className="h-4 w-4" />
            </Button>
            
            <Button variant="default">Connect Backend</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
