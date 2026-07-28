import { useState } from "react";
import { Lock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ADMIN } from "@/constants/strings";
import { ADMIN_PASSWORD } from "@/constants/config";
import { TID } from "@/constants/testIds";

export const PasswordGate = ({ open, onUnlock }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (value === ADMIN_PASSWORD) {
      setError("");
      setValue("");
      onUnlock();
    } else {
      setError(ADMIN.gateWrong);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        data-testid={TID.adminGate}
        className="sm:max-w-md [&>button.absolute]:hidden"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="w-11 h-11 rounded-full bg-sky-soft flex items-center justify-center mb-2">
            <Lock className="w-5 h-5 text-sky-brand" />
          </div>
          <DialogTitle className="font-display text-2xl">
            {ADMIN.gateTitle}
          </DialogTitle>
          <DialogDescription>{ADMIN.gateSubtitle}</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4 mt-2">
          <Input
            data-testid={TID.adminPassword}
            type="password"
            autoFocus
            placeholder={ADMIN.gatePlaceholder}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (error) setError("");
            }}
            className="h-12 nosolo-input"
          />
          {error && (
            <p
              data-testid={TID.adminGateError}
              className="text-sm text-red-600"
            >
              {error}
            </p>
          )}
          <Button
            data-testid={TID.adminGateSubmit}
            type="submit"
            className="w-full h-12 rounded-full bg-navy hover:bg-[#001126] text-white"
          >
            {ADMIN.gateSubmit}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PasswordGate;
