import { connection, NextResponse } from "next/server";
import { isEmailConfigured } from "@/lib/forms/email";

/**
 * Delivery status for the form interface.
 * When false, every form shows the direct phone and WhatsApp lines and says
 * plainly that email delivery is not connected. Nothing pretends to send.
 */

export async function GET(): Promise<Response> {
  // Read the environment at request time, never at build time.
  await connection();

  return NextResponse.json(
    { configured: isEmailConfigured() },
    { headers: { "Cache-Control": "no-store" } }
  );
}
