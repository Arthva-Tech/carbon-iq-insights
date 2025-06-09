
import { 
  Leaf, 
  BarChart3, 
  FileText, 
  Settings, 
  Users, 
  Zap, 
  Cloud,
  Globe,
  Sun
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "#dashboard",
    icon: BarChart3,
  },
  {
    title: "Emissions",
    url: "#emissions",
    icon: Cloud,
  },
  {
    title: "Integrations",
    url: "#integrations",
    icon: Zap,
  },
  {
    title: "ESG Reports",
    url: "#reports",
    icon: FileText,
  },
  {
    title: "Team",
    url: "#team",
    icon: Users,
  },
  {
    title: "Offsets",
    url: "#offsets",
    icon: Globe,
  },
  {
    title: "Settings",
    url: "#settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gradient">CarbonIQ</h1>
            <p className="text-xs text-muted-foreground">ESG Platform</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-accent transition-colors">
                    <a href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
