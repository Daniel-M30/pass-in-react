import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { Table } from "./table/table";
import { IconButton } from "./icon-button";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { TableHeader } from "./table/table-header";
import { ChangeEvent, useEffect, useState } from "react";
import dayJs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

dayJs.extend(relativeTime);
dayJs.locale("pt-br");

type Attendee = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  checkedInAt: string | null;
};

export function AttendeeList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }

    return "";
  });

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }

    return 1;
  });
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [total, setTotal] = useState(0);

  const TOTAL_PAGES = Math.ceil(total / 10);

  useEffect(() => {
    const url = new URL(
      "http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees"
    );
    url.searchParams.set("pageIndex", String(page - 1));

    if (search.length) {
      url.searchParams.set("query", search);
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAttendees(data.attendees);
        setTotal(data.total);
      });
  }, [page, search]);

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  }

  function goToNextPage() {
    setCurrentPage(page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToLastPage() {
    setCurrentPage(TOTAL_PAGES);
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", String(page));

    window.history.pushState({}, "", url);
    setPage(page);
  }

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());

    if (search) {
      url.searchParams.set("search", search);
    } else {
      url.searchParams.delete("search");
    }

    window.history.pushState({}, "", url);
    setSearch(search);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>
        <div className="w-72 px-3 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            onChange={onSearchInputChanged}
            value={search}
            className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0"
            placeholder="Buscar participantes..."
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="size-4 bg-black/20 rounded border border-white/10"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data de check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee) => (
            <TableRow key={attendee.id}>
              <TableCell className="py-3 px-4 text-sm font-semibold text-left text-zinc-300">
                <input
                  type="checkbox"
                  className="size-4 bg-black/20 rounded border border-white/10"
                />
              </TableCell>
              <TableCell className="py-3 px-4 text-sm font-semibold text-left text-zinc-300">
                {attendee.id}
              </TableCell>
              <TableCell className="py-3 px-4 text-sm font-semibold text-left text-zinc-300">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">
                    {attendee.name}
                  </span>
                  <span>{attendee.email}</span>
                </div>
              </TableCell>
              <TableCell className="py-3 px-4 text-sm font-semibold text-left text-zinc-300">
                {dayJs().to(attendee.createdAt)}
              </TableCell>
              <TableCell className="py-3 px-4 text-sm font-semibold text-left text-zinc-300">
                {attendee.checkedInAt === null ? (
                  <span className="text-zinc-400">Não fez check-in</span>
                ) : (
                  dayJs().to(attendee.checkedInAt)
                )}
              </TableCell>
              <TableCell className="py-3 px-4 text-sm font-semibold text-left">
                <IconButton transparent>
                  <MoreHorizontal className="size-4" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Monstrando {attendees.length} de {total} itens
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>
                  Pagina {page} de {TOTAL_PAGES}
                </span>
                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>
                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === TOTAL_PAGES}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>
                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === TOTAL_PAGES}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
