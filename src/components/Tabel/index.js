"use client";
import * as React from "react";
import { CiSearch } from "react-icons/ci";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { DataTablePagination } from "@/components/TablePagination";

export default function DataTable({ columns, data }) {
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [filtering, setFiltering] = React.useState('')


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
      globalFilter: filtering,
    },
  });

  return (
    <div className="border rounded-lg shadow-lg p-7 bg-white">
      <div className="flex items-center py-4">
      <div className="relative flex items-center w-full mb-4">
            <Input type='text' value={filtering} onChange={e => setFiltering(e.target.value)} label={'Search...'} className='rounded-md text-sm border px-4 py-2' placeholder='Search...'/>
            <CiSearch className='absolute right-4 top-2 text-blue-gray-300 text-2xl' />
        </div>
      </div>
      <div className="rounded-md border mb-6 ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No Data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
