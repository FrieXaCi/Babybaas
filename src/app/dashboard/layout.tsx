import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export default function Layout({ children }: LayoutProps<"/dashboard">) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
