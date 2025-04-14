
import { useState } from "react";
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";
import { Button } from "@/components/ui/button";

interface TermsAndConditionsProps {
  control: Control<any>;
}

const TermsAndConditions = ({ control }: TermsAndConditionsProps) => {
  const [showTerms, setShowTerms] = useState(false);

  const toggleTerms = () => setShowTerms((prev) => !prev);

  return (
    <div className="space-y-2">
      <FormField
        control={control}
        name="agreedToTerms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <div>
                I agree to the{" "}
                <button type="button" className="text-primary hover:underline" onClick={toggleTerms}>
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="text-primary hover:underline" onClick={toggleTerms}>
                  Privacy Policy
                </button>
              </div>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {showTerms && (
        <div className="border rounded-md p-4 text-sm bg-muted">
          <h3 className="font-semibold mb-2">Terms & Conditions</h3>
          <p>
            By accessing and using this application, you agree to abide by all applicable laws and regulations. 
            Your personal data will be handled in accordance with our Privacy Policy. 
            You are responsible for the security of your login credentials and any activity under your account. 
            Misuse of the application, such as attempting to access restricted areas or harm the system, is prohibited.
          </p>
          <p className="mt-2">
            We reserve the right to update the terms at any time. Continued use of the application implies acceptance of these changes.
          </p>
        </div>
      )}
    </div>
  );
};

export default TermsAndConditions;
