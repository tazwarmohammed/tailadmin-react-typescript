import { useMemo, useState } from "react";
import PageMeta from "../../components/common/PageMeta";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import Input from "../../components/form/input/InputField";
import Select from "../../components/form/Select";
import Button from "../../components/ui/button/Button";
import Label from "../../components/form/Label";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "../../components/ui/table";

interface TransactionItem {
  id: string;
  date: string;
  type: "Payment" | "Refund" | "Transfer";
  status: "Success" | "Pending" | "Failed";
  amount: number;
  reference: string;
  account: string;
  method: string;
  currency: string;
  notes: string;
  merchant: string;
  category: string;
  country: string;
  city: string;
  channel: string;
  riskScore: number;
  fee: number;
  netAmount: number;
  customer: string;
  email: string;
  orderId: string;
  device: string;
  ip: string;
  bin: string;
  last4: string;
  authCode: string;
  batchId: string;
  settlementDate: string;
  createdAtTime: string;
  updatedAtTime: string;
}

const BASE_DATA: Omit<TransactionItem, "id">[] = [
  {
    date: "2025-06-01",
    type: "Payment",
    status: "Success",
    amount: 129.99,
    reference: "INV-1001",
    account: "ACC-01",
    method: "Card",
    currency: "USD",
    notes: "Monthly subscription",
    merchant: "Acme Inc",
    category: "SaaS",
    country: "US",
    city: "NYC",
    channel: "Web",
    riskScore: 3,
    fee: 3.2,
    netAmount: 126.79,
    customer: "John Doe",
    email: "john@example.com",
    orderId: "ORD-7001",
    device: "Desktop",
    ip: "192.168.1.10",
    bin: "411111",
    last4: "4242",
    authCode: "A1B2C3",
    batchId: "BATCH-01",
    settlementDate: "2025-06-02",
    createdAtTime: "08:15:11",
    updatedAtTime: "08:16:09",
  },
  {
    date: "2025-06-02",
    type: "Refund",
    status: "Pending",
    amount: -29.99,
    reference: "INV-1002",
    account: "ACC-02",
    method: "Card",
    currency: "USD",
    notes: "Partial refund",
    merchant: "Globex",
    category: "Retail",
    country: "US",
    city: "Austin",
    channel: "Web",
    riskScore: 5,
    fee: 0.0,
    netAmount: -29.99,
    customer: "Jane Roe",
    email: "jane@example.com",
    orderId: "ORD-7002",
    device: "Mobile",
    ip: "192.168.1.11",
    bin: "510510",
    last4: "5454",
    authCode: "P9Q8R7",
    batchId: "BATCH-01",
    settlementDate: "2025-06-03",
    createdAtTime: "11:05:44",
    updatedAtTime: "11:06:12",
  },
  {
    date: "2025-06-03",
    type: "Transfer",
    status: "Success",
    amount: 500.0,
    reference: "TRF-2401",
    account: "ACC-03",
    method: "Bank",
    currency: "USD",
    notes: "Internal transfer",
    merchant: "Internal",
    category: "Transfer",
    country: "US",
    city: "Chicago",
    channel: "Backoffice",
    riskScore: 1,
    fee: 0.0,
    netAmount: 500.0,
    customer: "—",
    email: "—",
    orderId: "—",
    device: "—",
    ip: "10.0.0.3",
    bin: "—",
    last4: "—",
    authCode: "—",
    batchId: "BATCH-02",
    settlementDate: "2025-06-03",
    createdAtTime: "14:20:03",
    updatedAtTime: "14:20:59",
  },
  {
    date: "2025-06-04",
    type: "Payment",
    status: "Failed",
    amount: 19.0,
    reference: "INV-1003",
    account: "ACC-04",
    method: "Card",
    currency: "USD",
    notes: "Card declined",
    merchant: "Soylent",
    category: "Food",
    country: "US",
    city: "LA",
    channel: "Web",
    riskScore: 7,
    fee: 0.0,
    netAmount: 0.0,
    customer: "Tom Smith",
    email: "tom@example.com",
    orderId: "ORD-7003",
    device: "Desktop",
    ip: "172.16.0.1",
    bin: "400000",
    last4: "0002",
    authCode: "DECLINED",
    batchId: "BATCH-02",
    settlementDate: "—",
    createdAtTime: "09:12:45",
    updatedAtTime: "09:12:47",
  },
  {
    date: "2025-06-05",
    type: "Payment",
    status: "Success",
    amount: 75.5,
    reference: "INV-1004",
    account: "ACC-05",
    method: "Wallet",
    currency: "USD",
    notes: "Promo applied",
    merchant: "Umbrella",
    category: "Pharma",
    country: "US",
    city: "Boston",
    channel: "App",
    riskScore: 2,
    fee: 1.8,
    netAmount: 73.7,
    customer: "Alice Lee",
    email: "alice@example.com",
    orderId: "ORD-7004",
    device: "Mobile",
    ip: "192.168.1.12",
    bin: "601100",
    last4: "6011",
    authCode: "Z6Y5X4",
    batchId: "BATCH-03",
    settlementDate: "2025-06-06",
    createdAtTime: "16:41:21",
    updatedAtTime: "16:42:09",
  },
  {
    date: "2025-06-06",
    type: "Refund",
    status: "Success",
    amount: -15.0,
    reference: "INV-1005",
    account: "ACC-06",
    method: "Card",
    currency: "USD",
    notes: "Overcharge",
    merchant: "Hooli",
    category: "Tech",
    country: "US",
    city: "SF",
    channel: "Web",
    riskScore: 4,
    fee: 0.0,
    netAmount: -15.0,
    customer: "Bob Ray",
    email: "bob@example.com",
    orderId: "ORD-7005",
    device: "Tablet",
    ip: "192.168.1.13",
    bin: "356600",
    last4: "8888",
    authCode: "R3F7K2",
    batchId: "BATCH-03",
    settlementDate: "2025-06-07",
    createdAtTime: "10:03:08",
    updatedAtTime: "10:05:26",
  },
];

const DUMMY_DATA: TransactionItem[] = Array.from({ length: 150 }).map((_, i) => {
  const tmpl = BASE_DATA[i % BASE_DATA.length];
  return {
    id: `TXN-${(i + 1).toString().padStart(4, "0")}`,
    ...tmpl,
  } as TransactionItem;
});

export default function TransactionView() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const filtered = useMemo(() => {
    return DUMMY_DATA.filter((t) => {
      const q = query.toLowerCase();
      const matchesQuery =
        !q ||
        t.id.toLowerCase().includes(q) ||
        t.reference.toLowerCase().includes(q) ||
        t.account.toLowerCase().includes(q) ||
        t.customer.toLowerCase().includes(q) ||
        t.email.toLowerCase().includes(q) ||
        t.orderId.toLowerCase().includes(q);
      const matchesType = type === "All" || t.type === (type as any);
      const matchesStatus = status === "All" || t.status === (status as any);
      return matchesQuery && matchesType && matchesStatus;
    });
  }, [query, type, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const handlePageJump = (v: string) => {
    const n = parseInt(v, 10);
    if (!Number.isNaN(n)) setPage(Math.max(1, Math.min(totalPages, n)));
  };

  const handlePageSize = (v: string) => {
    const n = parseInt(v, 10);
    if (!Number.isNaN(n)) {
      setPageSize(n);
      setPage(1);
    }
  };

  return (
    <div>
      <PageMeta
        title="iFLash | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Transaction view page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Transaction view" />

      <div className="mb-3 grid grid-cols-12 gap-2 items-end">
        <div className="col-span-12">
          <div className="flex flex-wrap items-end gap-2">
            <div>
              <Label>Search</Label>
              <Input
                placeholder="ID / reference / account / customer / email"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-8 text-theme-xs sm:w-[320px] !border-blue-200 !focus:border-blue-300 !focus:ring-blue-200"
              />
            </div>
            <div>
              <Label>Type</Label>
              <Select
                value={type}
                onChange={(v: string) => setType(v)}
                options={["All", "Payment", "Refund", "Transfer"].map((o) => ({ label: o, value: o }))}
                className="h-8 text-theme-xs w-12 bg-white"
              />
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={status}
                onChange={(v: string) => setStatus(v)}
                options={["All", "Success", "Pending", "Failed"].map((o) => ({ label: o, value: o }))}
                className="h-8 text-theme-xs w-12 bg-white"
              />
            </div>
            <div className="flex items-end gap-2">
              <Button size="sm" variant="outline" className="px-3 py-1.5 text-xs border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100" onClick={() => { setQuery(""); setType("All"); setStatus("All"); }}>
                Reset
              </Button>
              <Button size="sm" className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100">
                Filter
              </Button>
            </div>
            <div className="ml-auto flex items-end gap-2">
              <div>
                <Label>Rows</Label>
                <div className="relative">
                  <select
                    value={String(pageSize)}
                    onChange={(e) => handlePageSize(e.target.value)}
                    className="h-8 w-16 px-2 text-center text-theme-xs bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                  >
                    {[10, 50, 100].map((n) => (
                      <option key={n} value={String(n)}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg border-gray-200">
        <div className="max-h-[78vh] overflow-y-auto">
          <Table className="text-theme-xs min-w-[1800px]">
            <TableHeader>
              <TableRow className="bg-gray-700 border-gray-700">
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">ID</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Date</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Type</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Status</TableCell>
                <TableCell isHeader className="px-3 py-3 text-right text-white font-semibold whitespace-nowrap">Amount</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Reference</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Account</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Method</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Currency</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Notes</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Merchant</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Category</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Country</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">City</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Channel</TableCell>
                <TableCell isHeader className="px-3 py-3 text-right text-white font-semibold whitespace-nowrap">Risk</TableCell>
                <TableCell isHeader className="px-3 py-3 text-right text-white font-semibold whitespace-nowrap">Fee</TableCell>
                <TableCell isHeader className="px-3 py-3 text-right text-white font-semibold whitespace-nowrap">Net</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Customer</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Email</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Order ID</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Device</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">IP</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">BIN</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Last4</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Auth</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Batch</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Settlement</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Created</TableCell>
                <TableCell isHeader className="px-3 py-3 text-left text-white font-semibold whitespace-nowrap">Updated</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((t, index) => (
                <TableRow key={t.id} className={`border-t border-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-blue-50"} hover:bg-blue-100`}>
                  <TableCell className="px-3 py-2 text-gray-800 whitespace-nowrap">{t.id}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.date}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.type}</TableCell>
                  <TableCell className="px-3 py-2 whitespace-nowrap">
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                      t.status === "Success" ? "bg-green-100 text-green-700" :
                      t.status === "Pending" ? "bg-yellow-100 text-yellow-700" :
                      t.status === "Failed" ? "bg-red-100 text-red-700" :
                      "bg-blue-50 text-blue-600"
                    }`}>
                      {t.status}
                    </span>
                  </TableCell>
                  <TableCell className={`px-3 py-2 text-right tabular-nums whitespace-nowrap ${t.amount < 0 ? "text-error-600" : "text-gray-800"}`}>
                    {t.amount < 0 ? "-" : ""}${Math.abs(t.amount).toFixed(2)}
                  </TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.reference}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.account}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.method}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.currency}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.notes}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.merchant}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.category}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.country}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.city}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.channel}</TableCell>
                  <TableCell className="px-3 py-2 text-right text-gray-700 whitespace-nowrap">{t.riskScore}</TableCell>
                  <TableCell className="px-3 py-2 text-right text-gray-700 whitespace-nowrap">${t.fee.toFixed(2)}</TableCell>
                  <TableCell className="px-3 py-2 text-right text-gray-700 whitespace-nowrap">${t.netAmount.toFixed(2)}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.customer}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.email}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.orderId}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.device}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.ip}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.bin}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.last4}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.authCode}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.batchId}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.settlementDate}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.createdAtTime}</TableCell>
                  <TableCell className="px-3 py-2 text-gray-700 whitespace-nowrap">{t.updatedAtTime}</TableCell>
                </TableRow>
              ))}
              {paginated.length === 0 && (
                <TableRow>
                  <TableCell className="px-3 py-6 text-center text-gray-500" colSpan={31}>
                    No transactions match your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 py-3">
        <button
          onClick={goPrev}
          disabled={currentPage === 1}
          className="h-10 w-10 rounded-full bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
        >
          <span className="text-lg font-bold">&larr;</span>
        </button>
        <div className="flex items-center gap-2">
          <span className="text-theme-xs text-gray-500">Page</span>
          <div className="relative">
            <select
              value={String(currentPage)}
              onChange={(e) => handlePageJump(e.target.value)}
              className="h-8 w-14 px-2 text-center text-theme-xs bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
            >
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={String(i + 1)}>
                  {i + 1}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
              <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <span className="text-theme-xs text-gray-500 whitespace-nowrap">of {totalPages}</span>
        </div>
        <button
          onClick={goNext}
          disabled={currentPage === totalPages}
          className="h-10 w-10 rounded-full bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center transition-colors duration-200"
        >
          <span className="text-lg font-bold">&rarr;</span>
        </button>
      </div>
    </div>
  );
} 
