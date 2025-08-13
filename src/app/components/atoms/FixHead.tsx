"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Moves any SEO-related tags that were mistakenly rendered in the body
 * into the document head. This mainly helps during dev/streaming where
 * head tags can appear in the body temporarily.
 */

export function FixHead(): null {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === "undefined") return;

    const head = document.head;
    const body = document.body;
    if (!head || !body) return;

    const selectors = [
      "meta[name]",
      "meta[property]",
      'link[rel="canonical"]',
      "title"
    ];

    const nodes = Array.from(
      body.querySelectorAll<HTMLElement>(selectors.join(", "))
    );

    nodes.forEach((node) => {
      const tag = node.tagName.toLowerCase();
      if (tag === "meta") {
        const name = node.getAttribute("name");
        const property = node.getAttribute("property");
        const content = node.getAttribute("content") || "";

        if (name) {
          const existing = head.querySelector<HTMLMetaElement>(
            `meta[name="${name}"]`
          );
          if (!existing) {
            head.appendChild(node);
          } else {
            // keep head authoritative
            existing.setAttribute("content", content);
            node.remove();
          }
        } else if (property) {
          const existing = head.querySelector<HTMLMetaElement>(
            `meta[property="${property}"]`
          );
          if (!existing) {
            head.appendChild(node);
          } else {
            existing.setAttribute("content", content);
            node.remove();
          }
        }
      } else if (tag === "link") {
        const rel = node.getAttribute("rel");
        const href = node.getAttribute("href") || "";
        if (rel === "canonical") {
          const existing = head.querySelector<HTMLLinkElement>(
            'link[rel="canonical"]'
          );
          if (!existing) {
            head.appendChild(node);
          } else {
            existing.setAttribute("href", href);
            node.remove();
          }
        }
      } else if (tag === "title") {
        const titleInHead = head.querySelector("title");
        if (!titleInHead) {
          head.appendChild(node);
        } else {
          titleInHead.textContent = node.textContent || "";
          node.remove();
        }
      }
    });
  }, [pathname]);

  return null;
}
