import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Search, Eye, X } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface Appointment {
  id: string;
  reference_number: string;
  full_name: string;
  email: string;
  phone: string;
  appointment_date: string;
  appointment_time: string;
  meeting_type: string | null;
  notes: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

const statusOptions = ["pending", "confirmed", "completed", "cancelled"];

const meetingTypeLabels: Record<string, string> = {
  office_visit: "Office Visit",
  video_call: "Video Call",
  phone_call: "Phone Call",
};

const AdminAppointments = () => {
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(
    null
  );

  useEffect(() => {
    fetchAppointments();
  }, [statusFilter]);

  const fetchAppointments = async () => {
    try {
      let query = supabase
        .from("appointments")
        .select("*")
        .order("appointment_date", { ascending: true });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast({
        title: "Error",
        description: "Failed to fetch appointments",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("appointments")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setAppointments((prev) =>
        prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
      );

      if (selectedAppointment?.id === id) {
        setSelectedAppointment((prev) =>
          prev ? { ...prev, status: newStatus } : null
        );
      }

      toast({
        title: "Status Updated",
        description: `Appointment status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      });
    }
  };

  const filteredAppointments = appointments.filter(
    (apt) =>
      apt.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.reference_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "cancelled":
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
          <h1 className="font-display text-3xl font-semibold">Appointments</h1>
          <p className="text-gray-text mt-1">
            Manage consultation appointments with clients
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
          ) : filteredAppointments.length === 0 ? (
            <div className="text-center py-12 text-gray-text">
              No appointments found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted">
                    <th className="text-left p-4 font-medium">Appointment</th>
                    <th className="text-left p-4 font-medium">Reference</th>
                    <th className="text-left p-4 font-medium">Name</th>
                    <th className="text-left p-4 font-medium hidden md:table-cell">
                      Type
                    </th>
                    <th className="text-left p-4 font-medium">Status</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAppointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-b hover:bg-muted/50"
                    >
                      <td className="p-4">
                        <p className="font-medium">
                          {format(
                            new Date(appointment.appointment_date),
                            "MMM d, yyyy"
                          )}
                        </p>
                        <p className="text-gray-text text-xs">
                          {appointment.appointment_time}
                        </p>
                      </td>
                      <td className="p-4 font-mono text-xs">
                        {appointment.reference_number}
                      </td>
                      <td className="p-4">
                        <p className="font-medium">{appointment.full_name}</p>
                        <p className="text-gray-text text-xs">
                          {appointment.email}
                        </p>
                      </td>
                      <td className="p-4 text-gray-text hidden md:table-cell">
                        {appointment.meeting_type
                          ? meetingTypeLabels[appointment.meeting_type] ||
                            appointment.meeting_type
                          : "-"}
                      </td>
                      <td className="p-4">
                        <select
                          value={appointment.status}
                          onChange={(e) =>
                            updateStatus(appointment.id, e.target.value)
                          }
                          className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer ${getStatusColor(
                            appointment.status
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
                          onClick={() => setSelectedAppointment(appointment)}
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
      {selectedAppointment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedAppointment(null)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="sticky top-0 bg-white p-6 border-b flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">
                Appointment Details
              </h2>
              <button
                onClick={() => setSelectedAppointment(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-text">Reference</p>
                  <p className="font-mono">{selectedAppointment.reference_number}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-text">Status</p>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedAppointment.status
                    )}`}
                  >
                    {selectedAppointment.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-text">Full Name</p>
                  <p className="font-medium">{selectedAppointment.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-text">Email</p>
                  <p>{selectedAppointment.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-text">Phone</p>
                  <p>{selectedAppointment.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-text">Meeting Type</p>
                  <p>
                    {selectedAppointment.meeting_type
                      ? meetingTypeLabels[selectedAppointment.meeting_type] ||
                        selectedAppointment.meeting_type
                      : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-text">Appointment Date</p>
                  <p className="font-medium">
                    {format(
                      new Date(selectedAppointment.appointment_date),
                      "MMMM d, yyyy"
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-text">Appointment Time</p>
                  <p className="font-medium">
                    {selectedAppointment.appointment_time}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-text">Notes</p>
                  <p className="whitespace-pre-wrap">
                    {selectedAppointment.notes || "No notes provided"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-text">Booked On</p>
                  <p>
                    {format(
                      new Date(selectedAppointment.created_at),
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
                      variant={
                        selectedAppointment.status === status ? "default" : "outline"
                      }
                      size="sm"
                      onClick={() => updateStatus(selectedAppointment.id, status)}
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

export default AdminAppointments;
