import AssessmentOutlined from "@mui/icons-material/AssessmentOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import HistoryIcon from "@mui/icons-material/History";
import PersonOutline from "@mui/icons-material/PersonOutline";
import ScheduleIcon from "@mui/icons-material/Schedule";
import SettingsOutlined from "@mui/icons-material/SettingsOutlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";

import type { SidebarConfig } from "./types";

export const salesSidebarConfig: SidebarConfig = {
  type: "sales",
  menuItems: [
    {
      id: "product-sales",
      text: "Product Sales",
      icon: <ShoppingCartOutlined />,
      expandable: true,
      subItems: [
        {
          id: "product-sales-future",
          text: "Future",
          icon: <ScheduleIcon />,
          onClick: () => console.log("Navigate to Future Sales"),
        },
        {
          id: "product-sales-past",
          text: "Past",
          icon: <HistoryIcon />,
          onClick: () => console.log("Navigate to Past Sales"),
        },
        {
          id: "product-sales-canceled",
          text: "Canceled",
          icon: <CancelIcon />,
          onClick: () => console.log("Navigate to Canceled Sales"),
        },
      ],
    },
    {
      id: "customers",
      text: "Customers",
      icon: <PersonOutline />,
      expandable: true,
      subItems: [
        {
          id: "customers-future",
          text: "Future",
          icon: <ScheduleIcon />,
          onClick: () => console.log("Navigate to Future Customers"),
        },
        {
          id: "customers-past",
          text: "Past",
          icon: <HistoryIcon />,
          onClick: () => console.log("Navigate to Past Customers"),
        },
        {
          id: "customers-canceled",
          text: "Canceled",
          icon: <CancelIcon />,
          onClick: () => console.log("Navigate to Canceled Customers"),
        },
      ],
    },
  ],
};

export const dashboardSidebarConfig: SidebarConfig = {
  type: "dashboard",
  menuItems: [
    {
      id: "overview",
      text: "Overview",
      icon: <DashboardOutlined />,
      onClick: () => console.log("Navigate to Dashboard Overview"),
    },
    {
      id: "analytics",
      text: "Analytics",
      icon: <AssessmentOutlined />,
      expandable: true,
      subItems: [
        {
          id: "analytics-revenue",
          text: "Revenue",
          onClick: () => console.log("Navigate to Revenue Analytics"),
        },
        {
          id: "analytics-orders",
          text: "Orders",
          onClick: () => console.log("Navigate to Order Analytics"),
        },
        {
          id: "analytics-customers",
          text: "Customer Insights",
          onClick: () => console.log("Navigate to Customer Analytics"),
        },
      ],
    },
    {
      id: "settings",
      text: "Settings",
      icon: <SettingsOutlined />,
      onClick: () => console.log("Navigate to Settings"),
    },
  ],
};

export const getSidebarConfig = (type: string): SidebarConfig => {
  switch (type) {
    case "sales":
      return salesSidebarConfig;
    case "dashboard":
      return dashboardSidebarConfig;
    default:
      return salesSidebarConfig;
  }
};
