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

  // German embassies abroad
  "DE_GB": {
    name: "German Embassy London",
    url: "https://london.diplo.de/uk-en",
    address: "23 Belgrave Square, London SW1X 8PZ",
  },
  "DE_TH": {
    name: "German Embassy Bangkok",
    url: "https://bangkok.diplo.de/th-en",
    address: "9 South Sathorn Road, Bangkok 10120",
  },
  "DE_JP": {
    name: "German Embassy Tokyo",
    url: "https://tokyo.diplo.de/ja-en",
    address: "4-5-10 Minami-Azabu, Minato-ku, Tokyo 106-0047",
  },
  "DE_CN": {
    name: "German Embassy Beijing",
    url: "https://china.diplo.de/cn-en",
    address: "17 Dongzhimenwai Dajie, Chaoyang District, Beijing 100600",
  },
  "DE_KR": {
    name: "German Embassy Seoul",
    url: "https://seoul.diplo.de/kr-en",
    address: "308-5 Dongbinggo-dong, Yongsan-gu, Seoul 04385",
  },
  "DE_SG": {
    name: "German Embassy Singapore",
    url: "https://singapur.diplo.de/sg-en",
    address: "50 Raffles Place, #14-01 Singapore Land Tower, Singapore 048623",
  },
  "DE_US": {
    name: "German Embassy Washington DC",
    url: "https://www.germany.info/us-en",
    address: "4645 Reservoir Road NW, Washington, DC 20007",
  },
  "DE_FR": {
    name: "German Embassy Paris",
    url: "https://paris.diplo.de/fr-fr",
    address: "13-15 Avenue Franklin D. Roosevelt, 75008 Paris",
  },
  "DE_ES": {
    name: "German Embassy Madrid",
    url: "https://madrid.diplo.de/es-es",
    address: "Calle de Fortuny 8, 28010 Madrid",
  },

  // French embassies abroad
  "FR_GB": {
    name: "French Embassy London",
    url: "https://uk.ambafrance.org/",
    address: "58 Knightsbridge, London SW1X 7JT",
  },
  "FR_TH": {
    name: "French Embassy Bangkok",
    url: "https://th.ambafrance.org/",
    address: "35 Charoen Krung Soi 36, Bang Rak, Bangkok 10500",
  },
  "FR_JP": {
    name: "French Embassy Tokyo",
    url: "https://jp.ambafrance.org/",
    address: "4-11-44 Minami-Azabu, Minato-ku, Tokyo 106-8514",
  },
  "FR_CN": {
    name: "French Embassy Beijing",
    url: "https://cn.ambafrance.org/",
    address: "60 Tianze Road, Chaoyang District, Beijing 100600",
  },
  "FR_KR": {
    name: "French Embassy Seoul",
    url: "https://kr.ambafrance.org/",
    address: "43-12 Seobinggo-ro, Yongsan-gu, Seoul 04385",
  },
  "FR_SG": {
    name: "French Embassy Singapore",
    url: "https://sg.ambafrance.org/",
    address: "101-103 Cluny Park Road, Singapore 259595",
  },
  "FR_US": {
    name: "French Embassy Washington DC",
    url: "https://us.ambafrance.org/",
    address: "4101 Reservoir Road NW, Washington, DC 20007",
  },
  "FR_DE": {
    name: "French Embassy Berlin",
    url: "https://de.ambafrance.org/",
    address: "Pariser Platz 5, 10117 Berlin",
  },
  "FR_ES": {
    name: "French Embassy Madrid",
    url: "https://es.ambafrance.org/",
    address: "Calle de Salustiano Olózaga 9, 28001 Madrid",
  },

  // Spanish embassies abroad
  "ES_GB": {
    name: "Spanish Embassy London",
    url: "http://www.exteriores.gob.es/Embajadas/LONDRES/en/",
    address: "39 Chesham Place, London SW1X 8SB",
  },
  "ES_TH": {
    name: "Spanish Embassy Bangkok",
    url: "http://www.exteriores.gob.es/Embajadas/BANGKOK/en/",
    address: "23rd Floor, Lake Rajada Office Complex, 193/63 New Ratchadapisek Road, Bangkok 10110",
  },
  "ES_JP": {
    name: "Spanish Embassy Tokyo",
    url: "http://www.exteriores.gob.es/Embajadas/TOKIO/en/",
    address: "1-3-29 Roppongi, Minato-ku, Tokyo 106-0032",
  },
  "ES_CN": {
    name: "Spanish Embassy Beijing",
    url: "http://www.exteriores.gob.es/Embajadas/PEKIN/en/",
    address: "9 Sanlitun Lu, Chaoyang District, Beijing 100600",
  },
  "ES_KR": {
    name: "Spanish Embassy Seoul",
    url: "http://www.exteriores.gob.es/Embajadas/SEUL/en/",
    address: "726 Hannam-dong, Yongsan-gu, Seoul 04417",
  },
  "ES_SG": {
    name: "Spanish Embassy Singapore",
    url: "http://www.exteriores.gob.es/Embajadas/SINGAPUR/en/",
    address: "7 Temasek Boulevard, #09-02 Suntec Tower One, Singapore 038987",
  },
  "ES_US": {
    name: "Spanish Embassy Washington DC",
    url: "http://www.exteriores.gob.es/Embajadas/WASHINGTON/en/",
    address: "2375 Pennsylvania Avenue NW, Washington, DC 20037",
  },
  "ES_DE": {
    name: "Spanish Embassy Berlin",
    url: "http://www.exteriores.gob.es/Embajadas/BERLIN/en/",
    address: "Lichtensteinallee 1, 10787 Berlin",
  },
  "ES_FR": {
    name: "Spanish Embassy Paris",
    url: "http://www.exteriores.gob.es/Embajadas/PARIS/en/",
    address: "22 Avenue Marceau, 75008 Paris",
  },

  // Saudi Arabian embassies abroad
  "SA_GB": {
    name: "Royal Embassy of Saudi Arabia, London",
    url: "https://embassies.mofa.gov.sa/sites/uk/EN/Pages/default.aspx",
    address: "30 Charles Street, Mayfair, London W1J 5DZ",
  },
  "SA_TH": {
    name: "Royal Embassy of Saudi Arabia, Bangkok",
    url: "https://embassies.mofa.gov.sa/sites/thailand/EN/Pages/default.aspx",
    address: "138/1 Wireless Road, Lumpini, Pathumwan, Bangkok 10330",
  },
  "SA_JP": {
    name: "Royal Embassy of Saudi Arabia, Tokyo",
    url: "https://embassies.mofa.gov.sa/sites/japan/EN/Pages/default.aspx",
    address: "1-8-4 Roppongi, Minato-ku, Tokyo 106-0032",
  },
  "SA_CN": {
    name: "Royal Embassy of Saudi Arabia, Beijing",
    url: "https://embassies.mofa.gov.sa/sites/china/EN/Pages/default.aspx",
    address: "1 North Street, Sanlitun, Chaoyang District, Beijing 100600",
  },
  "SA_KR": {
    name: "Royal Embassy of Saudi Arabia, Seoul",
    url: "https://embassies.mofa.gov.sa/sites/southkorea/EN/Pages/default.aspx",
    address: "1-112 Itaewon-dong, Yongsan-gu, Seoul 04349",
  },
  "SA_SG": {
    name: "Royal Embassy of Saudi Arabia, Singapore",
    url: "https://embassies.mofa.gov.sa/sites/singapore/EN/Pages/default.aspx",
    address: "6 Temasek Boulevard, #15-01/06 Suntec Tower Four, Singapore 038986",
  },
  "SA_US": {
    name: "Royal Embassy of Saudi Arabia, Washington DC",
    url: "https://www.saudiembassy.net/",
    address: "601 New Hampshire Avenue NW, Washington, DC 20037",
  },
  "SA_DE": {
    name: "Royal Embassy of Saudi Arabia, Berlin",
    url: "https://embassies.mofa.gov.sa/sites/germany/EN/Pages/default.aspx",
    address: "Tiergartenstraße 33-34, 10785 Berlin",
  },
  "SA_FR": {
    name: "Royal Embassy of Saudi Arabia, Paris",
    url: "https://embassies.mofa.gov.sa/sites/france/EN/Pages/default.aspx",
    address: "5 Avenue Hoche, 75008 Paris",
  },
  "SA_ES": {
    name: "Royal Embassy of Saudi Arabia, Madrid",
    url: "https://embassies.mofa.gov.sa/sites/spain/EN/Pages/default.aspx",
    address: "Calle Serrano 26, 28001 Madrid",
  },

  // Reciprocal embassies in Germany
  "GB_FR": {
    name: "British Embassy Paris",
    url: "https://www.gov.uk/world/organisations/british-embassy-paris",
    address: "35 Rue du Faubourg Saint-Honoré, 75383 Paris",
  },
  "GB_ES": {
    name: "British Embassy Madrid",
    url: "https://www.gov.uk/world/organisations/british-embassy-madrid",
    address: "Torre Espacio, Paseo de la Castellana 259D, 28046 Madrid",
  },
  "GB_SA": {
    name: "British Embassy Riyadh",
    url: "https://www.gov.uk/world/organisations/british-embassy-riyadh",
    address: "PO Box 94351, Riyadh 11693",
  },
  "TH_ES": {
    name: "Royal Thai Embassy, Madrid",
    url: "https://madrid.thaiembassy.org/",
    address: "Calle de Joaquín Costa 29, 28002 Madrid",
  },
  "TH_SA": {
    name: "Royal Thai Embassy, Riyadh",
    url: "https://riyadh.thaiembassy.org/",
    address: "Diplomatic Quarter, Riyadh 11693",
  },
  "JP_DE": {
    name: "Embassy of Japan in Germany",
    url: "https://www.de.emb-japan.go.jp/itprtop_en/index.html",
    address: "Hiroshimastraße 6, 10785 Berlin",
  },
  "JP_FR": {
    name: "Embassy of Japan in France",
    url: "https://www.fr.emb-japan.go.jp/itprtop_en/index.html",
    address: "7 Avenue Hoche, 75008 Paris",
  },
  "JP_ES": {
    name: "Embassy of Japan in Spain",
    url: "https://www.es.emb-japan.go.jp/itprtop_en/index.html",
    address: "Calle de Serrano 109, 28006 Madrid",
  },
  "JP_SA": {
    name: "Embassy of Japan in Saudi Arabia",
    url: "https://www.sa.emb-japan.go.jp/itprtop_en/index.html",
    address: "Diplomatic Quarter, Riyadh 11693",
  },
  "CN_DE": {
    name: "Chinese Embassy in Germany",
    url: "http://www.china-botschaft.de/eng/",
    address: "Märkisches Ufer 54, 10179 Berlin",
  },
  "CN_FR": {
    name: "Chinese Embassy in France",
    url: "http://www.amb-chine.fr/eng/",
    address: "11 Avenue George V, 75008 Paris",
  },
  "CN_ES": {
    name: "Chinese Embassy in Spain",
    url: "http://www.embajadachina.es/eng/",
    address: "Calle de Arturo Soria 113, 28043 Madrid",
  },
  "CN_SA": {
    name: "Chinese Embassy in Saudi Arabia",
    url: "http://www.chinaembassy.org.sa/eng/",
    address: "Diplomatic Quarter, Riyadh 11693",
  },
  "KR_DE": {
    name: "Embassy of the Republic of Korea in Germany",
    url: "https://overseas.mofa.go.kr/de-en/index.do",
    address: "Stülerstraße 8-10, 10787 Berlin",
  },
  "KR_FR": {
    name: "Embassy of the Republic of Korea in France",
    url: "https://overseas.mofa.go.kr/fr-en/index.do",
    address: "125 Rue de Grenelle, 75007 Paris",
  },
  "KR_ES": {
    name: "Embassy of the Republic of Korea in Spain",
    url: "https://overseas.mofa.go.kr/es-en/index.do",
    address: "Calle de González Amigó 15, 28033 Madrid",
  },
  "KR_SA": {
    name: "Embassy of the Republic of Korea in Saudi Arabia",
    url: "https://overseas.mofa.go.kr/sa-en/index.do",
    address: "Diplomatic Quarter, Riyadh 11693",
  },
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

  // German citizens traveling
  "DE_TH": {
    required: false,
    type: "visa-free",
    duration: "30 days",
    officialUrl: "https://bangkok.diplo.de/th-en/service/visa-einreise",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://www.auswaertiges-amt.de/en/aussenpolitik/laender/thailand-node/thailandsafety/201558",
    travelAdvisoryUrl: "https://www.auswaertiges-amt.de/en/aussenpolitik/laender/thailand-node",
  },
  "DE_JP": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://www.auswaertiges-amt.de/en/aussenpolitik/laender/japan-node/japansafety/200694",
    travelAdvisoryUrl: "https://www.auswaertiges-amt.de/en/aussenpolitik/laender/japan-node",
  },
  "DE_CN": {
    required: true,
    type: "visa-required",
    duration: "Varies by visa type",
    officialUrl: "http://www.china-botschaft.de/eng/",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://www.auswaertiges-amt.de/en/aussenpolitik/laender/china-node/chinasafety/200466",
    travelAdvisoryUrl: "https://www.auswaertiges-amt.de/en/aussenpolitik/laender/china-node",
  },
  "DE_KR": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://overseas.mofa.go.kr/de-en/wpge/m_5024/contents.do",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://www.auswaertiges-amt.de/en/aussenpolitik/laender/korearepublik-node/southkoreasafety/216674",
    travelAdvisoryUrl: "https://www.auswaertiges-amt.de/en/aussenpolitik/laender/korearepublik-node",
  },
  "DE_SG": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://www.auswaertiges-amt.de/en/aussenpolitik/laender/singapur-node/singaporesafety/220350",
    travelAdvisoryUrl: "https://www.auswaertiges-amt.de/en/aussenpolitik/laender/singapur-node",
  },
  "DE_GB": {
    required: false,
    type: "visa-free",
    duration: "6 months",
    officialUrl: "https://www.gov.uk/check-uk-visa",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://www.auswaertiges-amt.de/en/aussenpolitik/laender/grossbritannien-node/uksafety/206408",
    travelAdvisoryUrl: "https://www.auswaertiges-amt.de/en/aussenpolitik/laender/grossbritannien-node",
  },
  "DE_US": {
    required: true,
    type: "ESTA or visa required",
    duration: "90 days (ESTA)",
    officialUrl: "https://www.germany.info/us-en",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://www.auswaertiges-amt.de/en/aussenpolitik/laender/usa-node/usasafety/216234",
    travelAdvisoryUrl: "https://www.auswaertiges-amt.de/en/aussenpolitik/laender/usa-node",
  },

  // French citizens traveling
  "FR_TH": {
    required: false,
    type: "visa-free",
    duration: "30 days",
    officialUrl: "https://th.ambafrance.org/",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://www.diplomatie.gouv.fr/en/country-files/thailand/",
    travelAdvisoryUrl: "https://www.diplomatie.gouv.fr/en/country-files/thailand/",
  },
  "FR_JP": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://www.diplomatie.gouv.fr/en/country-files/japan/",
    travelAdvisoryUrl: "https://www.diplomatie.gouv.fr/en/country-files/japan/",
  },
  "FR_CN": {
    required: true,
    type: "visa-required",
    duration: "Varies by visa type",
    officialUrl: "http://www.amb-chine.fr/eng/",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://www.diplomatie.gouv.fr/en/country-files/china/",
    travelAdvisoryUrl: "https://www.diplomatie.gouv.fr/en/country-files/china/",
  },
  "FR_KR": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://overseas.mofa.go.kr/fr-en/index.do",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://www.diplomatie.gouv.fr/en/country-files/south-korea/",
    travelAdvisoryUrl: "https://www.diplomatie.gouv.fr/en/country-files/south-korea/",
  },
  "FR_SG": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://www.diplomatie.gouv.fr/en/country-files/singapore/",
    travelAdvisoryUrl: "https://www.diplomatie.gouv.fr/en/country-files/singapore/",
  },
  "FR_GB": {
    required: false,
    type: "visa-free",
    duration: "6 months",
    officialUrl: "https://www.gov.uk/check-uk-visa",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://www.diplomatie.gouv.fr/en/country-files/united-kingdom/",
    travelAdvisoryUrl: "https://www.diplomatie.gouv.fr/en/country-files/united-kingdom/",
  },
  "FR_US": {
    required: true,
    type: "ESTA or visa required",
    duration: "90 days (ESTA)",
    officialUrl: "https://us.ambafrance.org/",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://www.diplomatie.gouv.fr/en/country-files/united-states/",
    travelAdvisoryUrl: "https://www.diplomatie.gouv.fr/en/country-files/united-states/",
  },

  // Spanish citizens traveling
  "ES_TH": {
    required: false,
    type: "visa-free",
    duration: "30 days",
    officialUrl: "http://www.exteriores.gob.es/Embajadas/BANGKOK/en/",
    passportValidity: "6 months",
    entryRequirementsUrl: "http://www.exteriores.gob.es/Portal/en/ServiciosAlCiudadano/SiViajasAlExtranjero/Paginas/Detalle Recomendacion.aspx?IdP=177",
    travelAdvisoryUrl: "http://www.exteriores.gob.es/Portal/en/ServiciosAlCiudadano/SiViajasAlExtranjero/Paginas/DetalleRecomendacion.aspx?IdP=177",
  },
  "ES_JP": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "http://www.exteriores.gob.es/Portal/en/ServiciosAlCiudadano/SiViajasAlExtranjero/Paginas/DetalleRecomendacion.aspx?IdP=106",
    travelAdvisoryUrl: "http://www.exteriores.gob.es/Portal/en/ServiciosAlCiudadano/SiViajasAlExtranjero/Paginas/DetalleRecomendacion.aspx?IdP=106",
  },
  "ES_CN": {
    required: true,
    type: "visa-required",
    duration: "Varies by visa type",
    officialUrl: "http://www.embajadachina.es/eng/",
    passportValidity: "6 months",
    entryRequirementsUrl: "http://www.exteriores.gob.es/Portal/en/ServiciosAlCiudadano/SiViajasAlExtranjero/Paginas/DetalleRecomendacion.aspx?IdP=42",
    travelAdvisoryUrl: "http://www.exteriores.gob.es/Portal/en/ServiciosAlCiudadano/SiViajasAlExtranjero/Paginas/DetalleRecomendacion.aspx?IdP=42",
  },
  "ES_KR": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://overseas.mofa.go.kr/es-en/index.do",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "http://www.exteriores.gob.es/Portal/en/ServiciosAlCiudadano/SiViajasAlExtranjero/Paginas/DetalleRecomendacion.aspx?IdP=48",
    travelAdvisoryUrl: "http://www.exteriores.gob.es/Portal/en/ServiciosAlCiudadano/SiViajasAlExtranjero/Paginas/DetalleRecomendacion.aspx?IdP=48",
  },
  "ES_SG": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements",
    passportValidity: "6 months",
    entryRequirementsUrl: "http://www.exteriores.gob.es/Portal/en/ServiciosAlCiudadano/SiViajasAlExtranjero/Paginas/DetalleRecomendacion.aspx?IdP=164",
    travelAdvisoryUrl: "http://www.exteriores.gob.es/Portal/en/ServiciosAlCiudadano/SiViajasAlExtranjero/Paginas/DetalleRecomendacion.aspx?IdP=164",
  },
  "ES_GB": {
    required: false,
    type: "visa-free",
    duration: "6 months",
    officialUrl: "https://www.gov.uk/check-uk-visa",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "http://www.exteriores.gob.es/Portal/en/ServiciosAlCiudadano/SiViajasAlExtranjero/Paginas/DetalleRecomendacion.aspx?IdP=151",
    travelAdvisoryUrl: "http://www.exteriores.gob.es/Portal/en/ServiciosAlCiudadano/SiViajasAlExtranjero/Paginas/DetalleRecomendacion.aspx?IdP=151",
  },
  "ES_US": {
    required: true,
    type: "ESTA or visa required",
    duration: "90 days (ESTA)",
    officialUrl: "http://www.exteriores.gob.es/Embajadas/WASHINGTON/en/",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "http://www.exteriores.gob.es/Portal/en/ServiciosAlCiudadano/SiViajasAlExtranjero/Paginas/DetalleRecomendacion.aspx?IdP=76",
    travelAdvisoryUrl: "http://www.exteriores.gob.es/Portal/en/ServiciosAlCiudadano/SiViajasAlExtranjero/Paginas/DetalleRecomendacion.aspx?IdP=76",
  },

  // Saudi Arabian citizens traveling
  "SA_TH": {
    required: false,
    type: "visa-on-arrival",
    duration: "15 days",
    officialUrl: "https://embassies.mofa.gov.sa/sites/thailand/EN/Pages/default.aspx",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://embassies.mofa.gov.sa/sites/thailand/EN/Pages/default.aspx",
    travelAdvisoryUrl: "https://embassies.mofa.gov.sa/sites/thailand/EN/Pages/default.aspx",
  },
  "SA_JP": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://embassies.mofa.gov.sa/sites/japan/EN/Pages/default.aspx",
    travelAdvisoryUrl: "https://embassies.mofa.gov.sa/sites/japan/EN/Pages/default.aspx",
  },
  "SA_CN": {
    required: true,
    type: "visa-required",
    duration: "Varies by visa type",
    officialUrl: "http://www.chinaembassy.org.sa/eng/",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://embassies.mofa.gov.sa/sites/china/EN/Pages/default.aspx",
    travelAdvisoryUrl: "https://embassies.mofa.gov.sa/sites/china/EN/Pages/default.aspx",
  },
  "SA_KR": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://overseas.mofa.go.kr/sa-en/index.do",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://embassies.mofa.gov.sa/sites/southkorea/EN/Pages/default.aspx",
    travelAdvisoryUrl: "https://embassies.mofa.gov.sa/sites/southkorea/EN/Pages/default.aspx",
  },
  "SA_SG": {
    required: false,
    type: "visa-free",
    duration: "30 days",
    officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://embassies.mofa.gov.sa/sites/singapore/EN/Pages/default.aspx",
    travelAdvisoryUrl: "https://embassies.mofa.gov.sa/sites/singapore/EN/Pages/default.aspx",
  },
  "SA_GB": {
    required: true,
    type: "visa-required",
    duration: "Varies by visa type",
    officialUrl: "https://www.gov.uk/check-uk-visa",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://embassies.mofa.gov.sa/sites/uk/EN/Pages/default.aspx",
    travelAdvisoryUrl: "https://embassies.mofa.gov.sa/sites/uk/EN/Pages/default.aspx",
  },
  "SA_US": {
    required: true,
    type: "visa-required",
    duration: "Varies by visa type",
    officialUrl: "https://www.saudiembassy.net/",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://www.saudiembassy.net/",
    travelAdvisoryUrl: "https://www.saudiembassy.net/",
  },
  "SA_DE": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://www.auswaertiges-amt.de/en/aussenpolitik/laender/saudiarabien-node",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://embassies.mofa.gov.sa/sites/germany/EN/Pages/default.aspx",
    travelAdvisoryUrl: "https://embassies.mofa.gov.sa/sites/germany/EN/Pages/default.aspx",
  },
  "SA_FR": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://www.diplomatie.gouv.fr/en/",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://embassies.mofa.gov.sa/sites/france/EN/Pages/default.aspx",
    travelAdvisoryUrl: "https://embassies.mofa.gov.sa/sites/france/EN/Pages/default.aspx",
  },
  "SA_ES": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "http://www.exteriores.gob.es/",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://embassies.mofa.gov.sa/sites/spain/EN/Pages/default.aspx",
    travelAdvisoryUrl: "https://embassies.mofa.gov.sa/sites/spain/EN/Pages/default.aspx",
  },

  // South Korean citizens traveling
  "KR_TH": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://overseas.mofa.go.kr/th-en/index.do",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://overseas.mofa.go.kr/th-en/index.do",
    travelAdvisoryUrl: "https://overseas.mofa.go.kr/th-en/index.do",
  },
  "KR_JP": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://overseas.mofa.go.kr/jp-en/index.do",
    travelAdvisoryUrl: "https://overseas.mofa.go.kr/jp-en/index.do",
  },
  "KR_CN": {
    required: true,
    type: "visa-required",
    duration: "Varies by visa type",
    officialUrl: "https://overseas.mofa.go.kr/cn-en/index.do",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://overseas.mofa.go.kr/cn-en/index.do",
    travelAdvisoryUrl: "https://overseas.mofa.go.kr/cn-en/index.do",
  },
  "KR_SG": {
    required: false,
    type: "visa-free",
    duration: "90 days",
    officialUrl: "https://www.ica.gov.sg/enter-transit-depart/entering-singapore/visa_requirements",
    passportValidity: "6 months",
    entryRequirementsUrl: "https://overseas.mofa.go.kr/sg-en/index.do",
    travelAdvisoryUrl: "https://overseas.mofa.go.kr/sg-en/index.do",
  },
  "KR_GB": {
    required: false,
    type: "visa-free",
    duration: "6 months",
    officialUrl: "https://www.gov.uk/check-uk-visa",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://overseas.mofa.go.kr/gb-en/index.do",
    travelAdvisoryUrl: "https://overseas.mofa.go.kr/gb-en/index.do",
  },
  "KR_US": {
    required: true,
    type: "ESTA or visa required",
    duration: "90 days (ESTA)",
    officialUrl: "https://kr.usembassy.gov/",
    passportValidity: "Valid for duration of stay",
    entryRequirementsUrl: "https://overseas.mofa.go.kr/us-en/index.do",
    travelAdvisoryUrl: "https://overseas.mofa.go.kr/us-en/index.do",
  },
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

  // Germany
  FRA: "DE", // Frankfurt
  MUC: "DE", // Munich
  TXL: "DE", // Berlin Tegel
  BER: "DE", // Berlin Brandenburg

  // France
  CDG: "FR", // Paris Charles de Gaulle
  ORY: "FR", // Paris Orly
  NCE: "FR", // Nice

  // Spain
  MAD: "ES", // Madrid
  BCN: "ES", // Barcelona

  // Saudi Arabia / Middle East
  RUH: "SA", // Riyadh
  JED: "SA", // Jeddah
  DOH: "AE", // Doha (Qatar - using AE for Gulf region)

  // More airports
  HKG: "CN", // Hong Kong
  TPE: "TH", // Taipei (using TH for now, could be TW)
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
