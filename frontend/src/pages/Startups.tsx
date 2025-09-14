import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import StartupCard from "@/components/cards/StartupCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus } from "lucide-react";

const Startups = () => {
  // Page is now public; anyone can view
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");

  // State for startups
  const [realStartups, setRealStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDetailsId, setShowDetailsId] = useState<string | null>(null);

  // Dummy data
  const dummyStartups = [
    // ...same as before...
    {
      id: "1",
      name: "TechFlow AI",
      description: "AI-powered workflow automation platform that helps businesses streamline their operations and increase productivity by 40%.",
      industry: "AI/ML",
      stage: "Series A",
      location: "San Francisco, CA",
      teamSize: 15,
      fundingGoal: "$2M",
      website: "https://techflow.ai",
      owner: null
    },
    // ...other dummy startups, each with owner: null ...
  ];

  // Fetch real startups from backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_URL}/api/startups`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setRealStartups(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const industries = ["all", "AI/ML", "CleanTech", "HealthTech", "EdTech", "FoodTech", "Blockchain"];
  const stages = ["all", "Pre-Seed", "Seed", "Series A", "Series B"];

  // Combine dummy and real startups
  const allStartups = [
    ...dummyStartups,
    ...realStartups.map((s) => ({
      id: s._id,
      name: s.name,
      description: s.description,
      industry: s.industry,
      stage: s.stage,
      location: s.location,
      teamSize: s.teamSize,
      fundingGoal: s.fundingGoal,
      website: s.website,
      owner: s.owner,
    })),
  ];

  const filteredStartups = allStartups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industryFilter === "all" || startup.industry === industryFilter;
    const matchesStage = stageFilter === "all" || startup.stage === stageFilter;
    return matchesSearch && matchesIndustry && matchesStage;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-primary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Discover Innovative Startups
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Connect with groundbreaking startups that are shaping the future across various industries.
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-card p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search startups..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>

                <Select value={industryFilter} onValueChange={setIndustryFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry === "all" ? "All Industries" : industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={stageFilter} onValueChange={setStageFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage} value={stage}>
                        {stage === "all" ? "All Stages" : stage}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {filteredStartups.length} Startup{filteredStartups.length !== 1 ? 's' : ''} Found
            </h2>

            {/* Make all Add Your Startup buttons redirect to login */}
            <Button
              variant="hero"
              onClick={() => {
                if (!localStorage.getItem("token")) {
                  window.location.href = "/login";
                }
                // else: do nothing or open your startup submission modal/page
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your Startup
            </Button>
          </div>

          {/* Startups Grid */}
          {filteredStartups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStartups.map((startup) => (
                <div key={startup.id}>
                  <StartupCard startup={startup} />
                 
                  {/* Details Modal/Section */}
                  {showDetailsId === startup.id && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
                        <Button variant="ghost" className="absolute top-2 right-2" onClick={() => setShowDetailsId(null)}>
                          Close
                        </Button>
                        <h3 className="text-2xl font-bold mb-2">{startup.name}</h3>
                        <div className="mb-2 text-muted-foreground">{startup.industry} | {startup.stage}</div>
                        <div className="mb-2">{startup.description}</div>
                        <div className="mb-2 text-sm text-muted-foreground">Location: {startup.location}</div>
                        <div className="mb-2 text-sm text-muted-foreground">Team Size: {startup.teamSize}</div>
                        <div className="mb-2 text-sm text-muted-foreground">Funding Goal: {startup.fundingGoal}</div>
                        {startup.website && (
                          <a href={startup.website} target="_blank" rel="noopener noreferrer" className="text-primary underline">{startup.website}</a>
                        )}
                        {startup.owner && (
                          <div className="mt-4 text-xs text-muted-foreground">Submitted by: {startup.owner.name || startup.owner.email}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-muted-foreground text-lg mb-4">
                No startups found matching your criteria
              </div>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setIndustryFilter("all");
                setStageFilter("all");
              }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Startups;