import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Check, RotateCcw, Trash2, Inbox } from "lucide-react";
import {
  PRIORITY_BADGE,
  STATUS_BADGE,
  TYPE_BADGE,
  TICKET_STATUS,
  TICKET_TYPES,
  TICKET_PRIORITIES,
} from "@/constants/config";
import { ADMIN } from "@/constants/strings";
import { TID } from "@/constants/testIds";

const findLabel = (list, value) =>
  list.find((o) => o.value === value)?.label ?? value;

const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
};

const Badge = ({ className, children }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className}`}
  >
    {children}
  </span>
);

export const TicketsTable = ({
  tickets,
  onView,
  onClose,
  onReopen,
  onDelete,
}) => {
  if (!tickets.length) {
    return (
      <div
        data-testid={TID.adminEmpty}
        className="nosolo-card p-16 text-center flex flex-col items-center"
      >
        <div className="w-14 h-14 rounded-full bg-sky-soft flex items-center justify-center mb-4">
          <Inbox className="w-6 h-6 text-sky-brand" />
        </div>
        <h3 className="font-display text-xl font-bold text-navy">
          {ADMIN.emptyTitle}
        </h3>
        <p className="text-navy-soft mt-1">{ADMIN.emptySubtitle}</p>
      </div>
    );
  }

  return (
    <div className="nosolo-card overflow-hidden">
      <Table data-testid={TID.adminTable}>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead>{ADMIN.columns.submitted}</TableHead>
            <TableHead>{ADMIN.columns.name}</TableHead>
            <TableHead>{ADMIN.columns.email}</TableHead>
            <TableHead>{ADMIN.columns.type}</TableHead>
            <TableHead>{ADMIN.columns.priority}</TableHead>
            <TableHead>{ADMIN.columns.subject}</TableHead>
            <TableHead>{ADMIN.columns.status}</TableHead>
            <TableHead className="text-right">
              {ADMIN.columns.actions}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((t) => (
            <TableRow key={t.id} data-testid={TID.adminRow(t.id)}>
              <TableCell className="text-navy-soft text-sm whitespace-nowrap">
                {formatDate(t.createdAt)}
              </TableCell>
              <TableCell className="font-medium text-navy">{t.name}</TableCell>
              <TableCell className="text-navy-soft">{t.email}</TableCell>
              <TableCell>
                <Badge className={TYPE_BADGE[t.type] ?? ""}>
                  {findLabel(TICKET_TYPES, t.type)}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={PRIORITY_BADGE[t.priority] ?? ""}>
                  {findLabel(TICKET_PRIORITIES, t.priority)}
                </Badge>
              </TableCell>
              <TableCell className="max-w-[220px] truncate text-navy">
                {t.subject}
              </TableCell>
              <TableCell>
                <Badge className={STATUS_BADGE[t.status] ?? ""}>
                  {t.status === TICKET_STATUS.OPEN ? "Open" : "Closed"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    data-testid={TID.adminView(t.id)}
                    size="icon"
                    variant="ghost"
                    onClick={() => onView(t)}
                    title={ADMIN.actions.view}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  {t.status === TICKET_STATUS.OPEN ? (
                    <Button
                      data-testid={TID.adminClose(t.id)}
                      size="icon"
                      variant="ghost"
                      onClick={() => onClose(t)}
                      title={ADMIN.actions.close}
                    >
                      <Check className="w-4 h-4 text-emerald-600" />
                    </Button>
                  ) : (
                    <Button
                      data-testid={TID.adminReopen(t.id)}
                      size="icon"
                      variant="ghost"
                      onClick={() => onReopen(t)}
                      title={ADMIN.actions.reopen}
                    >
                      <RotateCcw className="w-4 h-4 text-sky-600" />
                    </Button>
                  )}
                  <Button
                    data-testid={TID.adminDelete(t.id)}
                    size="icon"
                    variant="ghost"
                    onClick={() => onDelete(t)}
                    title={ADMIN.actions.delete}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TicketsTable;
