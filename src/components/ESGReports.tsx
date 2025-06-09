
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, FileText, Send } from "lucide-react";

const recentReports = [
  {
    name: "Q2 2024 ESG Report",
    date: "2024-06-30",
    status: "completed",
    type: "Quarterly",
    size: "2.4 MB"
  },
  {
    name: "May 2024 Monthly Report",
    date: "2024-05-31",
    status: "completed",
    type: "Monthly",
    size: "1.8 MB"
  },
  {
    name: "April 2024 Monthly Report",
    date: "2024-04-30",
    status: "completed",
    type: "Monthly",
    size: "2.1 MB"
  },
];

export const ESGReports = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ESG Reports</h1>
          <p className="text-muted-foreground">
            Generate compliance reports for ESG submission and stakeholder communication
          </p>
        </div>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Report Generator */}
        <Card>
          <CardHeader>
            <CardTitle>Create New Report</CardTitle>
            <CardDescription>
              Generate comprehensive ESG compliance reports
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="report-name">Report Name</Label>
              <Input 
                id="report-name" 
                placeholder="Q3 2024 ESG Report"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="report-type">Report Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly Report</SelectItem>
                  <SelectItem value="quarterly">Quarterly Report</SelectItem>
                  <SelectItem value="annual">Annual Report</SelectItem>
                  <SelectItem value="custom">Custom Period</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start Date</Label>
                <Input 
                  id="start-date" 
                  type="date"
                  defaultValue="2024-07-01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End Date</Label>
                <Input 
                  id="end-date" 
                  type="date"
                  defaultValue="2024-09-30"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scope">Emission Scopes</Label>
              <div className="flex gap-2">
                <Badge variant="default">Scope 2</Badge>
                <Badge variant="default">Scope 3</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea 
                id="notes"
                placeholder="Include any specific context or methodology notes..."
                rows={3}
              />
            </div>

            <Button className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        {/* Report Templates */}
        <Card>
          <CardHeader>
            <CardTitle>Report Templates</CardTitle>
            <CardDescription>
              Pre-configured templates for common ESG frameworks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">GHG Protocol Standard</h4>
                    <p className="text-sm text-muted-foreground">Scope 1, 2, and 3 emissions reporting</p>
                  </div>
                  <Button variant="outline" size="sm">Use</Button>
                </div>
              </div>

              <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">CDP Climate Report</h4>
                    <p className="text-sm text-muted-foreground">Carbon Disclosure Project format</p>
                  </div>
                  <Button variant="outline" size="sm">Use</Button>
                </div>
              </div>

              <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">EU Taxonomy</h4>
                    <p className="text-sm text-muted-foreground">European sustainability reporting</p>
                  </div>
                  <Button variant="outline" size="sm">Use</Button>
                </div>
              </div>

              <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Custom Template</h4>
                    <p className="text-sm text-muted-foreground">Build your own reporting format</p>
                  </div>
                  <Button variant="outline" size="sm">Create</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>
            Download and share previously generated ESG reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <FileText className="w-8 h-8 text-primary" />
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {report.date}
                      <Badge variant="secondary">{report.type}</Badge>
                      <span>{report.size}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" size="sm">
                    <Send className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export & Automation</CardTitle>
          <CardDescription>
            Configure automatic report generation and distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Automated Reports</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Monthly ESG Summary</span>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Quarterly Board Report</span>
                  <Badge variant="secondary">Disabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Annual Sustainability Report</span>
                  <Badge variant="default">Active</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Distribution List</h4>
              <div className="space-y-2">
                <Input placeholder="esg@company.com" />
                <Input placeholder="board@company.com" />
                <Input placeholder="sustainability@company.com" />
              </div>
              <Button variant="outline" className="w-full">
                Add Recipient
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
