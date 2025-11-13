"use client";

import { useTranslations } from "next-intl";
import { ExternalLink, MapPin, FileText, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { getEmbassyInfo, AIRPORT_TO_COUNTRY } from "@/lib/embassyData";

interface VisaEmbassyInfoProps {
  fromAirport: string;
  toAirport: string;
}

export default function VisaEmbassyInfo({ fromAirport, toAirport }: VisaEmbassyInfoProps) {
  const t = useTranslations();

  const toCountryCode = AIRPORT_TO_COUNTRY[toAirport.toUpperCase()];
  const embassyInfo = toCountryCode ? getEmbassyInfo(toCountryCode) : null;

  if (!embassyInfo) return null;

  const isVisaFree = !embassyInfo.visaInfo.required || embassyInfo.visaInfo.type === "visa-free";

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 mb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand to-brand-light px-6 py-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <FileText className="w-6 h-6" />
          {t("visaInfo.title")}
        </h2>
        <p className="text-white/90 text-sm mt-1">
          {t("visaInfo.subtitle")}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Visa Requirements */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border-2 border-blue-200">
          <div className="flex items-start gap-3">
            {isVisaFree ? (
              <CheckCircle className="w-7 h-7 text-green-600 flex-shrink-0 mt-0.5" />
            ) : (
              <XCircle className="w-7 h-7 text-orange-600 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("visaInfo.requirements")}
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">{t("visaInfo.status")}:</span>{" "}
                  <span className={isVisaFree ? "text-green-700 font-semibold" : "text-orange-700 font-semibold"}>
                    {isVisaFree ? t("visaInfo.visaFree") : t("visaInfo.visaRequired")}
                  </span>
                </p>
                {embassyInfo.visaInfo.type && (
                  <p className="text-gray-700">
                    <span className="font-medium">{t("visaInfo.type")}:</span> {embassyInfo.visaInfo.type}
                  </p>
                )}
                {embassyInfo.visaInfo.duration && (
                  <p className="text-gray-700">
                    <span className="font-medium">{t("visaInfo.duration")}:</span> {embassyInfo.visaInfo.duration}
                  </p>
                )}
                <a
                  href={embassyInfo.visaInfo.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-medium mt-2"
                >
                  {t("visaInfo.officialInfo")}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Entry Requirements */}
        <div className="bg-yellow-50 rounded-xl p-5 border-2 border-yellow-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-700 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("visaInfo.entryRequirements")}
              </h3>
              <p className="text-gray-700 mb-2">
                <span className="font-medium">{t("visaInfo.passportValidity")}:</span>{" "}
                {embassyInfo.entryRequirements.passportValidity}
              </p>
              <a
                href={embassyInfo.entryRequirements.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand hover:text-brand-dark font-medium"
              >
                {t("visaInfo.fullRequirements")}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Embassy in UK */}
        {embassyInfo.inUK && (
          <div className="bg-white rounded-xl p-5 border-2 border-gray-200">
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t("visaInfo.embassyInUK", { country: embassyInfo.country })}
                </h3>
                <p className="text-gray-900 font-medium mb-1">{embassyInfo.inUK.name}</p>
                {embassyInfo.inUK.address && (
                  <p className="text-gray-600 text-sm mb-3">{embassyInfo.inUK.address}</p>
                )}
                <a
                  href={embassyInfo.inUK.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand hover:bg-brand-dark text-white rounded-lg transition font-medium text-sm"
                >
                  {t("visaInfo.visitWebsite")}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* UK Embassy in Destination Country */}
        {embassyInfo.ukEmbassyInCountry && (
          <div className="bg-white rounded-xl p-5 border-2 border-gray-200">
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {t("visaInfo.ukEmbassyIn", { country: embassyInfo.country })}
                </h3>
                <p className="text-gray-900 font-medium mb-1">{embassyInfo.ukEmbassyInCountry.name}</p>
                {embassyInfo.ukEmbassyInCountry.address && (
                  <p className="text-gray-600 text-sm mb-3">{embassyInfo.ukEmbassyInCountry.address}</p>
                )}
                <a
                  href={embassyInfo.ukEmbassyInCountry.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-brand hover:bg-brand-dark text-white rounded-lg transition font-medium text-sm"
                >
                  {t("visaInfo.visitWebsite")}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Travel Advisory */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border-2 border-purple-200">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-purple-700 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("visaInfo.travelAdvisory")}
              </h3>
              <p className="text-gray-700 mb-3">
                {t("visaInfo.travelAdvisoryText", { country: embassyInfo.country })}
              </p>
              <a
                href={embassyInfo.travelAdvisory.ukGovUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition font-medium text-sm"
              >
                {t("visaInfo.viewAdvisory")}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-xs text-gray-500 pt-4 border-t border-gray-200">
          <p>{t("visaInfo.disclaimer")}</p>
        </div>
      </div>
    </div>
  );
}
