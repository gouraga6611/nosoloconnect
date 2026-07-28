// ============================================================================
// TicketsTab.jsx — Tickets management (originally inline in SupportAdminPage).
// Moved out so SupportAdminPage.jsx can act as a lean tabs shell.
// ============================================================================

import { useEffect, useMemo, useState, useCallback } from "react";
import { toast } from "sonner";
import { Search, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import TicketsTable from "@/components/admin/TicketsTable";
import TicketDetailsDialog from "@/components/admin/TicketDetailsDialog";
import { ADMIN } from "@/constants/strings";
import {
  TICKET_STATUS,
  TICKET_STATUS_OPTIONS,
  TICKET_TYPES,
} from "@/constants/config";
import { TID } from "@/constants/testIds";
import {
  listTickets,
  deleteTicket,
  updateTicketStatus,
} from "@/lib/storage";

const ALL = "__all__";

export const TicketsTab = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState(ALL);
  const [typeFilter, setTypeFilter] = useState(ALL);
  const [viewing, setViewing] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setTickets(await listTickets());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const handleClose = async (t) => {
    await updateTicketStatus(t.id, TICKET_STATUS.CLOSED);
    toast.success(ADMIN.toasts.closed);
    refresh();
  };
  const handleReopen = async (t) => {
    await updateTicketStatus(t.id, TICKET_STATUS.OPEN);
    toast.success(ADMIN.toasts.reopened);
    refresh();
  };
  const confirmDelete = async () => {
    if (!pendingDelete) return;
    await deleteTicket(pendingDelete.id);
    setPendingDelete(null);
    toast.success(ADMIN.toasts.deleted);
    refresh();
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tickets.filter((t) => {
      if (statusFilter !== ALL && t.status !== statusFilter) return false;
      if (typeFilter !== ALL && t.type !== typeFilter) return false;
      if (!q) return true;
      return [t.name, t.email, t.subject, t.message]
        .filter(Boolean)
        .some((v) => v.toLowerCase().includes(q));
    });
  }, [tickets, search, statusFilter, typeFilter]);

  return (
    <div>
      <div className="flex items-end justify-between flex-wrap gap-6 mb-8">
        <div className="text-sm text-navy-soft">
          {ADMIN.countLabel(filtered.length)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-6">
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-navy-soft" />
          <Input
            data-testid={TID.adminSearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={ADMIN.searchPlaceholder}
            className="pl-9 h-11 nosolo-input"
          />
        </div>
        <div className="md:col-span-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger data-testid={TID.adminFilterStatus} className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>{ADMIN.filterStatusAll}</SelectItem>
              {TICKET_STATUS_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-2">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger data-testid={TID.adminFilterType} className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>{ADMIN.filterTypeAll}</SelectItem>
              {TICKET_TYPES.map((o) => (
                <SelectItem key={o.value} value={o.value}>
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-1">
          <Button
            variant="outline"
            onClick={refresh}
            className="w-full h-11 rounded-md"
            disabled={loading}
            title="Refresh"
          >
            <RefreshCcw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </div>

      <TicketsTable
        tickets={filtered}
        onView={setViewing}
        onClose={handleClose}
        onReopen={handleReopen}
        onDelete={setPendingDelete}
      />

      <TicketDetailsDialog
        ticket={viewing}
        open={!!viewing}
        onOpenChange={(o) => !o && setViewing(null)}
      />

      <AlertDialog
        open={!!pendingDelete}
        onOpenChange={(o) => !o && setPendingDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{ADMIN.deleteConfirm.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {ADMIN.deleteConfirm.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid={TID.adminDeleteCancel}>
              {ADMIN.deleteConfirm.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              data-testid={TID.adminDeleteConfirm}
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {ADMIN.deleteConfirm.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TicketsTab;
