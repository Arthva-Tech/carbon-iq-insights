
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Cloud, Zap, Globe, Settings } from "lucide-react";
import { useState } from "react";

const initialCloudProviders = [
  { name: "Amazon Web Services", status: "connected", emissions: "34.2 kg", icon: "☁️" },
  { name: "Microsoft Azure", status: "disconnected", emissions: "0 kg", icon: "🔵" },
  { name: "Google Cloud Platform", status: "connected", emissions: "12.8 kg", icon: "🟡" },
];

const initialDevTools = [
  { name: "GitHub", status: "connected", emissions: "8.7 kg", icon: "🐙" },
  { name: "GitLab", status: "disconnected", emissions: "0 kg", icon: "🦊" },
  { name: "Jenkins", status: "connected", emissions: "15.2 kg", icon: "🔧" },
  { name: "Docker Hub", status: "connected", emissions: "6.3 kg", icon: "🐳" },
];

const initialCollaborationTools = [
  { name: "Slack", status: "connected", emissions: "2.1 kg", icon: "💬" },
  { name: "Microsoft Teams", status: "connected", emissions: "4.8 kg", icon: "📞" },
  { name: "Zoom", status: "disconnected", emissions: "0 kg", icon: "📹" },
  { name: "Notion", status: "connected", emissions: "1.2 kg", icon: "📝" },
];

interface Integration {
  name: string;
  status: string;
  emissions: string;
  icon: string;
}

interface IntegrationCardProps {
  integration: Integration;
  onToggle: (name: string, newStatus: string) => void;
  onConfigure: (name: string) => void;
}

const IntegrationCard = ({ integration, onToggle, onConfigure }: IntegrationCardProps) => {
  const isConnected = integration.status === "connected";
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{integration.icon}</span>
            <div>
              <h3 className="font-medium">{integration.name}</h3>
              <p className="text-sm text-muted-foreground">{integration.emissions} CO₂e</p>
            </div>
          </div>
          <Badge variant={isConnected ? "default" : "secondary"}>
            {integration.status}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <Switch 
            checked={isConnected} 
            onCheckedChange={(checked) => onToggle(integration.name, checked ? "connected" : "disconnected")}
          />
          <Button variant="outline" size="sm" onClick={() => onConfigure(integration.name)}>
            {isConnected ? "Configure" : "Connect"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export const IntegrationsPanel = () => {
  const { toast } = useToast();
  const [cloudProviders, setCloudProviders] = useState(initialCloudProviders);
  const [devTools, setDevTools] = useState(initialDevTools);
  const [collaborationTools, setCollaborationTools] = useState(initialCollaborationTools);
  const [apiKey, setApiKey] = useState("ck_live_*********************");
  const [webhookUrl, setWebhookUrl] = useState("");

  const handleToggleIntegration = (category: string, name: string, newStatus: string) => {
    const updateState = (items: Integration[]) => 
      items.map(item => 
        item.name === name 
          ? { ...item, status: newStatus, emissions: newStatus === "connected" ? "5.2 kg" : "0 kg" }
          : item
      );

    switch (category) {
      case "cloud":
        setCloudProviders(updateState);
        break;
      case "devtools":
        setDevTools(updateState);
        break;
      case "collaboration":
        setCollaborationTools(updateState);
        break;
    }

    toast({
      title: newStatus === "connected" ? "Integration Connected" : "Integration Disconnected",
      description: `${name} has been ${newStatus === "connected" ? "connected" : "disconnected"} successfully`,
    });
  };

  const handleConfigureIntegration = (name: string) => {
    toast({
      title: "Configure Integration",
      description: `Opening configuration settings for ${name}`,
    });
  };

  const handleAddIntegration = () => {
    toast({
      title: "Add Integration",
      description: "Opening integration marketplace to browse available services",
    });
  };

  const handleRegenerateApiKey = () => {
    const newKey = "ck_live_" + Math.random().toString(36).substring(2, 23);
    setApiKey(newKey);
    toast({
      title: "API Key Regenerated",
      description: "Your API key has been regenerated successfully",
    });
  };

  const handleSaveWebhook = () => {
    if (!webhookUrl) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid webhook URL",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Webhook Saved",
      description: "Your webhook URL has been saved successfully",
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground">
            Connect your tools and services to track carbon emissions
          </p>
        </div>
        <Button onClick={handleAddIntegration}>
          <Zap className="w-4 h-4 mr-2" />
          Add Integration
        </Button>
      </div>

      <Tabs defaultValue="cloud" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cloud">Cloud Providers</TabsTrigger>
          <TabsTrigger value="devtools">Development Tools</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="api">API Access</TabsTrigger>
        </TabsList>

        <TabsContent value="cloud" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="w-5 h-5" />
                Cloud Infrastructure
              </CardTitle>
              <CardDescription>
                Monitor emissions from your cloud infrastructure and services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cloudProviders.map((provider) => (
                  <IntegrationCard 
                    key={provider.name} 
                    integration={provider} 
                    onToggle={(name, status) => handleToggleIntegration("cloud", name, status)}
                    onConfigure={handleConfigureIntegration}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devtools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Development Tools
              </CardTitle>
              <CardDescription>
                Track CI/CD pipeline emissions and development activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {devTools.map((tool) => (
                  <IntegrationCard 
                    key={tool.name} 
                    integration={tool}
                    onToggle={(name, status) => handleToggleIntegration("devtools", name, status)}
                    onConfigure={handleConfigureIntegration}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaboration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Collaboration Tools
              </CardTitle>
              <CardDescription>
                Monitor emissions from meetings, messaging, and document collaboration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {collaborationTools.map((tool) => (
                  <IntegrationCard 
                    key={tool.name} 
                    integration={tool}
                    onToggle={(name, status) => handleToggleIntegration("collaboration", name, status)}
                    onConfigure={handleConfigureIntegration}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Access & Webhooks</CardTitle>
              <CardDescription>
                Programmatic access to your emissions data and real-time notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="api-key" 
                      value={apiKey}
                      readOnly 
                      className="font-mono"
                    />
                    <Button variant="outline" onClick={handleRegenerateApiKey}>Regenerate</Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="webhook-url" 
                      placeholder="https://your-app.com/webhooks/carboniq"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                    />
                    <Button variant="outline" onClick={handleSaveWebhook}>Save</Button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Available Endpoints</h4>
                <div className="space-y-2 text-sm font-mono">
                  <div>GET /api/emissions</div>
                  <div>GET /api/reports</div>
                  <div>POST /api/integrations</div>
                  <div>GET /api/team</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
