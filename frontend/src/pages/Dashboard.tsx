import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Building2, TrendingUp, Users, Plus, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  
  // Mock user data - replace with actual user data from database when connected
  const [user] = useState({
    name: "John Doe",
    email: "john@example.com",
    role: "founder" // or "investor"
  });

  const [startupForm, setStartupForm] = useState({
    name: "",
    description: "",
    industry: "",
    stage: "",
    location: "",
    teamSize: "",
    fundingGoal: "",
    website: "",
  });

  const [investorForm, setInvestorForm] = useState({
    name: "",
    bio: "",
    type: "",
    location: "",
    industries: "",
    investmentRange: "",
    portfolio: "",
  });

  const handleStartupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Backend Required",
      description: "Please connect to Supabase to save startup data.",
      variant: "destructive",
    });
  };

  const handleInvestorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Backend Required",
      description: "Please connect to Supabase to save investor data.",
      variant: "destructive",
    });
  };

  const stats = [
    { label: "Profile Views", value: "142", icon: <Users className="h-5 w-5" /> },
    { label: "Connections", value: "28", icon: <Building2 className="h-5 w-5" /> },
    { label: "Growth Rate", value: "+12%", icon: <TrendingUp className="h-5 w-5" /> },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-primary text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
                <p className="text-white/90 mt-2">
                  Manage your {user.role === "founder" ? "startup profile" : "investor profile"} and track your progress
                </p>
              </div>
              <Badge variant="secondary" className="text-primary">
                {user.role === "founder" ? "Startup Founder" : "Investor"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 bg-gradient-card shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                    <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Profile Forms */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue={user.role === "founder" ? "startup" : "investor"} className="space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="startup">Startup Profile</TabsTrigger>
                  <TabsTrigger value="investor">Investor Profile</TabsTrigger>
                </TabsList>

                {/* Startup Form */}
                <TabsContent value="startup">
                  <Card className="border-0 shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Building2 className="h-5 w-5 text-primary" />
                        <span>Startup Information</span>
                      </CardTitle>
                      <CardDescription>
                        Provide details about your startup to attract potential investors
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleStartupSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="startup-name">Startup Name</Label>
                            <Input
                              id="startup-name"
                              value={startupForm.name}
                              onChange={(e) => setStartupForm({...startupForm, name: e.target.value})}
                              placeholder="Enter your startup name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="industry">Industry</Label>
                            <Select value={startupForm.industry} onValueChange={(value) => setStartupForm({...startupForm, industry: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ai-ml">AI/ML</SelectItem>
                                <SelectItem value="fintech">FinTech</SelectItem>
                                <SelectItem value="healthtech">HealthTech</SelectItem>
                                <SelectItem value="edtech">EdTech</SelectItem>
                                <SelectItem value="cleantech">CleanTech</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={startupForm.description}
                            onChange={(e) => setStartupForm({...startupForm, description: e.target.value})}
                            placeholder="Describe your startup, its mission, and value proposition..."
                            rows={4}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="stage">Funding Stage</Label>
                            <Select value={startupForm.stage} onValueChange={(value) => setStartupForm({...startupForm, stage: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select stage" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="idea">Idea Stage</SelectItem>
                                <SelectItem value="pre-seed">Pre-Seed</SelectItem>
                                <SelectItem value="seed">Seed</SelectItem>
                                <SelectItem value="series-a">Series A</SelectItem>
                                <SelectItem value="series-b">Series B</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={startupForm.location}
                              onChange={(e) => setStartupForm({...startupForm, location: e.target.value})}
                              placeholder="City, State"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="team-size">Team Size</Label>
                            <Input
                              id="team-size"
                              type="number"
                              value={startupForm.teamSize}
                              onChange={(e) => setStartupForm({...startupForm, teamSize: e.target.value})}
                              placeholder="5"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="funding-goal">Funding Goal</Label>
                            <Input
                              id="funding-goal"
                              value={startupForm.fundingGoal}
                              onChange={(e) => setStartupForm({...startupForm, fundingGoal: e.target.value})}
                              placeholder="$500K"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              type="url"
                              value={startupForm.website}
                              onChange={(e) => setStartupForm({...startupForm, website: e.target.value})}
                              placeholder="https://yourstartup.com"
                            />
                          </div>
                        </div>

                        <Button type="submit" variant="hero" className="w-full">
                          <Save className="h-4 w-4 mr-2" />
                          Save Startup Profile
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Investor Form */}
                <TabsContent value="investor">
                  <Card className="border-0 shadow-card">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-accent" />
                        <span>Investor Information</span>
                      </CardTitle>
                      <CardDescription>
                        Share your investment preferences and experience to connect with relevant startups
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleInvestorSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="investor-name">Name/Fund Name</Label>
                            <Input
                              id="investor-name"
                              value={investorForm.name}
                              onChange={(e) => setInvestorForm({...investorForm, name: e.target.value})}
                              placeholder="Your name or fund name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="investor-type">Investor Type</Label>
                            <Select value={investorForm.type} onValueChange={(value) => setInvestorForm({...investorForm, type: value})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="angel">Angel Investor</SelectItem>
                                <SelectItem value="vc">Venture Capital</SelectItem>
                                <SelectItem value="fund">Investment Fund</SelectItem>
                                <SelectItem value="corporate">Corporate Investor</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            value={investorForm.bio}
                            onChange={(e) => setInvestorForm({...investorForm, bio: e.target.value})}
                            placeholder="Describe your investment background, experience, and what you're looking for..."
                            rows={4}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="investor-location">Location</Label>
                            <Input
                              id="investor-location"
                              value={investorForm.location}
                              onChange={(e) => setInvestorForm({...investorForm, location: e.target.value})}
                              placeholder="City, State"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="investment-range">Investment Range</Label>
                            <Input
                              id="investment-range"
                              value={investorForm.investmentRange}
                              onChange={(e) => setInvestorForm({...investorForm, investmentRange: e.target.value})}
                              placeholder="$25K - $250K"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="industries">Preferred Industries</Label>
                            <Input
                              id="industries"
                              value={investorForm.industries}
                              onChange={(e) => setInvestorForm({...investorForm, industries: e.target.value})}
                              placeholder="AI/ML, FinTech, HealthTech"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="portfolio">Portfolio Size</Label>
                            <Input
                              id="portfolio"
                              type="number"
                              value={investorForm.portfolio}
                              onChange={(e) => setInvestorForm({...investorForm, portfolio: e.target.value})}
                              placeholder="15"
                            />
                          </div>
                        </div>

                        <Button type="submit" variant="accent" className="w-full">
                          <Save className="h-4 w-4 mr-2" />
                          Save Investor Profile
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Browse Network
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-muted-foreground">Profile viewed by 3 investors</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span className="text-muted-foreground">New connection request</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-muted-foreground">Event reminder: AI Summit</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;