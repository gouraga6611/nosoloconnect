// ============================================================================
// SupportAdminPage.jsx — Thin shell for the /support console.
//   * Password gate (PasswordGate) — locks with ADMIN_PASSWORD.
//   * Tabs: Tickets · Locations · Ratings — each in its own file for
//     readability & smaller diff surface area on future changes.
// ============================================================================

import { useEffect, useState } from "react";
import { LogOut, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import PasswordGate from "@/components/admin/PasswordGate";
import TicketsTab from "@/components/admin/tabs/TicketsTab";
import LocationsTab from "@/components/admin/tabs/LocationsTab";
import RatingsTab from "@/components/admin/tabs/RatingsTab";
import { ADMIN, BRAND } from "@/constants/strings";
import { ADMIN_SESSION_KEY } from "@/constants/config";
import { TID } from "@/constants/testIds";

export const SupportAdminPage = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState("tickets");

  // Restore admin session from sessionStorage
  useEffect(() => {
    setUnlocked(sessionStorage.getItem(ADMIN_SESSION_KEY) === "1");
  }, []);

  const handleUnlock = () => {
    sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
    setUnlocked(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setUnlocked(false);
  };

  return (
    <div className="min-h-screen bg-cream">
      <PasswordGate open={!unlocked} onUnlock={handleUnlock} />

      {unlocked && (
        <>
          <header className="nosolo-nav sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
              <div className="flex items-center gap-2 font-display font-bold text-navy text-lg">
                <Compass className="w-5 h-5 text-sky-brand" />
                {BRAND.wordmark}
                <span className="text-navy-soft font-medium text-sm ml-3">
                  / Console
                </span>
              </div>
              <Button
                data-testid={TID.adminLogout}
                variant="ghost"
                onClick={handleLogout}
                className="rounded-full text-navy hover:bg-slate-100"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {ADMIN.logout}
              </Button>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-6 lg:px-10 py-12">
            <div className="mb-8">
              <h1 className="nosolo-heading text-3xl sm:text-4xl">
                {ADMIN.pageTitle}
              </h1>
              <p className="text-navy-soft mt-2 max-w-xl">
                {ADMIN.pageSubtitle}
              </p>
            </div>

            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger
                  data-testid={TID.adminTabTickets}
                  value="tickets"
                >
                  {ADMIN.tabs.tickets}
                </TabsTrigger>
                <TabsTrigger
                  data-testid={TID.adminTabLocations}
                  value="locations"
                >
                  {ADMIN.tabs.locations}
                </TabsTrigger>
                <TabsTrigger
                  data-testid={TID.adminTabRatings}
                  value="ratings"
                >
                  {ADMIN.tabs.ratings}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="tickets">
                <TicketsTab />
              </TabsContent>
              <TabsContent value="locations">
                <LocationsTab />
              </TabsContent>
              <TabsContent value="ratings">
                <RatingsTab />
              </TabsContent>
            </Tabs>
          </main>
        </>
      )}
    </div>
  );
};

export default SupportAdminPage;
