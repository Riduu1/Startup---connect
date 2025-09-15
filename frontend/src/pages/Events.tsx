import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import EventCard from "@/components/cards/EventCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Calendar } from "lucide-react";
import EventModal from "@/components/cards/EventModal";

const Events = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [allEvents, setAllEvents] = useState([]);
  // Fetch events from backend on mount
  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
        const data = await res.json();
        if (data.success && Array.isArray(data.data)) {
          setAllEvents(data.data);
        }
      } catch (err) {
        // Optionally handle error
      }
    };
    fetchEvents();
  }, []);
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
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                  body: JSON.stringify(form),
                });
                if (!res.ok) throw new Error("Failed to create event");
                // After adding, re-fetch events from backend
                const fetchEvents = async () => {
                  try {
                    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/events`);
                    const data = await res.json();
                    if (data.success && Array.isArray(data.data)) {
                      setAllEvents(data.data);
                    }
                  } catch (err) { }
                };
                await fetchEvents();
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