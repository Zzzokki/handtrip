"use client";

import { Accordion } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { CategoryFilter } from "./filters";

type TravelFilterProps = {
  subCategoryIds: number[];
  setSubCategoryIds: (ids: number[]) => void;
};

export const TravelFilter = (props: TravelFilterProps) => {
  const { subCategoryIds, setSubCategoryIds } = props;

  return (
    <Card className="w-[320px] p-4">
      <Accordion type="multiple" defaultValue={["category"]}>
        <CategoryFilter subCategoryIds={subCategoryIds} setSubCategoryIds={setSubCategoryIds} />
      </Accordion>
    </Card>
  );
};
