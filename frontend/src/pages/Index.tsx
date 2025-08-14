import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { Rocket, Users, TrendingUp, Calendar, ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-startup.jpg";

const Index = () => {
  const features = [
    {
      icon: <Rocket className="h-8 w-8 text-primary" />,
      title: "Discover Startups",
      description: "Explore innovative startups across various industries and connect with founders."
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "Meet Investors",
      description: "Connect with angel investors, VCs, and funds looking for the next big opportunity."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-success" />,
      title: "Track Growth",
      description: "Monitor startup progress and investment opportunities in real-time."
    },
    {
      icon: <Calendar className="h-8 w-8 text-primary" />,
      title: "Join Events",
      description: "Attend networking events, pitch competitions, and startup meetups."
    }
  ];

  const stats = [
    { number: "500+", label: "Startups" },
    { number: "200+", label: "Investors" },
    { number: "$50M+", label: "Funding" },
    { number: "50+", label: "Events" }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-hero/90"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-yellow-400 animate-glow" />
              <span className="text-white/90 font-medium">Welcome to the Future of Startup Funding</span>
              <Sparkles className="h-6 w-6 text-yellow-400 animate-glow" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Connect Startups with
              <span className="block text-transparent bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text">
                Investors
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              The premier platform where innovative startups meet visionary investors. 
              Discover opportunities, build connections, and shape the future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <Button variant="gradient" size="lg" className="text-lg px-8 py-3 animate-float">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/events">
                <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-white/10 text-white border-white/30 hover:bg-white/20">
                  Browse Events
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need to
              <span className="block text-primary">Build Success</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools and connections you need to grow your startup or find your next investment opportunity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-0 bg-gradient-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs and investors who are already building the future together.
          </p>
          <Link to="/signup">
            <Button variant="gradient" size="lg" className="text-lg px-12 py-4 bg-white text-primary hover:bg-white/90 hover:shadow-hero">
              Join Startup-Connect Today
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
