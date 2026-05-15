import { Search, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { userService, type RegisteredUsersResponse } from "@/services/user.service";
import { type User } from "@/types/User";

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState<RegisteredUsersResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const result = await userService.getRegisteredCustomers();
        setData(result);
        setIsError(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsError(true);
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

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-1">User Management</h1>
      <p className="text-sm text-gray-400 mb-8">
        Overview and control of registered citizens.
      </p>

      {/* stat card */}
      <div className="bg-white rounded-xl p-5 flex items-center gap-4 mb-6 w-fit">
        <div className="bg-[#1C4419] p-3 rounded-xl">
          <Users size={22} className="text-white" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Total Registered Users
          </p>
          <p className="text-2xl font-bold text-gray-800">{total}</p>
        </div>
      </div>

      {/* search */}
      <div className="relative w-72 mb-6">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 text-sm border border-[#E2E1DF] rounded-lg bg-white text-gray-700 placeholder-gray-400 outline-none"
        />
      </div>

      {/* table */}
      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-gray-400 border-b border-[#E2E1DF]">
              <th className="text-left px-6 py-3">First Name</th>
              <th className="text-left px-6 py-3">Last Name</th>
              <th className="text-left px-6 py-3">Email</th>
              <th className="text-left px-6 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-gray-500">
                  Loading users...
                </td>
              </tr>
            )}

            {isError && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-red-500">
                  Failed to load registered users.
                </td>
              </tr>
            )}

            {!isLoading && !isError && filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-gray-500">
                  No registered users found.
                </td>
              </tr>
            )}

            {!isLoading &&
              !isError &&
              filtered.map((user: User) => (
                <tr
                  key={user.email}
                  className="border-b border-[#E2E1DF] last:border-0"
                >
                  <td className="px-6 py-4 text-gray-700">
                    {user.firstName}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{user.lastName}</td>
                  <td className="px-6 py-4 text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 text-gray-500">{user.userType}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
