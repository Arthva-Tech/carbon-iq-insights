import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Download, FileText, Send, Eye, BarChart3, Leaf, TrendingDown } from "lucide-react";
import { useState } from "react";
import jsPDF from 'jspdf';

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
  const { toast } = useToast();
  const [reportForm, setReportForm] = useState({
    name: "",
    type: "",
    startDate: "2024-07-01",
    endDate: "2024-09-30",
    notes: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const generatePDF = (reportName: string, reportDate: string, reportType: string) => {
    const doc = new jsPDF();
    
    // Define CarbonIQ theme colors (RGB values)
    const primaryGreen = [34, 197, 94]; // #22c55e
    const darkGreen = [22, 101, 52]; // #166534
    const lightGreen = [187, 247, 208]; // #bbf7d0
    const darkBlue = [15, 23, 42]; // #0f172a
    const gray = [100, 116, 139]; // #64748b

    // Header with gradient background effect
    doc.setFillColor(...lightGreen);
    doc.rect(0, 0, 210, 60, 'F');
    
    doc.setFillColor(...primaryGreen);
    doc.rect(0, 0, 210, 40, 'F');
    
    // Logo area (simulated with text and icon)
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('🌱 CarbonIQ', 20, 25);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Sustainable Business Intelligence Platform', 20, 35);
    
    // Report title section
    doc.setTextColor(...darkBlue);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(reportName, 20, 70);
    
    // Report metadata with icons
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...gray);
    doc.text(`📊 Report Type: ${reportType}`, 20, 85);
    doc.text(`📅 Generated: ${reportDate}`, 20, 95);
    doc.text(`⏰ Period: Q3 2024`, 20, 105);
    doc.text(`🎯 Scope: 1, 2, 3 Emissions`, 20, 115);
    
    // Divider line
    doc.setDrawColor(...primaryGreen);
    doc.setLineWidth(2);
    doc.line(20, 125, 190, 125);
    
    // Executive Summary Section
    doc.setTextColor(...darkGreen);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('📋 Executive Summary', 20, 140);
    
    doc.setTextColor(...darkBlue);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const summaryText = `This comprehensive ESG report demonstrates our commitment to environmental sustainability and corporate responsibility. Our carbon emissions decreased by 15% compared to the previous quarter, showcasing the effectiveness of our green initiatives and renewable energy adoption.`;
    const splitSummary = doc.splitTextToSize(summaryText, 170);
    doc.text(splitSummary, 20, 150);
    
    // Key Metrics Dashboard (visual representation)
    doc.setFillColor(...lightGreen);
    doc.roundedRect(20, 170, 170, 40, 5, 5, 'F');
    
    doc.setTextColor(...darkGreen);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('📈 Key Performance Indicators', 25, 185);
    
    // Metric boxes
    const metrics = [
      { label: 'Total Emissions', value: '6,705.7 tCO₂e', icon: '🏭' },
      { label: 'Reduction', value: '-15%', icon: '📉' },
      { label: 'Renewable Energy', value: '68%', icon: '🔋' },
      { label: 'ESG Score', value: '8.4/10', icon: '⭐' }
    ];
    
    metrics.forEach((metric, index) => {
      const x = 25 + (index * 40);
      doc.setFontSize(8);
      doc.setTextColor(...darkBlue);
      doc.text(metric.icon, x, 195);
      doc.text(metric.value, x, 202);
      doc.setFontSize(6);
      doc.setTextColor(...gray);
      doc.text(metric.label, x, 207);
    });
    
    // Emissions Breakdown Section
    doc.setTextColor(...darkGreen);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('🏭 Carbon Emissions Breakdown', 20, 230);
    
    // Visual chart representation (simple bars)
    const chartData = [
      { scope: 'Scope 1', value: 245.6, color: primaryGreen },
      { scope: 'Scope 2', value: 1892.3, color: [74, 222, 128] },
      { scope: 'Scope 3', value: 4567.8, color: [134, 239, 172] }
    ];
    
    let yPos = 240;
    chartData.forEach((item, index) => {
      // Bar chart visualization
      const barWidth = (item.value / 5000) * 120; // Scale to fit
      doc.setFillColor(...item.color);
      doc.rect(80, yPos, barWidth, 8, 'F');
      
      // Labels
      doc.setTextColor(...darkBlue);
      doc.setFontSize(10);
      doc.text(item.scope, 20, yPos + 6);
      doc.text(`${item.value} tCO₂e`, 85 + barWidth, yPos + 6);
      
      yPos += 15;
    });
    
    // Add new page for detailed metrics
    doc.addPage();
    
    // Second page header
    doc.setFillColor(...primaryGreen);
    doc.rect(0, 0, 210, 30, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('🌱 CarbonIQ - Detailed Analysis', 20, 20);
    
    // Environmental Impact Section
    doc.setTextColor(...darkGreen);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('🌍 Environmental Impact Metrics', 20, 50);
    
    const environmentalMetrics = [
      '🔌 Energy Consumption: 12,345 MWh (-8% vs Q2)',
      '💧 Water Usage: 45,678 gallons (-12% vs Q2)',
      '♻️ Waste Diverted from Landfill: 89% (+5% vs Q2)',
      '🚗 Business Travel Emissions: 156.2 tCO₂e (-25% vs Q2)',
      '🏢 Office Energy: 892.4 tCO₂e (-18% vs Q2)'
    ];
    
    doc.setTextColor(...darkBlue);
    doc.setFontSize(10);
    environmentalMetrics.forEach((metric, index) => {
      doc.text(metric, 25, 65 + (index * 12));
    });
    
    // Initiatives Section
    doc.setTextColor(...darkGreen);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('🎯 Sustainability Initiatives', 20, 140);
    
    const initiatives = [
      '✅ Deployed 500kW solar panel system',
      '✅ Implemented smart building management',
      '✅ Launched employee green commute program',
      '📋 Planning carbon offset marketplace integration',
      '📋 Evaluating additional renewable energy sources'
    ];
    
    doc.setTextColor(...darkBlue);
    doc.setFontSize(10);
    initiatives.forEach((initiative, index) => {
      doc.text(initiative, 25, 155 + (index * 12));
    });
    
    // Footer with certification
    doc.setFillColor(...lightGreen);
    doc.rect(0, 270, 210, 27, 'F');
    
    doc.setTextColor(...darkGreen);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.text('🏆 Certified by CarbonIQ Platform | GHG Protocol Compliant | ISO 14064 Verified', 20, 285);
    doc.setFont('helvetica', 'normal');
    doc.text('This report contains confidential and proprietary information. Distribution restricted.', 20, 292);
    
    return doc;
  };

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reportForm.name || !reportForm.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in the report name and type",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      // Generate and download PDF
      const pdf = generatePDF(reportForm.name, new Date().toLocaleDateString(), reportForm.type);
      pdf.save(`${reportForm.name.replace(/\s+/g, '-').toLowerCase()}.pdf`);
      
      toast({
        title: "Report Generated Successfully",
        description: `${reportForm.name} has been generated and downloaded`,
      });
      setIsGenerating(false);
      
      // Reset form
      setReportForm({
        name: "",
        type: "",
        startDate: "2024-07-01",
        endDate: "2024-09-30",
        notes: ""
      });
    }, 2000);
  };

  const handleDownloadReport = (reportName: string) => {
    // Generate PDF for existing reports
    const reportDate = new Date().toLocaleDateString();
    const reportType = reportName.includes('Monthly') ? 'Monthly' : 'Quarterly';
    
    const pdf = generatePDF(reportName, reportDate, reportType);
    pdf.save(`${reportName.replace(/\s+/g, '-').toLowerCase()}.pdf`);
    
    toast({
      title: "Download Complete",
      description: `${reportName} has been downloaded`,
    });
  };

  const handleShareReport = (reportName: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/reports/share/${reportName.toLowerCase().replace(/\s+/g, '-')}`);
    toast({
      title: "Share Link Copied",
      description: "The shareable link has been copied to your clipboard",
    });
  };

  const useTemplate = (templateName: string) => {
    setReportForm(prev => ({
      ...prev,
      name: `${templateName} - ${new Date().toLocaleDateString()}`,
      type: "quarterly"
    }));
    
    toast({
      title: "Template Applied",
      description: `${templateName} template has been applied to the form`,
    });
  };

  const renderTemplatePreview = () => (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Leaf className="w-6 h-6" />
          <h3 className="text-xl font-bold">CarbonIQ</h3>
        </div>
        <p className="text-sm opacity-90">Sustainable Business Intelligence Platform</p>
      </div>
      
      <div className="border-l-4 border-green-500 pl-4">
        <h4 className="font-semibold text-lg mb-2">Q3 2024 ESG Report</h4>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>📊 Report Type: Quarterly</p>
          <p>📅 Generated: {new Date().toLocaleDateString()}</p>
          <p>🎯 Scope: 1, 2, 3 Emissions</p>
        </div>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg">
        <h5 className="font-medium mb-2 flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Key Performance Indicators
        </h5>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center">
            <p className="font-semibold">6,705.7 tCO₂e</p>
            <p className="text-muted-foreground">Total Emissions</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-green-600">-15%</p>
            <p className="text-muted-foreground">Reduction</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">68%</p>
            <p className="text-muted-foreground">Renewable Energy</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">8.4/10</p>
            <p className="text-muted-foreground">ESG Score</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h5 className="font-medium flex items-center gap-2">
          <TrendingDown className="w-4 h-4" />
          Emissions Breakdown
        </h5>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-20 h-2 bg-green-500 rounded"></div>
            <span className="text-sm">Scope 1: 245.6 tCO₂e</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-40 h-2 bg-green-400 rounded"></div>
            <span className="text-sm">Scope 2: 1,892.3 tCO₂e</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-60 h-2 bg-green-300 rounded"></div>
            <span className="text-sm">Scope 3: 4,567.8 tCO₂e</span>
          </div>
        </div>
      </div>
      
      <div className="bg-green-100 p-3 rounded text-sm">
        <p className="font-medium">🏆 Certified by CarbonIQ Platform</p>
        <p className="text-muted-foreground">GHG Protocol Compliant | ISO 14064 Verified</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ESG Reports</h1>
          <p className="text-muted-foreground">
            Generate compliance reports for ESG submission and stakeholder communication
          </p>
        </div>
        <Button onClick={() => document.getElementById('generate-form')?.scrollIntoView({ behavior: 'smooth' })}>
          <FileText className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      <Tabs defaultValue="generate" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">Generate Report</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="recent">Recent Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Report Generator */}
            <Card id="generate-form">
              <CardHeader>
                <CardTitle>Create New Report</CardTitle>
                <CardDescription>
                  Generate comprehensive ESG compliance reports with custom CarbonIQ branding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleGenerateReport} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="report-name">Report Name</Label>
                    <Input 
                      id="report-name" 
                      placeholder="Q3 2024 ESG Report"
                      value={reportForm.name}
                      onChange={(e) => setReportForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="report-type">Report Type</Label>
                    <Select value={reportForm.type} onValueChange={(value) => setReportForm(prev => ({ ...prev, type: value }))}>
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
                        value={reportForm.startDate}
                        onChange={(e) => setReportForm(prev => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">End Date</Label>
                      <Input 
                        id="end-date" 
                        type="date"
                        value={reportForm.endDate}
                        onChange={(e) => setReportForm(prev => ({ ...prev, endDate: e.target.value }))}
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
                      value={reportForm.notes}
                      onChange={(e) => setReportForm(prev => ({ ...prev, notes: e.target.value }))}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1" disabled={isGenerating}>
                      <FileText className="w-4 h-4 mr-2" />
                      {isGenerating ? "Generating..." : "Generate Report"}
                    </Button>
                    
                    <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                      <DialogTrigger asChild>
                        <Button type="button" variant="outline">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Report Template Preview</DialogTitle>
                          <DialogDescription>
                            Preview how your CarbonIQ ESG report will look
                          </DialogDescription>
                        </DialogHeader>
                        {renderTemplatePreview()}
                      </DialogContent>
                    </Dialog>
                  </div>
                </form>
              </CardContent>
            </Card>

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
                      <Button variant="outline" size="sm" onClick={() => useTemplate("GHG Protocol Standard")}>Use</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">CDP Climate Report</h4>
                        <p className="text-sm text-muted-foreground">Carbon Disclosure Project format</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => useTemplate("CDP Climate Report")}>Use</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">EU Taxonomy</h4>
                        <p className="text-sm text-muted-foreground">European sustainability reporting</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => useTemplate("EU Taxonomy")}>Use</Button>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Custom Template</h4>
                        <p className="text-sm text-muted-foreground">Build your own reporting format</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => useTemplate("Custom Template")}>Create</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="templates">
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
                    <Button variant="outline" size="sm" onClick={() => useTemplate("GHG Protocol Standard")}>Use</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">CDP Climate Report</h4>
                      <p className="text-sm text-muted-foreground">Carbon Disclosure Project format</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => useTemplate("CDP Climate Report")}>Use</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">EU Taxonomy</h4>
                      <p className="text-sm text-muted-foreground">European sustainability reporting</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => useTemplate("EU Taxonomy")}>Use</Button>
                  </div>
                </div>

                <div className="p-4 border rounded-lg hover:bg-accent cursor-pointer transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Custom Template</h4>
                      <p className="text-sm text-muted-foreground">Build your own reporting format</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => useTemplate("Custom Template")}>Create</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
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
                      <Button variant="outline" size="sm" onClick={() => handleDownloadReport(report.name)}>
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleShareReport(report.name)}>
                        <Send className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
