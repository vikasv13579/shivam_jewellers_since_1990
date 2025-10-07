import DashboardLayout from "./dashboard-wrapper";
import AuthWrapper from "@/components/auth-wrapper";

export default function Layout({ children }) {
  return (
    <AuthWrapper>
      <DashboardLayout className="min-h-screen flex flex-col bg-background text-foreground">
        {children}
      </DashboardLayout>
    </AuthWrapper>
  );
}
