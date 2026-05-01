import { Search, Users } from "lucide-react";
import { useState } from "react";

const DUMMY_USERS = [
  { name: "Eleanor Vance", email: "eleanor.v@example.com" },
  { name: "Julian Morrow", email: "j.morrow@example.com" },
  { name: "Silvia Thorne", email: "silvia.t@example.com" },
  { name: "Marcus Reed", email: "mreed88@example.com" },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const filtered = DUMMY_USERS.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-1">User Management</h1>
      <p className="text-sm text-gray-400 mb-8">
        Overview and control of registered citizens.
      </p>

      {/* Stat card */}
      <div className="bg-white rounded-xl p-5 flex items-center gap-4 mb-6 w-fit">
        <div className="bg-[#1C4419] p-3 rounded-xl">
          <Users size={22} className="text-white" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-gray-400">
            Total Registered Users
          </p>
          <p className="text-2xl font-bold text-gray-800">12,480</p>
        </div>
      </div>

      {/* Search */}
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

      {/* Table */}
      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-gray-400 border-b border-[#E2E1DF]">
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Email</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr
                key={user.email}
                className="border-b border-[#E2E1DF] last:border-0"
              >
                <td className="px-6 py-4 text-gray-700">{user.name}</td>
                <td className="px-6 py-4 text-gray-500">{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
