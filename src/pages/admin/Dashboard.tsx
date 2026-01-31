import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Calendar, Clock, TrendingUp } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import { format } from "date-fns";

interface Inquiry {
  id: string;
  reference_number: string;
  full_name: string;
  email: string;
  event_type: string | null;
  status: string;
  created_at: string;
}

interface Appointment {
  id: string;
  reference_number: string;
  full_name: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalInquiries: 0,
    newInquiries: 0,
    totalAppointments: 0,
    upcomingAppointments: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<Inquiry[]>([]);
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch inquiry stats
      const { count: totalInquiries } = await supabase
        .from("inquiries")
        .select("*", { count: "exact", head: true });

      const { count: newInquiries } = await supabase
        .from("inquiries")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");

      // Fetch appointment stats
      const { count: totalAppointments } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true });

      const today = new Date();
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      const { count: upcomingAppointments } = await supabase
        .from("appointments")
        .select("*", { count: "exact", head: true })
        .gte("appointment_date", today.toISOString().split("T")[0])
        .lte("appointment_date", nextWeek.toISOString().split("T")[0]);

      setStats({
        totalInquiries: totalInquiries || 0,
        newInquiries: newInquiries || 0,
        totalAppointments: totalAppointments || 0,
        upcomingAppointments: upcomingAppointments || 0,
      });

      // Fetch recent inquiries
      const { data: inquiriesData } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      setRecentInquiries(inquiriesData || []);

      // Fetch recent appointments
      const { data: appointmentsData } = await supabase
        .from("appointments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      setRecentAppointments(appointmentsData || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
      case "pending":
        return "bg-blue-100 text-blue-800";
      case "contacted":
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "converted":
      case "completed":
        return "bg-purple-100 text-purple-800";
      case "declined":
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl font-semibold">Dashboard</h1>
          <p className="text-gray-text mt-1">
            Welcome back! Here's an overview of your business.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="admin-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-gray-text text-sm">Total Inquiries</p>
                <p className="admin-stat">{stats.totalInquiries}</p>
              </div>
            </div>
          </div>

          <div className="admin-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-gray-text text-sm">New Inquiries</p>
                <p className="admin-stat text-blue-500">{stats.newInquiries}</p>
              </div>
            </div>
          </div>

          <div className="admin-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-gray-text text-sm">Total Appointments</p>
                <p className="admin-stat text-accent">{stats.totalAppointments}</p>
              </div>
            </div>
          </div>

          <div className="admin-card">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <Clock className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-gray-text text-sm">Upcoming (7 days)</p>
                <p className="admin-stat text-green-500">{stats.upcomingAppointments}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tables */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Inquiries */}
          <div className="admin-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold">Recent Inquiries</h2>
              <Link
                to="/admin/inquiries"
                className="text-primary text-sm hover:underline"
              >
                View all
              </Link>
            </div>

            {isLoading ? (
              <div className="text-center py-8 text-gray-text">Loading...</div>
            ) : recentInquiries.length === 0 ? (
              <div className="text-center py-8 text-gray-text">
                No inquiries yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium">Name</th>
                      <th className="text-left py-2 font-medium hidden md:table-cell">Event</th>
                      <th className="text-left py-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="border-b last:border-0">
                        <td className="py-3">
                          <p className="font-medium">{inquiry.full_name}</p>
                          <p className="text-gray-text text-xs">
                            {format(new Date(inquiry.created_at), "MMM d, yyyy")}
                          </p>
                        </td>
                        <td className="py-3 hidden md:table-cell text-gray-text">
                          {inquiry.event_type || "-"}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              inquiry.status
                            )}`}
                          >
                            {inquiry.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent Appointments */}
          <div className="admin-card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-semibold">
                Recent Appointments
              </h2>
              <Link
                to="/admin/appointments"
                className="text-primary text-sm hover:underline"
              >
                View all
              </Link>
            </div>

            {isLoading ? (
              <div className="text-center py-8 text-gray-text">Loading...</div>
            ) : recentAppointments.length === 0 ? (
              <div className="text-center py-8 text-gray-text">
                No appointments yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 font-medium">Name</th>
                      <th className="text-left py-2 font-medium hidden md:table-cell">Date</th>
                      <th className="text-left py-2 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAppointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b last:border-0">
                        <td className="py-3">
                          <p className="font-medium">{appointment.full_name}</p>
                          <p className="text-gray-text text-xs md:hidden">
                            {format(new Date(appointment.appointment_date), "MMM d")} at{" "}
                            {appointment.appointment_time}
                          </p>
                        </td>
                        <td className="py-3 hidden md:table-cell text-gray-text">
                          {format(new Date(appointment.appointment_date), "MMM d, yyyy")} at{" "}
                          {appointment.appointment_time}
                        </td>
                        <td className="py-3">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              appointment.status
                            )}`}
                          >
                            {appointment.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
