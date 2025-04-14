
// This is a simplified dataset of Indian locations
// In a production app, you would use a more comprehensive API or dataset

export const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

// Sample districts for some states (in a real app, this would be more comprehensive)
export const stateDistricts: Record<string, string[]> = {
  "Maharashtra": [
    "Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Kolhapur"
  ],
  "Karnataka": [
    "Bengaluru", "Mysuru", "Hubballi-Dharwad", "Mangaluru", "Belagavi", "Kalaburagi", "Davanagere"
  ],
  "Tamil Nadu": [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Vellore"
  ],
  "Delhi": [
    "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi",
    "North West Delhi", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"
  ],
  "Gujarat": [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh"
  ],
  // Add more states with their districts as needed
};

// This function returns districts for a given state
export const getDistricts = (state: string): string[] => {
  return stateDistricts[state] || [];
};

// This is a simplified city list function
// In a real app, this would be connected to a comprehensive API
export const getCities = (district: string): string[] => {
  // For simplicity, we're returning a fixed set of sample cities
  // In a real app, this would return cities specific to the district
  const sampleCities = [
    `${district} North`,
    `${district} South`,
    `${district} East`,
    `${district} West`,
    `${district} Central`,
    "New Area",
    "Old Area",
  ];
  
  return sampleCities;
};
