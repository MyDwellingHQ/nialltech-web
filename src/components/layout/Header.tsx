"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { BrandMark } from "@/components/brand/BrandLogo";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { mainNav, serviceNavGroups, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const servicesId = useId();
  const mobileRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const panel = mobileRef.current;
    if (!panel) return;

    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    focusable[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const closeMenu = () => setOpen(false);
  const servicesActive = pathname.startsWith("/services");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-border/80 bg-background/85 backdrop-blur-xl"
          : "border-transparent bg-background/60 backdrop-blur-md",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
        <Link
          href="/"
          onClick={closeMenu}
          className="group flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label={`${siteConfig.name} home`}
        >
          <BrandMark className="h-9 w-9" />
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">
            Niall Tech
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {mainNav.map((item) => {
            if (item.href === "/services") {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    type="button"
                    className={cn(
                      "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      servicesActive
                        ? "bg-primary-soft text-primary"
                        : "text-muted hover:bg-primary-soft/70 hover:text-foreground",
                    )}
                    aria-expanded={servicesOpen}
                    aria-controls={servicesId}
                    onClick={() => setServicesOpen((value) => !value)}
                    onFocus={() => setServicesOpen(true)}
                  >
                    Services
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        servicesOpen && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={servicesId}
                    className={cn(
                      "absolute left-0 top-full z-50 pt-2",
                      servicesOpen ? "block" : "hidden",
                    )}
                  >
                    <div className="w-[min(90vw,40rem)] rounded-2xl border border-border bg-surface p-4 shadow-soft">
                      <div className="grid gap-4 sm:grid-cols-2">
                        {serviceNavGroups.map((group) => (
                          <div key={group.label}>
                            <Link
                              href={group.href}
                              className="text-xs font-semibold uppercase tracking-[0.14em] text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                              onClick={() => setServicesOpen(false)}
                            >
                              {group.label}
                            </Link>
                            <ul className="mt-2 space-y-1">
                              {group.items.map((service) => (
                                <li key={service.href}>
                                  <Link
                                    href={service.href}
                                    className="block rounded-lg px-2 py-2 text-sm text-foreground transition-colors hover:bg-primary-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    onClick={() => setServicesOpen(false)}
                                  >
                                    <span className="font-medium">
                                      {service.label}
                                    </span>
                                    {service.description ? (
                                      <span className="mt-0.5 block text-xs text-muted">
                                        {service.description}
                                      </span>
                                    ) : null}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 border-t border-border pt-3">
                        <Link
                          href="/services"
                          className="text-sm font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                          onClick={() => setServicesOpen(false)}
                        >
                          View all services →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active
                    ? "bg-primary-soft text-primary"
                    : "text-muted hover:bg-primary-soft/70 hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button href="/contact" size="sm">
            Book a consultation
          </Button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      <div
        id={menuId}
        ref={mobileRef}
        className={cn(
          "border-t border-border bg-background md:hidden",
          open ? "block animate-fade-in" : "hidden",
        )}
      >
        <Container className="flex max-h-[calc(100dvh-4rem)] flex-col gap-2 overflow-y-auto py-4">
          {mainNav.map((item) => {
            if (item.href === "/services") {
              return (
                <div key={item.href} className="space-y-1">
                  <Link
                    href="/services"
                    onClick={closeMenu}
                    className={cn(
                      "block rounded-xl px-3 py-3 text-base font-medium",
                      servicesActive
                        ? "bg-primary-soft text-primary"
                        : "text-foreground hover:bg-primary-soft/70",
                    )}
                  >
                    All services
                  </Link>
                  {serviceNavGroups.map((group) => (
                    <div key={group.label} className="px-3 pb-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                        {group.label}
                      </p>
                      <ul className="mt-1 space-y-1">
                        {group.items.map((service) => (
                          <li key={service.href}>
                            <Link
                              href={service.href}
                              onClick={closeMenu}
                              className="block rounded-lg py-2 text-sm text-foreground hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                              {service.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              );
            }

            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={cn(
                  "rounded-xl px-3 py-3 text-base font-medium",
                  active
                    ? "bg-primary-soft text-primary"
                    : "text-foreground hover:bg-primary-soft/70",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Button href="/contact" className="mt-2 w-full" onClick={closeMenu}>
            Book a consultation
          </Button>
        </Container>
      </div>
    </header>
  );
}
