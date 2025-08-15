import { useState } from "react";
import Layout from "@/components/layout/Layout";
import EventCard from "@/components/cards/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Calendar } from "lucide-react";
import EventModal from "@/components/cards/EventModal";

const Events = () => {
  // Mock data - replace with actual data from database when connected
  const events = [
    {
      id: "1",
      title: "Startup Pitch Night SF",
      description: "Join us for an evening of innovative startup pitches and networking with top investors in the Bay Area.",
      type: "Pitch Competition",
      date: "2024-09-15",
      time: "6:00 PM - 9:00 PM",
      location: "San Francisco, CA",
      attendees: 45,
      maxAttendees: 100,
      price: "Free"
    },
    {
      id: "2",
      title: "AI & Machine Learning Summit",
      description: "Deep dive into the latest AI trends with industry leaders and tech innovators. Network with AI startups and investors.",
      type: "Conference",
      date: "2024-09-20",
      time: "9:00 AM - 5:00 PM",
      location: "Austin, TX",
      attendees: 120,
      maxAttendees: 200,
      price: "$150"
    },
    {
      id: "3",
      title: "Women in Tech Networking",
      description: "Empowering women entrepreneurs and connecting them with female investors and mentors in the tech industry.",
      type: "Networking",
      date: "2024-09-25",
      time: "7:00 PM - 10:00 PM",
      location: "New York, NY",
      attendees: 67,
      maxAttendees: 80,
      price: "$25"
    },
    {
      id: "4",
      title: "HealthTech Innovation Showcase",
      description: "Discover the latest healthcare technology startups and connect with specialized healthcare investors.",
      type: "Showcase",
      date: "2024-10-05",
      time: "2:00 PM - 6:00 PM",
      location: "Boston, MA",
      attendees: 35,
      maxAttendees: 150,
      price: "$75"
    },
    {
      id: "5",
      title: "Virtual Reality Startup Demo Day",
      description: "Experience cutting-edge VR technologies and meet the entrepreneurs building the metaverse.",
      type: "Demo Day",
      date: "2024-10-12",
      time: "1:00 PM - 5:00 PM",
      location: "Seattle, WA",
      attendees: 28,
      maxAttendees: 60,
      price: "Free"
    },
    {
      id: "6",
      title: "Sustainable Tech Investor Meetup",
      description: "Focus on clean technology and sustainable startups with impact investors and green tech enthusiasts.",
      type: "Meetup",
      date: "2024-08-10",
      time: "6:30 PM - 9:00 PM",
      location: "Portland, OR",
      attendees: 42,
      maxAttendees: 70,
      price: "$20"
    }
  ];
  const [modalOpen, setModalOpen] = useState(false);
  const [allEvents, setAllEvents] = useState(events);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  const types = ["all", "Pitch Competition", "Conference", "Networking", "Showcase", "Demo Day", "Meetup"];
  const timeFilters = ["all", "upcoming", "past"];

  const filteredEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const isUpcoming = eventDate > today;

    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || event.type === typeFilter;
    const matchesTime = timeFilter === "all" ||
      (timeFilter === "upcoming" && isUpcoming) ||
      (timeFilter === "past" && !isUpcoming);

    return matchesSearch && matchesType && matchesTime;
  });

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="bg-gradient-to-r from-success to-accent text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Calendar className="h-12 w-12 text-white/90" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Startup Events & Networking
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Connect, learn, and grow at premier startup events across the country. From pitch competitions to networking meetups.
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
                    placeholder="Search events..."
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
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Event Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "all" ? "All Types" : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={timeFilter} onValueChange={setTimeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Events</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="past">Past Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">
              {filteredEvents.length} Event{filteredEvents.length !== 1 ? 's' : ''} Found
            </h2>
            <Button
              variant="success"
              onClick={() => {
                if (!localStorage.getItem("token")) {
                  window.location.href = "/login";
                } else {
                  setModalOpen(true);
                }
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Make Event
            </Button>
          </div>

          {/* Events Grid */}
          <EventModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={async (form) => {
              // Save to backend
              try {
                const res = await fetch("/api/events", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                  body: JSON.stringify(form),
                });
                if (!res.ok) throw new Error("Failed to create event");
                const saved = await res.json();
                setAllEvents([saved, ...allEvents]);
              } catch (err) {
                alert("Error creating event");
              }
            }}
          />
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-muted-foreground text-lg mb-4">
                No events found matching your criteria
              </div>
              <Button variant="outline" onClick={() => {
                setSearchTerm("");
                setTypeFilter("all");
                setTimeFilter("all");
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

export default Events;