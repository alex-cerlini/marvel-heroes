"use client";
import { ResponsiveCirclePacking } from "@nivo/circle-packing";
import { useState } from "react";
import { HeroesResponse } from "@/hooks/useHeroes/types";
import { useHeroCharts } from "@/hooks/useHeroCharts";

export type HeroChartsProps = {
  results?: Pick<HeroesResponse["data"], "results">["results"];
};

export const HeroCharts = ({ results }: HeroChartsProps) => {
  const [zoomedId, setZoomedId] = useState("");
  const data = useHeroCharts({ results });

  const handleClickCircle = (value: string) => {
    if (value === zoomedId) {
      setZoomedId("");
      return;
    }

    setZoomedId(value);
  };

  return (
    <ResponsiveCirclePacking
      zoomedId={zoomedId}
      margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      onClick={(node) => handleClickCircle(node.data.id)}
      data={data}
      id="id"
      label={(d) => d.data.name}
      value="loc"
      colors={{ scheme: "red_grey" }}
      childColor={{
        from: "color",
        modifiers: [["brighter", 0.4]],
      }}
      padding={4}
      enableLabels={true}
      labelsFilter={(n) => 4 > n.node.depth}
      labelsSkipRadius={10}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.5]],
      }}
      defs={[
        {
          id: "lines",
          type: "patternLines",
          background: "none",
          color: "inherit",
          rotation: -45,
          lineWidth: 5,
          spacing: 8,
        },
      ]}
      fill={[
        {
          match: {
            depth: 1,
          },
          id: "lines",
        },
      ]}
    />
  );
};
