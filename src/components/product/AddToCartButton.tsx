"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils/cn";

interface AddToCartButtonProps {
  variantId: string;
  productName: string;
  quantity?: number;
  size?: "md" | "lg";
  variant?: "primary" | "secondary";
  className?: string;
}

export function AddToCartButton({
  variantId,
  productName,
  quantity = 1,
  size = "md",
  variant = "primary",
  className,
}: AddToCartButtonProps) {
  const { add } = useCart();
  const [status, setStatus] = useState<"idle" | "added" | "error">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = setTimeout(() => setStatus("idle"), 1800);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <>
      <Button
        size={size}
        variant={variant}
        className={cn("relative", className)}
        onClick={() => setStatus(add(variantId, quantity) ? "added" : "error")}
        aria-label={`Agregar ${productName} al carrito`}
      >
        <span className={cn("transition-opacity", status === "added" && "opacity-0")}>Agregar al carrito</span>
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 flex items-center justify-center gap-1.5 transition-opacity",
            status === "added" ? "opacity-100" : "opacity-0",
          )}
        >
          <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
            <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Agregado
        </span>
      </Button>
      {status === "error" && (
        <p role="alert" className="mt-2 text-sm text-danger">
          Este producto no está disponible en este momento.
        </p>
      )}
    </>
  );
}
