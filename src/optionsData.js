export const chartTypeOptions = [
  { value: 'time-series', label: 'CPI over time (Line Chart)' },
  { value: 'compare', label: 'Drivers of CPI between time periods (Waterfall Chart)' },
]

export const typeOptions = [
    { value: 'Monthly Rate', label: 'Monthly % Change' },
    { value: 'Annual Rate', label: 'Annual % Change' },
    { value: 'Level', label:  'Level' },
  ]

export const metricOptions = [
  { value: 'Level', label:  'CPI Level' },
  { value: 'Monthly Rate', label: 'MoM % Change' },
  { value: 'Annual Rate', label: 'YoY % Change' }
]

export const granularityOptions = [
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Annual', label: 'Annual' },
]

export const monthOptions = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
];

export const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

export const monthToString = {
  "January": "01",
  "February": "02",
  "March": "03",
  "April": "04",
  "May": "05",
  "June": "06",
  "July": "07",
  "August": "08",
  "September": "09",
  "October": "10",
  "November": "11",
  "December": "12"
};

export const stringToMonth = {
  "01": "January",
  "02": "February",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  "10": "October",
  "11": "November",
  "12": "December"
};



export const yearOptions = [];
for (let i = 1999; i <= new Date().getFullYear(); i++) {
    yearOptions.push({ value: i.toString(), label: i.toString() });
}

export const seriesData = [
  { series_id: 'CUUR0000SA0', series: 'Overall (Headline CPI)', level: 0, weight: 100.0 },
  { series_id: 'CUUR0000SAF', series: 'Food and beverages', level: 1, weight: 15.1 },
  { series_id: 'CUUR0000SAF11', series: 'Food at home', level: 2, weight: 8.2 },
  { series_id: 'CUUR0000SAF111', series: 'Cereals and bakery products', level: 3, weight: 1.2 },
  { series_id: 'CUUR0000SAF112', series: 'Meats, poultry, fish, and eggs', level: 3, weight: 2.0 },
  { series_id: 'CUUR0000SEFJ', series: 'Dairy and related products', level: 3, weight: 0.9 },
  { series_id: 'CUUR0000SAF113', series: 'Fruits and vegetables', level: 3, weight: 1.3 },
  { series_id: 'CUUR0000SAF114', series: 'Nonalcoholic beverages and beverage materials', level: 3, weight: 1.0 },
  { series_id: 'CUUR0000SAF115', series: 'Other food at home', level: 3, weight: 2.0 },
  { series_id: 'CUUR0000SEFV', series: 'Food away from home', level: 2, weight: 5.9 },
  { series_id: 'CUUR0000SAF116', series: 'Alcoholic beverages', level: 2, weight: 1.0 },
  { series_id: 'CUUR0000SAH', series: 'Housing', level: 1, weight: 41.9 },
  { series_id: 'CUUR0000SAH1', series: 'Shelter', level: 2, weight: 32.5 },
  { series_id: 'CUUR0000SEHA', series: 'Rent of primary residence', level: 3, weight: 6.9 },
  { series_id: 'CUUR0000SEHB', series: 'Lodging away from home', level: 3, weight: 1.6 },
  { series_id: 'CUUR0000SEHC01', series: "Owners' equivalent rent of primary residence", level: 3, weight: 22.9 },
  { series_id: 'CUUR0000SEHD', series: 'Tenants and household insurance', level: 3, weight: 0.4 },
  { series_id: 'CUUR0000SAH2', series: 'Fuels and utilities', level: 2, weight: 4.9 },
  { series_id: 'CUUR0000SEHE', series: 'Fuel oil and other fuels', level: 3, weight: 0.3 },
  { series_id: 'CUUR0000SEHF', series: 'Energy services', level: 3, weight: 3.6 },
  { series_id: 'CUUR0000SEHG', series: 'Water and Sewer Services', level: 3, weight: 1.0 },
  { series_id: 'CUUR0000SAH3', series: 'Household furnishings and operations', level: 2, weight: 4.5 },
  { series_id: 'CUUR0000SAA', series: 'Apparel', level: 1, weight: 3.5 },
  { series_id: 'CUUR0000SAA1', series: "Men's and boys' apparel", level: 2, weight: 0.9 },
  { series_id: 'CUUR0000SAA2', series: "Women's and girls' apparel", level: 2, weight: 1.5 },
  { series_id: 'CUUR0000SEAE', series: 'Footwear', level: 2, weight: 0.7 },
  { series_id: 'CUUR0000SEAF', series: "Infants' and toddlers' apparel", level: 2, weight: 0.2 },
  { series_id: 'CUUR0000SEAG', series: 'Jewelry and watches', level: 2, weight: 0.3 },
  { series_id: 'CUUR0000SAT', series: 'Transportation', level: 1, weight: 16.7 },
  { series_id: 'CUUR0000SAT1', series: 'Private Transportation', level: 2, weight: 15.5 },
  { series_id: 'CUUR0000SETA', series: 'New and used motor vehicles', level: 3, weight: 7.2 },
  { series_id: 'CUUR0000SETB', series: 'Motor fuel', level: 3, weight: 3.8 },
  { series_id: 'CUUR0000SETC', series: 'Motor vehicle parts and equipment', level: 3, weight: 0.4 },
  { series_id: 'CUUR0000SETD', series: 'Motor vehicle maintenance and repair', level: 3, weight: 1.2 },
  { series_id: 'CUUR0000SETE', series: 'Motor vehicle insurance', level: 3, weight: 2.3 },
  { series_id: 'CUUR0000SETF', series: 'Motor vehicle fees', level: 3, weight: 0.5 },
  { series_id: 'CUUR0000SETG', series: 'Public transportation', level: 2, weight: 1.1 },
  { series_id: 'CUUR0000SETG01', series: 'Airline fare', level: 3, weight: 0.7 },
  { series_id: 'CUUR0000SETG02', series: 'Other intercity transportation', level: 3, weight: 0.2 },
  { series_id: 'CUUR0000SETG03', series: 'Intracity transportation', level: 3, weight: 0.3 },
  { series_id: 'CUUR0000SAM', series: 'Medical care', level: 1, weight: 7.1 },
  { series_id: 'CUUR0000SAM1', series: 'Medical care commodities', level: 2, weight: 1.6 },
  { series_id: 'CUUR0000SAM2', series: 'Medical care services', level: 2, weight: 5.6 },
  { series_id: 'CUUR0000SAR', series: 'Recreation', level: 1, weight: 5.8 },
  { series_id: 'CUUR0000SERA', series: 'Video and audio', level: 2, weight: 1.7 },
  { series_id: 'CUUR0000SERB', series: 'Pets, pet products and services', level: 2, weight: 0.9 },
  { series_id: 'CUUR0000SERC', series: 'Sporting goods', level: 2, weight: 0.6 },
  { series_id: 'CUUR0000SERD', series: 'Photography', level: 2, weight: 0.1 },
  { series_id: 'CUUR0000SERE', series: 'Other recreational goods', level: 2, weight: 0.4 },
  { series_id: 'CUUR0000SERF', series: 'Recreation services', level: 2, weight: 1.8 },
  { series_id: 'CUUR0000SERG', series: 'Recreational reading materials', level: 2, weight: 0.3 },
  { series_id: 'CUUR0000SAE', series: 'Education and communication', level: 1, weight: 6.3 },
  { series_id: 'CUUR0000SAE1', series: 'Education', level: 2, weight: 3.0 },
  { series_id: 'CUUR0000SAE2', series: 'Communication', level: 2, weight: 3.3 },
  { series_id: 'CUUR0000SAG', series: 'Other goods and services', level: 1, weight: 3.5 },
  { series_id: 'CUUR0000SEGA', series: 'Tobacco and smoking products', level: 2, weight: 0.8 },
  { series_id: 'CUUR0000SAG1', series: 'Personal care goods and services', level: 2, weight: 2.7 },
];

export const seriesObj = {
  "CUUR0000SA0": { series: "Overall", level: 0, weight: 100.0 },
  "CUUR0000SAF": { series: "Food and beverages", level: 1, weight: 15.1 },
  "CUUR0000SAF11": { series: "Food at home", level: 2, weight: 8.2 },
  "CUUR0000SAF111": { series: "Cereals and bakery products", level: 3, weight: 1.2 },
  "CUUR0000SAF112": { series: "Meats, poultry, fish, and eggs", level: 3, weight: 2.0 },
  "CUUR0000SEFJ": { series: "Dairy and related products", level: 3, weight: 0.9 },
  "CUUR0000SAF113": { series: "Fruits and vegetables", level: 3, weight: 1.3 },
  "CUUR0000SAF114": { series: "Nonalcoholic beverages and beverage materials", level: 3, weight: 1.0 },
  "CUUR0000SAF115": { series: "Other food at home", level: 3, weight: 2.0 },
  "CUUR0000SEFV": { series: "Food away from home", level: 2, weight: 5.9 },
  "CUUR0000SAF116": { series: "Alcoholic beverages", level: 2, weight: 1.0 },
  "CUUR0000SAH": { series: "Housing", level: 1, weight: 41.9 },
  "CUUR0000SAH1": { series: "Shelter", level: 2, weight: 32.5 },
  "CUUR0000SEHA": { series: "Rent of primary residence", level: 3, weight: 6.9 },
  "CUUR0000SEHB": { series: "Lodging away from home", level: 3, weight: 1.6 },
  "CUUR0000SEHC01": { series: "Owners' equivalent rent of primary residence", level: 3, weight: 22.9 },
  "CUUR0000SEHD": { series: "Tenants and household insurance", level: 3, weight: 0.4 },
  "CUUR0000SAH2": { series: "Fuels and utilities", level: 2, weight: 4.9 },
  "CUUR0000SEHE": { series: "Fuel oil and other fuels", level: 3, weight: 0.3 },
  "CUUR0000SEHF": { series: "Energy services", level: 3, weight: 3.6 },
  "CUUR0000SEHG": { series: "Water and Sewer Services", level: 3, weight: 1.0 },
  "CUUR0000SAH3": { series: "Household furnishings and operations", level: 2, weight: 4.5 },
  "CUUR0000SAA": { series: "Apparel", level: 1, weight: 3.5 },
  "CUUR0000SAA1": { series: "Men's and boys' apparel", level: 2, weight: 0.9 },
  "CUUR0000SAA2": { series: "Women's and girls' apparel", level: 2, weight: 1.5 },
  "CUUR0000SEAE": { series: "Footwear", level: 2, weight: 0.7 },
  "CUUR0000SEAF": { series: "Infants' and toddlers' apparel", level: 2, weight: 0.2 },
  "CUUR0000SEAG": { series: "Jewelry and watches", level: 2, weight: 0.3 },
  "CUUR0000SAT": { series: "Transportation", level: 1, weight: 16.7 },
  "CUUR0000SAT1": { series: "Private Transportation", level: 2, weight: 15.5 },
  "CUUR0000SETA": { series: "New and used motor vehicles", level: 3, weight: 7.2 },
  "CUUR0000SETB": { series: "Motor fuel", level: 3, weight: 3.8 },
  "CUUR0000SETC": { series: "Motor vehicle parts and equipment", level: 3, weight: 0.4 },
  "CUUR0000SETD": { series: "Motor vehicle maintenance and repair", level: 3, weight: 1.2 },
  "CUUR0000SETE": { series: "Motor vehicle insurance", level: 3, weight: 2.3 },
  "CUUR0000SETF": { series: "Motor vehicle fees", level: 3, weight: 0.5 },
  "CUUR0000SETG": { series: "Public transportation", level: 2, weight: 1.1 },
  "CUUR0000SETG01": { series: "Airline fare", level: 3, weight: 0.7 },
  "CUUR0000SETG02": { series: "Other intercity transportation", level: 3, weight: 0.2 },
  "CUUR0000SETG03": { series: "Intracity transportation", level: 3, weight: 0.3 },
  "CUUR0000SAM": { series: "Medical care", level: 1, weight: 7.1 },
  "CUUR0000SAM1": { series: "Medical care commodities", level: 2, weight: 1.6 },
  "CUUR0000SAM2": { series: "Medical care services", level: 2, weight: 5.6 },
  "CUUR0000SAR": { series: "Recreation", level: 1, weight: 5.8 },
  "CUUR0000SERA": { series: "Video and audio", level: 2, weight: 1.7 },
  "CUUR0000SERB": { series: "Pets, pet products and services", level: 2, weight: 0.9 },
  "CUUR0000SERC": { series: "Sporting goods", level: 2, weight: 0.6 },
  "CUUR0000SERD": { series: "Photography", level: 2, weight: 0.1 },
  "CUUR0000SERE": { series: "Other recreational goods", level: 2, weight: 0.4 },
  "CUUR0000SERF": { series: "Recreation services", level: 2, weight: 1.8 },
  "CUUR0000SERG": { series: "Recreational reading materials", level: 2, weight: 0.3 },
  "CUUR0000SAE": { series: "Education and communication", level: 1, weight: 6.3 },
  "CUUR0000SAE1": { series: "Education", level: 2, weight: 3.0 },
  "CUUR0000SAE2": { series: "Communication", level: 2, weight: 3.3 },
  "CUUR0000SAG": { series: "Other goods and services", level: 1, weight: 3.5 },
  "CUUR0000SEGA": { series: "Tobacco and smoking products", level: 2, weight: 0.8 },
  "CUUR0000SAG1": { series: "Personal care goods and services", level: 2, weight: 2.7 },
};