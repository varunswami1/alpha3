
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

  return (
    <FormField
      control={control}
      name="agreedToTerms"
      render={({ field }) => (
        <FormItem className="flex flex-col space-y-2 rounded-md p-4 border">
          <div className="flex items-start space-x-3">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 text-sm">
              <div>
                I agree to the{" "}
                <button
                  type="button"
                  onClick={() => setShowTerms(!showTerms)}
                  className="text-primary hover:underline"
                >
                  Terms and Conditions
                </button>
              </div>
              <FormMessage />
            </div>
          </div>

          {showTerms && (
            <div className="mt-2 text-sm bg-gray-100 p-3 rounded-md max-h-60 overflow-auto">
              <h3 className="font-semibold mb-1">Terms & Conditions</h3>
              <p className="mb-2">
                By using this application, you agree to provide accurate information and not misuse the platform.
                We are not liable for data loss, unauthorized access, or technical disruptions.
              </p>
              <p className="mb-2">
                You must comply with all applicable laws while using the app. All user data is handled according to
                our privacy policy. You consent to allow us to store and process your data as described.
              </p>
              <p className="mb-2">
                Violation of these terms may result in suspension or permanent ban from the service.
              </p>
              <p>
                These terms may be updated from time to time. It is your responsibility to check for changes.
              </p>
            </div>
          )}
        </FormItem>
      )}
    />
  );
};

export default TermsAndConditions;
