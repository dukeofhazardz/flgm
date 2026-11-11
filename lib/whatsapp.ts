// WhatsApp helper.
// "+234 808 959 9066" -> https://wa.me/2348089599066 with a prefilled message.
// Nigeria country code: 234. A national-format number with a leading zero is
// normalised the same way, so either input shape produces one valid link.

export function toWhatsAppLink(phone: string, message: string): string {
  const digits = phone.replace(/\D/g, "");
  const normalized = digits.startsWith("0") ? `234${digits.slice(1)}` : digits;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(message)}`;
}

export const FLGM_PHONE = "+234 808 959 9066";

export function whatsappLink(message?: string): string {
  const defaultMessage =
    "Good day, I am interested in Forever Life and Grace Mission. Please send me more information.";
  return toWhatsAppLink(FLGM_PHONE, message ?? defaultMessage);
}
