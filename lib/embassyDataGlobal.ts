/**
 * GLOBAL Embassy and Visa Information Database
 * Locale-aware: Shows embassies relevant to the user's country
 * Supports travelers from ANY country to ANY destination
 */

// Locale to country code mapping
export const LOCALE_TO_COUNTRY: Record<string, string> = {
  en: "GB", // UK
  th: "TH", // Thailand
  ja: "JP", // Japan
  zh: "CN", // China
  ko: "KR", // South Korea
  de: "DE", // Germany
  fr: "FR", // France
  es: "ES", // Spain
  ar: "SA", // Saudi Arabia (representing Arabic speakers)
};

export const COUNTRY_NAMES: Record<string, string> = {
  GB: "United Kingdom",
  TH: "Thailand",
  JP: "Japan",
  CN: "China",
  KR: "South Korea",
  DE: "Germany",
  FR: "France",
  ES: "Spain",
  SA: "Saudi Arabia",
  US: "United States",
  SG: "Singapore",
  AU: "Australia",
  IN: "India",
  AE: "United Arab Emirates",
  MY: "Malaysia",
};

interface EmbassyLocation {
  name: string;
  url: string;
  address?: string;
}

interface VisaRequirement {
  fromCountry: string; // Country code of traveler
  toCountry: string; // Destination country code
  required: boolean;
  type?: string;
  duration?: string;
  officialUrl: string;
  passportValidity: string;
  entryRequirementsUrl: string;
  travelAdvisoryUrl: string;
}

/**
 * Embassy locations: "Country A's embassy in Country B"
 * Key format: "FROM_TO" (e.g., "TH_GB" = Thai embassy in UK)
 */
export const EMBASSY_LOCATIONS: Record<string, EmbassyLocation> = {
  // Thai embassies abroad
  "TH_GB": {
    name: "Royal Thai Embassy, London",
    url: "https://thaiembassyuk.org.uk/",
    address: "29-30 Queen's Gate, London SW7 5JB",
  },
  "TH_JP": {
    name: "Royal Thai Embassy, Tokyo",
    url: "https://site.thaiembassy.jp/en/",
    address: "3-14-6 Kami-Osaki, Shinagawa-ku, Tokyo 141-0021",
  },
  "TH_CN": {
    name: "Royal Thai Embassy, Beijing",
    url: "http://www.thaiembbeij.org/",
    address: "40 Guanghua Road, Chaoyang District, Beijing 100600",
  },
  "TH_KR": {
    name: "Royal Thai Embassy, Seoul",
    url: "https://thaiembassy.org/seoul/",
    address: "653-7 Hannam-dong, Yongsan-gu, Seoul 140-210",
  },
  "TH_DE": {
    name: "Royal Thai Embassy, Berlin",
    url: "https://berlin.thaiembassy.org/",
    address: "Lepsiusstraße 64-66, 12163 Berlin",
  },
  "TH_FR": {
    name: "Royal Thai Embassy, Paris",
    url: "https://paris.thaiembassy.org/",
    address: "8 Rue Greuze, 75116 Paris",
  },
  "TH_US": {
    name: "Royal Thai Embassy, Washington DC",
    url: "https://washingtondc.thaiembassy.org/",
    address: "1024 Wisconsin Avenue NW, Washington, DC 20007",
  },
  "TH_SG": {
    name: "Royal Thai Embassy, Singapore",
    url: "https://singapore.thaiembassy.org/",
    address: "370 Orchard Road, Singapore 238870",
  },

  // UK embassies abroad
  "GB_TH": {
    name: "British Embassy Bangkok",
    url: "https://www.gov.uk/world/organisations/british-embassy-bangkok",
    address: "14 Wireless Road, Lumpini, Pathum Wan, Bangkok 10330",
  },
  "GB_JP": {
    name: "British Embassy Tokyo",
    url: "https://www.gov.uk/world/organisations/british-embassy-tokyo",
    address: "1 Ichiban-cho, Chiyoda-ku, Tokyo 102-8381",
  },
  "GB_CN": {
    name: "British Embassy Beijing",
    url: "https://www.gov.uk/world/organisations/british-embassy-beijing",
    address: "11 Guang Hua Lu, Jian Guo Men Wai, Beijing 100600",
  },
  "GB_KR": {
    name: "British Embassy Seoul",
    url: "https://www.gov.uk/world/organisations/british-embassy-seoul",
    address: "Sejong-daero 19-gil 24, Jung-gu, Seoul 04519",
  },
  "GB_DE": {
    name: "British Embassy Berlin",
    url: "https://www.gov.uk/world/organisations/british-embassy-berlin",
    address: "Wilhelmstraße 70, 10117 Berlin",
  },
  "GB_US": {
    name: "British Embassy Washington DC",
    url: "https://www.gov.uk/world/organisations/british-embassy-washington",
    address: "3100 Massachusetts Avenue NW, Washington, DC 20008",
  },
  "GB_SG": {
    name: "British High Commission Singapore",
    url: "https://www.gov.uk/world/organisations/british-high-commission-singapore",
    address: "100 Tanglin Road, Singapore 247919",
  },
  "GB_AU": {
    name: "British High Commission Canberra",
    url: "https://www.gov.uk/world/organisations/british-high-commission-canberra",
    address: "Commonwealth Avenue, Yarralumla ACT 2600",
  },
  "GB_IN": {
    name: "British High Commission New Delhi",
    url: "https://www.gov.uk/world/organisations/british-high-commission-new-delhi",
    address: "Shantipath, Chanakyapuri, New Delhi 110021",
  },
  "GB_AE": {
    name: "British Embassy Dubai",
    url: "https://www.gov.uk/world/organisations/british-embassy-dubai",
    address: "Al Seef Road, Bur Dubai, PO Box 65, Dubai",
  },
  "GB_MY": {
    name: "British High Commission Kuala Lumpur",
    url: "https://www.gov.uk/world/organisations/british-high-commission-kuala-lumpur",
    address: "Level 27, Menara Binjai, 2 Jalan Binjai, Kuala Lumpur 50450",
  },

  // Japanese embassies abroad
  "JP_GB": {
    name: "Embassy of Japan in the UK",
    url: "https://www.uk.emb-japan.go.jp/itprtop_en/index.html",
    address: "101-104 Piccadilly, London W1J 7JT",
  },
  "JP_TH": {
    name: "Embassy of Japan in Thailand",
    url: "https://www.th.emb-japan.go.jp/itprtop_en/index.html",
    address: "177 Witthayu Road, Lumphini, Pathum Wan, Bangkok 10330",
  },
  "JP_CN": {
    name: "Embassy of Japan in China",
    url: "https://www.cn.emb-japan.go.jp/itprtop_en/index.html",
    address: "7 Ritan Road, Jianguomenwai, Chaoyang District, Beijing 100600",
  },
  "JP_KR": {
    name: "Embassy of Japan in Korea",
    url: "https://www.kr.emb-japan.go.jp/itprtop_en/index.html",
    address: "64 Namdaemun-ro 5-gil, Jung-gu, Seoul 04532",
  },
  "JP_SG": {
    name: "Embassy of Japan in Singapore",
    url: "https://www.sg.emb-japan.go.jp/itprtop_en/index.html",
    address: "16 Nassim Road, Singapore 258390",
  },
  "JP_US": {
    name: "Embassy of Japan in the United States",
    url: "https://www.us.emb-japan.go.jp/itprtop_en/index.html",
    address: "2520 Massachusetts Avenue NW, Washington, DC 20008",
  },

  // Chinese embassies abroad
  "CN_GB": {
    name: "Chinese Embassy in the UK",
    url: "http://www.chinese-embassy.org.uk/eng/",
    address: "49-51 Portland Place, London W1B 1JL",
  },
  "CN_TH": {
    name: "Chinese Embassy in Thailand",
    url: "http://www.chinaembassy.or.th/eng/",
    address: "57 Ratchadaphisek Road, Din Daeng, Bangkok 10400",
  },
  "CN_JP": {
    name: "Chinese Embassy in Japan",
    url: "http://www.china-embassy.or.jp/eng/",
    address: "3-4-33 Moto-Azabu, Minato-ku, Tokyo 106-0046",
  },
  "CN_KR": {
    name: "Chinese Embassy in Korea",
    url: "http://kr.china-embassy.gov.cn/eng/",
    address: "54 Hyoja-ro, Jongno-gu, Seoul 03083",
  },
  "CN_SG": {
    name: "Chinese Embassy in Singapore",
    url: "http://www.chinaembassy.org.sg/eng/",
    address: "150 Tanglin Road, Singapore 247969",
  },
  "CN_US": {
    name: "Chinese Embassy in the United States",
    url: "http://www.china-embassy.org/eng/",
    address: "3505 International Place NW, Washington, DC 20008",
  },

  // South Korean embassies abroad
  "KR_GB": {
    name: "Embassy of the Republic of Korea in the UK",
    url: "https://overseas.mofa.go.kr/gb-en/index.do",
    address: "60 Buckingham Gate, London SW1E 6AJ",
  },
  "KR_TH": {
    name: "Embassy of the Republic of Korea in Thailand",
    url: "https://overseas.mofa.go.kr/th-en/index.do",
    address: "23 Thiam-Ruammit Road, Ratchadaphisek, Huai Khwang, Bangkok 10310",
  },
  "KR_JP": {
    name: "Embassy of the Republic of Korea in Japan",
    url: "https://overseas.mofa.go.kr/jp-en/index.do",
    address: "1-7-32 Minami-Azabu, Minato-ku, Tokyo 106-0047",
  },
  "KR_CN": {
    name: "Embassy of the Republic of Korea in China",
    url: "https://overseas.mofa.go.kr/cn-en/index.do",
    address: "20 Dongfang East Road, Chaoyang District, Beijing 100600",
  },
  "KR_SG": {
    name: "Embassy of the Republic of Korea in Singapore",
    url: "https://overseas.mofa.go.kr/sg-en/index.do",
    address: "47 Scotts Road, #08-00 Goldbell Towers, Singapore 228233",
  },

  // Add more as needed for other countries...
};

/**
 * Visa requirements by country pair
 * Key format: "FROM_TO" (e.g., "GB_TH" = UK citizen going to Thailand)
 */
export const VISA_REQUIREMENTS: Record<string, Omit<VisaRequirement, "fromCountry" | "toCountry">> = {
  // UK citizens traveling
  "GB_TH": {
    required: false,
    type: "visa-free",
    duration: "30 days",
    officialUrl: "https://www.mfa.go.th/en/content/travel-to-thailand",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://www.gov.uk/foreign-travel-advice/thailand/entry-requirements",
    travelAdvisoryUrl: "https://www.gov.uk/foreign-travel-advice/thailand",
  },
  "GB_JP": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://www.gov.uk/foreign-travel-advice/japan/entry-requirements",
    travelAdvisoryUrl: "https://www.gov.uk/foreign-travel-advice/japan",
  },
  "GB_CN": {
    required: true,
    type: "visa-required",
    duration: "Varies by visa type",
    officialUrl: "http://www.chinese-embassy.org.uk/eng/visa/",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://www.gov.uk/foreign-travel-advice/china/entry-requirements",
    travelAdvisoryUrl: "https://www.gov.uk/foreign-travel-advice/china",
  },
  "GB_US": {
    required: true,
    type: "ESTA or visa required",
    duration: "90 days (ESTA)",
    officialUrl: "https://uk.usembassy.gov/visas/",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://www.gov.uk/foreign-travel-advice/usa/entry-requirements",
    travelAdvisoryUrl: "https://www.gov.uk/foreign-travel-advice/usa",
  },
  "GB_SG": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://www.gov.uk/foreign-travel-advice/singapore/entry-requirements",
    travelAdvisoryUrl: "https://www.gov.uk/foreign-travel-advice/singapore",
  },

  // Japanese citizens traveling
  "JP_TH": {
    required: false,
    type: "visa-free",
    duration: "30 days",
    officialUrl: "https://site.thaiembassy.jp/en/visa/",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://www.anzen.mofa.go.jp/info/pcinfectionspothazardinfo_009.html#ad-image-0",
    travelAdvisoryUrl: "https://www.anzen.mofa.go.jp/info/pcinfectionspothazardinfo_009.html",
  },
  "JP_GB": {
    required: false,
    type: "visa-free",
    duration: "6 months",
    officialUrl: "https://www.gov.uk/check-uk-visa",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://www.anzen.mofa.go.jp/info/pcinfectionspothazardinfo_165.html",
    travelAdvisoryUrl: "https://www.anzen.mofa.go.jp/info/pcinfectionspothazardinfo_165.html",
  },
  "JP_SG": {
    required: false,
    type: "visa-free",
    duration: "30 days",
    officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://www.anzen.mofa.go.jp/info/pcinfectionspothazardinfo_159.html",
    travelAdvisoryUrl: "https://www.anzen.mofa.go.jp/info/pcinfectionspothazardinfo_159.html",
  },
  "JP_US": {
    required: true,
    type: "ESTA or visa required",
    duration: "90 days (ESTA)",
    officialUrl: "https://www.us.emb-japan.go.jp/itprtop_en/index.html",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://www.anzen.mofa.go.jp/info/pcinfectionspothazardinfo_221.html",
    travelAdvisoryUrl: "https://www.anzen.mofa.go.jp/info/pcinfectionspothazardinfo_221.html",
  },

  // Thai citizens traveling
  "TH_JP": {
    required: false,
    type: "visa-free",
    duration: "15 days",
    officialUrl: "https://www.th.emb-japan.go.jp/itpr_en/visa.html",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://www.thaiembassy.jp/en/visa/",
    travelAdvisoryUrl: "https://www.thaiembassy.jp/en/",
  },
  "TH_GB": {
    required: false,
    type: "visa-free",
    duration: "6 months",
    officialUrl: "https://www.gov.uk/check-uk-visa",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://thaiembassyuk.org.uk/visa/",
    travelAdvisoryUrl: "https://thaiembassyuk.org.uk/",
  },
  "TH_SG": {
    required: false,
    type: "visa-free",
    duration: "30 days",
    officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://singapore.thaiembassy.org/en/",
    travelAdvisoryUrl: "https://singapore.thaiembassy.org/en/",
  },

  // Chinese citizens traveling
  "CN_TH": {
    required: false,
    type: "visa-free",
    duration: "30 days",
    officialUrl: "http://www.chinaembassy.or.th/eng/lsfw/visa/",
    passportValidity: "6 months",
    entryRequirementsUrl: "http://www.chinaembassy.or.th/eng/",
    travelAdvisoryUrl: "http://www.chinaembassy.or.th/eng/",
  },
  "CN_JP": {
    required: true,
    type: "visa-required",
    duration: "Varies by visa type",
    officialUrl: "http://www.china-embassy.or.jp/eng/領事服務/",
    passportValidity: "6 months",
    entryRequirementsUrl: "http://www.china-embassy.or.jp/eng/",
    travelAdvisoryUrl: "http://www.china-embassy.or.jp/eng/",
  },
  "CN_SG": {
    required: false,
    type: "visa-free",
    duration: "30 days",
    officialUrl: "http://www.chinaembassy.org.sg/eng/",
    passportValidity: "6 months",
    entryRequirementsUrl: "http://www.chinaembassy.org.sg/eng/",
    travelAdvisoryUrl: "http://www.chinaembassy.org.sg/eng/",
  },

  // Add more visa requirements as needed...
};

/**
 * Map airport codes to country codes
 */
export const AIRPORT_TO_COUNTRY: Record<string, string> = {
  // Thailand
  BKK: "TH",
  HKT: "TH",
  CNX: "TH",
  DMK: "TH",

  // Japan
  HND: "JP",
  NRT: "JP",
  KIX: "JP",
  NGO: "JP",

  // China
  PVG: "CN", // Shanghai Pudong
  PEK: "CN", // Beijing
  CAN: "CN", // Guangzhou
  SZX: "CN", // Shenzhen
  HGH: "CN", // Hangzhou

  // South Korea
  ICN: "KR", // Seoul Incheon
  GMP: "KR", // Seoul Gimpo
  PUS: "KR", // Busan

  // UK
  LHR: "GB",
  LGW: "GB",
  MAN: "GB",

  // USA
  JFK: "US",
  LAX: "US",
  SFO: "US",
  ORD: "US",

  // Singapore
  SIN: "SG",

  // Australia
  SYD: "AU",
  MEL: "AU",

  // India
  DEL: "IN",
  BOM: "IN",

  // UAE
  DXB: "AE",
  AUH: "AE",

  // Malaysia
  KUL: "MY",
};

/**
 * Get embassy information for a specific country pair and user locale
 */
export function getLocaleAwareEmbassyInfo(locale: string, toAirportCode: string) {
  const userCountry = LOCALE_TO_COUNTRY[locale] || "GB";
  const destinationCountry = AIRPORT_TO_COUNTRY[toAirportCode.toUpperCase()];

  if (!destinationCountry || userCountry === destinationCountry) {
    return null; // Same country or unknown destination
  }

  const embassyInDestination = EMBASSY_LOCATIONS[`${userCountry}_${destinationCountry}`];
  const embassyInUserCountry = EMBASSY_LOCATIONS[`${destinationCountry}_${userCountry}`];
  const visaReq = VISA_REQUIREMENTS[`${userCountry}_${destinationCountry}`];

  return {
    userCountry,
    userCountryName: COUNTRY_NAMES[userCountry] || userCountry,
    destinationCountry,
    destinationCountryName: COUNTRY_NAMES[destinationCountry] || destinationCountry,
    userEmbassyInDestination: embassyInDestination,
    destinationEmbassyInUserCountry: embassyInUserCountry,
    visaRequirements: visaReq,
  };
}
