import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Company } from "@/types/generated";

interface CompanyAboutProps {
  company: Company;
}

export default function CompanyAbout({ company }: CompanyAboutProps) {
  return (
    <Card className="border-0 shadow-md rounded-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Бидний тухай</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed text-sm">{company.description}</p>
      </CardContent>
    </Card>
  );
}
