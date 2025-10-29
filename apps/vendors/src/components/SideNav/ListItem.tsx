import type { ListProps } from "@mui/material";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import {
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

interface CustomListItemProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  open: boolean;
  active: boolean;
  expandable?: boolean;
  expanded?: boolean;
}

const CustomListItem = (props: CustomListItemProps) => {
  const {
    icon,
    text,
    onClick,
    open,
    active,
    expandable,
    expanded = false,
  } = props;
  return (
    <ListItem sx={{ paddingY: 0.25 }} disablePadding>
      <ListItemButton
        onClick={onClick}
        sx={{
          borderRadius: 2,
          padding: 1,
          paddingX: 2,
          backgroundColor: active ? "#FEF2F2" : "#F9FAFB",
          "&:hover": {
            backgroundColor: active ? "#FEF2F2" : "#F9FAFB",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: open ? 40 : "auto",
            color: "#6B7280",
          }}
        >
          {icon}
        </ListItemIcon>
        {open && (
          <ListItemText
            primary={text}
            sx={{
              "& .MuiListItemText-primary": {
                fontWeight: active ? 600 : 500,
                color: active ? "#1F2937" : "#6B7280",
                truncate: "true",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              },
            }}
          />
        )}
        {expandable && (
          <IconButton
            size="small"
            sx={{
              color: active ? "#F97316" : "#6B7280",
              p: 0,
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.1s ease-in-out",
            }}
          >
            {expandable && <KeyboardArrowRight />}
          </IconButton>
        )}
      </ListItemButton>
    </ListItem>
  );
};

interface CustomSubListItemProps {
  text: string;
  icon?: React.ReactNode;
  onClick: () => void;
  active: boolean;
  collapsed?: boolean;
}

const CustomSubListItem = (props: CustomSubListItemProps) => {
  const { text, icon, onClick, active, collapsed = false } = props;
  return (
    <ListItem
      sx={{
        width: collapsed ? "44px" : "auto",
        marginLeft: collapsed ? "auto" : 0,
      }}
      disablePadding
    >
      <ListItemButton
        onClick={onClick}
        sx={{
          borderRadius: 2,
          padding: 0.5,
          paddingX: collapsed ? 1 : 2,
          backgroundColor: active ? "#FEF2F2" : "#F9FAFB",
          "&:hover": {
            backgroundColor: active ? "#FEF2F2" : "#F9FAFB",
          },
        }}
      >
        {collapsed && icon && (
          <ListItemIcon
            sx={{
              minWidth: 40,
              color: "#6B7280",
            }}
          >
            {icon}
          </ListItemIcon>
        )}
        {!collapsed && (
          <ListItemText
            primary={text}
            sx={{
              "& .MuiListItemText-primary": {
                fontSize: "0.875rem",
                fontWeight: active ? 600 : 500,
                color: active ? "#1F2937" : "#6B7280",
              },
            }}
          />
        )}
      </ListItemButton>
    </ListItem>
  );
};

const CustomList = ({ children, ...props }: ListProps) => {
  return (
    <List
      {...props}
      sx={{ display: "flex", flexDirection: "column", gap: 0.5, ...props.sx }}
    >
      {children}
    </List>
  );
};

export {
  Collapse,
  Drawer,
  CustomList as List,
  CustomListItem as ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  CustomSubListItem as SubListItem,
};
