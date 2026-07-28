import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONTACT } from "@/constants/strings";
import { TICKET_TYPES, TICKET_PRIORITIES } from "@/constants/config";
import { TID } from "@/constants/testIds";
import { createTicket } from "@/lib/storage";

const INITIAL = {
  name: "",
  email: "",
  phone: "",
  type: TICKET_TYPES[0].value,
  priority: TICKET_PRIORITIES[1].value,
  subject: "",
  message: "",
};

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export const FeedbackSupportForm = () => {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const t = CONTACT.form;

  const setField = (k, v) => {
    setValues((prev) => ({ ...prev, [k]: v }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!values.name.trim()) e.name = t.requiredError;
    if (!values.email.trim()) e.email = t.requiredError;
    else if (!isEmail(values.email)) e.email = t.emailError;
    if (!values.subject.trim()) e.subject = t.requiredError;
    if (!values.message.trim()) e.message = t.requiredError;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await createTicket({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        type: values.type,
        priority: values.priority,
        subject: values.subject.trim(),
        message: values.message.trim(),
      });
      toast.success(t.successTitle, { description: t.successDesc });
      setValues(INITIAL);
    } catch {
      toast.error(t.errorTitle, { description: t.errorDesc });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">{t.nameLabel}</Label>
          <Input
            id="name"
            data-testid={TID.formName}
            value={values.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder={t.namePh}
            className="h-12 nosolo-input"
          />
          {errors.name && (
            <p className="text-xs text-red-600">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t.emailLabel}</Label>
          <Input
            id="email"
            type="email"
            data-testid={TID.formEmail}
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            placeholder={t.emailPh}
            className="h-12 nosolo-input"
          />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t.phoneLabel}</Label>
          <Input
            id="phone"
            data-testid={TID.formPhone}
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            placeholder={t.phonePh}
            className="h-12 nosolo-input"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{t.typeLabel}</Label>
            <Select
              value={values.type}
              onValueChange={(v) => setField("type", v)}
            >
              <SelectTrigger data-testid={TID.formType} className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TICKET_TYPES.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>{t.priorityLabel}</Label>
            <Select
              value={values.priority}
              onValueChange={(v) => setField("priority", v)}
            >
              <SelectTrigger data-testid={TID.formPriority} className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {TICKET_PRIORITIES.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">{t.subjectLabel}</Label>
        <Input
          id="subject"
          data-testid={TID.formSubject}
          value={values.subject}
          onChange={(e) => setField("subject", e.target.value)}
          placeholder={t.subjectPh}
          className="h-12 nosolo-input"
        />
        {errors.subject && (
          <p className="text-xs text-red-600">{errors.subject}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t.messageLabel}</Label>
        <Textarea
          id="message"
          data-testid={TID.formMessage}
          value={values.message}
          onChange={(e) => setField("message", e.target.value)}
          placeholder={t.messagePh}
          rows={6}
          className="nosolo-input resize-none"
        />
        {errors.message && (
          <p className="text-xs text-red-600">{errors.message}</p>
        )}
      </div>

      <Button
        type="submit"
        data-testid={TID.formSubmit}
        disabled={submitting}
        className="rounded-full bg-navy hover:bg-[#001126] text-white h-12 px-8 text-base"
      >
        <Send className="w-4 h-4 mr-2" />
        {submitting ? t.submitting : t.submit}
      </Button>
    </form>
  );
};

export default FeedbackSupportForm;
