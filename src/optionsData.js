
export const typeOptions = [
    { value: 'CPI Level', label: 'CPI Level' },
    { value: 'CPI Rate', label: 'CPI Rate' },
  ]

export const granularityOptions = [
    { value: 'Monthly', label: 'Monthly' },
    { value: 'Annual', label: 'Annual' },
]

export const monthOptions = [
    { value: 'January', label: 'January' },
    { value: 'February', label: 'February' },
    { value: 'March', label: 'March' },
    { value: 'April', label: 'April' },
    { value: 'May', label: 'May' },
    { value: 'June', label: 'June' },
    { value: 'July', label: 'July' },
    { value: 'August', label: 'August' },
    { value: 'September', label: 'September' },
    { value: 'October', label: 'October' },
    { value: 'November', label: 'November' },
    { value: 'December', label: 'December' }
];

export const detailOptions = [
    { value: '0', label: 'Level 0: Headline CPI' },
    { value: '1', label: 'Level 1:  Key Categories' },
    { value: '2', label: 'Level 2: Key Subcategories' },
    { value: '3', label: 'Level 3: Detailed Subcategories' }
];

export const level0Categories = [
    { value: 'CUUR0000SA0', label: 'Headline CPI', color: '#00B8D9'},
  ];

export const level1Categories = [
    { value: 'CUUR0000SAA', label: 'Apparel', color: '#00B8D9'},
    { value: 'CUUR0000SAE', label: 'Education & Communication', color: '#00B8D9'},
    { value: 'CUUR0000SAF', label: 'Food & Beverages', color: '#00B8D9'},
    { value: 'CUUR0000SAH', label: 'Housing', color: '#00B8D9'},
    { value: 'CUUR0000SAM', label: 'Medical Care', color: '#00B8D9'},
    { value: 'CUUR0000SAR', label: 'Recreation', color: '#00B8D9'},
    { value: 'CUUR0000SAT', label: 'Transportation', color: '#00B8D9'},
    { value: 'CUUR0000SAG', label: 'Other Goods & Services', color: '#00B8D9'},
  ];

  export const level2Categories = [
    { value: 'CUUR0000SAF116', label: 'Alcoholic Beverages', color: '#0052CC' },
    { value: 'CUUR0000SAF11', label: 'Food at Home', color: '#0052CC' },
    { value: 'CUUR0000SEFV', label: 'Food Away from Home', color: '#0052CC' },
    { value: 'CUUR0000SAE2', label: 'Communication Goods & Services', color: '#0052CC' },
    { value: 'CUUR0000SAE1', label: 'Education Goods & Services', color: '#0052CC' },
    { value: 'CUUR0000SAA1', label: "Men's and Boys' Apparel", color: '#0052CC' },
    { value: 'CUUR0000SEAE', label: 'Footwear', color: '#0052CC' },
    { value: 'CUUR0000SAA2', label: "Women's and Girls' Apparel", color: '#0052CC' },
    { value: 'CUUR0000SEAF', label: "Infants' and Toddlers' Apparel", color: '#0052CC' },
    { value: 'CUUR0000SEAG', label: 'Jewelry and Watches', color: '#0052CC' },
    { value: 'CUUR0000SAH2', label: 'Fuels and Utilities', color: '#0052CC' },
    { value: 'CUUR0000SAH1', label: 'Shelter', color: '#0052CC' },
    { value: 'CUUR0000SAH3', label: 'Household Furnishings and Operations', color: '#0052CC' },
    { value: 'CUUR0000SAM1', label: 'Medical Care Commodities', color: '#0052CC' },
    { value: 'CUUR0000SAM2', label: 'Medical Care Services', color: '#0052CC' },
    { value: 'CUUR0000SAG1', label: 'Personal Care Goods and Services', color: '#0052CC' },
    { value: 'CUUR0000SERB', label: 'Pets, Pet Products and Services', color: '#0052CC' },
    { value: 'CUUR0000SAT1', label: 'Private Transportation', color: '#0052CC' },
    { value: 'CUUR0000SETG', label: 'Public Transportation', color: '#0052CC' },
    { value: 'CUUR0000SERF', label: 'Recreation Services', color: '#0052CC' },
    { value: 'CUUR0000SERG', label: 'Recreational Reading Materials', color: '#0052CC' },
    { value: 'CUUR0000SERE', label: 'Other Recreational Goods', color: '#0052CC' },
    { value: 'CUUR0000SERD', label: 'Photography', color: '#0052CC' },
    { value: 'CUUR0000SERC', label: 'Sporting Goods', color: '#0052CC' },
    { value: 'CUUR0000SERA', label: 'Video and Audio', color: '#0052CC' },
    { value: 'CUUR0000SEGA', label: 'Tobacco and Smoking Products', color: '#0052CC' },
];

export const level3Categories = [
    { value: 'CUUR0000SETG01', label: 'Airline Fare', color: '#5243AA' },
    { value: 'CUUR0000SAF111', label: 'Cereals and Bakery Products', color: '#5243AA' },
    { value: 'CUUR0000SEFJ', label: 'Dairy and Related Products', color: '#5243AA' },
    { value: 'CUUR0000SAF113', label: 'Fruits and Vegetables', color: '#5243AA' },
    { value: 'CUUR0000SAF112', label: 'Meats, Poultry, Fish, and Eggs', color: '#5243AA' },
    { value: 'CUUR0000SAF114', label: 'Nonalcoholic Beverages and Beverage Materials', color: '#5243AA' },
    { value: 'CUUR0000SAF115', label: 'Other Food at Home', color: '#5243AA' },
    { value: 'CUUR0000SEHE', label: 'Fuel Oil and Other Fuels', color: '#5243AA' },
    { value: 'CUUR0000SEHF', label: 'Energy Services', color: '#5243AA' },
    { value: 'CUUR0000SEHG', label: 'Water and Sewer Services', color: '#5243AA' },
    { value: 'CUUR0000SEHC01', label: "Owners' Equivalent Rent of Primary Residence", color: '#5243AA' },
    { value: 'CUUR0000SEHA', label: 'Rent of Primary Residence', color: '#5243AA' },
    { value: 'CUUR0000SEHB', label: 'Lodging Away from Home', color: '#5243AA' },
    { value: 'CUUR0000SEHD', label: 'Tenants and Household Insurance', color: '#5243AA' },
    { value: 'CUUR0000SETB', label: 'Motor Fuel', color: '#5243AA' },
    { value: 'CUUR0000SETF', label: 'Motor Vehicle Fees', color: '#5243AA' },
    { value: 'CUUR0000SETE', label: 'Motor Vehicle Insurance', color: '#5243AA' },
    { value: 'CUUR0000SETD', label: 'Motor Vehicle Maintenance and Repair', color: '#5243AA' },
    { value: 'CUUR0000SETC', label: 'Motor Vehicle Parts and Equipment', color: '#5243AA' },
    { value: 'CUUR0000SETA', label: 'New and Used Motor Vehicles', color: '#5243AA' },
    { value: 'CUUR0000SETG03', label: 'Intracity Transportation', color: '#5243AA' },
    { value: 'CUUR0000SETG02', label: 'Other Intercity Transportation', color: '#5243AA' },
];

export const groupedOptions = [
    {
      label: 'Level 0 - Headline CPI',
      options: level0Categories,
    },
    {
      label: 'Level 1 - Key Categories',
      options: level1Categories,
    },
    {
      label: 'Level 2 - Subcategories',
      options: level2Categories,
    },
    {
      label: 'Level 3 - Detailed Subcategories',
      options: level3Categories,
    }
  ];

export const yearOptions = [];
for (let i = 1998; i <= new Date().getFullYear(); i++) {
    yearOptions.push({ value: i.toString(), label: i.toString() });
}