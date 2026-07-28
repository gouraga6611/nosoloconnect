import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ADMIN } from "@/constants/strings";
import {
  TICKET_TYPES,
  TICKET_PRIORITIES,
  PRIORITY_BADGE,
  STATUS_BADGE,
  TYPE_BADGE,
  TICKET_STATUS,
} from "@/constants/config";
import { TID } from "@/constants/testIds";

const findLabel = (list, value) =>
  list.find((o) => o.value === value)?.label ?? value;

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "long",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
};

const Row = ({ label, value }) => (
  <div className="grid grid-cols-3 gap-4 py-2">
    <div className="text-xs uppercase tracking-widest text-navy-soft font-semibold">
      {label}
    </div>
    <div className="col-span-2 text-navy">{value}</div>
  </div>
);

const Badge = ({ className, children }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}
  >
    {children}
  </span>
);

export const TicketDetailsDialog = ({ ticket, open, onOpenChange }) => {
  if (!ticket) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid={TID.adminDetailsDialog}
        className="sm:max-w-2xl"
      >
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {ADMIN.detailsTitle}
          </DialogTitle>
        </DialogHeader>
        <div className="divide-y">
          <Row label={ADMIN.columns.submitted} value={formatDate(ticket.createdAt)} />
          <Row label={ADMIN.columns.name} value={ticket.name} />
          <Row label={ADMIN.columns.email} value={ticket.email} />
          <Row label="Phone" value={ticket.phone || "—"} />
          <Row
            label={ADMIN.columns.type}
            value={
              <Badge className={TYPE_BADGE[ticket.type] ?? ""}>
                {findLabel(TICKET_TYPES, ticket.type)}
              </Badge>
            }
          />
          <Row
            label={ADMIN.columns.priority}
            value={
              <Badge className={PRIORITY_BADGE[ticket.priority] ?? ""}>
                {findLabel(TICKET_PRIORITIES, ticket.priority)}
              </Badge>
            }
          />
          <Row
            label={ADMIN.columns.status}
            value={
              <Badge className={STATUS_BADGE[ticket.status] ?? ""}>
                {ticket.status === TICKET_STATUS.OPEN ? "Open" : "Closed"}
              </Badge>
            }
          />
          <Row label={ADMIN.columns.subject} value={ticket.subject} />
          <div className="py-3">
            <div className="text-xs uppercase tracking-widest text-navy-soft font-semibold mb-2">
              Message
            </div>
            <p className="text-navy whitespace-pre-wrap leading-relaxed">
              {ticket.message}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDetailsDialog;
