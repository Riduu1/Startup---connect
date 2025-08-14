import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, DollarSign, Star } from "lucide-react";

interface InvestorCardProps {
  investor: {
    id: string;
    name: string;
    bio: string;
    type: string; // Angel, VC, Fund
    location: string;
    industries: string[];
    investmentRange: string;
    portfolio: number;
    avatar?: string;
  };
}

const InvestorCard = ({ investor }: InvestorCardProps) => {
  return (
    <Card className="group hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-0">
      <CardHeader className="pb-3">
        <div className="flex items-start space-x-4">
          {investor.avatar ? (
            <img src={investor.avatar} alt={investor.name} className="w-16 h-16 rounded-full object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-xl">{investor.name.charAt(0)}</span>
            </div>
          )}
          <div className="flex-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {investor.name}
            </CardTitle>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary">{investor.type}</Badge>
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                <span className="text-xs text-muted-foreground">{investor.portfolio} investments</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="text-sm leading-relaxed">
          {investor.bio}
        </CardDescription>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" />
            <span>{investor.location}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4 text-success" />
            <span className="font-medium text-success">{investor.investmentRange}</span>
          </div>
          
          <div className="flex items-start space-x-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4 text-primary mt-0.5" />
            <div className="flex flex-wrap gap-1">
              {investor.industries.map((industry, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <Button variant="accent" className="w-full">
            Connect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestorCard;