import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface FormData {
  'Job Codes': string;
  'Full Name': string;
  'Date of Birth': string;
  'ID Number': string;
  'Nationality': string;
  'Country of Residence': string;
  'Country Code': string;
  'Phone Number': string;
  'Email Address': string;
  'Marital Status': string;
  'religious affiliation?': string;
  'Gender': string;
  'Number of Dependents': string;
  'Education Level': string;
  'Institution Name': string;
  'Graduation Year': string;
  'Technical Training': string;
  'English Proficiency': string;
  'Other Languages': string;
  'Previous Jobs': string;
  'Years of Experience': string;
  'Recent Job': string;
  'Reason for Leaving': string;
  'Overseas Experience': string;
  'Machinery Experience': string;
  'Physically Demanding Work': string;
  'Night Shift Experience': string;
  'Willing to Relocate': string;
  'Valid Passport': string;
  'Passport Number': string;
  'Travel Restrictions': string;
  'Travel Readiness': string;
  'Cold Remote Work': string;
  'Ship Work': string;
  'Disabilities': string;
  'Surgery Illness': string;
  'Medications': string;
  'Criminal Record': string;
  'Medical Exam Willing': string;
  'Availability Start': string;
  'Motivation Strategy': string;
  'Learning Adaptability': string;
  'Team Conflict Resolution': string;
  'Accept Any Position': string;
  'Accommodation Agreement': string;
  'Overtime Willing': string;
  'Contract Understanding': string;
  'Work Duration Abroad': string;
  'Family Support': string;
  'Understand Long Absence': string;
  'Financial Readiness': string;
  'Salary Expectations': string;
  'Bring Family Later': string;
  'Rule Agreement': string;
}

const PAYSTACK_PUBLIC_KEY = 'pk_live_d12d04e3c1f72132915a0c3b94b02d63671cb0a9';
const GAS_ENDPOINT = 'YOUR_GAS_WEB_APP_URL_HERE'; // Replace with your actual deployed GAS web app URL

export function ApplicationForm() {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobCodes = [
    'Construction Worker', 'Factory Worker', 'Agricultural Worker', 'Healthcare Assistant',
    'Restaurant Staff', 'Cleaner', 'Security Guard', 'Driver', 'Warehouse Worker', 'Other'
  ];

  const countries = [
    'Nigeria', 'Ghana', 'Kenya', 'Uganda', 'Tanzania', 'South Africa', 'Ethiopia', 'Rwanda', 'Other'
  ];

  const educationLevels = [
    'Primary School', 'Secondary School', 'Diploma/Certificate', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD'
  ];

  const initializePaystack = (formData: FormData) => {
    const handler = (window as any).PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: formData['Email Address'],
      amount: 50000, // ₦500 in kobo
      currency: 'NGN',
      ref: 'AFREVO_' + Date.now(),
      callback: function(response: any) {
        submitToGAS(formData, response.reference);
      },
      onClose: function() {
        toast.error('Payment was cancelled');
        setIsSubmitting(false);
      }
    });
    handler.openIframe();
  };

  const submitToGAS = async (formData: FormData, paymentRef: string) => {
    try {
      const payload = {
        ...formData,
        paymentRef: paymentRef
      };

      const response = await fetch(GAS_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      if (result.status === 'success') {
        toast.success('Application submitted successfully!');
        
        // Redirect to thank you page with URL parameters
        const params = new URLSearchParams({
          name: formData['Full Name'] || '',
          email: formData['Email Address'] || '',
          ref: paymentRef
        });
        
        window.location.href = `/thank-you?${params.toString()}`;
      } else {
        toast.error(result.message || 'Application submission failed');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    
    // Load Paystack script if not already loaded
    if (!(window as any).PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.onload = () => initializePaystack(data);
      document.body.appendChild(script);
    } else {
      initializePaystack(data);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4 tracking-tight">
            Afrevo Job Application
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Take the first step towards your international career opportunity. Complete your application below.
          </p>
        </div>

        <Card className="shadow-[var(--shadow-elegant)] border-0">
          <CardHeader className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-t-lg">
            <CardTitle className="text-2xl">Application Form</CardTitle>
            <CardDescription className="text-primary-foreground/90">
              Please fill out all required fields. Application fee: ₦500
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary border-b border-border pb-2">
                  Personal Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="jobCodes">Preferred Job Position *</Label>
                    <Select onValueChange={(value) => setValue('Job Codes', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select job position" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobCodes.map(job => (
                          <SelectItem key={job} value={job}>{job}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input 
                      {...register('Full Name', { required: 'Full name is required' })}
                      placeholder="Enter your full name"
                    />
                    {errors['Full Name'] && (
                      <p className="text-destructive text-sm mt-1">{errors['Full Name'].message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input 
                      type="date"
                      {...register('Date of Birth', { required: 'Date of birth is required' })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="idNumber">ID Number *</Label>
                    <Input 
                      {...register('ID Number', { required: 'ID number is required' })}
                      placeholder="National ID or Passport number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="nationality">Nationality *</Label>
                    <Select onValueChange={(value) => setValue('Nationality', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="countryOfResidence">Country of Residence *</Label>
                    <Select onValueChange={(value) => setValue('Country of Residence', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="countryCode">Country Code *</Label>
                    <Input 
                      {...register('Country Code', { required: 'Country code is required' })}
                      placeholder="+234"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input 
                      {...register('Phone Number', { required: 'Phone number is required' })}
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <Label htmlFor="emailAddress">Email Address *</Label>
                    <Input 
                      type="email"
                      {...register('Email Address', { required: 'Email is required' })}
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="maritalStatus">Marital Status *</Label>
                    <Select onValueChange={(value) => setValue('Marital Status', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Married">Married</SelectItem>
                        <SelectItem value="Divorced">Divorced</SelectItem>
                        <SelectItem value="Widowed">Widowed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="religiousAffiliation">Religious Affiliation</Label>
                    <Input 
                      {...register('religious affiliation?')}
                      placeholder="Your religion (optional)"
                    />
                  </div>

                  <div>
                    <Label>Gender *</Label>
                    <RadioGroup 
                      onValueChange={(value) => setValue('Gender', value)}
                      className="flex space-x-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label htmlFor="dependents">Number of Dependents</Label>
                    <Input 
                      type="number"
                      {...register('Number of Dependents')}
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              {/* Education */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary border-b border-border pb-2">
                  Education & Skills
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="educationLevel">Education Level *</Label>
                    <Select onValueChange={(value) => setValue('Education Level', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        {educationLevels.map(level => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="institutionName">Institution Name</Label>
                    <Input 
                      {...register('Institution Name')}
                      placeholder="Name of your school/university"
                    />
                  </div>

                  <div>
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input 
                      type="number"
                      {...register('Graduation Year')}
                      placeholder="2020"
                      min="1950"
                      max="2030"
                    />
                  </div>

                  <div>
                    <Label htmlFor="technicalTraining">Technical Training</Label>
                    <Input 
                      {...register('Technical Training')}
                      placeholder="Any technical certifications"
                    />
                  </div>

                  <div>
                    <Label htmlFor="englishProficiency">English Proficiency *</Label>
                    <Select onValueChange={(value) => setValue('English Proficiency', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Excellent">Excellent</SelectItem>
                        <SelectItem value="Good">Good</SelectItem>
                        <SelectItem value="Fair">Fair</SelectItem>
                        <SelectItem value="Poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="otherLanguages">Other Languages</Label>
                    <Input 
                      {...register('Other Languages')}
                      placeholder="Languages you speak"
                    />
                  </div>
                </div>
              </div>

              {/* Work Experience */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary border-b border-border pb-2">
                  Work Experience
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="previousJobs">Previous Jobs</Label>
                    <Textarea 
                      {...register('Previous Jobs')}
                      placeholder="List your previous jobs and responsibilities"
                      className="min-h-24"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="yearsExperience">Years of Experience</Label>
                      <Input 
                        type="number"
                        {...register('Years of Experience')}
                        placeholder="0"
                        min="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="recentJob">Most Recent Job</Label>
                      <Input 
                        {...register('Recent Job')}
                        placeholder="Your most recent position"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="reasonLeaving">Reason for Leaving</Label>
                    <Textarea 
                      {...register('Reason for Leaving')}
                      placeholder="Why did you leave your last job?"
                    />
                  </div>
                </div>
              </div>

              {/* Work Preferences & Capabilities */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary border-b border-border pb-2">
                  Work Preferences & Capabilities
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { key: 'Overseas Experience', label: 'Have you worked overseas before?' },
                    { key: 'Machinery Experience', label: 'Do you have machinery experience?' },
                    { key: 'Physically Demanding Work', label: 'Can you handle physically demanding work?' },
                    { key: 'Night Shift Experience', label: 'Have you worked night shifts?' },
                    { key: 'Willing to Relocate', label: 'Are you willing to relocate?' },
                    { key: 'Valid Passport', label: 'Do you have a valid passport?' },
                    { key: 'Cold Remote Work', label: 'Can you work in cold/remote areas?' },
                    { key: 'Ship Work', label: 'Are you willing to work on ships?' }
                  ].map(item => (
                    <div key={item.key}>
                      <Label>{item.label}</Label>
                      <RadioGroup 
                        onValueChange={(value) => setValue(item.key as keyof FormData, value)}
                        className="flex space-x-4 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Yes" id={`${item.key}-yes`} />
                          <Label htmlFor={`${item.key}-yes`}>Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="No" id={`${item.key}-no`} />
                          <Label htmlFor={`${item.key}-no`}>No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  ))}
                </div>

                {watch('Valid Passport') === 'Yes' && (
                  <div>
                    <Label htmlFor="passportNumber">Passport Number</Label>
                    <Input 
                      {...register('Passport Number')}
                      placeholder="Enter your passport number"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="travelRestrictions">Travel Restrictions</Label>
                    <Textarea 
                      {...register('Travel Restrictions')}
                      placeholder="Any travel restrictions or limitations"
                    />
                  </div>

                  <div>
                    <Label htmlFor="travelReadiness">Travel Readiness</Label>
                    <Select onValueChange={(value) => setValue('Travel Readiness', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="When can you travel?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Immediately">Immediately</SelectItem>
                        <SelectItem value="Within 1 month">Within 1 month</SelectItem>
                        <SelectItem value="Within 3 months">Within 3 months</SelectItem>
                        <SelectItem value="Within 6 months">Within 6 months</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Additional Questions */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary border-b border-border pb-2">
                  Additional Information
                </h3>
                
                <div className="space-y-4">
                  {[
                    { key: 'Disabilities', label: 'Do you have any disabilities?', type: 'text' },
                    { key: 'Surgery Illness', label: 'Any recent surgeries or illnesses?', type: 'text' },
                    { key: 'Medications', label: 'Are you on any medications?', type: 'text' },
                    { key: 'Criminal Record', label: 'Do you have a criminal record?', type: 'radio' },
                    { key: 'Medical Exam Willing', label: 'Are you willing to take a medical exam?', type: 'radio' },
                    { key: 'Availability Start', label: 'When can you start work?', type: 'date' }
                  ].map(item => (
                    <div key={item.key}>
                      <Label>{item.label}</Label>
                      {item.type === 'text' && (
                        <Input {...register(item.key as keyof FormData)} />
                      )}
                      {item.type === 'date' && (
                        <Input type="date" {...register(item.key as keyof FormData)} />
                      )}
                      {item.type === 'radio' && (
                        <RadioGroup 
                          onValueChange={(value) => setValue(item.key as keyof FormData, value)}
                          className="flex space-x-4 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Yes" id={`${item.key}-yes`} />
                            <Label htmlFor={`${item.key}-yes`}>Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="No" id={`${item.key}-no`} />
                            <Label htmlFor={`${item.key}-no`}>No</Label>
                          </div>
                        </RadioGroup>
                      )}
                    </div>
                  ))}

                  <div>
                    <Label htmlFor="salaryExpectations">Salary Expectations</Label>
                    <Input 
                      {...register('Salary Expectations')}
                      placeholder="Your expected salary range"
                    />
                  </div>
                </div>
              </div>

              {/* Agreement Checkboxes */}
              <div className="space-y-4 p-6 bg-muted/50 rounded-lg">
                <h4 className="font-medium text-primary">Required Agreements</h4>
                
                {[
                  { key: 'Accept Any Position', label: 'I accept that I may be placed in any available position' },
                  { key: 'Accommodation Agreement', label: 'I agree to company-provided accommodation' },
                  { key: 'Overtime Willing', label: 'I am willing to work overtime when required' },
                  { key: 'Contract Understanding', label: 'I understand the employment contract terms' },
                  { key: 'Family Support', label: 'My family supports my decision to work abroad' },
                  { key: 'Understand Long Absence', label: 'I understand I may be away from home for extended periods' },
                  { key: 'Financial Readiness', label: 'I am financially prepared for the transition' },
                  { key: 'Rule Agreement', label: 'I agree to abide by all company rules and regulations' }
                ].map(item => (
                  <div key={item.key} className="flex items-center space-x-2">
                    <Checkbox 
                      onCheckedChange={(checked) => setValue(item.key as keyof FormData, checked ? 'Yes' : 'No')}
                    />
                    <Label className="text-sm">{item.label}</Label>
                  </div>
                ))}
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-6 text-lg font-medium bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-[var(--shadow-elegant)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Submit Application & Pay ₦500'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}