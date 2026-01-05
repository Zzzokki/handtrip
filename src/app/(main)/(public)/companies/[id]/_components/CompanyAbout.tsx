import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Company } from "@/types/generated";

interface CompanyAboutProps {
  company: Company;
}

export default function CompanyAbout({ company }: CompanyAboutProps) {
  return (
    <Card className="shadow-sm rounded-xl border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold">Бидний тухай</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed text-sm">{company.description}</p>
      </CardContent>
    </Card>
  );
}
