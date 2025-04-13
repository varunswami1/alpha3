
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Control } from "react-hook-form";
import { indianStates, getDistricts, getCities } from "@/utils/indianLocations";

interface AddressFieldsProps {
  control: Control<any>;
}

const AddressFields = ({ control }: AddressFieldsProps) => {
  const [districts, setDistricts] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  // Watch for state changes to update districts
  useEffect(() => {
    if (selectedState) {
      const stateDistricts = getDistricts(selectedState);
      setDistricts(stateDistricts);
      // Reset district and city when state changes
      setSelectedDistrict("");
      setCities([]);
    } else {
      setDistricts([]);
      setSelectedDistrict("");
      setCities([]);
    }
  }, [selectedState]);

  // Watch for district changes to update cities
  useEffect(() => {
    if (selectedDistrict) {
      const districtCities = getCities(selectedDistrict);
      setCities(districtCities);
    } else {
      setCities([]);
    }
  }, [selectedDistrict]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={control}
        name="addressLine"
        render={({ field }) => (
          <FormItem className="md:col-span-2">
            <FormLabel>Address Line</FormLabel>
            <FormControl>
              <Input placeholder="123 Main St, Apartment 4B" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>State</FormLabel>
            <Select 
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedState(value);
              }}
              value={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {indianStates.map(state => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="district"
        render={({ field: { onChange, value, ...rest }}) => (
          <FormItem>
            <FormLabel>District</FormLabel>
            <Select 
              onValueChange={(value) => {
                onChange(value);
                setSelectedDistrict(value);
              }}
              value={selectedState ? value : ""}
              disabled={!selectedState || districts.length === 0}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a district" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {districts.map(district => (
                  <SelectItem key={district} value={district}>
                    {district}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="city"
        render={({ field: { onChange, value, ...rest }}) => (
          <FormItem>
            <FormLabel>City</FormLabel>
            <Select 
              onValueChange={onChange}
              value={selectedDistrict ? value : ""}
              disabled={!selectedDistrict || cities.length === 0}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a city" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="pincode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>PIN Code</FormLabel>
            <FormControl>
              <Input placeholder="400001" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default AddressFields;
