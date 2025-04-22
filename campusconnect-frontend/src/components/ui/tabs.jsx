// src/components/ui/tabs.jsx

import React from 'react';

export const Tabs = ({ children, value, onValueChange, className }) => (
  <div className={className}>{children}</div>
);

export const TabsList = ({ children, className }) => (
  <div className={className}>{children}</div>
);

export const TabsTrigger = ({ children, value }) => (
  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600">
    {children}
  </button>
);

export const TabsContent = ({ children, value }) => (
  <div className="mt-4">{children}</div>
);
