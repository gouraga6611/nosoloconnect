// ============================================================================
// LocationsTab.jsx — Admin UI for the coverage map:
//   * Add a new location (Place, State/Region, Country)
//   * See total distinct Places & Countries (matches landing counters)
//   * List all locations, delete with confirmation
// Data goes through lib/locations (Firestore or localStorage stub).
// ============================================================================

import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Plus, MapPin, Globe2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
import { LOCATIONS_ADMIN } from "@/constants/strings";
import { TID } from "@/constants/testIds";
import {
  addLocation,
  listLocations,
  deleteLocation,
  countStats,
} from "@/lib/locations";

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
};

// -- Add location dialog ------------------------------------------------------
const AddLocationDialog = ({ open, onOpenChange, onSaved }) => {
  const t = LOCATIONS_ADMIN.form;
  const [place, setPlace] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const reset = () => {
    setPlace("");
    setState("");
    setCountry("");
    setErrors({});
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!place.trim()) errs.place = t.required;
    if (!country.trim()) errs.country = t.required;
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSaving(true);
    try {
      await addLocation({ place, state, country });
      toast.success(t.successToast);
      reset();
      onSaved();
      onOpenChange(false);
    } catch {
      toast.error(t.errorToast);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl">
            {LOCATIONS_ADMIN.addBtn}
          </DialogTitle>
          <DialogDescription>{LOCATIONS_ADMIN.subtitle}</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label>{t.placeLabel}</Label>
            <Input
              data-testid={TID.locFormPlace}
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder={t.placePh}
              className="h-11 nosolo-input"
            />
            {errors.place && (
              <p className="text-xs text-red-600">{errors.place}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>{t.stateLabel}</Label>
            <Input
              data-testid={TID.locFormState}
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder={t.statePh}
              className="h-11 nosolo-input"
            />
          </div>
          <div className="space-y-2">
            <Label>{t.countryLabel}</Label>
            <Input
              data-testid={TID.locFormCountry}
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder={t.countryPh}
              className="h-11 nosolo-input"
            />
            {errors.country && (
              <p className="text-xs text-red-600">{errors.country}</p>
            )}
          </div>
          <Button
            data-testid={TID.locFormSubmit}
            type="submit"
            disabled={saving}
            className="w-full h-11 rounded-full bg-navy hover:bg-[#001126] text-white"
          >
            {saving ? t.saving : t.submit}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// -- Root tab -----------------------------------------------------------------
export const LocationsTab = () => {
  const [locs, setLocs] = useState([]);
  const [stats, setStats] = useState({ places: 0, countries: 0 });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(null);

  const refresh = useCallback(async () => {
    setLocs(await listLocations());
    setStats(await countStats());
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const confirmDelete = async () => {
    if (!pendingDelete) return;
    await deleteLocation(pendingDelete.id);
    setPendingDelete(null);
    toast.success(LOCATIONS_ADMIN.toasts.deleted);
    refresh();
  };

  return (
    <div>
      <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy">
            {LOCATIONS_ADMIN.title}
          </h2>
          <p className="text-sm text-navy-soft mt-1 max-w-2xl">
            {LOCATIONS_ADMIN.subtitle}
          </p>
        </div>
        <Button
          data-testid={TID.locAddBtn}
          onClick={() => setDialogOpen(true)}
          className="rounded-full bg-navy hover:bg-[#001126] text-white h-11 px-5"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          {LOCATIONS_ADMIN.addBtn}
        </Button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="nosolo-card p-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-navy-soft">
              {LOCATIONS_ADMIN.countsCard.placesTitle}
            </p>
            <p
              data-testid={TID.locStatPlaces}
              className="font-display text-4xl font-extrabold text-navy mt-1"
            >
              {stats.places}
            </p>
          </div>
          <MapPin className="w-8 h-8 text-sky-brand" />
        </div>
        <div className="nosolo-card p-6 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-navy-soft">
              {LOCATIONS_ADMIN.countsCard.countriesTitle}
            </p>
            <p
              data-testid={TID.locStatCountries}
              className="font-display text-4xl font-extrabold text-navy mt-1"
            >
              {stats.countries}
            </p>
          </div>
          <Globe2 className="w-8 h-8 text-emerald-500" />
        </div>
      </div>

      {locs.length === 0 ? (
        <div
          data-testid={TID.locEmpty}
          className="nosolo-card p-16 text-center flex flex-col items-center"
        >
          <MapPin className="w-8 h-8 text-sky-brand mb-3" />
          <h3 className="font-display text-xl font-bold text-navy">
            {LOCATIONS_ADMIN.emptyTitle}
          </h3>
          <p className="text-navy-soft mt-1">
            {LOCATIONS_ADMIN.emptySubtitle}
          </p>
        </div>
      ) : (
        <div className="nosolo-card overflow-hidden">
          <Table data-testid={TID.locTable}>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead>{LOCATIONS_ADMIN.columns.place}</TableHead>
                <TableHead>{LOCATIONS_ADMIN.columns.state}</TableHead>
                <TableHead>{LOCATIONS_ADMIN.columns.country}</TableHead>
                <TableHead>{LOCATIONS_ADMIN.columns.added}</TableHead>
                <TableHead className="text-right">
                  {LOCATIONS_ADMIN.columns.actions}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locs.map((l) => (
                <TableRow key={l.id} data-testid={TID.locRow(l.id)}>
                  <TableCell className="font-medium text-navy">
                    {l.place}
                  </TableCell>
                  <TableCell className="text-navy-soft">
                    {l.state || "—"}
                  </TableCell>
                  <TableCell className="text-navy">{l.country}</TableCell>
                  <TableCell className="text-navy-soft text-sm">
                    {formatDate(l.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      data-testid={TID.locDelete(l.id)}
                      size="icon"
                      variant="ghost"
                      onClick={() => setPendingDelete(l)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AddLocationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSaved={refresh}
      />

      <AlertDialog
        open={!!pendingDelete}
        onOpenChange={(o) => !o && setPendingDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {LOCATIONS_ADMIN.deleteConfirm.title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {LOCATIONS_ADMIN.deleteConfirm.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid={TID.locDeleteCancel}>
              {LOCATIONS_ADMIN.deleteConfirm.cancel}
            </AlertDialogCancel>
            <AlertDialogAction
              data-testid={TID.locDeleteConfirm}
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              {LOCATIONS_ADMIN.deleteConfirm.confirm}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LocationsTab;
