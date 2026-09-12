import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import {
  claimFirstAdmin,
  deleteAppUser,
  deleteLead,
  getAdminStats,
  getMyAccess,
  listAppUsers,
  listLeads,
  setAdminRole,
} from "@/lib/admin.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, LogOut, RefreshCw, ShieldCheck, Trash2, Users, Mail, Download, FileText, Ticket } from "lucide-react";
import { PostsPanel } from "@/components/admin/PostsPanel";
import { RegistrationsPanel } from "@/components/admin/RegistrationsPanel";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Ajinava Edge" },
      {
        name: "description",
        content:
          "Private Ajinava Edge admin dashboard: review chatbot leads, manage members and roles, and track activity.",
      },
      { property: "og:title", content: "Admin Dashboard — Ajinava Edge" },
      {
        property: "og:description",
        content: "Manage Ajinava Edge leads, members and roles.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

type Lead = {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  requirement: string | null;
  source: string | null;
  created_at: string;
};

type AppUser = {
  id: string;
  email: string;
  createdAt: string;
  lastSignInAt: string | null;
  confirmed: boolean;
  isAdmin: boolean;
};

function fmt(date: string | null) {
  if (!date) return "—";
  return new Date(date).toLocaleString();
}

function AdminPage() {
  const navigate = useNavigate();
  const access = useServerFn(getMyAccess);
  const claim = useServerFn(claimFirstAdmin);
  const fetchStats = useServerFn(getAdminStats);
  const fetchLeads = useServerFn(listLeads);
  const fetchUsers = useServerFn(listAppUsers);
  const removeLead = useServerFn(deleteLead);
  const toggleAdmin = useServerFn(setAdminRole);
  const removeUser = useServerFn(deleteAppUser);

  const [state, setState] = useState<{
    loading: boolean;
    isAdmin: boolean;
    adminExists: boolean;
    userId: string | null;
  }>({ loading: true, isAdmin: false, adminExists: true, userId: null });
  const [stats, setStats] = useState<{
    totalLeads: number;
    recentLeads: number;
    admins: number;
    totalUsers: number;
    posts?: number;
    publishedPosts?: number;
    registrations?: number;
  } | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [users, setUsers] = useState<AppUser[]>([]);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    setError(null);
    try {
      const a = await access();
      setState({
        loading: false,
        isAdmin: a.isAdmin,
        adminExists: a.adminExists,
        userId: a.userId,
      });
      if (!a.isAdmin) return;
      const [s, l, u] = await Promise.all([fetchStats(), fetchLeads(), fetchUsers()]);
      setStats(s);
      setLeads(l as Lead[]);
      setUsers(u as AppUser[]);
    } catch (err) {
      setState((p) => ({ ...p, loading: false }));
      setError(err instanceof Error ? err.message : "Could not load dashboard data.");
    }
  }, [access, fetchStats, fetchLeads, fetchUsers]);

  useEffect(() => {
    void loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredLeads = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter((l) =>
      [l.name, l.email, l.phone, l.requirement].some((v) => v?.toLowerCase().includes(q)),
    );
  }, [leads, query]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  function exportCsv() {
    const rows = [
      ["Name", "Email", "Phone", "Requirement", "Source", "Created"],
      ...filteredLeads.map((l) => [
        l.name ?? "",
        l.email ?? "",
        l.phone ?? "",
        (l.requirement ?? "").replace(/\s+/g, " "),
        l.source ?? "",
        l.created_at,
      ]),
    ];
    const csv = rows
      .map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `ajinava-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function action(fn: () => Promise<unknown>) {
    setBusy(true);
    setError(null);
    try {
      await fn();
      await loadAll();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Action failed.");
    } finally {
      setBusy(false);
    }
  }

  if (state.loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!state.isAdmin) {
    return (
      <section className="mx-auto max-w-xl px-4 py-24 text-center">
        <ShieldCheck className="mx-auto h-10 w-10 text-primary" />
        <h1 className="mt-6 font-display text-4xl tracking-tight">Admin access required</h1>
        {!state.adminExists ? (
          <>
            <p className="mt-3 text-sm text-muted-foreground">
              No admin exists yet. As the first signed-in account you can claim admin access now.
            </p>
            <Button
              className="mt-6 rounded-full"
              disabled={busy}
              onClick={() => action(() => claim())}
            >
              Claim admin access
            </Button>
          </>
        ) : (
          <p className="mt-3 text-sm text-muted-foreground">
            Your account doesn't have admin permissions. Ask an existing admin to grant access.
          </p>
        )}
        {error ? <p className="mt-4 text-sm text-destructive">{error}</p> : null}
        <div className="mt-8">
          <Button variant="outline" className="rounded-full" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">
            Control room
          </p>
          <h1 className="mt-2 font-display text-5xl tracking-tight">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="rounded-full" disabled={busy} onClick={loadAll}>
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
          <Button variant="outline" className="rounded-full" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </div>

      {error ? <p className="mt-6 text-sm text-destructive">{error}</p> : null}

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total leads", value: stats?.totalLeads ?? 0, icon: Mail },
          { label: "Leads (7 days)", value: stats?.recentLeads ?? 0, icon: Mail },
          { label: "Members", value: stats?.totalUsers ?? 0, icon: Users },
          { label: "Admins", value: stats?.admins ?? 0, icon: ShieldCheck },
          { label: "Registrations", value: stats?.registrations ?? 0, icon: Ticket },
          { label: "Published posts", value: stats?.publishedPosts ?? 0, icon: FileText },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-3xl border border-foreground/10 bg-background/70 backdrop-blur-xl p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                {s.label}
              </span>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-4 font-display text-4xl">{s.value}</p>
          </div>
        ))}
      </div>

      <Tabs defaultValue="leads" className="mt-12">
        <TabsList>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="registrations">Registrations</TabsTrigger>
          <TabsTrigger value="posts">Resources</TabsTrigger>
          <TabsTrigger value="users">Users &amp; roles</TabsTrigger>
        </TabsList>

        <TabsContent value="registrations" className="mt-6">
          <RegistrationsPanel onChanged={loadAll} />
        </TabsContent>

        <TabsContent value="posts" className="mt-6">
          <PostsPanel onChanged={loadAll} />
        </TabsContent>

        <TabsContent value="leads" className="mt-6">
          <div className="flex flex-wrap items-center gap-3">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, phone or requirement…"
              className="max-w-sm"
            />
            <Button variant="outline" className="rounded-full" onClick={exportCsv}>
              <Download className="h-4 w-4" /> Export CSV
            </Button>
            <span className="text-xs text-muted-foreground">
              {filteredLeads.length} of {leads.length}
            </span>
          </div>

          <div className="mt-6 overflow-x-auto rounded-3xl border border-foreground/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Requirement</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-10">
                      No leads yet.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((l) => (
                    <TableRow key={l.id}>
                      <TableCell className="font-semibold">{l.name ?? "—"}</TableCell>
                      <TableCell>{l.email ?? "—"}</TableCell>
                      <TableCell>{l.phone ?? "—"}</TableCell>
                      <TableCell className="max-w-[22rem] whitespace-pre-wrap text-sm text-muted-foreground">
                        {l.requirement ?? "—"}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{l.source ?? "web"}</Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {fmt(l.created_at)}
                      </TableCell>
                      <TableCell>
                        <Button
                          size="icon"
                          variant="ghost"
                          disabled={busy}
                          onClick={() => action(() => removeLead({ data: { id: l.id } }))}
                          aria-label="Delete lead"
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
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <div className="overflow-x-auto rounded-3xl border border-foreground/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Confirmed</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Last sign in</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.id}>
                    <TableCell className="font-semibold">
                      {u.email}
                      {u.id === state.userId ? (
                        <span className="ml-2 text-xs text-muted-foreground">(you)</span>
                      ) : null}
                    </TableCell>
                    <TableCell>
                      <Badge variant={u.isAdmin ? "default" : "secondary"}>
                        {u.isAdmin ? "Admin" : "Member"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {u.confirmed ? "Yes" : "Pending"}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {fmt(u.createdAt)}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {fmt(u.lastSignInAt)}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full"
                        disabled={busy || u.id === state.userId}
                        onClick={() =>
                          action(() =>
                            toggleAdmin({ data: { userId: u.id, makeAdmin: !u.isAdmin } }),
                          )
                        }
                      >
                        {u.isAdmin ? "Revoke admin" : "Make admin"}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={busy || u.id === state.userId}
                        onClick={() => action(() => removeUser({ data: { userId: u.id } }))}
                        aria-label="Delete user"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
