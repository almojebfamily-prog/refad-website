"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { RawNodeDatum } from "react-d3-tree";
import type { FamilyTreeNode } from "@/lib/data/family-tree";

const Tree = dynamic(() => import("react-d3-tree"), { ssr: false });

export function FamilyTreeView({ data }: { data: FamilyTreeNode[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<RawNodeDatum | null>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 80 });

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const updateTranslate = () =>
      setTranslate({ x: node.clientWidth / 2, y: 80 });

    updateTranslate();
    const observer = new ResizeObserver(updateTranslate);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-10 text-center text-sm text-neutral-600">
        لا توجد بيانات لعرض شجرة العائلة بعد.
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div
        ref={containerRef}
        dir="ltr"
        className="h-[560px] rounded-2xl border border-neutral-200 bg-white lg:col-span-2"
      >
        <Tree
          data={data as RawNodeDatum[]}
          translate={translate}
          orientation="vertical"
          pathFunc="step"
          collapsible
          zoomable
          separation={{ siblings: 1.2, nonSiblings: 1.6 }}
          onNodeClick={(nodeDatum) => setSelected(nodeDatum.data)}
        />
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-6">
        <h2 className="mb-3 text-sm font-semibold text-neutral-500">
          تفاصيل الفرد
        </h2>
        {selected ? (
          <div>
            <p className="text-lg font-bold text-primary-900">{selected.name}</p>
            {selected.attributes &&
              Object.entries(selected.attributes).map(([key, value]) => (
                <p key={key} className="mt-1 text-sm text-neutral-600">
                  <span className="font-medium text-neutral-800">{key}:</span>{" "}
                  {value}
                </p>
              ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-500">
            انقر على أي فرد في الشجرة لعرض تفاصيله هنا.
          </p>
        )}
      </div>
    </div>
  );
}
