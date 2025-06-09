
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Dashboard } from "@/components/Dashboard";
import { IntegrationsPanel } from "@/components/IntegrationsPanel";
import { ESGReports } from "@/components/ESGReports";
import { TeamManagement } from "@/components/TeamManagement";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");

  // Listen to hash changes for navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && ["dashboard", "emissions", "integrations", "reports", "team", "offsets", "settings"].includes(hash)) {
        setActiveView(hash);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Check initial hash

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
      case "emissions":
        return <Dashboard />;
      case "integrations":
        return <IntegrationsPanel />;
      case "reports":
        return <ESGReports />;
      case "team":
        return <TeamManagement />;
      case "offsets":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Carbon Offset Marketplace</h2>
            <p className="text-muted-foreground">Coming soon - Browse and purchase verified carbon offsets</p>
          </div>
        );
      case "settings":
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p className="text-muted-foreground">Organization settings and preferences</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

export default Index;
