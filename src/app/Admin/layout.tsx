import ConditionalSideBar from "@/components/Sidebar/conditionalSidebar";

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex h-screen ">
        <ConditionalSideBar>{children}</ConditionalSideBar>
        
      </div>
    );
  }
  