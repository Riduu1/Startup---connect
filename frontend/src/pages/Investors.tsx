import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import InvestorCard from "@/components/cards/InvestorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus } from "lucide-react";

const Investors = () => {
  // Page is now public; anyone can view
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");

  // State for investors
  const [realInvestors, setRealInvestors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Dummy data
  const dummyInvestors = [
    {
      id: "1",
      name: "Sarah Chen",
      bio: "Former Google exec turned angel investor. Passionate about AI and developer tools. 15+ years in tech leadership.",
      type: "Angel",
      location: "Palo Alto, CA",
      industries: ["AI/ML", "Developer Tools", "Enterprise SaaS"],
      investmentRange: "$25K - $100K",
      portfolio: 23,
      user: null
    },
    // ...other dummy investors, each with user: null ...
  ];

  // Fetch real investors from backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("/api/investors", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setRealInvestors(data.data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const types = ["all", "Angel", "VC", "Fund"];
  const industries = ["all", "AI/ML", "B2B Software", "HealthTech", "CleanTech", "Consumer Tech", "FinTech"];

  // Combine dummy and real investors
  const allInvestors = [
    ...dummyInvestors,
    ...realInvestors.map((i) => ({
      id: i._id,
      name: i.name,
      bio: i.bio,
      type: i.type,
      location: i.location,
      industries: i.industries,
      investmentRange: i.investmentRange,
      portfolio: i.portfolio,
      user: i.user,
    })),
  ];

  const filteredInvestors = allInvestors.filter(investor => {
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

            {/* Make all Join as Investor buttons redirect to login */}
            <Button
              variant="accent"
              onClick={() => {
                if (!localStorage.getItem("token")) {
                  window.location.href = "/login";
                }
                // else: do nothing or open investor join modal/page
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Join as Investor
            </Button>
          </div>

          {/* Investors Grid */}
          {filteredInvestors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInvestors.map((investor) => (
                <div key={investor.id}>
                  <InvestorCard investor={investor} />
                  {investor.user && (
                    <div className="mt-2 text-xs text-muted-foreground">Submitted by: {investor.user.name || investor.user.email}</div>
                  )}
                </div>
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