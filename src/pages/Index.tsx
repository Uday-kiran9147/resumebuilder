import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Zap, Download, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto mb-6">
              <FileText className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Build Your Perfect Resume
            <span className="block text-primary mt-2">In Minutes</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Create professional, ATS-friendly resumes with our easy-to-use builder. 
            No signup required. Your data stays private in your browser.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Button 
              size="lg" 
              onClick={() => navigate("/editor")}
              className="text-lg px-8 py-6 bg-primary hover:bg-primary-hover"
            >
              Start Building Resume
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
          <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Lightning Fast</h3>
            <p className="text-sm text-muted-foreground">
              Create and edit your resume with real-time preview. No waiting, no loading.
            </p>
          </Card>

          <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg">Privacy First</h3>
            <p className="text-sm text-muted-foreground">
              No signup, no servers. Your resume data is stored locally in your browser.
            </p>
          </Card>

          <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Export Anywhere</h3>
            <p className="text-sm text-muted-foreground">
              Download as PDF for applications or backup as JSON to restore later.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-3xl mx-auto p-12 text-center bg-gradient-to-br from-primary/5 to-accent/5">
          <h2 className="text-3xl font-bold mb-4">Ready to land your dream job?</h2>
          <p className="text-muted-foreground mb-8">
            Join thousands who have created their professional resume with our builder.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/editor")}
            className="bg-primary hover:bg-primary-hover"
          >
            Create Resume Now
          </Button>
        </Card>
      </section>
    </div>
  );
};

export default Index;
