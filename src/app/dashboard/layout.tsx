import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { getDashboardUser } from "@/lib/dashboard-user";

export default function Layout({ children }: LayoutProps<"/dashboard">) {
  // Niet awaiten: de sessie is runtime-data en wordt binnen Suspense gelezen.
  const user = getDashboardUser();

  return <DashboardLayout user={user}>{children}</DashboardLayout>;
}
