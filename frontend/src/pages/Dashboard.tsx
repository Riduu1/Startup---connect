import { useEffect, useState } from "react";
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

  // Real user data from backend
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Not authenticated. Please log in.");
      setLoading(false);
      return;
    }
    fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setUser(data.data);
        } else {
          setError(data.message || "Failed to fetch user data.");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Network error. Could not fetch user data.");
        setLoading(false);
      });
  }, []);

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

  // State for submitted startups/investors
  const [myStartups, setMyStartups] = useState<any[]>([]);
  const [myInvestor, setMyInvestor] = useState<any>(null);
  const [receivedPitches, setReceivedPitches] = useState<any[]>([]);

  // Fetch submitted startups/investor profile for the logged-in user
  useEffect(() => {
    if (!user) return;
    const token = localStorage.getItem("token");
    if (user.role === "Startup Owner") {
      fetch(`${import.meta.env.VITE_API_URL}/api/startups`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.data)) {
            setMyStartups(data.data.filter((s) => s.owner._id === user._id));
          }
        });
    } else if (user.role === "Investor") {
      fetch(`${import.meta.env.VITE_API_URL}/api/investors`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.data)) {
            setMyInvestor(data.data.find((i) => i.user._id === user._id));
          }
        });

      // Fetch received pitches
      fetch(`${import.meta.env.VITE_API_URL}/api/investors/me/pitches`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && Array.isArray(data.data)) {
            setReceivedPitches(data.data);
          }
        });
    }
  }, [user]);

  // Submit startup
  const handleStartupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/startups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(startupForm),
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Startup Saved", description: "Your startup profile was saved.", variant: "default" });
        setMyStartups((prev) => [...prev, data.data]);
        setStartupForm({ name: "", description: "", industry: "", stage: "", location: "", teamSize: "", fundingGoal: "", website: "" });
      } else {
        toast({ title: "Error", description: data.message || "Failed to save startup.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Network Error", description: "Could not connect to server.", variant: "destructive" });
    }
  };

  // Submit investor profile
  const handleInvestorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/investors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...investorForm,
          industries: investorForm.industries.split(",").map((i) => i.trim()),
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Investor Profile Saved", description: "Your investor profile was saved.", variant: "default" });
        setMyInvestor(data.data);
        setInvestorForm({ name: "", bio: "", type: "", location: "", industries: "", investmentRange: "", portfolio: "" });
      } else {
        toast({ title: "Error", description: data.message || "Failed to save investor profile.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Network Error", description: "Could not connect to server.", variant: "destructive" });
    }
  };

  const stats = [
    { label: "Profile Views", value: "142", icon: <Users className="h-5 w-5" /> },
    { label: "Connections", value: "28", icon: <Building2 className="h-5 w-5" /> },
    { label: "Growth Rate", value: "+12%", icon: <TrendingUp className="h-5 w-5" /> },
  ];

  if (loading) {
    return <Layout><div className="min-h-screen flex items-center justify-center">Loading user data...</div></Layout>;
  }
  if (error) {
    return <Layout><div className="min-h-screen flex items-center justify-center text-red-500">{error}</div></Layout>;
  }

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
                  Manage your {user.role === "Startup Owner" ? "startup profile" : "investor profile"} and track your progress
                </p>
              </div>
              <Badge variant="secondary" className="text-primary">
                {user.role === "Startup Owner" ? "Startup Founder" : "Investor"}
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

          {/* Role-based dashboard */}
          {user.role === "Startup Owner" ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Startup Submission Form */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <span>Submit Your Startup</span>
                  </CardTitle>
                  <CardDescription>
                    Provide details about your startup to attract potential investors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleStartupSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Startup Name</Label>
                        <Input id="name" value={startupForm.name} onChange={(e) => setStartupForm({ ...startupForm, name: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="industry">Industry</Label>
                        <Input id="industry" value={startupForm.industry} onChange={(e) => setStartupForm({ ...startupForm, industry: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="stage">Stage</Label>
                        <Select value={startupForm.stage} onValueChange={(value) => setStartupForm({ ...startupForm, stage: value })} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select stage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Idea">Idea</SelectItem>
                            <SelectItem value="Prototype">Prototype</SelectItem>
                            <SelectItem value="MVP">MVP</SelectItem>
                            <SelectItem value="Revenue">Revenue</SelectItem>
                            <SelectItem value="Growth">Growth</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" value={startupForm.location} onChange={(e) => setStartupForm({ ...startupForm, location: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="teamSize">Team Size</Label>
                        <Input id="teamSize" value={startupForm.teamSize} onChange={(e) => setStartupForm({ ...startupForm, teamSize: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="fundingGoal">Funding Goal</Label>
                        <Input id="fundingGoal" value={startupForm.fundingGoal} onChange={(e) => setStartupForm({ ...startupForm, fundingGoal: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input id="website" value={startupForm.website} onChange={(e) => setStartupForm({ ...startupForm, website: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea id="description" value={startupForm.description} onChange={(e) => setStartupForm({ ...startupForm, description: e.target.value })} required />
                    </div>
                    <Button type="submit" variant="hero" className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Startup Profile
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* My Submitted Startups */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle>My Startups</CardTitle>
                  <CardDescription>Your submitted startups</CardDescription>
                </CardHeader>
                <CardContent>
                  {myStartups.length > 0 ? (
                    <div className="space-y-4">
                      {myStartups.map((startup) => (
                        <div key={startup._id} className="p-4 border rounded-lg bg-white/80">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-bold text-lg">{startup.name}</div>
                              <div className="text-muted-foreground">{startup.industry} | {startup.stage}</div>
                              <div>{startup.description}</div>
                              <div className="text-xs text-muted-foreground">{startup.location} | Team: {startup.teamSize} | Funding: {startup.fundingGoal}</div>
                              {startup.website && (
                                <a href={startup.website} target="_blank" rel="noopener noreferrer" className="text-primary underline">{startup.website}</a>
                              )}
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={async () => {
                                if (window.confirm('Are you sure you want to delete this startup?')) {
                                  const token = localStorage.getItem("token");
                                  try {
                                    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/startups/${startup._id}`, {
                                      method: 'DELETE',
                                      headers: {
                                        Authorization: `Bearer ${token}`,
                                      },
                                    });
                                    const data = await res.json();
                                    if (data.success) {
                                      toast({ title: "Startup Deleted", description: "Your startup profile has been removed.", variant: "default" });
                                      setMyStartups(prev => prev.filter(s => s._id !== startup._id));
                                    } else {
                                      toast({ title: "Error", description: data.message || "Failed to delete startup.", variant: "destructive" });
                                    }
                                  } catch (error) {
                                    toast({ title: "Network Error", description: "Could not connect to server.", variant: "destructive" });
                                  }
                                }
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-muted-foreground">No startups submitted yet.</div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Investor Submission Form */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-accent" />
                    <span>Submit Your Investor Profile</span>
                  </CardTitle>
                  <CardDescription>
                    Share your investment preferences and experience to connect with relevant startups
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleInvestorSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={investorForm.name} onChange={(e) => setInvestorForm({ ...investorForm, name: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="type">Investor Type</Label>
                        <Select value={investorForm.type} onValueChange={(value) => setInvestorForm({ ...investorForm, type: value })} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Angel">Angel</SelectItem>
                            <SelectItem value="VC">Venture Capital</SelectItem>
                            <SelectItem value="PE">Private Equity</SelectItem>
                            <SelectItem value="Crowdfunding">Crowdfunding</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" value={investorForm.location} onChange={(e) => setInvestorForm({ ...investorForm, location: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="investmentRange">Investment Range</Label>
                        <Input id="investmentRange" value={investorForm.investmentRange} onChange={(e) => setInvestorForm({ ...investorForm, investmentRange: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="portfolio">Portfolio Size</Label>
                        <Input id="portfolio" value={investorForm.portfolio} onChange={(e) => setInvestorForm({ ...investorForm, portfolio: e.target.value })} required />
                      </div>
                      <div>
                        <Label htmlFor="industries">Industries</Label>
                        <Input id="industries" value={investorForm.industries} onChange={(e) => setInvestorForm({ ...investorForm, industries: e.target.value })} required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" value={investorForm.bio} onChange={(e) => setInvestorForm({ ...investorForm, bio: e.target.value })} required />
                    </div>
                    <Button type="submit" variant="accent" className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Investor Profile
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* My Submitted Investor Profile */}
              <Card className="border-0 shadow-card">
                <CardHeader>
                  <CardTitle>My Investor Profile</CardTitle>
                  <CardDescription>Your submitted investor info</CardDescription>
                </CardHeader>
                <CardContent>
                  {myInvestor ? (
                    <>
                      <div className="p-4 border rounded-lg bg-white/80">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-lg">{myInvestor.name}</div>
                            <div className="text-muted-foreground">{myInvestor.type} | {myInvestor.location}</div>
                            <div>{myInvestor.bio}</div>
                            <div className="text-xs text-muted-foreground">Industries: {myInvestor.industries?.join(", ")} | Portfolio: {myInvestor.portfolio} | Range: {myInvestor.investmentRange}</div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={async () => {
                              if (window.confirm('Are you sure you want to delete your investor profile?')) {
                                const token = localStorage.getItem("token");
                                try {
                                  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/investors/${myInvestor._id}`, {
                                    method: 'DELETE',
                                    headers: {
                                      Authorization: `Bearer ${token}`,
                                    },
                                  });
                                  const data = await res.json();
                                  if (data.success) {
                                    toast({ title: "Profile Deleted", description: "Your investor profile has been removed.", variant: "default" });
                                    setMyInvestor(null);
                                  } else {
                                    toast({ title: "Error", description: data.message || "Failed to delete profile.", variant: "destructive" });
                                  }
                                } catch (error) {
                                  toast({ title: "Network Error", description: "Could not connect to server.", variant: "destructive" });
                                }
                              }
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div className="mt-8">
                        <h3 className="text-lg font-semibold mb-2">Received Pitches</h3>
                        {receivedPitches.length > 0 ? (
                          <div className="space-y-4">
                            {receivedPitches.map((pitch, idx) => (
                              <div key={idx} className="border rounded-lg p-4 bg-white/80">
                                <div className="font-bold">{pitch.name} <span className="text-xs text-muted-foreground">({pitch.email})</span></div>
                                <div className="text-sm mt-1">{pitch.message}</div>
                                <div className="text-xs text-muted-foreground mt-2">Submitted: {pitch.submittedAt ? new Date(pitch.submittedAt).toLocaleString() : "-"}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-muted-foreground">No pitches received yet.</div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="text-muted-foreground">No investor profile submitted yet.</div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;