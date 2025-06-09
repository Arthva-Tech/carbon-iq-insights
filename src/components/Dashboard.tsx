import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingDown, TrendingUp, Leaf, Cloud, Zap, Globe, FileText } from "lucide-react";

const emissionsData = [
  { month: "Jan", emissions: 125.4, target: 100 },
  { month: "Feb", emissions: 118.2, target: 95 },
  { month: "Mar", emissions: 142.7, target: 90 },
  { month: "Apr", emissions: 98.5, target: 85 },
  { month: "May", emissions: 87.3, target: 80 },
  { month: "Jun", emissions: 76.8, target: 75 },
];

const sourceData = [
  { name: "Cloud Infrastructure", value: 45.2, color: "#22c55e" },
  { name: "CI/CD Pipelines", value: 28.7, color: "#16a34a" },
  { name: "Video Meetings", value: 15.1, color: "#15803d" },
  { name: "Data Storage", value: 8.3, color: "#166534" },
  { name: "API Calls", value: 2.7, color: "#14532d" },
];

const COLORS = ["#22c55e", "#16a34a", "#15803d", "#166534", "#14532d"];

export const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total CO₂e</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76.8 kg</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingDown className="w-4 h-4 mr-1" />
              12% vs last month
            </div>
            <Progress value={65} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Target</CardTitle>
            <Leaf className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75 kg</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingDown className="w-4 h-4 mr-1" />
              On track
            </div>
            <Progress value={98} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Efficiency Score</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +5% improvement
            </div>
            <Progress value={94} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Carbon Offset</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45.2 kg</div>
            <div className="flex items-center text-sm">
              <Badge variant="secondary" className="text-xs">
                59% of total
              </Badge>
            </div>
            <Progress value={59} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sources">Emission Sources</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Emissions vs Target</CardTitle>
                <CardDescription>
                  Track progress towards your carbon reduction goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={emissionsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="emissions" fill="#22c55e" name="Actual Emissions" />
                    <Bar dataKey="target" fill="#bbf7d0" name="Target" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Emission Sources Breakdown</CardTitle>
                <CardDescription>
                  Current month distribution by source
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}kg`}
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sources">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Source Analysis</CardTitle>
              <CardDescription>
                Breakdown of emissions by source with optimization recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sourceData.map((source, index) => (
                  <div key={source.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: source.color }}
                      />
                      <div>
                        <p className="font-medium">{source.name}</p>
                        <p className="text-sm text-muted-foreground">{source.value} kg CO₂e</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Optimize
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends">
          <Card>
            <CardHeader>
              <CardTitle>Emission Trends</CardTitle>
              <CardDescription>
                Historical emission data and forecasting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={emissionsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="emissions" 
                    stroke="#22c55e" 
                    strokeWidth={3}
                    name="Actual Emissions"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#16a34a" 
                    strokeDasharray="5 5"
                    name="Target"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks and recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex flex-col items-start gap-2">
              <FileText className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Generate ESG Report</p>
                <p className="text-sm opacity-80">Create monthly sustainability report</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
              <Cloud className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Add Integration</p>
                <p className="text-sm opacity-80">Connect cloud services</p>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2">
              <Globe className="w-5 h-5" />
              <div className="text-left">
                <p className="font-medium">Purchase Offsets</p>
                <p className="text-sm opacity-80">Browse carbon offset marketplace</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
