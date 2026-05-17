import { ChevronLeft, ChevronRight, Search, Users as UsersIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { userService, type RegisteredUsersResponse } from "@/services/user.service";
import { type User } from "@/types/User";

const ITEMS_PER_PAGE = 10;

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<RegisteredUsersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const result = await userService.getRegisteredCustomers();
        setData(result);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const users = data?.data ?? [];
  const total = data?.total ?? 0;

  // filter users by name, email, or role
  const filtered = users.filter((user: User) => {
    const searchValue = search.toLowerCase();

    return (
      user.firstName.toLowerCase().includes(searchValue) ||
      user.lastName.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue) ||
      user.userType.toLowerCase().includes(searchValue)
    );
  });

  // Reset to page 0 when search changes
  useEffect(() => {
    setPage(0);
  }, [search]);

  // Paginate filtered results
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginatedUsers = filtered.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE,
  );

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#1C4419] tracking-tight manrope">Citizen Management</h1>
          <p className="text-sm text-[#6B7280] font-medium">Review and manage registered users of the platform.</p>
        </div>

        <div className="relative w-full max-w-xs group">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#1C4419] transition-colors"
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 text-sm bg-white border border-[#E8E7E4] rounded-2xl outline-none focus:border-[#1C4419] focus:ring-4 focus:ring-[#1C4419]/5 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Summary Stat */}
      <div className="bg-white border border-[#E8E7E4] rounded-3xl p-6 w-fit shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex items-center gap-4">
        <div className="bg-[#E8F5E2] p-3 rounded-2xl text-[#1C4419]">
          <UsersIcon size={24} />
        </div>
        <div>
          <p className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Total Registered</p>
          <p className="text-2xl font-black text-[#1C4419] manrope">{total}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E8E7E4] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-[#9CA3AF] font-black border-b border-[#F4F3F1] bg-[#FCFBF9]">
                <th className="text-left px-8 py-5">Citizen Name</th>
                <th className="text-left px-4 py-5">Email Address</th>
                <th className="text-left px-4 py-5">Account Role</th>
                <th className="text-right px-8 py-5">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F3F1]">
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td colSpan={4} className="px-8 py-5"><div className="h-4 bg-gray-100 rounded w-full"></div></td>
                  </tr>
                ))
              ) : paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-8 py-12 text-center text-gray-400 font-medium">
                    No citizens found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedUsers.map((user: User) => (
                  <tr key={user.email} className="hover:bg-[#FCFBF9] transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#E8F5E2] flex items-center justify-center text-[#1C4419] font-bold text-xs">
                          {user.firstName[0]}{user.lastName[0]}
                        </div>
                        <span className="font-bold text-[#42493E]">{user.firstName} {user.lastName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-gray-500 font-medium">{user.email}</td>
                    <td className="px-4 py-5">
                      <span className="text-[10px] px-2 py-1 rounded-lg font-black border uppercase tracking-wider bg-gray-50 text-gray-600 border-gray-100">
                        {user.userType}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right text-gray-400 text-xs font-medium italic">
                      Active Account
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && filtered.length > 0 && (
          <div className="px-8 py-4 bg-[#FCFBF9] border-t border-[#F4F3F1] flex items-center justify-between">
            <p className="text-xs font-bold text-[#6B7280]">
              Showing <span className="text-[#1C4419]">{page * ITEMS_PER_PAGE + 1}</span> to <span className="text-[#1C4419]">{Math.min((page + 1) * ITEMS_PER_PAGE, filtered.length)}</span> of <span className="text-[#1C4419]">{filtered.length}</span> citizens
            </p>
            <div className="flex items-center gap-2">
              <button
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className="p-2 rounded-lg border border-[#E8E7E4] bg-white text-[#1C4419] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F4F3F1] transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs font-black text-[#1C4419] px-2">
                {page + 1} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages - 1}
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                className="p-2 rounded-lg border border-[#E8E7E4] bg-white text-[#1C4419] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#F4F3F1] transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
