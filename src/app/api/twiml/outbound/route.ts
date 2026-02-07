import { NextResponse } from "next/server";

export async function GET() {
  const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say language="es-MX">Esta es una prueba de AutoCall.</Say>
  <Pause length="1"/>
  <Say language="es-MX">Gracias por usar AutoCall.</Say>
  <Hangup/>
</Response>`;

  return new NextResponse(twiml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "no-store",
    },
  });
}
