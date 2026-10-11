"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ImageOff } from "lucide-react";
import type { CastMember } from "@/types/movie";
import { getImageUrl } from "@/lib/api";
import { useApp } from "./AppProvider";
import { Button } from "./ui/button";

export default function CastCarousel({ cast }: { cast: CastMember[] }) {
  const { t } = useApp();
  const row = useRef<HTMLDivElement>(null);
  const drag = useRef<{ pointer: number; x: number; scroll: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const [canPrevious, setCanPrevious] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const element = row.current;
    if (!element) return;
    const update = () => {
      setCanPrevious(element.scrollLeft > 1);
      setCanNext(element.scrollLeft + element.clientWidth < element.scrollWidth - 1);
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => {
      observer.disconnect();
      element.removeEventListener("scroll", update);
    };
  }, [cast]);

  function scroll(direction: number) {
    const element = row.current;
    if (!element) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    element.scrollBy({ left: direction * element.clientWidth * 0.75, behavior: reducedMotion ? "auto" : "smooth" });
  }

  function endDrag() {
    drag.current = null;
    setDragging(false);
  }

  return (
    <section className="min-w-0" aria-label={t.cast}>
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">{t.cast}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{t.dragCast}</p>
        </div>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" size="icon" aria-label={t.previousActors} disabled={!canPrevious} onClick={() => scroll(-1)}><ChevronLeft /></Button>
          <Button variant="outline" size="icon" aria-label={t.nextActors} disabled={!canNext} onClick={() => scroll(1)}><ChevronRight /></Button>
        </div>
      </div>
      <div
        ref={row}
        role="region"
        aria-label={t.cast}
        tabIndex={0}
        className={`flex gap-4 overflow-x-auto overscroll-x-contain rounded-lg pb-4 select-none outline-none focus-visible:ring-2 focus-visible:ring-ring ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
        onDragStart={event => event.preventDefault()}
        onPointerDown={event => {
          // Touch keeps native scrolling; mouse and pen use pointer capture.
          if (event.pointerType === "touch" || event.button !== 0) return;
          event.preventDefault();
          event.currentTarget.focus({ preventScroll: true });
          drag.current = { pointer: event.pointerId, x: event.clientX, scroll: event.currentTarget.scrollLeft };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={event => {
          const current = drag.current;
          if (!current || current.pointer !== event.pointerId) return;
          const distance = event.clientX - current.x;
          if (Math.abs(distance) > 4) setDragging(true);
          event.currentTarget.scrollLeft = current.scroll - distance;
        }}
        onPointerUp={event => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
          endDrag();
        }}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        onKeyDown={event => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            scroll(event.key === "ArrowLeft" ? -1 : 1);
          } else if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            event.currentTarget.scrollLeft = event.key === "Home" ? 0 : event.currentTarget.scrollWidth;
          }
        }}
      >
        {cast.map(person => (
          <div key={person.id} className="w-28 shrink-0">
            {person.profile_path ? (
              <Image src={getImageUrl(person.profile_path)} alt={person.name} width={112} height={168} draggable={false} className="aspect-2/3 rounded-lg object-cover" />
            ) : (
              <div className="flex aspect-2/3 items-center justify-center rounded-lg bg-muted"><ImageOff /></div>
            )}
            <p className="mt-2 text-sm font-medium">{person.name}</p>
            <p className="text-xs text-muted-foreground">{person.character}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
