import { useState } from "react";
import Layout from "@/components/layout/Layout";
import InvestorCard from "@/components/cards/InvestorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus } from "lucide-react";

const Investors = () => {
  // Protect page: redirect to login if not authenticated
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
    return null;
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");

  // Mock data - replace with actual data from database when connected
  const investors = [
    {
      id: "1",
      name: "Sarah Chen",
      bio: "Former Google exec turned angel investor. Passionate about AI and developer tools. 15+ years in tech leadership.",
      type: "Angel",
      location: "Palo Alto, CA",
      industries: ["AI/ML", "Developer Tools", "Enterprise SaaS"],
      investmentRange: "$25K - $100K",
      portfolio: 23
    },
    {
      id: "2",
      name: "Venture Capital Partners",
      bio: "Early-stage VC fund focused on B2B software and marketplace startups. $100M fund with global reach.",
      type: "VC",
      location: "New York, NY",
      industries: ["B2B Software", "Marketplaces", "FinTech"],
      investmentRange: "$500K - $5M",
      portfolio: 45
    },
    {
      id: "3",
      name: "Michael Rodriguez",
      bio: "Serial entrepreneur and angel investor specializing in healthcare and biotech innovations.",
      type: "Angel",
      location: "Boston, MA",
      industries: ["HealthTech", "BioTech", "Medical Devices"],
      investmentRange: "$50K - $250K",
      portfolio: 12
    },
    {
      id: "4",
      name: "GreenTech Ventures",
      bio: "Impact-focused fund investing in sustainable technology and clean energy solutions worldwide.",
      type: "Fund",
      location: "San Francisco, CA",
      industries: ["CleanTech", "Sustainability", "Energy"],
      investmentRange: "$1M - $10M",
      portfolio: 31
    },
    {
      id: "5",
      name: "Jennifer Liu",
      bio: "Former McKinsey partner now investing in consumer tech and e-commerce platforms.",
      type: "Angel",
      location: "Los Angeles, CA",
      industries: ["Consumer Tech", "E-commerce", "Mobile Apps"],
      investmentRange: "$25K - $150K",
      portfolio: 18
    },
    {
      id: "6",
      name: "TechStars Global",
      bio: "Leading accelerator and venture fund with a global network of startup programs.",
      type: "Fund",
      location: "Boulder, CO",
      industries: ["All Industries", "Early Stage", "Global"],
      investmentRange: "$100K - $3M",
      portfolio: 200
    }
  ];

  const types = ["all", "Angel", "VC", "Fund"];
  const industries = ["all", "AI/ML", "B2B Software", "HealthTech", "CleanTech", "Consumer Tech", "FinTech"];

  const filteredInvestors = investors.filter(investor => {
    const matchesSearch = investor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      investor.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || investor.type === typeFilter;
    const matchesIndustry = industryFilter === "all" ||
      investor.industries.some(industry =>
        industry.toLowerCase().includes(industryFilter.toLowerCase())
      );

    return matchesSearch && matchesType && matchesIndustry;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-accent to-primary text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Connect with Investors
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Meet experienced investors, VCs, and funds ready to support the next generation of innovative startups.
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
                    placeholder="Search investors..."
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

                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "all" ? "All Types" : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

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
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {filteredInvestors.length} Investor{filteredInvestors.length !== 1 ? 's' : ''} Found
            </h2>
            <Button variant="accent" className="hidden md:flex">
              <Plus className="h-4 w-4 mr-2" />
              Join as Investor
            </Button>
          </div>

          {/* Investors Grid */}
          {filteredInvestors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInvestors.map((investor) => (
                <InvestorCard key={investor.id} investor={investor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-muted-foreground text-lg mb-4">
                No investors found matching your criteria
              </div>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setTypeFilter("all");
                setIndustryFilter("all");
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

export default Investors;