import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Company } from "@/types/generated";

interface CompanyAboutProps {
  company: Company;
}

export default function CompanyAbout({ company }: CompanyAboutProps) {
  return (
    <Card className="border-0 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl">Бидний тухай</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed text-base">{company.description}</p>
      </CardContent>
    </Card>
  );
}
