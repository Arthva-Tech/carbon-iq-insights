
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, UserPlus, Mail, Shield, Settings } from "lucide-react";

const teamMembers = [
  {
    name: "John Doe",
    email: "john@company.com",
    role: "Admin",
    department: "Engineering",
    avatar: "/avatars/01.png",
    lastActive: "2 hours ago",
    emissions: "12.4 kg"
  },
  {
    name: "Sarah Wilson",
    email: "sarah@company.com",
    role: "ESG Manager",
    department: "Sustainability",
    avatar: "/avatars/02.png",
    lastActive: "1 day ago",
    emissions: "8.7 kg"
  },
  {
    name: "Mike Chen",
    email: "mike@company.com",
    role: "Developer",
    department: "Engineering",
    avatar: "/avatars/03.png",
    lastActive: "3 hours ago",
    emissions: "15.2 kg"
  },
  {
    name: "Emma Davis",
    email: "emma@company.com",
    role: "Viewer",
    department: "Operations",
    avatar: "/avatars/04.png",
    lastActive: "5 hours ago",
    emissions: "6.3 kg"
  },
];

const departments = [
  { name: "Engineering", members: 12, emissions: "145.3 kg" },
  { name: "Marketing", members: 8, emissions: "67.2 kg" },
  { name: "Sales", members: 15, emissions: "89.7 kg" },
  { name: "Operations", members: 6, emissions: "34.8 kg" },
  { name: "Sustainability", members: 3, emissions: "21.5 kg" },
];

export const TeamManagement = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">
            Manage team access, roles, and track departmental emissions
          </p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold">44</div>
              <p className="text-sm text-muted-foreground">Total Members</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Admins</span>
                <Badge variant="default">3</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">ESG Managers</span>
                <Badge variant="secondary">5</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Developers</span>
                <Badge variant="secondary">28</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Viewers</span>
                <Badge variant="secondary">8</Badge>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">358.5 kg</div>
                <p className="text-sm text-muted-foreground">Total Team Emissions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invite New Member */}
        <Card>
          <CardHeader>
            <CardTitle>Invite Team Member</CardTitle>
            <CardDescription>
              Add new members to your organization
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input 
                placeholder="colleague@company.com"
                type="email"
              />
            </div>
            
            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="esg">ESG Manager</SelectItem>
                  <SelectItem value="developer">Developer</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="operations">Operations</SelectItem>
                  <SelectItem value="sustainability">Sustainability</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full">
              <Mail className="w-4 h-4 mr-2" />
              Send Invitation
            </Button>
          </CardContent>
        </Card>

        {/* Permissions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Role Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="font-medium text-sm">Admin</div>
                <div className="text-xs text-muted-foreground">Full access to all features</div>
              </div>
              
              <div>
                <div className="font-medium text-sm">ESG Manager</div>
                <div className="text-xs text-muted-foreground">Reports, integrations, team view</div>
              </div>
              
              <div>
                <div className="font-medium text-sm">Developer</div>
                <div className="text-xs text-muted-foreground">Dashboard, integrations, own data</div>
              </div>
              
              <div>
                <div className="font-medium text-sm">Viewer</div>
                <div className="text-xs text-muted-foreground">Read-only dashboard access</div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              <Settings className="w-4 h-4 mr-2" />
              Manage Permissions
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>
            Manage individual team member access and view their emission contributions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamMembers.map((member) => (
              <div key={member.email} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                  </div>
                  <div className="hidden md:block">
                    <Badge variant={member.role === 'Admin' ? 'default' : 'secondary'}>
                      {member.role}
                    </Badge>
                  </div>
                  <div className="hidden lg:block text-sm text-muted-foreground">
                    {member.department}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-medium">{member.emissions}</div>
                    <div className="text-xs text-muted-foreground">{member.lastActive}</div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Departments */}
      <Card>
        <CardHeader>
          <CardTitle>Department Breakdown</CardTitle>
          <CardDescription>
            Emissions tracking by organizational unit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <div key={dept.name} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{dept.name}</h4>
                  <Badge variant="outline">{dept.members} members</Badge>
                </div>
                <div className="text-2xl font-bold text-primary">{dept.emissions}</div>
                <div className="text-sm text-muted-foreground">Total CO₂e this month</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
