"use client";

import { Accordion } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { CategoryFilter } from "./filters";

export const TravelFilter = () => {
  return (
    <Card className="w-[320px] px-4">
      <Accordion type="multiple">
        <CategoryFilter />
      </Accordion>
    </Card>
  );
};
