import { Pagination } from "@nextui-org/pagination";
import { Spinner } from "@nextui-org/spinner";
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { format } from "date-fns";
import { useMemo, useState } from "react";

import { useEmployeesQuery } from "./hooks/useEmployeesQuery";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@nextui-org/button";
import { LogOut, Plus } from "lucide-react";

export const EmployeeList = () => {
  // const { type, id } = useUserStore();
  const { data, isLoading } = useEmployeesQuery();
  const [page, setPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  const rowsPerPage = 10;

  const sortedData = useMemo(() => {
    if (!data) return [];

    let sorted = [...data];

    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const aValue = getKeyValue(a, sortConfig.key);
        const bValue = getKeyValue(b, sortConfig.key);

        if (sortConfig.key === "startDate") {
          return sortConfig.direction === "asc"
            ? new Date(aValue).getTime() - new Date(bValue).getTime()
            : new Date(bValue).getTime() - new Date(aValue).getTime();
        }

        if (sortConfig.key === "lastName") {
          return sortConfig.direction === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        return 0;
      });
    }

    return sorted;
  }, [data, sortConfig]);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return sortedData.slice(start, end);
  }, [page, sortedData]);

  const pages = sortedData ? Math.ceil(sortedData.length / rowsPerPage) : 0;

  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => {
      const direction =
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc";

      return { key, direction };
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="m-3 flex max-h-[710px] w-full max-w-4xl flex-col gap-5 overflow-auto rounded-2xl bg-white p-8 shadow-md dark:bg-zinc-900">
        <Header />
        <div className="flex justify-between gap-2">
          <h2 className="text-lg font-semibold">Employees</h2>
          <Button
            color="secondary"
            type="button"
            variant="bordered"
            size="sm"
            onClick={() => {}}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
        <Table
          aria-label="Employees table"
          bottomContent={
            !!pages ? (
              <div className="relative flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="secondary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
                <div className="absolute left-0">
                  <Button color="primary" size="sm">
                    <Plus size={16} />
                    Add New Employee
                  </Button>
                </div>
              </div>
            ) : null
          }
          classNames={{
            wrapper: "min-h-[222px]",
          }}
        >
          <TableHeader>
            <TableColumn key="firstName">First Name</TableColumn>
            <TableColumn
              key="lastName"
              allowsSorting
              onClick={() => handleSort("lastName")}
            >
              Last Name
            </TableColumn>
            <TableColumn key="jobTitle">Job Title</TableColumn>
            <TableColumn
              key="startDate"
              allowsSorting
              onClick={() => handleSort("startDate")}
            >
              Start Date
            </TableColumn>
          </TableHeader>
          <TableBody
            emptyContent={"No rows to display."}
            isLoading={isLoading}
            items={items || []}
            loadingContent={<Spinner size="lg" />}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "startDate"
                      ? format(
                          new Date(getKeyValue(item, columnKey)),
                          "MM/dd/yyyy"
                        )
                      : getKeyValue(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <Footer />
    </div>
  );
};
