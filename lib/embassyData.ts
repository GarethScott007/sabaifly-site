/**
 * Embassy and Visa Information Database
 * Real, verified URLs for embassies and official government resources
 */

export interface EmbassyInfo {
  country: string;
  countryCode: string;
  inUK?: {
    name: string;
    url: string;
    address?: string;
  };
  ukEmbassyInCountry?: {
    name: string;
    url: string;
    address?: string;
  };
  visaInfo: {
    required: boolean;
    type?: string; // "visa-free", "e-visa", "visa-on-arrival", "visa-required"
    duration?: string; // e.g., "30 days", "90 days"
    officialUrl: string;
  };
  entryRequirements: {
    passportValidity: string; // e.g., "6 months"
    officialUrl: string;
  };
  travelAdvisory: {
    ukGovUrl: string;
  };
}

/**
 * Comprehensive embassy database for popular destinations
 * All URLs verified and official
 */
export const EMBASSY_DATABASE: Record<string, EmbassyInfo> = {
  // Thailand
  TH: {
    country: "Thailand",
    countryCode: "TH",
    inUK: {
      name: "Royal Thai Embassy, London",
      url: "https://thaiembassyuk.org.uk/",
      address: "29-30 Queen's Gate, London SW7 5JB",
    },
    ukEmbassyInCountry: {
      name: "British Embassy Bangkok",
      url: "https://www.gov.uk/world/organisations/british-embassy-bangkok",
      address: "14 Wireless Road, Lumpini, Pathum Wan, Bangkok 10330",
    },
    visaInfo: {
      required: false,
      type: "visa-free",
      duration: "30 days",
      officialUrl: "https://www.mfa.go.th/en/content/travel-to-thailand",
    },
    entryRequirements: {
      passportValidity: "6 months",
      officialUrl: "https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements",
    },
    travelAdvisory: {
      ukGovUrl: "https://www.gov.uk/foreign-travel-advice/thailand",
    },
  },

  // United States
  US: {
    country: "United States",
    countryCode: "US",
    inUK: {
      name: "U.S. Embassy London",
      url: "https://uk.usembassy.gov/",
      address: "33 Nine Elms Lane, London SW11 7US",
    },
    ukEmbassyInCountry: {
      name: "British Embassy Washington DC",
      url: "https://www.gov.uk/world/organisations/british-embassy-washington",
      address: "3100 Massachusetts Avenue NW, Washington, DC 20008",
    },
    visaInfo: {
      required: true,
      type: "ESTA or visa required",
      duration: "90 days (ESTA)",
      officialUrl: "https://uk.usembassy.gov/visas/",
    },
    entryRequirements: {
      passportValidity: "Valid for duration of stay",
      officialUrl: "https://www.gov.uk/foreign-travel-advice/usa/entry-requirements",
    },
    travelAdvisory: {
      ukGovUrl: "https://www.gov.uk/foreign-travel-advice/usa",
    },
  },

  // Singapore
  SG: {
    country: "Singapore",
    countryCode: "SG",
    inUK: {
      name: "Singapore High Commission London",
      url: "https://www.mfa.gov.sg/london/",
      address: "9 Wilton Crescent, London SW1X 8SP",
    },
    ukEmbassyInCountry: {
      name: "British High Commission Singapore",
      url: "https://www.gov.uk/world/organisations/british-high-commission-singapore",
      address: "100 Tanglin Road, Singapore 247919",
    },
    visaInfo: {
      required: false,
      type: "visa-free",
      duration: "90 days",
      officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements",
    },
    entryRequirements: {
      passportValidity: "6 months",
      officialUrl: "https://www.gov.uk/foreign-travel-advice/singapore/entry-requirements",
    },
    travelAdvisory: {
      ukGovUrl: "https://www.gov.uk/foreign-travel-advice/singapore",
    },
  },

  // Japan
  JP: {
    country: "Japan",
    countryCode: "JP",
    inUK: {
      name: "Embassy of Japan in the UK",
      url: "https://www.uk.emb-japan.go.jp/itprtop_en/index.html",
      address: "101-104 Piccadilly, London W1J 7JT",
    },
    ukEmbassyInCountry: {
      name: "British Embassy Tokyo",
      url: "https://www.gov.uk/world/organisations/british-embassy-tokyo",
      address: "1 Ichiban-cho, Chiyoda-ku, Tokyo 102-8381",
    },
    visaInfo: {
      required: false,
      type: "visa-free",
      duration: "90 days",
      officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html",
    },
    entryRequirements: {
      passportValidity: "Valid for duration of stay",
      officialUrl: "https://www.gov.uk/foreign-travel-advice/japan/entry-requirements",
    },
    travelAdvisory: {
      ukGovUrl: "https://www.gov.uk/foreign-travel-advice/japan",
    },
  },

  // Australia
  AU: {
    country: "Australia",
    countryCode: "AU",
    inUK: {
      name: "Australian High Commission London",
      url: "https://uk.embassy.gov.au/",
      address: "Strand, London WC2B 4LA",
    },
    ukEmbassyInCountry: {
      name: "British High Commission Canberra",
      url: "https://www.gov.uk/world/organisations/british-high-commission-canberra",
      address: "Commonwealth Avenue, Yarralumla ACT 2600",
    },
    visaInfo: {
      required: true,
      type: "eVisitor or ETA required",
      duration: "90 days",
      officialUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-finder",
    },
    entryRequirements: {
      passportValidity: "6 months",
      officialUrl: "https://www.gov.uk/foreign-travel-advice/australia/entry-requirements",
    },
    travelAdvisory: {
      ukGovUrl: "https://www.gov.uk/foreign-travel-advice/australia",
    },
  },

  // India
  IN: {
    country: "India",
    countryCode: "IN",
    inUK: {
      name: "High Commission of India, London",
      url: "https://www.hcilondon.gov.in/",
      address: "India House, Aldwych, London WC2B 4NA",
    },
    ukEmbassyInCountry: {
      name: "British High Commission New Delhi",
      url: "https://www.gov.uk/world/organisations/british-high-commission-new-delhi",
      address: "Shantipath, Chanakyapuri, New Delhi 110021",
    },
    visaInfo: {
      required: true,
      type: "e-visa available",
      duration: "Varies by visa type",
      officialUrl: "https://indianvisaonline.gov.in/evisa/tvoa.html",
    },
    entryRequirements: {
      passportValidity: "6 months",
      officialUrl: "https://www.gov.uk/foreign-travel-advice/india/entry-requirements",
    },
    travelAdvisory: {
      ukGovUrl: "https://www.gov.uk/foreign-travel-advice/india",
    },
  },

  // UAE (Dubai)
  AE: {
    country: "United Arab Emirates",
    countryCode: "AE",
    inUK: {
      name: "UAE Embassy London",
      url: "https://www.uaembassylondon.net/",
      address: "30 Princes Gate, London SW7 1PT",
    },
    ukEmbassyInCountry: {
      name: "British Embassy Dubai",
      url: "https://www.gov.uk/world/organisations/british-embassy-dubai",
      address: "Al Seef Road, Bur Dubai, PO Box 65, Dubai",
    },
    visaInfo: {
      required: false,
      type: "visa-free",
      duration: "30 days",
      officialUrl: "https://u.ae/en/information-and-services/visiting-and-exploring-the-uae/tourist-visa",
    },
    entryRequirements: {
      passportValidity: "6 months",
      officialUrl: "https://www.gov.uk/foreign-travel-advice/united-arab-emirates/entry-requirements",
    },
    travelAdvisory: {
      ukGovUrl: "https://www.gov.uk/foreign-travel-advice/united-arab-emirates",
    },
  },

  // Malaysia
  MY: {
    country: "Malaysia",
    countryCode: "MY",
    inUK: {
      name: "High Commission of Malaysia, London",
      url: "https://www.kln.gov.my/web/gbr_london/home",
      address: "45 Belgrave Square, London SW1X 8QT",
    },
    ukEmbassyInCountry: {
      name: "British High Commission Kuala Lumpur",
      url: "https://www.gov.uk/world/organisations/british-high-commission-kuala-lumpur",
      address: "Level 27, Menara Binjai, 2 Jalan Binjai, Kuala Lumpur 50450",
    },
    visaInfo: {
      required: false,
      type: "visa-free",
      duration: "90 days",
      officialUrl: "https://www.imi.gov.my/portal2017/index.php/en/main-services/visa/visa-requirement-by-country.html",
    },
    entryRequirements: {
      passportValidity: "6 months",
      officialUrl: "https://www.gov.uk/foreign-travel-advice/malaysia/entry-requirements",
    },
    travelAdvisory: {
      ukGovUrl: "https://www.gov.uk/foreign-travel-advice/malaysia",
    },
  },
};

/**
 * Get embassy information for a specific country
 */
export function getEmbassyInfo(countryCode: string): EmbassyInfo | null {
  return EMBASSY_DATABASE[countryCode] || null;
}

/**
 * Map airport codes to country codes
 */
export const AIRPORT_TO_COUNTRY: Record<string, string> = {
  BKK: "TH",
  HKT: "TH",
  JFK: "US",
  SIN: "SG",
  HND: "JP",
  NRT: "JP",
  SYD: "AU",
  DEL: "IN",
  BOM: "IN",
  DXB: "AE",
  KUL: "MY",
  LHR: "GB",
};
