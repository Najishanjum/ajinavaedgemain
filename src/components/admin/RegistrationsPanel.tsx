import { useCallback, useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { listRegistrations, deleteRegistration } from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download, Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Registration = {
  id: string;
  event_slug: string;
  event_title: string;
  name: string;
  email: string;
  phone: string | null;
  organization: string | null;
  note: string | null;
  created_at: string;
};

export function RegistrationsPanel({ onChanged }: { onChanged?: () => void }) {
  const fetchRows = useServerFn(listRegistrations);
  const remove = useServerFn(deleteRegistration);

  const [rows, setRows] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setRows((await fetchRows()) as Registration[]);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not load registrations.");
    } finally {
      setLoading(false);
    }
  }, [fetchRows]);

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.name, r.email, r.event_title, r.organization].some((v) => v?.toLowerCase().includes(q)),
    );
  }, [rows, query]);

  const byEvent = useMemo(() => {
    const map = new Map<string, number>();
    rows.forEach((r) => map.set(r.event_title, (map.get(r.event_title) ?? 0) + 1));
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, [rows]);

  function exportCsv() {
    const data = [
      ["Event", "Name", "Email", "Phone", "College/Company", "Note", "Registered"],
      ...filtered.map((r) => [
        r.event_title,
        r.name,
        r.email,
        r.phone ?? "",
        r.organization ?? "",
        (r.note ?? "").replace(/\s+/g, " "),
        r.created_at,
      ]),
    ];
    const csv = data
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `ajinava-registrations-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function destroy(id: string) {
    setBusy(true);
    try {
      await remove({ data: { id } });
      await load();
      onChanged?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not delete.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-5 w-5 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div className="flex flex-wrap items-center gap-3">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search attendee, email or event…"
          className="max-w-sm"
        />
        <Button variant="outline" className="rounded-full" onClick={exportCsv}>
          <Download className="h-4 w-4" /> Export CSV
        </Button>
        <span className="text-xs text-muted-foreground">
          {filtered.length} of {rows.length}
        </span>
      </div>

      {byEvent.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {byEvent.map(([title, count]) => (
            <span
              key={title}
              className="rounded-full border border-foreground/10 px-3 py-1 text-xs text-muted-foreground"
            >
              {title} · <strong className="text-foreground">{count}</strong>
            </span>
          ))}
        </div>
      )}

      <div className="mt-6 overflow-x-auto rounded-3xl border border-foreground/10">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event</TableHead>
              <TableHead>Attendee</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>College / Company</TableHead>
              <TableHead>Registered</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                  No registrations yet.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell className="max-w-[220px] truncate">{r.event_title}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.email}</TableCell>
                  <TableCell>{r.phone ?? "—"}</TableCell>
                  <TableCell>{r.organization ?? "—"}</TableCell>
                  <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                    {new Date(r.created_at).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={busy}
                      onClick={() => destroy(r.id)}
                      aria-label="Delete registration"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
