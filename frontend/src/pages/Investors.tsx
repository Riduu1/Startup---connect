import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import InvestorCard from "@/components/cards/InvestorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, MapPin, User, Info } from "lucide-react";

const Investors = () => {
  // Page is now public; anyone can view
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");

  // State for investors
  const [realInvestors, setRealInvestors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInvestor, setSelectedInvestor] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pitchForm, setPitchForm] = useState({ name: "", email: "", message: "" });
  const [pitchLoading, setPitchLoading] = useState(false);
  const [pitchSuccess, setPitchSuccess] = useState("");
  const [pitchError, setPitchError] = useState("");

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
    fetch(`${import.meta.env.VITE_API_URL}/api/investors`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setRealInvestors(data.data);
        } else {
          console.error('Invalid response format:', data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch investors:', error);
        setLoading(false);
      });
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
                  <div className="bg-white rounded-lg shadow-card p-4 flex flex-col gap-2">
                    <div className="font-bold text-lg mb-1 flex items-center gap-2">
                      <User className="h-5 w-5 text-accent" />
                      {investor.name}
                    </div>
                    <div className="text-muted-foreground text-sm flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4 text-primary" /> {investor.type}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-success" /> {investor.location}
                      </span>
                    </div>
                    <div className="text-sm flex items-center gap-2 mt-1">
                      <Info className="h-4 w-4 text-muted-foreground" />
                      {investor.bio?.slice(0, 60)}{investor.bio && investor.bio.length > 60 ? "..." : ""}
                    </div>
                    <Button
                      variant="accent"
                      size="sm"
                      className="mt-3"
                      onClick={() => {
                        if (!localStorage.getItem("token")) {
                          window.location.href = "/login";
                          return;
                        }
                        setSelectedInvestor(investor);
                        setModalOpen(true);
                        setPitchForm({ name: "", email: "", message: "" });
                        setPitchSuccess("");
                        setPitchError("");
                      }}
                    >
                      Show Details
                    </Button>
                  </div>
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

          {/* Investor Details Modal */}
          {modalOpen && selectedInvestor && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setModalOpen(false)}
                >
                  ×
                </button>
                <h2 className="text-2xl font-bold mb-2">{selectedInvestor.name}</h2>
                <div className="mb-2 text-muted-foreground">{selectedInvestor.type} | {selectedInvestor.location}</div>
                <div className="mb-2">{selectedInvestor.bio}</div>
                <div className="mb-2 text-xs text-muted-foreground">
                  Industries: {selectedInvestor.industries?.join(", ")}<br />
                  Portfolio: {selectedInvestor.portfolio} | Range: {selectedInvestor.investmentRange}
                </div>
                <hr className="my-4" />
                <h3 className="text-lg font-semibold mb-2">Pitch Your Startup</h3>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setPitchLoading(true);
                    setPitchSuccess("");
                    setPitchError("");
                    const token = localStorage.getItem("token");
                    if (!token) {
                      window.location.href = "/login";
                      return;
                    }
                    try {
                      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/investors/${selectedInvestor.id}/pitch`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify(pitchForm),
                      });
                      const data = await res.json();
                      if (data.success) {
                        setPitchSuccess("Pitch submitted successfully!");
                        setPitchForm({ name: "", email: "", message: "" });
                      } else {
                        setPitchError(data.message || "Failed to submit pitch.");
                      }
                    } catch (err) {
                      setPitchError("Network error. Please try again.");
                    }
                    setPitchLoading(false);
                  }}
                  className="space-y-3"
                >
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full border rounded px-3 py-2"
                    value={pitchForm.name}
                    onChange={e => setPitchForm({ ...pitchForm, name: e.target.value })}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full border rounded px-3 py-2"
                    value={pitchForm.email}
                    onChange={e => setPitchForm({ ...pitchForm, email: e.target.value })}
                    required
                  />
                  <textarea
                    placeholder="Pitch Message"
                    className="w-full border rounded px-3 py-2"
                    value={pitchForm.message}
                    onChange={e => setPitchForm({ ...pitchForm, message: e.target.value })}
                    required
                  />
                  <Button type="submit" variant="accent" disabled={pitchLoading} className="w-full">
                    {pitchLoading ? "Submitting..." : "Submit Pitch"}
                  </Button>
                  {pitchSuccess && <div className="text-green-600 text-sm mt-2">{pitchSuccess}</div>}
                  {pitchError && <div className="text-red-600 text-sm mt-2">{pitchError}</div>}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Investors;