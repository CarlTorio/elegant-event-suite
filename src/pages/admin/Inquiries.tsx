import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Search, Eye, X } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Inquiry {
  id: string;
  reference_number: string;
  full_name: string;
  email: string;
  phone: string;
  event_type: string | null;
  event_date: string | null;
  guest_count: number | null;
  package_interested: string | null;
  message: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const statusOptions = ["new", "contacted", "converted", "declined"];

const AdminInquiries = () => {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, [statusFilter]);

  const fetchInquiries = async () => {
    try {
      let query = supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setInquiries(data || []);
    } catch (error) {
      console.error("Error fetching inquiries:", error);
      toast({
        title: "Error",
        description: "Failed to fetch inquiries",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("inquiries")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      );

      if (selectedInquiry?.id === id) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
      }

      toast({
        title: "Status Updated",
        description: `Inquiry status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const filteredInquiries = inquiries.filter(
    (inq) =>
      inq.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.reference_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "contacted":
        return "bg-green-100 text-green-800";
      case "converted":
        return "bg-purple-100 text-purple-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-semibold">Inquiries</h1>
          <p className="text-gray-text mt-1">
            Manage all package inquiries from potential clients
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-text" />
            <input
              type="text"
              placeholder="Search by name, email, or reference..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Status</option>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="admin-card overflow-hidden">
          {isLoading ? (
            <div className="text-center py-12 text-gray-text">Loading...</div>
          ) : filteredInquiries.length === 0 ? (
            <div className="text-center py-12 text-gray-text">
              No inquiries found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted">
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium">Reference</th>
                    <th className="text-left p-4 font-medium">Name</th>
                    <th className="text-left p-4 font-medium hidden md:table-cell">
                      Event Type
                    </th>
                    <th className="text-left p-4 font-medium hidden lg:table-cell">
                      Package
                    </th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.map((inquiry) => (
                    <tr key={inquiry.id} className="border-b hover:bg-muted/50">
                      <td className="p-4 text-gray-text">
                        {format(new Date(inquiry.created_at), "MMM d, yyyy")}
                      </td>
                      <td className="p-4 font-mono text-xs">
                        {inquiry.reference_number}
                      </td>
                      <td className="p-4">
                        <p className="font-medium">{inquiry.full_name}</p>
                        <p className="text-gray-text text-xs">{inquiry.email}</p>
                      </td>
                      <td className="p-4 text-gray-text hidden md:table-cell">
                        {inquiry.event_type || "-"}
                      </td>
                      <td className="p-4 text-gray-text hidden lg:table-cell">
                        {inquiry.package_interested || "-"}
                      </td>
                      <td className="p-4">
                        <select
                          value={inquiry.status}
                          onChange={(e) => updateStatus(inquiry.id, e.target.value)}
                          className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(
                            inquiry.status
                          )}`}
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status.charAt(0).toUpperCase() + status.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="p-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedInquiry(inquiry)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedInquiry(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">
                Inquiry Details
              </h2>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-text">Reference</p>
                  <p className="font-mono">{selectedInquiry.reference_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-text">Status</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedInquiry.status
                    )}`}
                  >
                    {selectedInquiry.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-text">Full Name</p>
                  <p className="font-medium">{selectedInquiry.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-text">Email</p>
                  <p>{selectedInquiry.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-text">Phone</p>
                  <p>{selectedInquiry.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-text">Event Type</p>
                  <p>{selectedInquiry.event_type || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-text">Event Date</p>
                  <p>
                    {selectedInquiry.event_date
                      ? format(new Date(selectedInquiry.event_date), "MMM d, yyyy")
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-text">Guest Count</p>
                  <p>{selectedInquiry.guest_count || "-"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-text">Package Interested</p>
                  <p>{selectedInquiry.package_interested || "-"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-text">Message</p>
                  <p className="whitespace-pre-wrap">
                    {selectedInquiry.message || "No message provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-text">Submitted</p>
                  <p>
                    {format(
                      new Date(selectedInquiry.created_at),
                      "MMM d, yyyy 'at' h:mm a"
                    )}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <p className="text-sm text-gray-text mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((status) => (
                    <Button
                      key={status}
                      variant={selectedInquiry.status === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => updateStatus(selectedInquiry.id, status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminInquiries;
