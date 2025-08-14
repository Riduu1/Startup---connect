import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock } from "lucide-react";

interface EventCardProps {
  event: {
    id: string;
    title: string;
    description: string;
    type: string;
    date: string;
    time: string;
    location: string;
    attendees: number;
    maxAttendees?: number;
    price?: string;
    image?: string;
  };
}

const EventCard = ({ event }: EventCardProps) => {
  const isUpcoming = new Date(event.date) > new Date();
  
  return (
    <Card className="group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0">
      {event.image && (
        <div className="w-full h-48 overflow-hidden rounded-t-lg">
          <img 
            src={event.image} 
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant={isUpcoming ? "default" : "secondary"}>
                {event.type}
              </Badge>
              {event.price && (
                <Badge variant="outline" className="text-success border-success">
                  {event.price}
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {event.title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="text-sm leading-relaxed">
          {event.description}
        </CardDescription>
        
        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center space-x-2 col-span-2">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center space-x-2 col-span-2">
            <Users className="h-4 w-4 text-primary" />
            <span>
              {event.attendees} {event.maxAttendees && `/ ${event.maxAttendees}`} attendees
            </span>
          </div>
        </div>
        
        <div className="pt-2">
          <Button 
            variant={isUpcoming ? "success" : "secondary"} 
            className="w-full"
            disabled={!isUpcoming}
          >
            {isUpcoming ? "Register" : "Event Ended"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;