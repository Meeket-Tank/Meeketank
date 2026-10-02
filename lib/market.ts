export type Exchange = {
  code: string;
  city: string;
  timeZone: string;
  open: [number, number]; // local hh, mm
  close: [number, number];
};

export const exchanges: Exchange[] = [
  { code: "NSE", city: "Mumbai", timeZone: "Asia/Kolkata", open: [9, 15], close: [15, 30] },
  { code: "LSE", city: "London", timeZone: "Europe/London", open: [8, 0], close: [16, 30] },
  { code: "NYSE", city: "New York", timeZone: "America/New_York", open: [9, 30], close: [16, 0] },
];

function localParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return {
    weekday: get("weekday"),
    hour: Number(get("hour")) % 24,
    minute: Number(get("minute")),
    second: Number(get("second")),
  };
}

/** Regular-session status for an exchange (weekends handled, holidays ignored). */
export function marketStatus(ex: Exchange, now: Date) {
  const p = localParts(now, ex.timeZone);
  const mins = p.hour * 60 + p.minute;
  const openM = ex.open[0] * 60 + ex.open[1];
  const closeM = ex.close[0] * 60 + ex.close[1];
  const weekend = p.weekday === "Sat" || p.weekday === "Sun";
  const isOpen = !weekend && mins >= openM && mins < closeM;

  let countdown = "";
  if (isOpen) {
    countdown = `closes in ${fmtDuration((closeM - mins) * 60 - p.second)}`;
  } else if (!weekend && mins < openM) {
    countdown = `opens in ${fmtDuration((openM - mins) * 60 - p.second)}`;
  } else {
    countdown = weekend ? "weekend" : "after hours";
  }

  const time = `${pad(p.hour)}:${pad(p.minute)}:${pad(p.second)}`;
  return { isOpen, time, countdown };
}

const pad = (n: number) => String(n).padStart(2, "0");

function fmtDuration(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  return h > 0 ? `${h}h ${pad(m)}m` : `${m}m`;
}
