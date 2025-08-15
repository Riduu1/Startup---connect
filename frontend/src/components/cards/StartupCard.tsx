import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, DollarSign, ExternalLink } from "lucide-react";

interface StartupCardProps {
  startup: {
    id: string;
    name: string;
    description: string;
    industry: string;
    stage: string;
    location: string;
    teamSize: number;
    fundingGoal: string;
    website?: string;
    logo?: string;
  };
}

const StartupCard = ({ startup }: StartupCardProps) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Card className="group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              {startup.logo ? (
                <img src={startup.logo} alt={startup.name} className="w-12 h-12 rounded-lg object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">{startup.name.charAt(0)}</span>
                </div>
              )}
              <div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {startup.name}
                </CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary">{startup.industry}</Badge>
                  <Badge variant="outline">{startup.stage}</Badge>
                </div>
              </div>
            </div>
            {startup.website && (
              <Button variant="ghost" size="icon" asChild>
                <a href={startup.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-sm leading-relaxed">
            {startup.description}
          </CardDescription>
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{startup.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4 text-primary" />
              <span>{startup.teamSize} team members</span>
            </div>
            <div className="flex items-center space-x-2 col-span-2">
              <DollarSign className="h-4 w-4 text-success" />
              <span className="font-medium text-success">Seeking {startup.fundingGoal}</span>
            </div>
          </div>
          <div className="pt-2">
            <Button variant="default" className="w-full" onClick={() => setShowModal(true)}>
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Modal for details */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative">
            <Button variant="ghost" className="absolute top-2 right-2" onClick={() => setShowModal(false)}>
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
          </div>
        </div>
      )}
    </>
  );
};

export default StartupCard;