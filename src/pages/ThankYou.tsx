import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Download, Home, Mail } from 'lucide-react';

const ThankYou = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || 'Applicant';
  const email = searchParams.get('email') || '';
  const ref = searchParams.get('ref') || '';

  useEffect(() => {
    // Add some celebration animation or confetti here if desired
    document.title = 'Application Submitted - Afrevo';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-[var(--shadow-elegant)] border-0">
          <CardHeader className="text-center bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-t-lg">
            <div className="flex justify-center mb-4">
              <div className="bg-primary-foreground/20 rounded-full p-4">
                <CheckCircle className="h-16 w-16 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold mb-2">
              Application Submitted Successfully!
            </CardTitle>
            <p className="text-primary-foreground/90 text-lg">
              Thank you for choosing Afrevo for your international career journey
            </p>
          </CardHeader>
          
          <CardContent className="p-8 text-center space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-primary">
                Welcome aboard, {name}! 🎉
              </h2>
              
              <div className="bg-muted/50 rounded-lg p-6 text-left space-y-3">
                <h3 className="font-semibold text-primary mb-3">What happens next?</h3>
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mt-0.5">1</div>
                    <div>
                      <p className="font-medium">Application Review</p>
                      <p className="text-sm text-muted-foreground">Our team will review your application within 48 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mt-0.5">2</div>
                    <div>
                      <p className="font-medium">Initial Screening</p>
                      <p className="text-sm text-muted-foreground">Qualified candidates will be contacted for a phone interview</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mt-0.5">3</div>
                    <div>
                      <p className="font-medium">Job Matching</p>
                      <p className="text-sm text-muted-foreground">We'll match you with suitable international opportunities</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mt-0.5">4</div>
                    <div>
                      <p className="font-medium">Documentation & Travel</p>
                      <p className="text-sm text-muted-foreground">We'll assist with visa processing and travel arrangements</p>
                    </div>
                  </div>
                </div>
              </div>

              {email && (
                <div className="bg-accent/30 rounded-lg p-4">
                  <div className="flex items-center justify-center space-x-2 text-primary">
                    <Mail className="h-5 w-5" />
                    <p className="font-medium">
                      Confirmation sent to: {email}
                    </p>
                  </div>
                </div>
              )}

              {ref && (
                <div className="text-sm text-muted-foreground">
                  <p>Reference Number: <span className="font-mono font-medium">{ref}</span></p>
                  <p className="mt-1">Please keep this number for your records</p>
                </div>
              )}
            </div>

            <div className="space-y-4 pt-6 border-t border-border">
              <h3 className="font-semibold text-primary">Important Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-muted/30 rounded p-4">
                  <h4 className="font-medium mb-2">📞 Stay Available</h4>
                  <p className="text-muted-foreground">Keep your phone accessible for our call within the next 48 hours</p>
                </div>
                
                <div className="bg-muted/30 rounded p-4">
                  <h4 className="font-medium mb-2">📧 Check Email</h4>
                  <p className="text-muted-foreground">Monitor your inbox (including spam folder) for updates</p>
                </div>
                
                <div className="bg-muted/30 rounded p-4">
                  <h4 className="font-medium mb-2">📋 Prepare Documents</h4>
                  <p className="text-muted-foreground">Have your passport and certificates ready for verification</p>
                </div>
                
                <div className="bg-muted/30 rounded p-4">
                  <h4 className="font-medium mb-2">💼 Job Readiness</h4>
                  <p className="text-muted-foreground">Be prepared to start within your specified timeframe</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button asChild className="flex-1">
                <Link to="/" className="flex items-center justify-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Return Home</span>
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => window.print()}
                className="flex-1 flex items-center justify-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Print Confirmation</span>
              </Button>
            </div>

            <div className="text-center text-sm text-muted-foreground pt-4 border-t border-border">
              <p>Questions? Contact us at:</p>
              <p className="font-medium">📧 info@afrevo.com | 📞 +234-XXX-XXXX</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThankYou;