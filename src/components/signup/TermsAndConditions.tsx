
import { FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Control } from "react-hook-form";

interface TermsAndConditionsProps {
  control: Control<any>;
}

const TermsAndConditions = ({ control }: TermsAndConditionsProps) => {
  return (
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
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </div>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default TermsAndConditions;
