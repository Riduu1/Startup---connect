import { useState } from "react";
import Layout from "@/components/layout/Layout";
import StartupCard from "@/components/cards/StartupCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus } from "lucide-react";

const Startups = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");

  // Mock data - replace with actual data from database when connected
  const startups = [
    {
      id: "1",
      name: "TechFlow AI",
      description: "AI-powered workflow automation platform that helps businesses streamline their operations and increase productivity by 40%.",
      industry: "AI/ML",
      stage: "Series A",
      location: "San Francisco, CA",
      teamSize: 15,
      fundingGoal: "$2M",
      website: "https://techflow.ai"
    },
    {
      id: "2",
      name: "GreenEnergy Solutions",
      description: "Developing sustainable solar panel technology with 30% higher efficiency than traditional panels.",
      industry: "CleanTech",
      stage: "Seed",
      location: "Austin, TX",
      teamSize: 8,
      fundingGoal: "$500K",
    },
    {
      id: "3",
      name: "HealthTrack Pro",
      description: "Mobile health monitoring platform that uses IoT devices to track patient vitals in real-time.",
      industry: "HealthTech",
      stage: "Pre-Seed",
      location: "Boston, MA",
      teamSize: 5,
      fundingGoal: "$300K",
    },
    {
      id: "4",
      name: "EduVerse",
      description: "Virtual reality education platform making immersive learning experiences accessible to schools worldwide.",
      industry: "EdTech",
      stage: "Series A",
      location: "Seattle, WA",
      teamSize: 22,
      fundingGoal: "$3M",
    },
    {
      id: "5",
      name: "FoodieDelivery",
      description: "Hyperlocal food delivery service focused on connecting users with authentic local restaurants.",
      industry: "FoodTech",
      stage: "Seed",
      location: "New York, NY",
      teamSize: 12,
      fundingGoal: "$1.5M",
    },
    {
      id: "6",
      name: "CryptoSecure",
      description: "Blockchain-based security platform providing enterprise-grade encryption and data protection.",
      industry: "Blockchain",
      stage: "Series A",
      location: "Miami, FL",
      teamSize: 18,
      fundingGoal: "$4M",
    }
  ];

  const industries = ["all", "AI/ML", "CleanTech", "HealthTech", "EdTech", "FoodTech", "Blockchain"];
  const stages = ["all", "Pre-Seed", "Seed", "Series A", "Series B"];

  const filteredStartups = startups.filter(startup => {
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
            <Button variant="hero" className="hidden md:flex">
              <Plus className="h-4 w-4 mr-2" />
              Add Your Startup
            </Button>
          </div>

          {/* Startups Grid */}
          {filteredStartups.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStartups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
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