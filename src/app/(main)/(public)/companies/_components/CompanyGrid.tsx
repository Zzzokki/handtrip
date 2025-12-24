import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Company } from "@/types/generated";
import CompanyCard from "./CompanyCard";

interface CompanyGridProps {
  companies: Company[];
  searchQuery: string;
  onClearSearch: () => void;
}

export default function CompanyGrid({ companies, searchQuery, onClearSearch }: CompanyGridProps) {
  if (companies.length === 0) {
    return (
      <div className="max-w-md mx-auto mt-16">
        <Card className="border-0 shadow-lg rounded-2xl">
          <CardHeader className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏢</span>
            </div>
            <CardTitle className="text-2xl mb-2">{searchQuery ? "Компани олдсонгүй" : "Компани байхгүй байна"}</CardTitle>
            <CardDescription className="text-base">
              {searchQuery ? "Хайлтын үр дүн олдсонгүй. Өөр түлхүүр үгээр оролдоно уу" : "Одоогоор бүртгэгдсэн аялал жуулчлалын компани байхгүй байна"}
            </CardDescription>
            {searchQuery && (
              <button onClick={onClearSearch} className="mt-4 text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors">
                Хайлт цэвэрлэх
              </button>
            )}
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* Results Counter */}
      {searchQuery && (
        <div className="mb-6">
          <p className="text-gray-600 text-center">
            <span className="font-semibold text-gray-900">{companies.length}</span> компани олдлоо
          </p>
        </div>
      )}

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </>
  );
}
